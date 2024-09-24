// Modules
import jwt from 'jsonwebtoken'

// Imports
import { usersModel } from '#models'
import { Log, verifyJWT } from '#utils'

// Variables
const { SCRT } = process.env

if (!SCRT) {
  throw new Error('SCRT (secret) is not defined in environment variables.')
}

const renewController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      new Log(
        'Token not provided  |  [REASON] No token in request',
        'warn',
        'access'
      )
      return res.status(401).json({ success: false, message: 'Token required' })
    }

    const [valid, userId] = await verifyJWT(token)
    if (!valid || !userId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or does not contain user ID'
      })
    }

    const user = await usersModel.getByID(userId)
    if (!user) {
      new Log(
        'Token renewal failed  |  [REASON] User not found',
        'error',
        'access'
      )
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const newToken = jwt.sign({ id: user.id }, SCRT, { expiresIn: '24h' })

    return res.status(200).json({
      success: true,
      message: 'Token renewed successfully',
      token: newToken
    })
  } catch (error) {
    new Log(
      `Token renewal failed  |  [REASON] ${error.message}`,
      'error',
      'access'
    )
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

export default renewController
