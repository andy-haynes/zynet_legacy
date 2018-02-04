import { w3cwebsocket } from 'websocket';


export default {
  websocket: {
    url: 'ws://grimlock.local:8081',
    ctor: w3cwebsocket,
    reconnectMessage: 'attempting reconnect...',
    reconnectTimeoutMS: 500
  }
};
