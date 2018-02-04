import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import config from './config';
import { Relay, Thermometer } from './interfaces';


export class MockRelay implements Relay {
  public on: boolean;

  constructor() {
    this.on = false;
  }

  switch(on: boolean): void { this.on = on; }
}

export class MockThermometer implements Thermometer {
  public sensor$: Observable;
  public temperature: number;

  constructor(relay: MockRelay) {
    this.temperature = config.thermometer.defaultTemperature;
    this.sensor$ = Observable.create((observer: Observer) => {
      setInterval(() => {
        this.temperature += relay.on ? 0.025625 : -0.01375;
        observer.next(this.temperature);
      }, config.thermometer.sampleIntervalMS);
    });
  }

  async init() {
    return Promise.resolve();
  }
}
