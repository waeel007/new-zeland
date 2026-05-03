import React, { useState } from 'react';
import './GiftCardPopup.css';


function GiftCardPopup({ giftCode, onClose }) {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(giftCode);
    setCopyMessage('✅ Code copied!');
    setTimeout(() => setCopyMessage(''), 2000);
  };

  return (
    <div className="giftcard-overlay">
      <div className="giftcard-modal">
        <button className="giftcard-close" onClick={onClose}>×</button>
        
        <div className="giftcard-success-icon">🎉</div>
        <h2>Transaction Approved!</h2>
        <p>Your payment has been successfully processed.</p>
        
        <div className="giftcard-code-container">
          <div className="giftcard-label">🎁 Your Spotify Gift Card Code</div>
          <div className="giftcard-code">{giftCode}</div>
          <button className="copy-btn" onClick={handleCopy}>
            📋 Copy Code
          </button>
          {copyMessage && <div className="copy-message">{copyMessage}</div>}
        </div>
        
        <p className="giftcard-instructions">
          Redeem at: <strong>spotify.com/redeem</strong>
        </p>
        
        <button className="giftcard-done-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default GiftCardPopup;