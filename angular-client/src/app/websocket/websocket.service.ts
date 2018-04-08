import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { w3cwebsocket } from 'websocket';

import config from '../../../../core/config';
import ZynetMessage from '../../../../core/models/ZynetMessage';
import { ZynetClientType, ZynetMessageType } from '../../../../core/constants';


@Injectable()
export class WebsocketService {

  socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject({
      url: config.websocket.url,
      WebSocketCtor: config.websocket.ctor
    });
    this.socket$.subscribe();
    this.socket$.next(JSON.stringify(new ZynetMessage(ZynetMessageType.RegisterClient, ZynetClientType.Web)));
  }

}
