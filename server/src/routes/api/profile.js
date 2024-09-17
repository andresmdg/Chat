import express from "express";
import passport from 'passport';
import { profile } from "#controllers";
import upload from "#multer";
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    profile.myProfile(req, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Error" });
        }
        res.status(200).json({ success: true, data: user, message: "Profile data" });
    });
})

router.put('/', passport.authenticate('jwt', { session: false }), upload.single('avatar'), (req, res) => {
    profile.updateProfile(req, (err, user, info) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Error" });
        }
        res.status(200).json({ success: true, data: user, message: info.message });
    });
})

export default router;