import express from 'express';
import { google, logout, signin, signup } from '../Controllers/authController.js';

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/google", google);
router.get("/logout", logout);
export default router;