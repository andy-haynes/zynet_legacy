import BrewConfig from '../src/models/BrewConfig';
import BrewStep from '../src/models/BrewStep';
import BrewUpdate from '../src/models/BrewUpdate';
import controllerConfig from './config';
import { MockRelay, MockThermometer } from './mocks';
import { PIDController } from './pid';
import { TemperatureUnits, ZynetMessageType} from '../src/constants';
import ZynetConnection from './connection';
import ZynetMessage from '../src/models/ZynetMessage';

const relay = new MockRelay();
const thermometer = new MockThermometer(relay);
const mockUpdate = new BrewUpdate(1, 1, 60, 68, 152, false, 0);

const connection = new ZynetConnection();
connection.connect();

let currentStepIndex = 0;
let pidThresholdReached = false;
let config = Object.assign(new BrewConfig(1), {
  steps: [new BrewStep(0, 60, 152, TemperatureUnits.Fahrenheit)]
});

const pidController = new PIDController(1.5, 1, 0.5, 3);
pidController.setTargetTemperature(config.steps[currentStepIndex].temperature);

thermometer.sensor$.subscribe((temperature: number) => {
  if (config) {
    if (pidThresholdReached) {
      pidController.updateTemperature(temperature);
      relay.switch(pidController.state);
    } else {
      pidThresholdReached = temperature >= (currentStep.temperature * controllerConfig.PID.strikeThreshold);
      relay.switch(!pidThresholdReached);
    }
  }

  connection.send(new ZynetMessage(
    ZynetMessageType.LogUpdate,
    Object.assign(mockUpdate, {
      currentTemp: temperature,
      relayOn: relay.on
    })
  ));
});

connection.subscribe((message: ZynetMessage) => {
  switch (message.type) {
    case ZynetMessageType.UpdateConfig:
      config = <BrewConfig>message.data;
      pidController.setTargetTemperature(config.steps[currentStepIndex].temperature);
      break;
    default:
      // no-op
  }
});
