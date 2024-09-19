import database from "#db";
import { chatsModel } from "#models";

const Messages = {
  createMessage: async (chatId, senderId, body, status = "sent") => {
    const db = await database();
    return new Promise(async (resolve, reject) => {
      try {
        const chatExists = await chatsModel.getChatById(chatId);

        if (!chatExists) {
          await chatsModel.createChat({ id: chatId, is_group: false });
        }

        const messageId = `${chatId}-${Date.now()}`;

        const query = `
          INSERT INTO messages (id, chat_id, sender_id, body, status)
          VALUES (?, ?, ?, ?, ?)
        `;
        db.run(
          query,
          [messageId, chatId, senderId, body, status],
          function (err) {
            if (err) {
              return reject(err);
            }
            resolve(messageId);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },

  getMessagesByChatId: async (chatId) => {
    const db = await database();
    return new Promise(async (resolve, reject) => {
      try {
        const chatExists = await chatsModel.getChatById(chatId);

        if (!chatExists) {
          return resolve([]);
        }

        const query = `
          SELECT * FROM messages
          WHERE chat_id = ?
          ORDER BY created_at ASC
        `;
        db.all(query, [chatId], (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteMessage: async (messageId) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM messages
        WHERE id = ?
      `;
      db.run(query, [messageId], function (err) {
        if (err) {
          return reject(err);
        }
        if (this.changes === 0) {
          return reject(new Error("Message not found"));
        }
        resolve(true);
      });
    });
  },

  getMessageById: async (messageId) => {
    const db = await database();
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM messages
        WHERE id = ?
      `;
      db.get(query, [messageId], (err, row) => {
        if (err) {
          return reject(err);
        }
        if (!row) {
          return reject(new Error("Message not found"));
        }
        resolve(row);
      });
    });
  },
};

export default Messages;
