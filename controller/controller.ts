import BrewUpdate from '../src/models/BrewUpdate';
import { MockRelay, MockThermometer } from './mocks';
import { PIDController } from './pid';
import ZynetConnection from './connection';
import ZynetMessage from '../src/models/ZynetMessage';
import { ZynetMessageType } from '../src/constants';

const mockRelay = new MockRelay();
const mockThermometer = new MockThermometer(mockRelay);
const mockUpdate = new BrewUpdate(1, 1, 60, 68, 152, false, 0);

const pidController = new PIDController(1.5, 1, 0.5, 3);
pidController.setTargetTemperature(75);

const connection = new ZynetConnection();
connection.connect();

mockThermometer.sensor$.subscribe((temperature: number) => {
  connection.send(new ZynetMessage(
    ZynetMessageType.LogUpdate,
    Object.assign(mockUpdate, {
      currentTemp: temperature,
      relayOn: mockRelay.on
    })
  ));

  mockRelay.switch(temperature < mockUpdate.targetTemp);
});
