import React, { useEffect, useRef, useState } from 'react';
import { CanvasPixels, IncomingMessage, PixelsApi } from '../types';

function App() {
  const [pixels, setPixels] = useState<CanvasPixels>({
    x: '',
    y: '',
  });
  const [state, setState] = useState<PixelsApi>({
    x: '',
    y: '',
  });

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/canvas');
    ws.current.onclose = () => console.log('ws closed');
    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;
      console.log(decodedMessage);

      if (decodedMessage.type === 'NEW_PIXELS') {
        setPixels((pixels) => decodedMessage.payload);
      }
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: 'SET_PIXELS',
        payload: state,
      }),
    );

    setState({ x: '', y: '' });
  };

  // if (!isLoggedIn) {
  //   chat = (
  //     <form onSubmit={setUsername}>
  //       <input type="text" name="username" value={usernameText} onChange={changeUsername} />
  //       <button type="submit" value="Enter Chat">
  //         Enter chat
  //       </button>
  //     </form>
  //   );
  // }

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const draw = (ctx: CanvasRenderingContext2D) => {
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(150, 10);
  //   ctx.stroke();
  // };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.moveTo(0, 0);
        context.lineTo(Number(pixels.x), Number(pixels.y));
        context.stroke();
      }
    }
  }, [pixels]);

  return (
    <div className="App">
      <canvas ref={canvasRef} id="myCanvas" width="200" height="100" style={{ border: '1px solid #000000' }}></canvas>
      <div>
        <form onSubmit={submitFormHandler}>
          <input
            type="number"
            name="x"
            value={state.x}
            onChange={inputChangeHandler}
            placeholder="Введите пикслели по горизонтали"
          />
          <input
            type="number"
            name="y"
            value={state.y}
            onChange={inputChangeHandler}
            placeholder="Введите пикслели по вертикали"
          />

          <button type="submit" value="Enter Chat">
            Add new pixels
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
