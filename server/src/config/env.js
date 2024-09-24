// Modules
import dotenv from 'dotenv'
import path from 'node:path'

// Imports
import { Log } from '#utils'
import { __dirname } from '#root'

// Variables

new Log('Starting application...', 'info')

const envFile =
  process.env.NODE_ENV === 'development' ? '.env.development.local' : '.env'

new Log(`Loading env file  |  [SOURCE]  ${envFile}`, 'info')

try {
  const result = dotenv.config({ path: path.resolve(__dirname, envFile) })

  if (result.error) {
    throw result.error
  }

  new Log(`Env file loaded  |  [SOURCE]  ${envFile}`, 'info')
} catch (error) {
  new Log(
    `Failed to load env file  |  [SOURCE]  ${envFile}  |  [REASON]  ${error.message}`,
    'error'
  )
}
