import express from 'express';
import { createListing, deleteListing, updateListing } from '../Controllers/ListingCtrl.js'; 
import { verifyUser } from '../utils/VerifyTokn.js'; 

const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);


export default router;
