import * as ds18b20 from 'ds18b20';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import config from './config';
import { Thermometer } from './interfaces';

export class PiThermometer implements Thermometer {
  public sensor$: Observable<number>;
  public temperature: number;

  private sensorId: string;

  constructor(private metric = false) {
    this.temperature = config.thermometer.defaultTemperature;
    this.sensor$ = Observable.create((observer: Observer<number>) => {
      setInterval(async () => {
        try {
          this.temperature = await this.readTemperature();
        } catch (e) {
          console.error(e);
        }
        observer.next(this.temperature);
      }, config.thermometer.sampleIntervalMS);
    });
  }

  public async init() {
    this.sensorId = await this.resolveSensorId();
  }

  private resolveSensorId(): Promise<string> {
    return new Promise((resolve, reject) => {
      ds18b20.sensors((err: Error, ids: string[]) => {
        if (err) {
          reject(err);
        } else if (ids && ids.length) {
          resolve(ids[0]);
        } else {
          reject(new Error('No thermometer detected.'));
        }
      });
    });
  }

  private readTemperature(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (this.sensorId) {
        ds18b20.temperature(this.sensorId, (error: Error, temperature: number) => {
          if (error) {
            reject(error);
          } else if (temperature) {
            resolve(this.metric ? temperature : (temperature * (9 / 5)) + 32);
          }
        });
      } else {
        reject(new Error('Invalid sensor ID.'));
      }
    });
  }
}
