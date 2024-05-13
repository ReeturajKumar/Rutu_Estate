import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../CSS/Signup.css';

export default function SignUp() {
  const [formData , setFormData] = useState({});
  const [error , setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Form Data:", formData);
      const res = await fetch ('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
      console.log( data); 
      document.getElementById('username').value = '';
      document.getElementById('email').value = '';document.getElementById('password').value = '';
    } catch (error) {
      setLoading(false);
      setError(data.message);
    }
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-title'>CREATE ACCOUNT</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input type='text' placeholder='Enter name Here' className='signup-input' id='username' onChange={handleChange} required />
        <input type='email' placeholder='Enter email Here' className='signup-input' id='email' onChange={handleChange} required />
        <input type='password' placeholder='Enter password Here' className='signup-input' id='password' onChange={handleChange} required />
        <button disabled ={loading} type="submit" className='signup-button'>{loading ? 'Loading..' : 'Sign up'} </button>
      </form>
      <div className='signup-info'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='signup-link'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p> }
    </div>
  );
}