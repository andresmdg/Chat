import { AccessToken } from './accessToken'
import { checkUsername } from './checkUsername'
import { login } from './login'
import { relogin } from './relogin'
import { signup } from './signup'

export const Auth = {
  login,
  signup,
  relogin,
  checkUsername,
  AccessToken,
}