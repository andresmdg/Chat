// Modules
import path from 'path';
import sqlite3 from 'sqlite3';

// Variables
const { DB_DIR } = process.env;

// db connection
async function db(basedir) {
  const databaseDir = DB_DIR || path.join(basedir, 'db/db.sqlite');
  const databasePath = path.resolve(databaseDir);

  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(databasePath, (error) => {
      if (error) {
        console.error('[DB] Connection failed: ', error.message);
        reject(error);
      } else {
        console.log('[DB] Successful connection.');
        resolve(database);
      }
    });
  });

}

export default db;