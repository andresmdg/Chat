import { v4 as uuidv4 } from "uuid";
import db from "#db";
import { Log } from "#utils";

// Función auxiliar para crear el objeto de usuario con la URL del avatar
function formatUser(row) {
  return {
    ...row,
    avatarUrl: row.avatar ? `${process.env.BASE_URL}${row.avatar}` : null,
  };
}

async function add(name, username, password, avatarUrl) {
  const database = await db();
  const id = uuidv4();
  const query =
    "INSERT INTO users (id, name, username, password, avatar) VALUES (?, ?, ?, ?, ?)";
  try {
    await new Promise((resolve, reject) => {
      database.run(
        query,
        [id, name, username, password, avatarUrl],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
    const newUser = { id, username };
    new Log(`User ${username} added successfully`, "info", "access");
    return newUser;
  } catch (error) {
    new Log(
      `Failed to add user ${username}: ${error.message}`,
      "error",
      "access"
    );
    throw error;
  }
}

async function getByUsername(username) {
  const database = await db();
  const query = "SELECT * FROM users WHERE username = ?";
  try {
    const row = await new Promise((resolve, reject) => {
      database.get(query, [username], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

    if (!row) {
      new Log(`User ${username} not found`, "warn", "access");
      return null;
    }

    return formatUser(row);
  } catch (error) {
    new Log(
      `Failed to get user by username ${username}: ${error.message}`,
      "error",
      "access"
    );
    throw error;
  }
}

async function getByID(id) {
  const database = await db();
  const query = "SELECT * FROM users WHERE id = ?";
  try {
    const row = await new Promise((resolve, reject) => {
      database.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

    if (!row) {
      new Log(`User with ID ${id} not found`, "warn", "access");
      return null;
    }

    return formatUser(row);
  } catch (error) {
    new Log(
      `Failed to get user by ID ${id}: ${error.message}`,
      "error",
      "access"
    );
    throw error;
  }
}

async function drop(id) {
  const database = await db();
  const user = await getByID(id);
  if (!user) throw new Error("User not found");

  const deleteQuery = "DELETE FROM users WHERE id = ?";
  try {
    await new Promise((resolve, reject) => {
      database.run(deleteQuery, [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    new Log(`User ${id} deleted successfully`, "info", "access");
    return true;
  } catch (error) {
    new Log(`Failed to delete user ${id}: ${error.message}`, "error", "access");
    throw error;
  }
}

async function update(id, params) {
  const database = await db();
  const user = await getByID(id);
  if (!user) throw new Error("User not found");

  const keys = Object.keys(params);
  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  let query = "UPDATE users SET";
  const queryParams = [];

  keys.forEach((key, index) => {
    query += ` ${key} = ?`;
    if (index < keys.length - 1) query += ",";
    queryParams.push(params[key]);
  });

  query += " WHERE id = ?";
  queryParams.push(id);

  try {
    await new Promise((resolve, reject) => {
      database.run(query, queryParams, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    new Log(`User ${id} updated successfully`, "info", "access");
    return true;
  } catch (error) {
    new Log(`Failed to update user ${id}: ${error.message}`, "error", "access");
    throw error;
  }
}

async function userOnline(id) {
  const user = await getByID(id);
  if (!user) throw new Error("User not found");

  try {
    await update(id, { online: true });
    new Log(`User ${user.username || id} is online`, "info", "access");
    return true;
  } catch (error) {
    new Log(
      `Failed to set user ${id} online: ${error.message}`,
      "error",
      "access"
    );
    throw error;
  }
}

async function userOffline(id) {
  const user = await getByID(id);
  if (!user) throw new Error("User not found");

  try {
    await update(id, { online: false });
    new Log(`User ${id} is offline`, "info", "access");
    return true;
  } catch (error) {
    new Log(
      `Failed to set user ${id} offline: ${error.message}`,
      "error",
      "access"
    );
    throw error;
  }
}

export default {
  getByUsername,
  getByID,
  add,
  drop,
  update,
  userOnline,
  userOffline,
};
