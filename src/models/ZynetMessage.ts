import { ZynetMessageType } from '../constants';

export default class ZynetMessage {

  constructor(
    public type: ZynetMessageType,
    public data: any
  ) { }

}
