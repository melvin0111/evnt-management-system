import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../loginForm/LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3004/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Here, you'd handle the login logic, such as saving the token and user info
        // You might want to save the token in localStorage or context for future requests
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); 
      } else {
        console.error("Login failed:", data.message);
        // Handle errors such as wrong credentials, user not found etc.
        // You could set an error message in your state and display it to the user
        setError(data.message ||'Invalid login credentials.' );
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors
      setError('Failed to connect to the server.');
    }
  }; 

  const handleSignUp = () => {
    console.log("Redirecting to sign up page..."); 
    navigate('/signUp'); 
  } 

  // ... rest of your component
  return (
    <div className='flex-container'>
      <form className='modal-form' onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Enter Email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter Password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input type='checkbox' id='remember-me' />
          <label htmlFor='remember-me'>Remember Me</label>
        </div> 
        {error && <div className="error-message">{error}</div>}
        <button type='submit' className='btn-primary'>
          Sign In 
        </button>
        <button type='button' className='btn-primary' onClick={handleSignUp}>
          Sign Up 
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
