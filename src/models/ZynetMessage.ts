export enum ZynetMessageType {
  LogUpdate = 1,
  UpdateConfig
}

export class ZynetMessage {

  constructor(
    public type: ZynetMessageType,
    public data: any
  ) { }

}
