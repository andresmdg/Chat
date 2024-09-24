// Modules
import path from 'node:path'
import fs from 'node:fs/promises'

// Imports
import { Log } from '#utils'

// Methods
async function loadEvents(uuid, client, io, baseDir) {
  const stack = [baseDir]

  while (stack.length) {
    const currentDir = stack.pop()
    const files = await fs.readdir(currentDir)

    for (const file of files) {
      const filePath = path.join(currentDir, file)
      const fileStat = await fs.lstat(filePath)

      if (fileStat.isDirectory()) {
        stack.push(filePath)
      } else if (file.endsWith('.js')) {
        const eventName = parseEventName(baseDir, filePath)
        try {
          const eventModule = await import(filePath)
          const relativePath = path.relative(baseDir, filePath)

          if (eventModule.default) {
            client.on(
              eventName,
              eventModule.default.bind(null, { eventName, client, io, uuid })
            )
            new Log(
              `Event "${eventName}" loaded  |  [SOURCE]  ${relativePath}`,
              'info',
              'socket'
            )
          } else {
            new Log(
              `${eventName} lacks a default export  |  [SOURCE]  ${relativePath}`,
              'warning',
              'socket'
            )
          }
        } catch (err) {
          new Log(
            `Failed to initialize "${eventName}"  |  [REASON]  ${err.message}`,
            'error',
            'socket'
          )
        }
      }
    }
  }
}

function parseEventName(basedir, filePath) {
  const relativePath = path.relative(basedir, filePath).replace('.js', '')
  return relativePath.split(path.sep).join(':')
}

export default loadEvents
