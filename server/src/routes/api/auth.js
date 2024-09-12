import express from "express";
import { auth } from "#controllers";
import jwt from "jsonwebtoken";
import multer from 'multer';

const router = express.Router();

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/register", upload.single('avatar'), (req, res, next) => {
  auth.authenticate("register", (err, user, info) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!user) {
      return res.status(400).json({ success: false, message: info.message });
    }
    res.status(200).json({ success: true, message: "Registration successful" });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  auth.authenticate("login", (err, user, info) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Error" });
    }
    if (!user) {
      return res.status(400).json({ success: false, message: info.message });
    }
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, token, message: info.message });
  })(req, res, next);
});

export default router;
