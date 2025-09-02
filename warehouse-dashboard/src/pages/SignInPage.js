import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignInPage.css';
import { validateUser } from '../auth/users';

const SignInPage = ({ onLoginSuccess }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    const user = validateUser(employeeId, password);

    if (user) {
      onLoginSuccess(user);
      navigate('/dashboard');
    } else {
      setError('Invalid Employee ID or Password.');
    }
  };

  return (
    <div className="signin-page-wrapper">
      <header className="signin-header">Sign In</header>
      <div className="signin-container">
        <div className="signin-card">
          <h3>Sign In</h3>
          <form onSubmit={handleSignIn}>
            <div className="input-group">
              <label htmlFor="employeeId">Employee ID</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  id="employeeId"
                  placeholder="john12345 or admin"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="options-container">
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signin-button">Sign In</button>
          </form>
          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;