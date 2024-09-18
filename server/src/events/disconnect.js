/*
  data: {
    eventName: "disconnect"
    client: Function [ref* Socket],
    io: Function [ref* ioServer]
  }
*/

export default (data) => {
  console.log("[IO] User disconnected");
};
