import BrewUpdate from '../src/models/BrewUpdate';
import config from './config';
import { MockRelay, MockThermometer } from './mocks';
import { PIDController } from './pid';
import ZynetConnection from './connection';
import ZynetMessage from '../src/models/ZynetMessage';
import { ZynetMessageType } from '../src/constants';

const mockRelay = new MockRelay();
const mockThermometer = new MockThermometer(mockRelay);
const mockUpdate = new BrewUpdate(1, 1, 60, 68, 152, false, 0);

const connection = new ZynetConnection();
connection.connect();

let pidThresholdReached = false;
let targetTemperature = 80;

const pidController = new PIDController(1.5, 1, 0.5, 3);
pidController.setTargetTemperature(targetTemperature);

mockThermometer.sensor$.subscribe((temperature: number) => {
  if (pidThresholdReached) {
    pidController.updateTemperature(temperature);
    mockRelay.switch(pidController.state);
  } else {
    pidThresholdReached = temperature >= (targetTemperature * config.PID.strikeThreshold);
    mockRelay.switch(!pidThresholdReached);
  }

  connection.send(new ZynetMessage(
    ZynetMessageType.LogUpdate,
    Object.assign(mockUpdate, {
      currentTemp: temperature,
      relayOn: mockRelay.on
    })
  ));
});
