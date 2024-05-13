import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInSuccess, signInFailure} from '../../redux/userSlice';
import OAuth from '../OAuth/OAuth';


export default function Signin() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure);
        return;
      }
      dispatch(signInSuccess(data))
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 3000);
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className='signup-container'>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <h1 className='signup-title'>LOGIN ACCOUNT</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input type='email' placeholder='Enter email Here' className='signup-input' id='email' onChange={handleChange} required />
        <input type='password' placeholder='Enter password Here' className='signup-input' id='password' onChange={handleChange} required />
        <button disabled={loading} type="submit" className='signup-button'>{loading ? 'Loading..' : 'SIGN IN'} </button>
        <OAuth />
      </form>
      <div className='signup-info'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='signup-link'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
