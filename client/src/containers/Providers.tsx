import React from 'react'
import { ThemeContextProvider } from '../context/themeContext'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </>
  )
}

export default Providers