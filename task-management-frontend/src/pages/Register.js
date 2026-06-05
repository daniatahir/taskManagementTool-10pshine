import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/register.css'; // Iska CSS niche hai

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    // Yahan aap apna real registration API logic laga sakti hain
    if (name && email && password) {
      toast.success("Registration Successful! Welcome.");
      navigate('/dashboard'); // Account create hote hi dashboard par redirect
    } else {
      toast.error("Please fill in all fields correctly.");
    }
  };

  return (
    <div className="chronotask-register-scope">
      <div className="register-full-page">
        
        {/* Floating Background Subtle Blobs for Deep Aesthetic */}
        <div className="abstract-blob blob-one"></div>
        <div className="abstract-blob blob-two"></div>

        <div className="register-glass-card">
          {/* Logo / Brand Header */}
          <div className="register-brand-header">
            <div className="brand-badge-dot">
              <span className="core-dot"></span>
            </div>
            <h2>Create Account</h2>
            <p>Join ChronoTask to structure your daily work velocity</p>
          </div>

          {/* Core Interactive Form */}
          <form onSubmit={handleRegisterSubmit} className="register-interactive-form">
            
            <div className="register-field-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="register-field-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="register-field-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <div className="register-field-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn-register-execute">
              Sign Up & Get Started
            </button>
          </form>

          {/* Footer Navigation Switch */}
          <div className="register-card-footer">
            <p>Already have an account? <span onClick={() => navigate('/login')} className="redirect-link">Sign In</span></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;