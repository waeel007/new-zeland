import React from 'react';
import './OtpVerificationForm.css';
import './LoadingOverlay.js';

function OtpVerificationForm({ otpCode, otpError, isLoading, onOtpChange, onSubmit, onBack }) {
  return (
    <div className="otp-verification-form">
      <p className="verification-message">
        Please enter the OTP code to complete the registration.
      </p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="otpCode">OTP-Code</label>
          <input
            type="text"
            id="otpCode"
            value={otpCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              onOtpChange(value);
            }}
            placeholder="000000"
            maxLength="6"
            className={otpError ? 'input-error' : ''}
            autoFocus
          />
          {otpError && (
            <span className="error-message">{otpError}</span>
          )}
        </div>

        <div className="otp-buttons">
          <button type="submit" className="verify-btn" disabled={isLoading}>
            {isLoading ? 'Wird überprüft...' : 'Confirm code'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OtpVerificationForm;