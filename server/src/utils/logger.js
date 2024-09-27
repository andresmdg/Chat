// Modules
import path from 'node:path'
import fs from 'node:fs/promises'

// Imports
import { __dirname } from '#root'

// Variables
const { NODE_ENV } = process.env

// Methods
class Logger extends Error {
  constructor(message, level = 'error', emisor = 'server') {
    super(message)
    this.emisor = emisor
    this.level = level

    Error.captureStackTrace(this, this.constructor)

    if (level === 'ERROR') {
      this.logError()
    } else {
      this.logRegister()
    }
  }

  async logRegister() {
    const logMessage = this.createLogMessage()
    await this.writeLog(logMessage)
  }

  async logError() {
    const logMessage = this.createLogMessage()
    await this.writeLog(logMessage)
    throw this
  }

  createLogMessage() {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // formato de 24 horas
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    const timestamp = new Date().toLocaleTimeString('en-US', options)

    return `[${this.emisor.toUpperCase()}] ${timestamp} |  [${this.level.toUpperCase()}]  ${
      this.message
    }\n`
  }

  async writeLog(logMessage) {
    const logDir = path.join(__dirname, 'logs')
    const logFile = NODE_ENV === 'test' ? 'test.log' : 'logs.log'
    const logFilePath = path.join(logDir, logFile)

    if (NODE_ENV === 'development' || NODE_ENV === 'test')
      console.log(`[${this.emisor.toUpperCase()}]  ${this.message}`)

    try {
      await fs.mkdir(logDir, { recursive: true })
    } catch (err) {
      console.error(`Error al crear la carpeta de logs: ${err.message}`)
    }

    try {
      await fs.access(logFilePath)
    } catch {
      await fs.writeFile(logFilePath, '', 'utf8')
    }

    try {
      await fs.appendFile(logFilePath, logMessage, 'utf8')
    } catch (err) {
      const errorLogMessage = `[${this.emisor.toUpperCase()}] :  [ERROR]  Error al escribir en el log: ${
        err.message
      }\n`
      console.error(errorLogMessage)
    }
  }
}

/* Ejemplo de uso 

 Registro de una acción
const actionLogger = new Log("Acción registrada", "INFO", "SR");

 Lanzar un error
try {
  throw new Log("Fallo en la conexión a la base de datos", "ERROR", "DB");
} catch (error) {
  console.error("Manejando el error:", error);
}
*/

export default Logger
