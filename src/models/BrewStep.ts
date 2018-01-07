import { TemperatureUnits } from '../constants';

export default class BrewStep {

  constructor(
    public index: number,
    public minutes: number,
    public temperature: number,
    public unit: TemperatureUnits
  ) { }

}
