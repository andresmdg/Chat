// Modules
import path from 'path'
import sqlite3 from 'sqlite3'
import fs from 'node:fs/promises'

// Imports
import { Log } from '#utils'
import { __dirname } from '#root'

// Variables
let db_instance = null
const { DB_DIR } = process.env

// db dir exists
async function dirExists(dir) {
  new Log('Checking directory', 'info', 'module')
  try {
    await fs.access(dir)
    new Log('Directory exists', 'info', 'module')
  } catch (err) {
    new Log('Directory does not exist, creating...', 'warn', 'module')
    if (err.code === 'ENOENT') {
      await fs.mkdir(dir, { recursive: true })
      new Log(`Directory created: ${dir}`, 'warn', 'module')
    } else {
      new Log(`Error checking directory: ${err.message}`, 'error', 'module')
    }
  }
}

// db connection
async function db() {
  if (db_instance) return db_instance
  new Log('Making connection', 'info', 'module')

  const databaseDir =
    path.join(__dirname, DB_DIR) || path.join(__dirname, 'module')
  const databaseFile = path.join(databaseDir, 'db.sqlite')

  const databasePath = path.resolve(databaseFile)

  await dirExists(databaseDir)

  new Log('Establishing connection', 'info', 'module')

  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(databasePath, error => {
      if (error) {
        new Log(`Connection failed: ${error.message}`, 'error', 'module')
        reject(error)
      } else {
        new Log('Successful connection.', 'info', 'module')
        db_instance = database
        resolve(db_instance)
      }
    })
  })
}

export default db
