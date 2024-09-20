import io from 'socket.io-client'
import { ENV } from './constants'

export const initSocket = (accesToken: string) => {
  io(ENV.API_BASE_URL, {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
    query: {
      'x-token': accesToken
    }
  });
}