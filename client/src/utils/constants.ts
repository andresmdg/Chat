import {config} from './config'

const {API_BASE_URL} = config;

export const ENV = {
  API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    RELOGIN: `${API_BASE_URL}/api/auth/renew-token`,
  },
  USER: {
    GET_USER: (id: string) => `${API_BASE_URL}/api/users/${id}`,
    GET_BY_USERNAME: (username: string) => `${API_BASE_URL}/api/users/username/${username}`,
  },
  PROFILE: `${API_BASE_URL}/api/profile`
}