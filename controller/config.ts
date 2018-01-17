import { w3cwebsocket } from 'websocket';


export default {
  PID: {
    strikeThreshold: 0.95 // percentage of target temp to reach before switching to PID control
  },
  thermometer: {
    sampleIntervalMS: 750 // ms between temperature measurements
  },
  websocket: {
    url: 'ws://localhost:8081',
    ctor: w3cwebsocket,
    reconnectMessage: 'attempting reconnect...',
    reconnectTimeoutMS: 500
  }
};
