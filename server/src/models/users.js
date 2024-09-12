import db from "#db";

const database = await db();

async function add(name, email, password) {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    database.run(query, [name, email, password], function (err) {
      if (err) {
        return reject(err);
      }
      const newUser = { id: this.lastID, email: email };
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
      return resolve(row);
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
      return resolve(row);
    });
  });
}

async function drop(id) {}

async function update(id) {}

export default { getByEmail, getByID, add, drop, update };
