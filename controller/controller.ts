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

const connection = new ZynetConnection();
connection.connect();

let pidThresholdReached = false;
let config = Object.assign(new BrewConfig(1), {
  targetTemperature: 131
});

const pidController = new PIDController(1.5, 1, 0.5, 3);
pidController.setTargetTemperature(config.targetTemperature);

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
        pidThresholdReached = temperature >= (config.targetTemperature * controllerConfig.PID.strikeThreshold);
        relay.toggle(!pidThresholdReached);
      }
    }

    const update = new BrewUpdate(1, 1, 60, temperature, config.targetTemperature, relay.on, 1, new Date())
    connection.send(new ZynetMessage(ZynetMessageType.LogUpdate, update));
  });
}

connection.subscribe((message: ZynetMessage) => {
  switch (message.type) {
    case ZynetMessageType.UpdateConfig:
      config = <BrewConfig>message.data;
      pidController.setTargetTemperature(config.targetTemperature);
      break;
    default:
      // no-op
  }
});
