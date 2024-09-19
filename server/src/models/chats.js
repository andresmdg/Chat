import database from "#db";
import { messagesModel } from "#models";

const Chats = {
  createChat: async (chatId, isGroup = false) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO chats (id, is_group) VALUES (?, ?)
      `;
      db.run(query, [chatId, isGroup], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(chatId);
      });
    });
  },

  getUserChats: async (userId) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        SELECT chat_id 
        FROM group_members
        WHERE user_id = ?
      `;
      db.all(query, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        const chatIds = rows.map((row) => row.chat_id);
        resolve(chatIds.length > 0 ? chatIds : null);
      });
    });
  },

  addUserToChat: async (userId, chatId) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO user_chats (id, user_id, chat_id)
        VALUES (?, ?, ?)
      `;
      const userChatId = `${userId}-${chatId}`;
      db.run(query, [userChatId, userId, chatId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(userChatId);
      });
    });
  },

  getChatUsers: async (chatId) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        SELECT user_id
        FROM group_members
        WHERE chat_id = ?
      `;
      db.all(query, [chatId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows.length > 0 ? rows.map((row) => row.user_id) : null);
      });
    });
  },

  removeUserFromChat: async (userId, chatId) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM group_members
        WHERE user_id = ? AND chat_id = ?
      `;
      db.run(query, [userId, chatId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes > 0 ? true : null);
      });
    });
  },

  getChatMessages: async (chatId) => {
    try {
      const messages = await messagesModel.getMessagesByChatId(chatId);
      return messages.length > 0 ? messages : null;
    } catch (err) {
      throw err;
    }
  },

  sendMessageToChat: async (chatId, senderId, body, status = "sent") => {
    try {
      const db = await database();
      const chatExists = await new Promise((resolve, reject) => {
        const query = `
          SELECT 1 FROM chats WHERE id = ?
        `;
        db.get(query, [chatId], (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row ? true : false);
        });
      });
      if (!chatExists) {
        return null;
      }
      const messageId = await messagesModel.createMessage(
        chatId,
        senderId,
        body,
        status
      );
      return messageId;
    } catch (err) {
      throw err;
    }
  },
};

export default Chats;
