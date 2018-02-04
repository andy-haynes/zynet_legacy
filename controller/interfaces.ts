import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import ZynetMessage from '../src/models/ZynetMessage';


export interface Connection {
  connect(): Subscription;
  send(message: ZynetMessage): void;
}

export interface Relay {
  on: boolean;
  switch(on: boolean): void;
}

export interface Thermometer {
  temperature: number;
  sensor$: Observable;
  init(): Promise;
}
