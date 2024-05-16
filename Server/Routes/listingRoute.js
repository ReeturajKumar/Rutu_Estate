import express from 'express';
import { createListing } from '../Controllers/ListingCtrl.js'; 
import { verifyUser } from '../utils/VerifyTokn.js'; 

const router = express.Router();

router.post('/create', verifyUser, createListing);
export default router;
