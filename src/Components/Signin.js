import React, { useState } from 'react';
import '../Styles/signin.css';

const SignIn = ({ setUserDetails }) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (user.username.trim() === '' || user.password.trim() === '') {
      setMessage('Please fill all the fields');
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log("Status", response.status);
      
      if (response.ok) {

        setUserDetails(data);
        localStorage.setItem('user Data', JSON.stringify(data));

        // Clear the form and message
        setUser({ username: '', password: '' });
        setMessage('');

      } else {
        console.log('Login failed:', data.message);
        // Handle login error (show error to the user)
        setMessage(data.message);
      }
    } catch (error) {
      console.log('Login failed:', error.data.message);
      // Handle other errors
      setMessage(error.data.message);
    }
  };

  return (
    <div className="main">
      <div className="design">
        <div className="line"></div>
      </div>
      <div className="form">
        <p>Welcome back 👋</p>
        <h2 >Sign In to your account</h2>
        <form id="signUpForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Your email</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button type="submit">CONTINUE</button>
        </form>
        <div className="warning">
            {message && <p>{message}</p>}
        </div>
        <div className="forgot-password">
            Forget your password?
        </div>
      </div>
      <div className="signin-text">
        <p>Don’t have an account? <span>Sign up</span></p>
      </div>
    </div>
  );
};

export default SignIn;
