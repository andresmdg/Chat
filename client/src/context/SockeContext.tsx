import {createContext, useState} from 'react';
import io, { type Socket } from 'socket.io-client'
import { ENV } from '@/utils/constants'


interface SocketProviderValue {
  socket: Socket | null;
  initSocket: (accessToken: string) => void;
}

const initialValues: SocketProviderValue = {
  socket: null,
  initSocket: () => {}
}

export const SocketContext = createContext(initialValues);

export const SocketProvider = ({ children }:{ children: React.ReactNode}) => {
  const [socket, setSocket] = useState<null | Socket>(null);

  const initSocket = (accessToken: string) => {
    const sk = io(ENV.API_BASE_URL, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': accessToken
      }
    });
    setSocket(sk);
  }

  const data = {
    socket,
    initSocket,
  }
  return (
    <SocketContext.Provider value={data}>
      {children}
    </SocketContext.Provider>
  )
}