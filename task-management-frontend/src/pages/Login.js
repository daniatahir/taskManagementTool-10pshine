import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // 1. Axios ko import karein (agar install nahi hai toh npm i axios kar lein)
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Clean luxury loader state

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 2. Apne backend URL ke hisab se port verify kar lein (e.g., 5001, 7154, ya jo bhi aapka swagger port hai)
      const response = await axios.post('https://localhost:7039/api/auth/login', {
        email: email,
        password: password
      });

      // 3. Backend se jab token response (Ok(new { token })) aayega
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // ProtectedRoute ko khush karne ke liye token save
        
        toast.success("Welcome back! Login Successful.");
        navigate('/dashboard'); // Ab click karne par kick-back nahi milega!
      }
    } catch (error) {
      console.error("Login Error details:", error);
      
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password credentials.");
      } else {
        toast.error("Server connection failed. Is your C# API running?");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chronotask-login-scope">
      <div className="login-full-page">
        <div className="abstract-blob blob-one"></div>
        <div className="abstract-blob blob-two"></div>

        <div className="login-glass-card">
          <div className="login-brand-header">
            <div className="brand-badge-dot">
              <span className="core-dot"></span>
            </div>
            <h2>AuraTask</h2>
            <p>Enter your credentials to access your workspace</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-interactive-form">
            <div className="login-field-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-login-execute" disabled={isLoading}>
              {isLoading ? "Authenticating security..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="login-card-footer">
            <p>Don't have an account? <span onClick={() => navigate('/register')} className="redirect-link">Create one free</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;