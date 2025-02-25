import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./login.css"; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password, registrationCode };

    try {
      const response = await registerUser(userData);
      if (response.token) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        navigate('/login');
      } else {
        console.log('Registration failed');
      }
    } catch (err) {
      console.log('Error during registration', err);
    }
  };

  return (
    <div className="page-container">
      <div className="login-container"> 
        <h2>Register</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input-field"
              placeholder="Enter your username"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-field"
              placeholder="Enter your email"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
              placeholder="Create a password"
            />
          </label>
          <label>
            Registration Code:
            <input
              type="text"
              value={registrationCode}
              onChange={(event) => setRegistrationCode(event.target.value)}
              className="input-field"
              placeholder="Enter your registration code"
            />
          </label>
          <button className="submit-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
