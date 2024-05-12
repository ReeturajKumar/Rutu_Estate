import express from 'express';
import { signup } from '../Controllers/authController.js';

const router = express.Router();

router.post("/register", signup);
export default router;