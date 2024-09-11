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
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
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
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          body TEXT NOT NULL,
          status VARCHAR(50) NOT NULL,
          created_at TIMESTAMP
        )
      `,
        (err) => {
          if (err) reject(err);
          console.log('[DB] Table "messages" created or already exists');
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
