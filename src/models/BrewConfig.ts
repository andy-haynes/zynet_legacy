import BrewStep from './BrewStep';
import ConfigUpdate from './BrewUpdate';
import { TemperatureUnits } from '../constants';

export default class BrewConfig {

  startTime: Date;
  steps: BrewStep[];
  history: ConfigUpdate[];

  constructor(public id: number) {
    this.steps = [];
    this.history = [];
  }

  get elapsedSeconds(): number {
    return (this.startTime || 0) && ((new Date().getTime() - this.startTime.getTime()) / 1000);
  }

  addStep(
    minutes: number,
    temperature: number,
    units: TemperatureUnits = TemperatureUnits.Fahrenheit
  ): BrewStep {
    const step = new BrewStep(this.steps.length, minutes, temperature, units);
    this.steps.push(step);
    return step;
  }

  moveStepUp(index: number) {
    if (index > 0) {
      this.swapSteps(index, index - 1);
    }
  }

  moveStepDown(index: number) {
    if (index < this.steps.length) {
      this.swapSteps(index, index + 1);
    }
  }

  private swapSteps(indexA: number, indexB: number) {
    if (this.steps[indexA] && this.steps[indexB]) {
      const step = this.steps[indexA];
      this.steps[indexA] = this.steps[indexB];
      this.steps[indexB] = step;

      // reset step index values
      this.steps[indexA].index = indexA;
      this.steps[indexB].index = indexB;
    }
  }

}
