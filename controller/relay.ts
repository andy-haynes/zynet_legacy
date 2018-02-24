import * as rpio from 'rpio';

import config from './config';
import { Relay } from './interfaces';


export class MechanicalRelay implements Relay {
  public on: boolean;

  constructor(private pin: number) {
    this.on = false;
    rpio.open(this.pin, rpio.OUTPUT);
  }

  switchOn(): void {
    this.toggle(true);
  }

  switchOff(): void {
    this.toggle(false);
  }

  toggle(on: boolean): void {
    rpio.write(this.pin, !on ? rpio.HIGH : rpio.LOW);
    this.on = !on;
  }
}

// in order to spread out the wear on the mechanical relays, keep
// a pointer to the current relay and only turn it on when a relay
// needs is activated
// on the next activation increment the relay pointer
export class RelayArray implements Relay  {
  private currentRelayIndex: number;
  private relays: Relay[];

  constructor(private reversed = true) {
    this.currentRelayIndex = 0;
    this.relays = config.Relay.pins.map(pin => new MechanicalRelay(pin));
  }

  public get on(): boolean {
    return this.currentRelay.on;
  }

  private get currentRelay(): Relay {
    return this.relays[this.currentRelayIndex];
  }

  switchOn(): void {
    // check that the current relay is not already switched on
    if (!this.currentRelay.on) {
      // increment the relay pointer
      this.currentRelayIndex = (this.currentRelayIndex + 1) % this.relays.length;
      // switch on the current relay
      this.currentRelay.switchOn();
    }
  }

  switchOff(): void {
    // turn off any relays that are on
    this.relays
      .filter(relay => relay.on)
      .forEach(relay => relay.switchOff());
  }

  toggle(on: boolean): void {
    if (!(on && this.reversed)) {
      this.switchOn();
    } else {
      this.switchOff();
    }
  }
}
