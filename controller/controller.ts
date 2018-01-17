import BrewUpdate from '../src/models/BrewUpdate';
import config from './config';
import { MockRelay, MockThermometer } from './mocks';
import { PIDController } from './pid';
import ZynetConnection from './connection';
import ZynetMessage from '../src/models/ZynetMessage';
import { ZynetMessageType } from '../src/constants';

const relay = new MockRelay();
const thermometer = new MockThermometer(relay);
const mockUpdate = new BrewUpdate(1, 1, 60, 68, 152, false, 0);

const connection = new ZynetConnection();
connection.connect();

let pidThresholdReached = false;
let targetTemperature = 80;

const pidController = new PIDController(1.5, 1, 0.5, 3);
pidController.setTargetTemperature(targetTemperature);

thermometer.sensor$.subscribe((temperature: number) => {
  if (pidThresholdReached) {
    pidController.updateTemperature(temperature);
    relay.switch(pidController.state);
  } else {
    pidThresholdReached = temperature >= (targetTemperature * config.PID.strikeThreshold);
    relay.switch(!pidThresholdReached);
  }

  connection.send(new ZynetMessage(
    ZynetMessageType.LogUpdate,
    Object.assign(mockUpdate, {
      currentTemp: temperature,
      relayOn: relay.on
    })
  ));
});
