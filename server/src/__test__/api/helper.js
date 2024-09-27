// Modules
import request from 'supertest'

export const createUser = async (app, userData) => {
  const response = await request(app).post('/api/auth/register').send(userData)
  return response.body
}

export const getUser = async (app, username) => {
  const response = await request(app).get(`/api/users/username/${username}`)

  return response.body
}

export const loginUser = async (app, credentials) => {
  const response = await request(app).post('/api/auth/login').send(credentials)

  return response.body
}
