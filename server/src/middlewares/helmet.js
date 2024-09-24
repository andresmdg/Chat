// Modules
import helmet from 'helmet'

// Variables
const { CLI_PORT } = process.env

// Middleware
const helmetMid = () =>
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'https://cdn.socket.io',
          'https://cdn.jsdelivr.net/',
          "'unsafe-inline'"
        ],
        connectSrc: [
          "'self'",
          `ws://127.0.0.1:${CLI_PORT}`,
          `wss://127.0.0.1:${CLI_PORT}`,
          `ws://localhost:${CLI_PORT}`,
          `wss://localhost:${CLI_PORT}`,
          `http://127.0.0.1:${CLI_PORT}`,
          `https://127.0.0.1:${CLI_PORT}`,
          `http://localhost:${CLI_PORT}`,
          `https://localhost:${CLI_PORT}`
        ]
      }
    }
  })

export default helmetMid
