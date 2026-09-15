import React, { useState } from 'react';
import LoginForm from './LoginForm';
import CaptchaVerification from './CaptchaVerification';
import './HomePage.css';

function HomePage() {
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleCaptchaSuccess = () => {
    setShowCaptcha(false);
    setShowLogin(true);
  };

  return (
    <div className="nzta-page-full">
      {showCaptcha && !showLogin && (
        <CaptchaVerification onSuccess={handleCaptchaSuccess} />
      )}
      {showLogin && <LoginForm />}
    </div>
  );
}

export default HomePage;