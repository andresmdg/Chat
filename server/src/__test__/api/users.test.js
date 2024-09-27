// Modules
import path from 'node:path'

import db from '#db'
import app from '#app'
import { __dirname } from '#root'
import { loadRouters } from '#utils'
import { createUser, getUser, loginUser } from './helper.js'

beforeAll(async () => {
  const database = await db()
  const routeDir = path.join(__dirname, 'src/routes')

  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT,
      avatar TEXT,
      online BOOLEAN DEFAULT FALSE
    )
  `)

  await loadRouters(app, routeDir)
})

afterEach(async () => {
  const database = await db()
  await database.exec(`DELETE FROM users`)
})

afterAll(async () => {
  const database = await db()
  database.close()
})

describe('User Registration and Login', () => {
  it('should create a new user and return user data', async () => {
    const userData = {
      username: 'testuser',
      name: 'Test User',
      password: 'securepassword'
    }

    const response = await createUser(app, userData)

    // Verificar que la respuesta indica éxito
    expect(response).toHaveProperty('success', true)

    // Comprobar que el usuario se haya registrado en la base de datos
    const exists = await getUser(app, userData.username)
    expect(exists).toHaveProperty('success', true)
    expect(exists.user).toHaveProperty('username', userData.username)
  })

  it('should login with correct credentials', async () => {
    const userData = {
      username: 'testuser',
      name: 'Test User',
      password: 'securepassword'
    }

    // Crea el usuario primero
    await createUser(app, userData)

    const response = await loginUser(app, {
      username: userData.username,
      password: userData.password
    })

    // Verifica que el login sea exitoso
    expect(response).toHaveProperty('success', true)
    expect(response).toHaveProperty('token')
  })

  it('should not login with incorrect credentials', async () => {
    const response = await loginUser(app, {
      username: 'testuser',
      password: 'securepassword'
    })

    // Verifica que el login falle
    expect(response).toHaveProperty('success', false)
    expect(response).toHaveProperty('message', 'Invalid username or password')
  })
})
