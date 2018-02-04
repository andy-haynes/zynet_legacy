export enum TemperatureUnits {
  Fahrenheit,
  Celsius
}

export enum BrewState {
  Ready,      // initialized, awaiting config
  Loaded,     // config loaded, awaiting manual start
  Priming,    // started, heating to first step's temperature
  Holding,    // holding at target temperature, awaiting manual start
  Started,    // mash countdown started, begin progressing through steps
  Completed,  // final step's timer is up, holding temperature
  Stopped     // manually stopped, temperature off
}

export enum ZynetMessageType {
  LogUpdate = 1,
  UpdateConfig
}
