import {createContext, useEffect, useState} from "react";
import { LocalStorage } from "../utils/localStorage";

export interface ThemeContetxValue {
  white: boolean
  changeTheme: () => void
}

const initialValue: ThemeContetxValue = {
  white: false,
  changeTheme: (): void => { throw new Error("Function not implemented.") },
}

export const ThemeContext = createContext<ThemeContetxValue>(initialValue);


export const ThemeContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [white, setWhite] = useState(false);

  const changeTheme = () => {
    setWhite(!white);
    LocalStorage.setItem("white", !white)
  }

  useEffect(() => {
    const storage = LocalStorage.getItem("white");
    if (storage) {
      setWhite(storage);
    }
  }, []);

  const value = {
    white,
    changeTheme
  }
  return (
    <ThemeContext.Provider value={value as ThemeContetxValue}>
      {children}
    </ThemeContext.Provider>
  )
}