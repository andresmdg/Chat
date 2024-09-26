import { useState, useEffect, createContext } from 'react'
import { Auth } from '@/services/auth'
import { User } from '@/services/user'
import { User as UserType } from '@/interfaces/interfaces'

interface AuthValues {
  accessToken: string,
  user: UserType | null,
  login: (accesToken: string) => Promise<void>,
  logout: () => void,
  loading: boolean
}

const initialValues: AuthValues = {
  accessToken: '',
  user: null,
  login: async () => {},
  logout: () => {},
  loading: false
}
export const AuthContext = createContext(initialValues)

export function AuthProvider ({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true)

      const accessToken = await Auth.AccessToken.get();
      if (!accessToken) {
        logout();
        setLoading(false);
        return
      }

      const hasExpiredToken = Auth.AccessToken.hasExpired(accessToken);

      if (hasExpiredToken) {
        const [error, data] = await Auth.relogin(accessToken);

        if (error) logout();

        if (data?.token) {
          setToken(data.token);
          await Auth.AccessToken.set(data.token);
        }
      }

      await login(accessToken)

      setLoading(false)
    })()
  }, [])


  const login = async (accessToken: string) => {
    try {
      setLoading(true)
      setToken(accessToken)

      const userStorage = await User.UserStorage.get()
      if (userStorage) {
        setUser(userStorage);
        return;
      }
      const [error, userData] = await User.getMe(accessToken)

      if (userData) {
        setUser(userData);
        await User.UserStorage.set(userData)
      } else {
        throw error
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  const logout = () => {
    Auth.AccessToken.remove();
    User.UserStorage.remove();
    setUser(null)
    setToken('')
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
