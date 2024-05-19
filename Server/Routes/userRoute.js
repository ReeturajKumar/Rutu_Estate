import express from 'express';
import { deleteUser, getUser, listingUser, updateUser } from './../Controllers/userController.js';
import { verifyUser } from '../utils/VerifyTokn.js';



const router = express.Router();

router.post('/update/:id',verifyUser, updateUser);
router.delete('/delete/:id',verifyUser, deleteUser);
router.get('/listings/:id', verifyUser, listingUser);
router.get('/:id', verifyUser, getUser);

export default router;
