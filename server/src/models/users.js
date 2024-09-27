// Modules
import { v4 as uuidv4 } from 'uuid'

// Imports
import db from '#db'
import { Log } from '#utils'

// Variables or definitions

function formatUser(row) {
  return {
    ...row,
    avatarUrl: row.avatar ? `${process.env.BASE_URL}${row.avatar}` : null
  }
}

// Model

const Users = {
  add: async (name, username, password, avatarUrl = null) => {
    const database = await db()
    const id = uuidv4()
    const query =
      'INSERT INTO users (id, name, username, password, avatar) VALUES (?, ?, ?, ?, ?)'
    try {
      await new Promise((resolve, reject) => {
        database.run(
          query,
          [id, name, username, password, avatarUrl],
          function (err) {
            if (err) return reject(err)
            resolve()
          }
        )
      })
      const newUser = { id, username }
      new Log(`User ${username} added successfully`, 'info', 'access')
      return newUser
    } catch (error) {
      new Log(
        `Failed to add user  |  [USERNAME]  ${username}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  },

  getByUsername: async username => {
    const database = await db()
    const query = 'SELECT * FROM users WHERE username = ?'
    try {
      const row = await new Promise((resolve, reject) => {
        database.get(query, [username], (err, row) => {
          if (err) return reject(err)
          resolve(row)
        })
      })

      if (!row) {
        new Log(`User not found  |  [USERNAME]  ${username}`, 'warn', 'access')
        return null
      }

      return formatUser(row)
    } catch (error) {
      new Log(
        `Failed to get user by username  |  [USERNAME]  ${username}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  },

  getByID: async id => {
    const database = await db()
    const query = 'SELECT * FROM users WHERE id = ?'
    try {
      const row = await new Promise((resolve, reject) => {
        database.get(query, [id], (err, row) => {
          if (err) return reject(err)
          resolve(row)
        })
      })

      if (!row) {
        new Log(`User not found  |  [ID]  ${id}`, 'warn', 'access')
        return null
      }

      return formatUser(row)
    } catch (error) {
      new Log(
        `Failed to get user  |  [ID]  ${id}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  },

  drop: async id => {
    const database = await db()
    const user = await Users.getByID(id)
    if (!user) throw new Error('User not found')

    const deleteQuery = 'DELETE FROM users WHERE id = ?'
    try {
      await new Promise((resolve, reject) => {
        database.run(deleteQuery, [id], err => {
          if (err) return reject(err)
          resolve()
        })
      })
      new Log(`User deleted successfully  |  [ID]  ${id}`, 'info', 'access')
      return true
    } catch (error) {
      new Log(
        `Failed to delete user  |  [ID]  ${id}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  },

  update: async (id, params) => {
    const database = await db()
    const user = await Users.getByID(id)
    if (!user) throw new Error('User not found')

    const keys = Object.keys(params)
    if (keys.length === 0) {
      throw new Error('No fields to update')
    }

    let query = 'UPDATE users SET'
    const queryParams = []

    keys.forEach((key, index) => {
      query += ` ${key} = ?`
      if (index < keys.length - 1) query += ','
      queryParams.push(params[key])
    })

    query += ' WHERE id = ?'
    queryParams.push(id)

    try {
      await new Promise((resolve, reject) => {
        database.run(query, queryParams, err => {
          if (err) return reject(err)
          resolve()
        })
      })
      new Log(`User updated successfully  |  [ID]  ${id}`, 'info', 'access')
      return true
    } catch (error) {
      new Log(
        `Failed to update user  |  [ID]  ${id}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  },

  userOnline: async id => {
    const user = await Users.getByID(id)
    if (!user) throw new Error('User not found')

    if (user.online) {
      new Log(
        `User already online  |  [USERNAME]  ${user.username}`,
        'info',
        'access'
      )
      return 0 // No se realiza ningún cambio si ya está online
    }

    try {
      await Users.update(id, { online: true })
      new Log(
        `User is now online  |  [USERNAME]  ${user.username}`,
        'info',
        'access'
      )
      return 1 // Retorna 1 si se actualizó el estado a online
    } catch (error) {
      new Log(
        `Failed to set user online  |  [ID]  ${id}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  },

  userOffline: async id => {
    const user = await Users.getByID(id)
    if (!user) throw new Error('User not found')

    if (!user.online) {
      new Log(
        `User already offline  |  [USERNAME]  ${user.username}`,
        'info',
        'access'
      )
      return 0 // No se realiza ningún cambio si ya está offline
    }

    try {
      await Users.update(id, { online: false })
      new Log(
        `User is now offline  |  [USERNAME]  ${user.username}`,
        'info',
        'access'
      )
      return 1 // Retorna 1 si se actualizó el estado a offline
    } catch (error) {
      new Log(
        `Failed to set user offline  |  [ID]  ${id}  |  [REASON]  ${error.message}`,
        'error',
        'access'
      )
    }
  }
}

export default Users
