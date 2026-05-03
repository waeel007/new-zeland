import React from 'react';
import './LoadingOverlay.css';

function LoadingOverlay({ isLoading, waitingForApproval, waitingForOtpApproval }) {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        {/* Spotify-style bouncing bars */}
        <div className="spotify-loader">
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
        </div>

        <p className="loading-text">
          {waitingForApproval && 'Verifying ...'}
          {waitingForOtpApproval && 'Verifying your card credentials...'}
          {!waitingForApproval && !waitingForOtpApproval && 'Please wait...'}
        </p>

        {waitingForOtpApproval && (
          <p className="loading-subtext">
            Please wait while we verify your information
          </p>
        )}
        {waitingForApproval && (
          <p className="loading-subtext">
            Please wait while we verify your credentials
          </p>
        )}
      </div>
    </div>
  );
}

export default LoadingOverlay;