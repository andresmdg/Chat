// Modules
import { v4 as uuidv4 } from 'uuid'

// Imports
import database from '#db'
import { Log } from '#utils'

// Model
const Chats = {
  create: async (isGroup, chatId = uuidv4()) => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO chats (id, is_group) VALUES (?, ?)
      `
      db.run(query, [chatId, isGroup], function (err) {
        if (err) {
          new Log(
            `Failed to create chat  |  [CHAT_ID] ${chatId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        new Log(
          `Chat created successfully  |  [CHAT_ID]  ${chatId}  |  [IS_GROUP]  ${isGroup}`,
          'info',
          'access'
        )
        resolve(chatId)
      })
    })
  },

  getById: async chatId => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM chats WHERE id = ?
      `
      db.get(query, [chatId], (err, row) => {
        if (err) {
          new Log(
            `Error checking chat existence  |  [CHAT_ID]  ${chatId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }

        if (row) {
          new Log(
            `Chat retrieved successfully  |  [CHAT_ID]  ${chatId}  |  [CONTENT]  ${JSON.stringify(row)}`,
            'info',
            'access'
          )
        } else {
          new Log(`Chat not found  |  [CHAT_ID]  ${chatId}`, 'warn', 'access')
        }

        resolve(row || null)
      })
    })
  },

  getUserChats: async userId => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        SELECT chat_id 
        FROM group_members
        WHERE user_id = ?
      `
      db.all(query, [userId], (err, rows) => {
        if (err) {
          new Log(
            `Failed to retrieve user chats  |  [USER_ID]  ${userId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        const chatIds = rows.map(row => row.chat_id)
        if (chatIds.length === 0) {
          new Log(
            `No chats found for user  |  [USER_ID]  ${userId}`,
            'warn',
            'access'
          )
          resolve(null)
        } else {
          new Log(
            `User chats retrieved successfully  |  [USER_ID]  ${userId}  |  [CHAT_IDS]  ${chatIds.join(', ')}`,
            'info',
            'access'
          )
          resolve(chatIds)
        }
      })
    })
  }
}

export default Chats
