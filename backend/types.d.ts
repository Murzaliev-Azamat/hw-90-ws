import { WebSocket } from "ws";

export interface ActiveConnections {
  [id: string]: WebSocket;
}

export interface IncomingMessage {
  type: string;
  payload: string;
}

// export interface BasePixels {
//   []: {
//     x: string;
//     y: string;
//   };
// }
