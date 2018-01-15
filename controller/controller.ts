import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { w3cwebsocket } from 'websocket';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import BrewUpdate from '../src/models/BrewUpdate';
import ZynetMessage from '../src/models/ZynetMessage';
import { ZynetMessageType } from '../src/constants';

const socket$ = new WebSocketSubject({
  url: 'ws://localhost:8081',
  WebSocketCtor: w3cwebsocket
});

(function subscribeWebsocket(): void {
  socket$
    .subscribe(
      (msg: ZynetMessage) => {
        console.log(msg);
      },
      (err: Error) => {
        // attempt reconnect if connection broken
        if (socket$.socket === null) {
          setTimeout(() => {
            console.log('attempting reconnect...');
            subscribeWebsocket();
          }, 500);
        } else {
          console.error(err);
        }
      },
      () => console.log('complete')
    );
})();

// mock temperature updates
let temp = 0;
Observable.timer(0, 750)
  .subscribe((value: number) => {
    socket$.next(JSON.stringify(new ZynetMessage(
      ZynetMessageType.LogUpdate,
      new BrewUpdate(1, 1, 60, temp++, 150, 0)
    )));
  });
