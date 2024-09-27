// Test
new Log('Testing User Model\n', 'info', 'checks')

// Imports
import db from '#db'
import { Log } from '#utils'
import { usersModel } from '#models'

beforeAll(async () => {
  const database = await db()
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
})

afterEach(async () => {
  const database = await db()
  await database.exec(`DELETE FROM users`)
})

afterAll(async () => {
  const database = await db()
  await database.close()
})

test('should add a user', async () => {
  const user = await usersModel.add('John Doe', 'johndoe', 'password', null)
  expect(user).toHaveProperty('id')
  expect(user).toHaveProperty('username', 'johndoe')
  new Log(`User ${user.username} added successfully`, 'info', 'checks')
})

test('should get user by username', async () => {
  await usersModel.add('Jane Doe', 'janedoe', 'password', null)
  const user = await usersModel.getByUsername('janedoe')
  expect(user).toHaveProperty('username', 'janedoe')
  new Log(`User ${user.username} retrieved successfully`, 'info', 'checks')
})

test('should get user by ID', async () => {
  const newUser = await usersModel.add(
    'Alice Smith',
    'alicesmith',
    'password',
    null
  )
  const user = await usersModel.getByID(newUser.id)
  expect(user).toHaveProperty('id', newUser.id)
  new Log(
    `User ${user.username} retrieved successfully by ID`,
    'info',
    'checks'
  )
})

test('should delete a user', async () => {
  const user = await usersModel.add('Bob Brown', 'bobbrown', 'password', null)
  const deleted = await usersModel.drop(user.id)
  expect(deleted).toBe(true)
  new Log(`User ${user.username} deleted successfully`, 'info', 'checks')
})

test('should update a user', async () => {
  const user = await usersModel.add(
    'Charlie Green',
    'charliegreen',
    'password',
    null
  )
  const updated = await usersModel.update(user.id, { name: 'Charlie Updated' })

  expect(updated.name).toBe('Charlie Updated')
  new Log(`User ${user.id} updated successfully`, 'info', 'checks')
})

test('should set user online', async () => {
  const user = await usersModel.add('Dave White', 'davewhite', 'password', null)
  const onlineResult = await usersModel.userOnline(user.id)
  expect(onlineResult).toBe(1)

  const updatedUser = await usersModel.getByID(user.id)
  expect(updatedUser.online).toBe(1)
  new Log(`User ${user.username} is now online`, 'info', 'checks')

  const onlineAgainResult = await usersModel.userOnline(user.id)
  expect(onlineAgainResult).toBe(0)
})

test('should set user offline', async () => {
  const user = await usersModel.add('Eve Black', 'eveblack', 'password', null)
  await usersModel.userOnline(user.id)
  const offlineResult = await usersModel.userOffline(user.id)
  expect(offlineResult).toBe(1)

  const updatedUser = await usersModel.getByID(user.id)
  expect(updatedUser.online).toBe(0)
  new Log(`User ${user.username} is now offline`, 'info', 'checks')

  const offlineAgainResult = await usersModel.userOffline(user.id)
  expect(offlineAgainResult).toBe(0)
})
