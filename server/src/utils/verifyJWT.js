// Modules
import jwt from 'jsonwebtoken'

// Imports
import { Log } from '#utils'

// Methods
const verifyJWT = async (token = '') => {
  try {
    const { SCRT } = process.env
    if (!SCRT) {
      throw new Log(
        'SCRT (secret) is not defined in environment variables.',
        'error',
        'access'
      )
    }

    const { id } = jwt.verify(token, SCRT)
    return [true, id]
  } catch (error) {
    let errorMsg

    if (error.name === 'JsonWebTokenError') {
      errorMsg = 'Invalid token'
    } else if (error.name === 'TokenExpiredError') {
      errorMsg = 'Token expired'
    } else {
      errorMsg = 'Token verification error'
    }

    new Log(
      `JWT verification failed  |  [REASON] ${errorMsg}: ${error.message}`,
      'error',
      'access'
    )

    new Log(`Token ${token}`, 'info', 'access')

    return [false, null]
  }
}

export default verifyJWT
