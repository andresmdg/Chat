// Modules
import express from 'express'
import jwt from 'jsonwebtoken'

// Imports

import upload from '#multer'
import { auth, renew } from '#controllers'

// Variables

const router = express.Router()
const { SCRT } = process.env

// Routes
router.post('/register', upload.single('avatar'), (req, res, next) => {
  auth.authenticate('register', (err, user, info) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }
    if (!user) {
      return res.status(400).json({ success: false, message: info.message })
    }
    res.status(200).json({ success: true, message: 'Registration successful' })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  auth.authenticate('login', (err, user, info) => {
    if (err) {
      return res.status(400).json({ success: false, message: 'Error' })
    }
    if (!user) {
      return res.status(400).json({ success: false, message: info.message })
    }
    const token = jwt.sign({ id: user.id }, SCRT, {
      expiresIn: '24h'
    })
    res.status(200).json({ success: true, token, message: info.message })
  })(req, res, next)
})

router.post('/renew-token', renew)

export default router
