import BrewConfig from '../core/models/BrewConfig';
import BrewStep from '../core/models/BrewStep';
import BrewUpdate from '../core/models/BrewUpdate';
import controllerConfig from './config';
import { PIDController } from './pid';
import { PiThermometer } from './thermometer';
import { MechanicalRelay } from './relay';
import { TemperatureUnits, ZynetMessageType} from '../core/constants';
import ZynetConnection from './connection';
import ZynetMessage from '../core/models/ZynetMessage';

const relay = new MechanicalRelay(controllerConfig.Relay.pins[0]);
const thermometer = new PiThermometer();
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

(async () => {
  await thermometer.init();
  subscribeThermometer();
})();

function subscribeThermometer() {
  thermometer.sensor$.subscribe((temperature: number) => {
    if (config) {
      if (pidThresholdReached) {
        pidController.updateTemperature(temperature);
        relay.toggle(pidController.state);
      } else {
        pidThresholdReached = temperature >= (config.steps[currentStepIndex].temperature * controllerConfig.PID.strikeThreshold);
        relay.toggle(!pidThresholdReached);
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
}

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
