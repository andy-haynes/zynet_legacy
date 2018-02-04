import { Injectable } from '@angular/core';

import BrewConfig from '../../../../core/models/BrewConfig';
import BrewUpdate from '../../../../core/models/BrewUpdate';
import { WebsocketService } from '../websocket/websocket.service';
import ZynetMessage from '../../../../core/models/ZynetMessage';

@Injectable()
export class BrewConfigService {

  public config: BrewConfig;
  public lastUpdate: BrewUpdate;

  constructor(private websocketService: WebsocketService) {
    websocketService.socket$.subscribe(
      (msg: ZynetMessage) => {
        this.lastUpdate = <BrewUpdate>msg.data;
      },
      (err: Error) => console.error('ws.error', err),
      () => console.log('ws.complete')
    );
  }

}
