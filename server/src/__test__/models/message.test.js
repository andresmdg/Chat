// Test
new Log('Testing Message Model\n', 'info', 'checks')

// Imports
import db from '#db'
import { Log } from '#utils'
import { messagesModel } from '#models'

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
})

afterEach(async () => {
  const database = await db()
  await database.exec(`DELETE FROM chats`)
  await database.exec(`DELETE FROM messages`)
})

afterAll(async () => {
  const database = await db()
  await database.close()
})

test('should create a message', async () => {
  let chatID = 'chatidtest'
  let senderID = 'senderidtest'

  const newMessage = await messagesModel.create(
    chatID,
    senderID,
    'test message',
    'sent'
  )

  expect(newMessage).toHaveProperty('id')
  expect(newMessage).toHaveProperty('chat_id', chatID)
  expect(newMessage).toHaveProperty('sender_id', senderID)
  expect(newMessage).toHaveProperty('body', 'test message')
  expect(newMessage).toHaveProperty('status', 'sent')
})

test('should get messages by chat id', async () => {
  let chatID = 'chatidtest'
  let senderID = 'senderidtest'
  let senderID2 = 'senderidtest2'

  await messagesModel.create(chatID, senderID, 'first message', 'sent')
  await messagesModel.create(chatID, senderID2, 'first message', 'sent')
  await messagesModel.create(chatID, senderID, 'second message', 'sent')
  await messagesModel.create(chatID, senderID2, 'second message', 'sent')

  const messages = await messagesModel.getByChatId(chatID)

  // Verificar que no sea null o undefined
  expect(messages).toBeTruthy()

  // Verificar que es un array con al menos un mensaje
  expect(Array.isArray(messages)).toBe(true)

  // Verificar que el array tiene 4 mensajes
  expect(messages.length).toBe(4)

  // Verificar que cada mensaje tiene las propiedades esperadas
  messages.forEach(message => {
    expect(message).toHaveProperty('id')
    expect(message).toHaveProperty('chat_id', chatID)
    expect(message).toHaveProperty('sender_id')
    expect(message).toHaveProperty('body')
    expect(message).toHaveProperty('status', 'sent')
    expect(message).toHaveProperty('created_at')
  })
})

test('should get a message by id', async () => {
  let chatID = 'chatidtest'
  let senderID = 'senderidtest'

  // Crear un mensaje para poder recuperarlo por su ID
  const newMessage = await messagesModel.create(
    chatID,
    senderID,
    'first message',
    'sent'
  )

  // Obtener el mensaje por su ID
  const messageById = await messagesModel.getById(newMessage.id)

  // Verificar que no sea null o undefined
  expect(messageById).toBeTruthy()

  // Verificar que el mensaje recuperado tiene las propiedades esperadas
  expect(messageById).toHaveProperty('id', newMessage.id)
  expect(messageById).toHaveProperty('chat_id', chatID)
  expect(messageById).toHaveProperty('sender_id', senderID)
  expect(messageById).toHaveProperty('body', 'first message')
  expect(messageById).toHaveProperty('status', 'sent')
  expect(messageById).toHaveProperty('created_at')
})

test('should update a message', async () => {
  let chatID = 'chatidtest'
  let senderID = 'senderidtest'

  // Crear un mensaje para poder actualizarlo
  const newMessage = await messagesModel.create(
    chatID,
    senderID,
    'original message',
    'sent'
  )

  // Datos para la actualización
  const updatedBody = 'updated message'
  const updatedStatus = 'delivered'

  // Actualizar el mensaje usando su ID
  await messagesModel.update(newMessage.id, {
    body: updatedBody,
    status: updatedStatus
  })

  // Obtener el mensaje actualizado
  const updatedMessage = await messagesModel.getById(newMessage.id)

  // Verificar que no sea null o undefined
  expect(updatedMessage).toBeTruthy()

  // Verificar que el mensaje actualizado tiene las propiedades esperadas
  expect(updatedMessage).toHaveProperty('id', newMessage.id)
  expect(updatedMessage).toHaveProperty('chat_id', chatID)
  expect(updatedMessage).toHaveProperty('sender_id', senderID)
  expect(updatedMessage).toHaveProperty('body', updatedBody)
  expect(updatedMessage).toHaveProperty('status', updatedStatus)
  expect(updatedMessage).toHaveProperty('created_at')
})

test('should delete a message', async () => {
  let chatID = 'chatidtest'
  let senderID = 'senderidtest'

  const newMessage = await messagesModel.create(
    chatID,
    senderID,
    'message to delete',
    'sent'
  )

  // Eliminar el mensaje usando su ID
  const deletionResult = await messagesModel.delete(newMessage.id)

  // Verificar que la eliminación fue exitosa
  expect(deletionResult).toBe(true)
})
