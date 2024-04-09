import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signupForm/SignupForm.css';
import '../loginForm/LoginForm.css';

function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3004/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        navigate('/login');
      } else {
        console.error("Signup failed:", data.message);
        setError(data.message || 'There was an error signing up.');
      }
    } catch (error) {
      console.error("Network error:", error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className='flex-container2'>
      <form className='modal-form2' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className='form-group2'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            placeholder='Enter Username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group2'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Enter Email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group2'>
          <label htmlFor='password'>Set Password</label>
          <input
            type='password'
            placeholder='Enter Password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group2'>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            type='text'
            placeholder='Enter Phone Number'
            id='phoneNumber'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type='submit' className='btn-primary'>
          Sign Up
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignupForm;
