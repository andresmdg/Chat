import React from 'react'
import { ThemeContextProvider } from '../context/themeContext'
import { AuthProvider } from '@/context/AuthContext'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <AuthProvider>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </AuthProvider>
    </>
  )
}

export default Providers