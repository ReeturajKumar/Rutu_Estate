import express from 'express';
import { createListing, deleteListing, getListing, getListings, updateListing } from '../Controllers/ListingCtrl.js'; 
import { verifyUser } from '../utils/VerifyTokn.js'; 

const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);


export default router;
