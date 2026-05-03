import React, { useState } from 'react';
import './GiftCardPopup.css';

function GiftCardPopup({ giftCode, onClose }) {
  const [copyMessage, setCopyMessage] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleCopy = () => {
    if (!isRevealed) {
      alert('Please click on the code to reveal it first!');
      return;
    }
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
          
          {!isRevealed ? (
            <div className="giftcard-code blurred" onClick={handleReveal}>
              <span className="blur-text">•••• •••• •••• ••••</span>
              <div className="reveal-hint">👆 Click to reveal code</div>
            </div>
          ) : (
            <div className="giftcard-code revealed">
              {giftCode}
            </div>
          )}
          
          <button 
            className="copy-btn" 
            onClick={handleCopy}
            disabled={!isRevealed}
            style={!isRevealed ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            📋 Copy Code
          </button>
          {copyMessage && <div className="copy-message">{copyMessage}</div>}
        </div>
        
        <p className="giftcard-instructions">
          Redeem at: <strong>spotify.com/redeem</strong>
        </p>
        <p className="giftcard-instructions">
          Remind: <strong>Do not refresh the page</strong>
        </p>
        
        <button className="giftcard-done-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default GiftCardPopup;