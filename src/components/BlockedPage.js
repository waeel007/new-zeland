// src/components/BlockedPage.js
import React, { useEffect } from 'react';
import './BlockedPage.css';

function BlockedPage() {
  useEffect(() => {
    // Mark that we're on the blocked page
    sessionStorage.setItem('on_blocked_page', 'true');
    
    return () => {
      // Clean up when leaving
      sessionStorage.removeItem('on_blocked_page');
    };
  }, []);

  const handleBack = () => {
    // Clear all blocked-related flags
    sessionStorage.removeItem('blocked_ip');
    sessionStorage.removeItem('ip_checked');
    sessionStorage.removeItem('on_blocked_page');
    sessionStorage.removeItem('block_reason');
    window.location.href = '/#/';
  };

  return (
    <div className="blocked-container">
      <div className="blocked-content">
        <div className="blocked-icon">🚫</div>
        <h1>Access Denied</h1>
        <p>Your IP address has been blocked.</p>
        <p>Please contact support if you believe this is an error.</p>
        <hr />
        <p className="error-code">Error 403 - Forbidden</p>
        <button onClick={handleBack} className="back-btn">
          ← Go Back
        </button>
      </div>
    </div>
  );
}

export default BlockedPage;