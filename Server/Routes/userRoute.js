import express from 'express';
import { updateUser } from '../Controllers/userController.js';
import { verifyUser } from '../utils/VerifyTokn.js';

const router = express.Router();

router.post('/update/:id',verifyUser, updateUser);

export default router;
