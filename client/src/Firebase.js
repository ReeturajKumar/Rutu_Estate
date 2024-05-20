// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reetu-estate.firebaseapp.com",
  projectId: "reetu-estate",
  storageBucket: "reetu-estate.appspot.com",
  messagingSenderId: "407381380616",
  appId: "1:407381380616:web:98578437b6c4535ddf8bbd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);