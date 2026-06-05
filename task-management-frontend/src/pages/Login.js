import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/login.css'; // Iska CSS niche hai

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Yahan aap apna real login API logic laga sakti hain
    if (email && password) {
      toast.success("Login Successful!");
      navigate('/dashboard'); // Authentication ke baad dashboard par redirect
    } else {
      toast.error("Please enter valid credentials.");
    }
  };

  return (
    <div className="chronotask-login-scope">
      <div className="login-full-page">
        
        {/* Floating Background Subtle Blobs for Deep Aesthetic */}
        <div className="abstract-blob blob-one"></div>
        <div className="abstract-blob blob-two"></div>

        <div className="login-glass-card">
          {/* Logo / Brand Header */}
          <div className="login-brand-header">
            <div className="brand-badge-dot">
              <span className="core-dot"></span>
            </div>
            <h2>ChronoTask</h2>
            <p>Enter your credentials to access your workspace</p>
          </div>

          {/* Core Interactive Form */}
          <form onSubmit={handleLoginSubmit} className="login-interactive-form">
            <div className="login-field-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="login-field-group">
              <div className="label-row">
                <label>Password</label>
                <span className="forgot-link">Forgot?</span>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn-login-execute">
              Sign In to Dashboard
            </button>
          </form>

          {/* Footer Navigation Switch */}
          <div className="login-card-footer">
            <p>Don't have an account? <span onClick={() => navigate('/register')} className="redirect-link">Create one free</span></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;