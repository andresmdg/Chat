// Modules

// Imports
import database from '#db'
import { Log } from '#utils'
import { chatsModel, usersModel } from '#models'

const Member = {
  add: async (userId, chatId) => {
    const db = await database()

    const chat = await chatsModel.getById(chatId)
    if (!chat) {
      return Promise.reject(
        new Log(`Chat not found  |  [CHAT_ID]  ${chatId}`, 'warn', 'access')
      )
    }

    if (!chat.is_group) {
      return Promise.reject(
        new Log(
          `Attempted to add user to non-group chat  |  [CHAT_ID]  ${chatId}`,
          'warn',
          'access'
        )
      )
    }

    const userExists = await usersModel.getByID(userId)
    if (!userExists) {
      new Log(`User not found  |  [USER_ID]  ${userId}`, 'warn', 'access')
      return Promise.reject(new Error('User does not exist'))
    }

    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO group_members (user_id, chat_id)
        VALUES (?, ?)
      `
      db.run(query, [userId, chatId], function (err) {
        if (err) {
          new Log(
            `Failed to add user to chat  |  [USER_ID]  ${userId}  |  [CHAT_ID]  ${chatId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        new Log(
          `User added to chat successfully  |  [USER_ID]  ${userId}  |  [CHAT_ID]  ${chatId}`,
          'info',
          'access'
        )
        resolve(true)
      })
    })
  },
  getAll: async chatId => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        SELECT user_id 
        FROM group_members 
        WHERE chat_id = ?
      `
      db.all(query, [chatId], (err, rows) => {
        if (err) {
          new Log(
            `Failed to retrieve chat members  |  [CHAT_ID]  ${chatId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        const memberIds = rows.map(row => row.user_id)
        new Log(
          `Chat members retrieved successfully  |  [CHAT_ID]  ${chatId}  |  [MEMBER_COUNT]  ${memberIds.length}`,
          'info',
          'access'
        )
        resolve(memberIds || null)
      })
    })
  },

  remove: async (userId, chatId) => {
    const db = await database()
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM group_members
        WHERE user_id = ? AND chat_id = ?
      `
      db.run(query, [userId, chatId], function (err) {
        if (err) {
          new Log(
            `Failed to remove user from chat  |  [USER_ID]  ${userId}  |  [CHAT_ID]  ${chatId}  |  [REASON]  ${err.message}`,
            'error',
            'access'
          )
          return reject(err)
        }
        if (this.changes === 0) {
          new Log(
            `User not found in chat for removal  |  [USER_ID]  ${userId}  |  [CHAT_ID]  ${chatId}`,
            'warn',
            'access'
          )
          return reject(new Log('User not found in chat'))
        }
        new Log(
          `User removed from chat successfully  |  [USER_ID]  ${userId}  |  [CHAT_ID] ${chatId}`,
          'info',
          'access'
        )
        resolve(true)
      })
    })
  }
}

export default Member
