import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import CaptchaVerification from './CaptchaVerification';
import './HomePage.css';
//import AntiBotTester from './AntiBotTester';


function HomePage() {
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleCaptchaSuccess = () => {
    setShowCaptcha(false);
    setShowLogin(true);
  };

  return (
    <div className="homepage-wrapper">
      <Header />
      <main className="main-content">
        <div className="login-container-wrapper">
          <div className="login-card">
            
            {showCaptcha && !showLogin && (
              <CaptchaVerification onSuccess={handleCaptchaSuccess} />
            )}
            
            {showLogin && <LoginForm />}
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Anti-Bot Tester - Floating Panel */}

    </div>
  );
}

export default HomePage;