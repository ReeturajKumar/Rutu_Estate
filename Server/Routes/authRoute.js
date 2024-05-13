import express from 'express';
import { google, signin, signup } from '../Controllers/authController.js';

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/google", google);
export default router;