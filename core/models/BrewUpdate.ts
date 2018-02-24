export default class BrewUpdate {

  constructor(
    public id: number,
    public configId: number,
    public minutes: number,
    public currentTemp: number,
    public targetTemp: number,
    public relayOn: boolean,
    public currentStep: number,
    public timestamp: Date = new Date(),
  ) { }

  get deltaTemp(): number {
    return this.targetTemp - this.currentTemp;
  }

}
