import * as http from 'http';
import * as WebSocket from 'ws';

import ZynetMessage from '../core/models/ZynetMessage';
import { ZynetClientType, ZynetMessageType } from '../core/constants';

const clientWebsocketPort = 8081;
const server = http.createServer();
const websocketClients = {};
const websocketServer = new WebSocket.Server({ server });

websocketServer.on('connection', (websocket: WebSocket) => {
  websocket.on('message', (data: string) => {
    const broadcast = (msg: ZynetMessage, ...targetClients: ZynetClientType[]) => {
      const send = (client: WebSocket) => client !== websocket && client.send(JSON.stringify(msg));
      Object.keys(websocketClients)
        .map((key) => parseInt(key) as ZynetClientType)
        .filter((clientType) => {
          return clientType === ZynetClientType.All
            || (targetClients && targetClients.some((client) => client === clientType));
        })
        .forEach((clientType) => websocketClients[clientType].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            send(client);
          }
        }));
    };

    const message = JSON.parse(data) as ZynetMessage;
    switch (message.type) {
      case ZynetMessageType.LogUpdate:
        broadcast(message, ZynetClientType.Web, ZynetClientType.Native);
        break;
      case ZynetMessageType.UpdateConfig:
        broadcast(message, ZynetClientType.All);
        break;
      case ZynetMessageType.RegisterClient:
        const client = message.data as ZynetClientType;
        console.log(`client ${client} registered`);
        if (!websocketClients[client]) {
          websocketClients[client] = [];
        }
        websocketClients[client].push(websocket);
        break;
      default:
    }
  });

  websocket.on('error', (err: Error) => {
    console.error(err);
  });
});

server.listen(clientWebsocketPort, () => {
  console.log(`client websocket listening on port ${clientWebsocketPort}`);
});

export default server;
