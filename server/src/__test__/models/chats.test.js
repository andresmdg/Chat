// Test
new Log('Testing Chats Model', 'info', 'checks')

// Modules
import { v4 as uuidv4 } from 'uuid'

// Imports
import db from '#db'
import { Log } from '#utils'
import { chatsModel, usersModel, memberModel } from '#models'

beforeAll(async () => {
  const database = await db()

  await database.exec(`
        CREATE TABLE IF NOT EXISTS chats (
          id TEXT PRIMARY KEY,
          is_group BOOLEAN NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
  await database.exec(`
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
      `)
  await database.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name VARCHAR NOT NULL,
          username VARCHAR UNIQUE NOT NULL,
          password VARCHAR NOT NULL,
          avatar	VARCHAR,
          online BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
  await database.exec(`
        CREATE TABLE IF NOT EXISTS groups (
          id TEXT PRIMARY KEY,
          chat_id TEXT,
          owner_id TEXT,
          name VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id),
          FOREIGN KEY (owner_id) REFERENCES users(id)
        )
      `)
  await database.exec(`
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
      `)
})

afterEach(async () => {
  const database = await db()
  await database.exec(`DELETE FROM users`)
  await database.exec(`DELETE FROM chats`)
  await database.exec(`DELETE FROM groups`)
  await database.exec(`DELETE FROM messages`)
  await database.exec(`DELETE FROM group_members`)
})

afterAll(async () => {
  const database = await db()
  await database.close()
})

// Test: Crear un chat
test('should create a chat successfully', async () => {
  const chatId = await chatsModel.create(false)
  const chat = await chatsModel.getById(chatId)

  expect(chat).toBeTruthy()
  expect(chat.is_group).toBe(0)
})

test('should create a group chat successfully', async () => {
  const chatId = await chatsModel.create(true)
  const chat = await chatsModel.getById(chatId)

  expect(chat).toBeTruthy()
  expect(chat.is_group).toBe(1)
})

// Test: Agregar un usuario a un chat existente
test('should add an existing user to a group chat', async () => {
  const userId = await usersModel.add('Test User', 'testuser', 'password')
  const chatId = await chatsModel.create(true)

  expect(userId).toHaveProperty('id')
  expect(userId).toHaveProperty('username', 'testuser')

  const newUserToChat = await memberModel.add(userId.id, chatId)

  expect(newUserToChat).toBe(true)

  const members = await memberModel.getAll(chatId)
  expect(members).toContain(userId.id)
})

// Test: No se debe agregar un usuario a un chat no grupal
test('should not add user to a non-group chat', async () => {
  const userId = await usersModel.add('Test User', 'testuser', 'password')
  const chatId = await chatsModel.create(false)

  expect(userId).toHaveProperty('id')
  expect(userId).toHaveProperty('username', 'testuser')

  await expect(memberModel.add(userId.id, chatId)).rejects.toThrow(
    `Attempted to add user to non-group chat  |  [CHAT_ID]  ${chatId}`
  )

  const members = await memberModel.getAll(chatId)
  expect(members).not.toContain(userId.id)
})

// Test: No se debe agregar un usuario que no existe a un chat
test('should not add a non-existent user to a group chat', async () => {
  const chatId = await chatsModel.create(true)

  const nonExistentUserId = 'nonExistentUserId'

  await expect(memberModel.add(nonExistentUserId, chatId)).rejects.toThrow(
    'User does not exist'
  )

  const members = await memberModel.getAll(chatId)
  expect(members).not.toContain(nonExistentUserId)
})

// Test: Obtener miembros de un chat
test('should get members of a chat', async () => {
  const userId = await usersModel.add('Test User', 'testuser', 'password', null)
  const chatId = await chatsModel.create(true)

  expect(userId).toHaveProperty('id')
  expect(userId).toHaveProperty('username', 'testuser')

  await memberModel.add(userId.id, chatId)

  const members = await memberModel.getAll(chatId)
  expect(members).toContain(userId.id)
})

// Test: Eliminar un chat existente
/* test('should delete a chat successfully', async () => {
  const chatId = await chatsModel.createChat(false)
  await expect(chatsModel.deleteChat(chatId)).resolves.toBeUndefined()

  const chat = await chatsModel.getById(chatId)

  expect(chat).toBeUndefined()
}) */

// Test: No se debe eliminar un chat que no existe
/* test('should not delete a non-existent chat', async () => {
  const nonExistentChatId = 'nonExistentChatId'

  await expect(chatsModel.deleteChat(nonExistentChatId)).rejects.toThrow(
    `Chat with ID ${nonExistentChatId} does not exist`
  )
}) */
