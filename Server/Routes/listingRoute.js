import express from 'express';
import { createListing, deleteListing } from '../Controllers/ListingCtrl.js'; 
import { verifyUser } from '../utils/VerifyTokn.js'; 

const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing)
export default router;
