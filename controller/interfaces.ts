import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import ZynetMessage from '../core/models/ZynetMessage';

export interface Connection {
  connect(): Subscription;
  send(message: ZynetMessage): void;
}

export interface Relay {
  on: boolean;
  switchOn(): void;
  switchOff(): void;
  toggle(on: boolean): void;
}

export interface Thermometer {
  temperature: number;
  sensor$: Observable<number>;
  init(): Promise<any>;
}
