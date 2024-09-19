import { useState, useEffect, createContext } from 'react'
import { Auth } from '@/services/auth'

interface AuthValues {
  accessToken: string | null,
  login: (accesToken: string) => Promise<void>,
  logout: () => void,
  loading: boolean
}

const initialValues: AuthValues = {
  accessToken: null,
  login: async () => {},
  logout: () => {},
  loading: false
}
export const AuthContext = createContext(initialValues)

export function AuthProvider ({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = await Auth.AccessToken.get();
      if (!accessToken) {
        logout()
        setLoading(false)
        return
      }

      await login(accessToken)

      setLoading(false)
    })()
  }, [])


  const login = async (accessToken: string) => {
    try {
      setLoading(true)
      setToken(accessToken)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const logout = () => {
    Auth.AccessToken.remove()
    setUser(null)
    setToken(null)
    setLoading(false)
  }

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    loading
  }

  if (loading) return null
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}
