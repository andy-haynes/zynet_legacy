export default {
  PID: {
    strikeThreshold: 0.95,  // percentage of target temp to reach before switching to PID control
  },
  Relay: {
    pins: [10, 12]
  },
  thermometer: {
    defaultTemperature: -1, // uninitialized temperature value
    sampleIntervalMS: 750,  // ms between temperature measurements
  }
};
