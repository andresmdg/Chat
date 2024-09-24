// Modules
import { fileURLToPath } from 'url'

// Imports
import '#env'
import database from '#db'
import { Log } from '#utils'

// Variables
const __filename = fileURLToPath(import.meta.url)

// Methods
async function initDatabase(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name VARCHAR NOT NULL,
          username VARCHAR UNIQUE NOT NULL,
          password VARCHAR NOT NULL,
          avatar	VARCHAR,
          online BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        err => {
          if (err) reject(err)
          new Log('Table "users" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS chats (
          id TEXT PRIMARY KEY,
          is_group BOOLEAN NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        err => {
          if (err) reject(err)
          new Log('Table "chats" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          chat_id TEXT,
          sender_id TEXT,
          body TEXT NOT NULL,
          status VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (sender_id) REFERENCES users(id)
        )
      `,
        err => {
          if (err) reject(err)
          new Log('Table "messages" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS contacts (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          contact_id TEXT,
          status VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (contact_id) REFERENCES users(id)
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "contacts" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS groups (
          id TEXT PRIMARY KEY,
          chat_id TEXT,
          owner_id TEXT,
          name VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (owner_id) REFERENCES users(id)
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "groups" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS roles (
          id TEXT PRIMARY KEY,
          name VARCHAR NOT NULL,
          description VARCHAR UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "roles" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS group_members (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          chat_id TEXT,
          role_id TEXT,
          joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (role_id) REFERENCES roles(id)
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "group_members" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS permissions (
          id TEXT PRIMARY KEY,
          name VARCHAR NOT NULL,
          description VARCHAR UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "permissions" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS role_permissions (
          role_id TEXT,
          permission_id TEXT,
          FOREIGN KEY (role_id) REFERENCES roles(id),
          FOREIGN KEY (permission_id) REFERENCES permissions(id)
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "role_permissions" created', 'info', 'initdb')
          resolve()
        }
      )
      db.run(
        `
        CREATE TABLE IF NOT EXISTS queue (
          id TEXT PRIMARY KEY,          
          chat_id TEXT,
          message_id TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (message_id) REFERENCES messages(id)
        )
      `,
        err => {
          if (err) reject(err)
          console.log('Table "queue" created', 'info', 'initdb')
          resolve()
        }
      )
    })
  })
}

if (process.argv[1] === __filename) {
  new Log('Database initialization started', 'info', 'initdb')
  const db = await database()
  initDatabase(db)
    .then(() => {
      new Log('Database initialization complete', 'info', 'initdb')
    })
    .catch(error => {
      throw new Log(
        `Error initialization database  |  [REASON]  ${error.message}`,
        'error',
        'initdb'
      )
    })
}
