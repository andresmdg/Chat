import {config} from './config'

const {API_BASE_URL} = config;

export const ENV = {
  API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  USER: {
    GET_USER: (id: string) => `${API_BASE_URL}/api/users/${id}`,
  }
}