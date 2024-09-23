/*
  data: {
    eventName: "disconnect"
    client: Function [ref* Socket],
    io: Function [ref* ioServer]
  }
*/

import { Log } from "#utils";

export default (data) => {
  new Log("User disconnected", "info", "socket");
};
