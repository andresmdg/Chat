import { v4 as uuidv4 } from "uuid";
import db from "#db";

const database = await db();

async function add(name, email, password, avatarUrl) {
  const id = uuidv4();
  const query =
    "INSERT INTO users (id, name, email, password, avatar) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    database.run(query, [id, name, email, password, avatarUrl], function (err) {
      if (err) {
        return reject(err);
      }
      const newUser = { id: id, email: email };
      return resolve(newUser);
    });
  });
}

async function getByEmail(email) {
  const query = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    database.get(query, [email], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return resolve(null);
      }

      const user = {
        ...row,
        avatarUrl: row.avatar ? `${process.env.BASE_URL}${row.avatar}` : null,
      };

      return resolve(user);
    });
  });
}

async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?";
  return new Promise((resolve, reject) => {
    database.get(query, [username], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return resolve(null);
      }

      const user = {
        ...row,
        avatarUrl: row.avatar ? `${process.env.BASE_URL}${row.avatar}` : null,
      };

      return resolve(user);
    });
  });
}

async function getByID(id) {
  const query = "SELECT * FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    database.get(query, [id], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return resolve(null);
      }

      const user = {
        ...row,
        avatarUrl: row.avatar ? `${process.env.BASE_URL}${row.avatar}` : null,
      };

      return resolve(user);
    });
  });
}

async function drop(id) {
  const user = await getByID(id);
  if (!user) return Promise.reject(new Error("Usuario no encontrado"));

  const deleteQuery = "DELETE FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    database.run(deleteQuery, [id], (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

async function update(id, params) {
  const user = await getByID(id);
  if (!user) return Promise.reject(new Error("Usuario no encontrado"));

  let query = "UPDATE users SET";
  const queryParams = [];
  const keys = Object.keys(params);

  keys.forEach((key, index) => {
    query += ` ${key} = ?`;
    if (index < keys.length - 1) {
      query += ",";
    }
    queryParams.push(params[key]);
  });

  query += " WHERE id = ?";
  queryParams.push(id);

  return new Promise((resolve, reject) => {
    database.run(query, queryParams, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}

export default { getByEmail, getByUsername, getByID, add, drop, update };
