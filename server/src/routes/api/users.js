// Modules
import { Router } from 'express'

// Imports
import { usersModel } from '#models'

// Variables
const router = Router()

// Routes
/* router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params
    const user = await usersModel.getByEmail(email)
    if (user) {
      res.status(200).json({ success: true, user })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}) */

router.get('/username/:username', async (req, res) => {
  try {
    const { username } = req.params

    const user = await usersModel.getByUsername(username)
    if (user) {
      res.status(200).json({ success: true, user })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await usersModel.getByID(id)
    if (user) {
      res.status(200).json({ success: true, user })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await usersModel.drop(id)
    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const params = req.body
    await usersModel.update(id, params)
    res
      .status(200)
      .json({ success: true, message: 'User updated successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

export default router
