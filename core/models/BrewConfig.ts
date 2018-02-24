import ConfigUpdate from './BrewUpdate';

export default class BrewConfig {

  public startTime: Date;
  public targetTemperature: number;
  public history: ConfigUpdate[];

  constructor(public id: number) {
    this.targetTemperature = 0;
    this.history = [];
  }

  get elapsedSeconds(): number {
    return (this.startTime || 0) && ((new Date().getTime() - this.startTime.getTime()) / 1000);
  }

}
