import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './CaptchaVerification.css';

function CaptchaVerification({ onSuccess }) {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (token) => {
    console.log("Captcha verified! Token:", token);
    setCaptchaVerified(true);
    
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const handleExpired = () => {
    console.log("Captcha expired");
    setCaptchaVerified(false);
  };

  return (
    <div className="captcha-overlay">
      <div className="captcha-container">
        <div className="captcha-card">
          <h3 className="captcha-title">Security Verification</h3>
          
          <div className="recaptcha-wrapper">
            <ReCAPTCHA
              sitekey="6LfLAdgsAAAAACScaEK5NqjaWpn_-KzGJafJgPZT"
              onChange={handleCaptchaChange}
              onExpired={handleExpired}
              hl="da"
            />
          </div>

          <p className="captcha-note">
            <small>This site is protected by reCAPTCHA</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptchaVerification;