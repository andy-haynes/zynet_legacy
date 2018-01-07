export default class BrewUpdate {

  constructor(
    public id: number,
    public configId: number,
    public minutes: number,
    public currentTemp: number,
    public targetTemp: number,
    public currentStep: number
  ) { }

  get deltaTemp(): number {
    return this.targetTemp - this.currentTemp;
  }

}
