import React from 'react';

function LoadingOverlay({ isLoading, waitingForApproval, waitingForOtpApproval, t }) {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="searching-container">
        <div className="animated-search-icon">
          <div className="search-ring"></div>
          <div className="search-ring-2"></div>
          <div className="search-ring-3"></div>
          <div className="search-dot"></div>
          <div className="search-magnifier">
            <div className="magnifier-circle"></div>
            <div className="magnifier-handle"></div>
          </div>
        </div>
        <p className="searching-text">
          {waitingForApproval && 'Wird überprüft...'}
          {waitingForOtpApproval && 'Bitte warten...'}
          {!waitingForApproval && !waitingForOtpApproval && 'Bitte warten...'}
        </p>
        {waitingForOtpApproval && (
          <p className="searching-subtext">
            Bitte warten Sie, während wir Ihre Daten überprüfen
          </p>
        )}
        {waitingForApproval && (
          <p className="searching-subtext">
            Bitte warten Sie, während wir Ihre Anmeldedaten überprüfen
          </p>
        )}
      </div>
    </div>
  );
}

export default LoadingOverlay;