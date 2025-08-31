import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';
import { getUsers, registerUser } from '../auth/users';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const existingUsers = getUsers();
    if (existingUsers.find(user => user.employeeId === employeeId)) {
      setError('An account with this Employee ID already exists.');
      return;
    }
    registerUser({ name, employeeId, dob, password });
    setSuccess('Registration successful! Redirecting to sign in...');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input type="text" id="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="signin-link">
            <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;