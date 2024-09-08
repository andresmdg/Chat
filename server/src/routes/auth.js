import express from 'express';
import authController from '../controllers/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', (req, res, next) => {
  authController.authenticate('register', (err, user, info) => {
        if (err) {
          return res.status(400).json({ success: false, message: "Error" });
        }
        if (!user) {
          return res.status(400).json({ success: false, message: info.message });
        }
        res.status(200).json({ success: true, message: 'Registration successful' });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
  authController.authenticate('login', (err, user, info) => {
      if (err) {
        return res.status(400).json({ success: false, message: "Error" });
      }
      if (!user) {
        return res.status(400).json({ success: false, message: info.message });
      }
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ success: true, token, message: info.message });
    })(req, res, next);
});

export default router;