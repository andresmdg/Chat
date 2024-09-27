// Imports
import database from '#db'
import { Log } from '#utils'
import { chatsModel } from '#models'
import { v4 as uuidv4 } from 'uuid' // Importamos uuid para generar IDs únicos

// Model
const Messages = {
  create: async (chatId, senderId, body, status = 'sent') => {
    const db = await database()
    try {
      const chatExists = await chatsModel.getById(chatId)

      if (!chatExists) {
        new Log(
          `Chat not found, creating chat  |  [CHAT_ID]  ${chatId}`,
          'info',
          'access'
        )
        await chatsModel.create(false, chatId)
        new Log(
          `Chat created automatically for message  |  [CHAT_ID]  ${chatId}`,
          'info',
          'access'
        )
      }

      const messageId = uuidv4()

      const query = `
        INSERT INTO messages (id, chat_id, sender_id, body, status)
        VALUES (?, ?, ?, ?, ?)
      `

      await new Promise((resolve, reject) => {
        db.run(
          query,
          [messageId, chatId, senderId, body, status],
          function (err) {
            if (err) {
              new Log(
                `Failed to create message  |  [CHAT_ID]  ${chatId}  |  [SENDER_ID]  ${senderId}  |  [REASON]  ${err.message}`,
                'error',
                'access'
              )
              return reject(err)
            }
            new Log(
              `Message created successfully  |  [MESSAGE_ID]  ${messageId}  |  [CHAT_ID]  ${chatId}  |  [SENDER_ID]  ${senderId}`,
              'info',
              'access'
            )
            resolve()
          }
        )
      })

      const newMessage = {
        id: messageId,
        chat_id: chatId,
        sender_id: senderId,
        body,
        status
      }
      return newMessage
    } catch (error) {
      new Log(
        `Error in create  |  [CHAT_ID]  ${chatId}  |  [SENDER_ID]  ${senderId}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
      throw new Log(`Error in create: ${error.message}`)
    }
  },

  getByChatId: async chatId => {
    const db = await database()
    try {
      const chatExists = await chatsModel.getById(chatId)

      if (!chatExists) {
        new Log(
          `Chat not found for retrieving messages  |  [CHAT_ID]  ${chatId}`,
          'warn',
          'access'
        )
        return null
      }

      const query = `
        SELECT * FROM messages
        WHERE chat_id = ?
        ORDER BY created_at ASC
      `

      return new Promise((resolve, reject) => {
        db.all(query, [chatId], (err, rows) => {
          if (err) {
            new Log(
              `Failed to retrieve messages  |  [CHAT_ID]  ${chatId}  |  [REASON] ${err.message}`,
              'error',
              'access'
            )
            return reject(err)
          }
          if (rows.length === 0) {
            new Log(
              `No messages found for chat  |  [CHAT_ID]  ${chatId}`,
              'warn',
              'access'
            )
          } else {
            new Log(
              `Messages retrieved successfully  |  [CHAT_ID]  ${chatId}  |  [MESSAGE_COUNT]  ${rows.length}`,
              'info',
              'access'
            )
          }
          resolve(rows || null)
        })
      })
    } catch (error) {
      new Log(
        `Error in getByChatId  |  [CHAT_ID]  ${chatId}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
      throw new Log(`Error in getByChatId  |  [REASON]  ${error.message}`)
    }
  },

  getById: async messageId => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM messages
        WHERE id = ?
      `
      db.get(query, [messageId], (err, row) => {
        if (err) {
          new Log(
            `Failed to retrieve message  |  [MESSAGE_ID]  ${messageId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        if (!row) {
          new Log(
            `Message not found  |  [MESSAGE_ID]  ${messageId}`,
            'warn',
            'access'
          )
          return reject(err)
        }
        new Log(
          `Message retrieved successfully  |  [MESSAGE_ID]  ${messageId}`,
          'info',
          'access'
        )
        resolve(row || null)
      })
    })
  },

  update: async (messageId, updates) => {
    const db = await database()
    try {
      const { body, status } = updates
      const fieldsToUpdate = []
      const valuesToUpdate = []

      // Construir los campos y valores para actualizar dinámicamente
      if (body) {
        fieldsToUpdate.push('body = ?')
        valuesToUpdate.push(body)
      }
      if (status) {
        fieldsToUpdate.push('status = ?')
        valuesToUpdate.push(status)
      }

      if (fieldsToUpdate.length === 0) {
        new Log(
          `No fields provided for update  |  [MESSAGE_ID]  ${messageId}`,
          'warn',
          'access'
        )
        return false
      }

      valuesToUpdate.push(messageId)

      const query = `
        UPDATE messages
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ?
      `

      return new Promise((resolve, reject) => {
        db.run(query, valuesToUpdate, function (err) {
          if (err) {
            new Log(
              `Failed to update message  |  [MESSAGE_ID]  ${messageId}  |  [REASON]  ${err.message}`,
              'error',
              'access'
            )
            return reject(err)
          }
          if (this.changes === 0) {
            new Log(
              `Message not found for update  |  [MESSAGE_ID]  ${messageId}`,
              'warn',
              'access'
            )
            return resolve(false)
          }
          new Log(
            `Message updated successfully  |  [MESSAGE_ID]  ${messageId}`,
            'info',
            'access'
          )
          resolve(true)
        })
      })
    } catch (error) {
      new Log(
        `Error in update  |  [MESSAGE_ID]  ${messageId}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
      throw new Log(`Error in update  |  [REASON]  ${error.message}`)
    }
  },

  delete: async messageId => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM messages
        WHERE id = ?
      `
      db.run(query, [messageId], function (err) {
        if (err) {
          new Log(
            `Failed to delete message  |  [MESSAGE_ID]  ${messageId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        if (this.changes === 0) {
          new Log(
            `Message not found for deletion  |  [MESSAGE_ID]  ${messageId}`,
            'warn',
            'access'
          )
          return resolve(false) // En lugar de rechazar, resuelve con false
        }
        new Log(
          `Message deleted successfully  |  [MESSAGE_ID]  ${messageId}`,
          'info',
          'access'
        )
        resolve(true)
      })
    })
  }
}

export default Messages
