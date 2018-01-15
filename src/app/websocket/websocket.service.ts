import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { w3cwebsocket } from 'websocket';
import ZynetMessage from '../../models/ZynetMessage';

@Injectable()
export class WebsocketService {

  socket$: WebSocketSubject<ZynetMessage>;

  constructor() {
    this.socket$ = new WebSocketSubject({
      url: 'ws://localhost:8081',
      WebSocketCtor: w3cwebsocket
    });
    this.socket$.subscribe();
  }
}
