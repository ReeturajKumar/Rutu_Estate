
import { initializeApp } from 'firebase/app';
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
const storage = getStorage(app);

export { app, storage };