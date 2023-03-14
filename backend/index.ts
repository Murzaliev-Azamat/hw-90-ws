import cors from "cors";
import express from "express";
import expressWs from "express-ws";
import { ActiveConnections, IncomingMessage } from "./types";
import * as crypto from "crypto";

const app = express();
expressWs(app);
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const router = express.Router();
app.use(router);

const activeConnections: ActiveConnections = {};

router.ws("/canvas", (ws, req) => {
  const id = crypto.randomUUID();
  console.log("client connected! id=" + id);
  activeConnections[id] = ws;

  const basePixels: any[] = [];

  console.log(basePixels);
  // ws.send(basePixels);

  ws.on("message", (message) => {
    const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

    switch (decodedMessage.type) {
      case "SET_PIXELS":
        basePixels.push(decodedMessage.payload);
        Object.keys(activeConnections).forEach((id) => {
          const conn = activeConnections[id];
          conn.send(
            JSON.stringify({
              type: "NEW_PIXELS",
              payload: decodedMessage.payload,
            })
          );
        });
        break;
      default:
        console.log("Unknown type", decodedMessage.type);
    }
  });

  ws.on("close", () => {
    console.log("client disconnected! id=" + id);
    delete activeConnections[id];
  });
});

app.listen(port, () => {
  console.log("We are live on " + port);
});
