import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Signup.css';

export default function SignUp() {
  return (
    <div className='signup-container'>
      <h1 className='signup-title'>CREATE ACCOUNT</h1>
      <form className='signup-form'>
        <input type='text' placeholder='Enter name Here' className='signup-input' id='username' required />
        <input type='email' placeholder='Enter email Here' className='signup-input' id='email' required />
        <input type='password' placeholder='Enter password Here' className='signup-input' id='password' required />
        <button disabled className='signup-button' >Sign up</button>
      </form>
      <div className='signup-info'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='signup-link'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
