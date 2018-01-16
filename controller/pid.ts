import * as Controller from 'node-pid-controller';

export class PIDController {
  private PID: Controller;
  private lastCorrection: any;

  constructor(
    private k_p: number,
    private k_i: number,
    private k_d: number,
    private i_max: number
  ) {
    this.PID = new Controller({ k_p, k_i, k_d, i_max });
  }

  public get state(): boolean {
    return this.lastCorrection > 0;
  }

  setTargetTemperature(temperature: number): void {
    this.PID.setTarget(temperature);
  }

  updateTemperature(temperature: number): void {
    this.lastCorrection = this.PID.update(temperature);
  }
}
