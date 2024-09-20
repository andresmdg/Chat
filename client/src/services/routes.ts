import {config} from './config'

const {API_BASE_URL} = config;

export const ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  }
}