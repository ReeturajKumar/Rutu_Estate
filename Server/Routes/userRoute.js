import express from 'express';
import { deleteUser, updateUser } from '../Controllers/userController.js';
import { verifyUser } from '../utils/VerifyTokn.js';

const router = express.Router();

router.post('/update/:id',verifyUser, updateUser);
router.delete('/delete/:id',verifyUser, deleteUser);

export default router;
