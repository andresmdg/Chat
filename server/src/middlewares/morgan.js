// Modules
import morgan from 'morgan'

// Imports
import { Log } from '#utils'

// Variables
const controller = (tokens, req, res) => {
  const responseTime = `${tokens['response-time'](req, res)}ms`
  const method = tokens.method(req, res).toUpperCase()
  const status = tokens.status(req, res)
  const url = tokens.url(req, res)
  const contentLength = tokens.res(req, res, 'content-length') || 0
  const contentLengthKB = (contentLength / 1024).toFixed(2) // Convertir a KB

  const logMessage = `[TIME] ${responseTime}  |  [METHOD] ${method}  |  [STATUS] ${status}  |  [URI] ${url}  |  [SIZE] ${contentLengthKB}KB`

  new Log(logMessage, 'info', 'morgan')
}

// Middleware
const morganMid = () => morgan(controller)

export default morganMid
