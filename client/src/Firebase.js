// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reetu-estate.firebaseapp.com",
  projectId: "reetu-estate",
  storageBucket: "reetu-estate.appspot.com",
  messagingSenderId: "407381380616",
  appId: "1:407381380616:web:98578437b6c4535ddf8bbd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Initialize Firebase
export default app;