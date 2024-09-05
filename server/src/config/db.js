import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseDir = process.env.DATABASEDIR || path.join(__dirname, '../../db.sqlite');
const databasePath = path.resolve(databaseDir);

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened');
  }
});

export default db;