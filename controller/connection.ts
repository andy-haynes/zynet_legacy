import { Subscription } from 'rxjs/Subscription';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import config from '../core/config';
import { Connection } from './interfaces';
import ZynetMessage from '../core/models/ZynetMessage';
import { ZynetClientType, ZynetMessageType } from '../core/constants';

export default class ZynetConnection implements Connection {
  private socket$: WebSocketSubject<any>;

  connect(): Subscription {
    this.socket$ = new WebSocketSubject({
      url: config.websocket.url,
      WebSocketCtor: config.websocket.ctor
    });

    this.send(new ZynetMessage(ZynetMessageType.RegisterClient, ZynetClientType.Controller));

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

  send(message: ZynetMessage): void {
    this.socket$.next(JSON.stringify(message));
  }

  subscribe(next: (value: any) => void): Subscription {
    return this.socket$
      .subscribe(next, console.error, () => {});
  }
}
