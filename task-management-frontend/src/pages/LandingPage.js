import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="chronotask-landing-scope">
      <div className="landing-canvas">
        
        {/* --- PREMIUM FIXED HEADER --- */}
        <header className="landing-header">
          <div className="landing-brand">
            <div className="brand-dot-matrix">
              <span className="dot active-indigo"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="brand-text">AuraTask</span>
          </div>
          
          <nav className="landing-nav">
            <a href="#features">Features</a>
            <a href="#solutions">Solutions</a>
            <a href="#resources">Resources</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="landing-auth-group">
            {/* Click karne par proper router login page par le jayega */}
            <button className="btn-text-auth" onClick={() => navigate('/login')}>Sign in</button>
          </div>
        </header>

        {/* --- HERO AREA LAYER --- */}
        <main className="landing-hero-section">
          
          {/* Futuristic Glass Core Emblem */}
          <div className="central-emblem-wrapper glass-lux">
            <div className="emblem-matrix">
              <div className="emb-dot indigo-glow"></div>
              <div className="emb-dot"></div>
              <div className="emb-dot"></div>
              <div className="emb-dot"></div>
            </div>
          </div>

          {/* Core Typography Heading */}
          <h1 className="hero-main-title">
            Think, orchestrate, & track <br />
            <span className="text-gradient-accent">without the friction.</span>
          </h1>
          
          <p className="hero-sub-text">
            A beautifully responsive ecosystem crafted to structure your daily work velocity.
          </p>

          {/* ==========================================================================
             TWISTED FLOATING ASSETS ENGINE (ISOLATED VISUAL CARDS)
             ========================================================================== */}
          
          {/* Top-Left Element Block */}
          <div className="float-card top-left-sticky">
            <div className="warm-sticky-note asymmetric-curve">
              <div className="pin-dot"></div>
              <p>Capture thoughts instantly. Layer details dynamically and execute complex subtasks flawlessly.</p>
            </div>
            <div className="floating-check-box neon-shadow">
              <div className="check-icon-bg dark-accent">✓</div>
            </div>
          </div>

          {/* Top-Right Element Block */}
          <div className="float-card top-right-reminders">
            <div className="reminder-widget premium-glass shadow-deep">
              <h6>Upcoming Agenda</h6>
              <div className="meeting-alert variant-gold">
                <span className="alert-lbl">Sync Session</span>
                <p className="meet-title">Product Review</p>
                <span className="meet-desc">Architecture assessment team</span>
                <div className="time-badge">🕒 14:15 - 15:00</div>
              </div>
            </div>
            <div className="floating-stopwatch custom-glow">⚡</div>
          </div>

          {/* Bottom-Left Element Block */}
          <div className="float-card bottom-left-tasks">
            <div className="tasks-widget elegant-border">
              <h6>Current Sprint</h6>
              
              <div className="task-track-row">
                <div className="task-info">
                  <span className="bullet-num royal-blue">A</span>
                  <p>Refactoring Core Engine</p>
                </div>
                <div className="progress-bar-container">
                  <div className="bar-fill indigo-fill" style={{ width: '75%' }}></div>
                  <span className="perc">75%</span>
                </div>
              </div>

              <div className="task-track-row">
                <div className="task-info">
                  <span className="bullet-num bright-pink">B</span>
                  <p>Deploying SaaS Matrix</p>
                </div>
                <div className="progress-bar-container">
                  <div className="bar-fill gradient-rose-fill" style={{ width: '100%' }}></div>
                  <span className="perc alert-pulse">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-Right Element Block */}
          <div className="float-card bottom-right-integrations">
            <div className="integrations-widget">
              <h6>Connected Channels</h6>
              <div className="brand-icons-row">
                <div className="app-icon-box box-shadow-soft">💼</div>
                <div className="app-icon-box box-shadow-soft">🚀</div>
                <div className="app-icon-box box-shadow-soft">📡</div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default LandingPage;