import "dotenv/config";

import { fileURLToPath } from "url";

import database from "#db";

const __filename = fileURLToPath(import.meta.url);

// creating tables
async function initDatabase(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR NOT NULL,
          email VARCHAR UNIQUE NOT NULL,
          password VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "users" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          is_group BOOLEAN NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "chats" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chat_id INTEGER,
          sender_id INTEGER,
          body TEXT NOT NULL,
          status VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (sender_id) REFERENCES users(id)
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "messages" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          contact_id INTEGER,
          status VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (contact_id) REFERENCES contacts(id)
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "contacts" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS groups (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chat_id INTEGER,
          owner_id INTEGER,
          name VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (owner_id) REFERENCES users(id),
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "groups" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS roles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR NOT NULL,
          description VARCHAR UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "roles" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS group_members (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          chat_id INTEGER,
          role_id INTEGER,
          joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (role_id) REFERENCES roles(id)
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "group_members" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS permissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR NOT NULL,
          description VARCHAR UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "permissions" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS role_permissions (
          role_id INTEGER,
          permission_id INTEGER,
          FOREIGN KEY (role_id) REFERENCES roles(id),
          FOREIGN KEY (permission_id) REFERENCES permissions(id),
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "role_permissions" created or already exists');
          resolve();
        }
      );
      db.run(
        `
        CREATE TABLE IF NOT EXISTS queue (
          id INTEGER PRIMARY KEY AUTOINCREMENT,          
          chat_id INTEGER,
          message_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (message_id) REFERENCES messages(id)
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "queue" created or already exists');
          resolve();
        }
      );
    });
  });
}

// Si se ejecuta directamente como script (por ejemplo con npm run initdb)
if (process.argv[1] === __filename) {
  console.log("[DB] Database initialization started");
  const db = await database();
  initDatabase(db)
    .then(() => {
      console.log("[DB] Database initialization complete");
    })
    .catch((error) => {
      console.error("[DB] Error initializing database:", error.message);
    });
}
