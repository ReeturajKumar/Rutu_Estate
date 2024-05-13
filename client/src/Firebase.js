// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rutu-estate.firebaseapp.com",
  projectId: "rutu-estate",
  storageBucket: "rutu-estate.appspot.com",
  messagingSenderId: "910001588855",
  appId: "1:910001588855:web:54a32236b9591648a8d472"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);