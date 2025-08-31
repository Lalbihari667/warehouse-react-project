import React from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-container">
        <div className="forgot-password-card">
            <h2>Reset Password</h2>
            <p>Password reset functionality would be implemented here.</p>
            <Link to="/" className="back-to-signin">← Back to Sign In</Link>
        </div>
    </div>
  );
};

export default ForgotPasswordPage;