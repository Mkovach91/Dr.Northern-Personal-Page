import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./login.css"


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { username, password };

    try {
      const response = await loginUser(credentials);
      if (response.token) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        navigate('/account');
      } else {
        console.log('Login failed');
      }
    } catch (err) {
      console.log('Error during login', err);
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2>Login</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            <b>Username:</b>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input-field"
            />
          </label>
          <label>
            <b>Password:</b>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
            />
          </label>
          <button className="submit-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

