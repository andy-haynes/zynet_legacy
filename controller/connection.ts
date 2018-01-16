import { Subscription } from 'rxjs/Subscription';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import config from './config';
import { Connection } from './interfaces';
import ZynetMessage from '../src/models/ZynetMessage';


export default class ZynetConnection implements Connection {
  private socket$: WebSocketSubject;

  connect(): Subscription {
    this.socket$ = new WebSocketSubject({
      url: config.websocket.url,
      WebSocketCtor: config.websocket.ctor
    });

    return this.socket$
      .subscribe(
        (msg: ZynetMessage) => {
          console.log(msg);
        },
        (err: Error) => {
          if (this.socket$.socket === null) {
            setTimeout(() => {
              if (config.websocket.reconnectMessage) {
                console.log(config.websocket.reconnectMessage);
              }
              this.connect();
            }, config.websocket.reconnectTimeoutMS);
          } else {
            console.error(err);
          }
        },
        () => console.log('complete')
      );
  }

  send(message: ZynetMessage) {
    this.socket$.next(JSON.stringify(message));
  }
}
