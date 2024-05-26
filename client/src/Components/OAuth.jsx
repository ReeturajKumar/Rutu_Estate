import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      // Initialize Google Auth Provider
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with popup
      const result = await signInWithPopup(auth, provider);

      // Extract user information from the result
      const { displayName, email, photoURL } = result.user;

      // Send user data to your server for further processing
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: displayName,
          email,
          photo: photoURL,
        }),
      });

      // Parse response data
      const data = await response.json();

      // Dispatch the sign-in success action with the user data
      dispatch(signInSuccess(data));

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Could not sign in with Google:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
