import React from 'react'
import { ThemeContextProvider } from '../context/themeContext'
import { AuthProvider } from '@/context/AuthContext'
import { SocketProvider } from '@/context/SockeContext'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <AuthProvider>
        <SocketProvider>
          <ThemeContextProvider>
            {children}
          </ThemeContextProvider>
        </SocketProvider>
      </AuthProvider>
    </>
  )
}

export default Providers