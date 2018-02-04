import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { w3cwebsocket } from 'websocket';

import config from '../../../../core/config';
import ZynetMessage from '../../../../core/models/ZynetMessage';


@Injectable()
export class WebsocketService {

  socket$: WebSocketSubject<ZynetMessage>;

  constructor() {
    this.socket$ = new WebSocketSubject({
      url: config.websocket.url,
      WebSocketCtor: config.websocket.ctor
    });
    this.socket$.subscribe();
  }
}
