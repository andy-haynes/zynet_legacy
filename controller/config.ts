import { w3cwebsocket } from 'websocket';


export default {
  thermometer: {
    sampleIntervalMS: 750
  },
  websocket: {
    url: 'ws://localhost:8081',
    ctor: w3cwebsocket,
    reconnectMessage: 'attempting reconnect...',
    reconnectTimeoutMS: 500
  }
};
