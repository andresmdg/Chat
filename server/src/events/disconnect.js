/*
  data: {
    eventName: "disconnect"
    client: Function [ref* Socket],
    io: Function [ref* ioServer]
    uuid: uuid
  }
*/

import { Log } from '#utils'
import { usersModel } from '#models'

export default data => {
  usersModel.userOffline(data.uuid)
  console.log(data.uuid)
  new Log('User disconnected', 'info', 'socket')
}
