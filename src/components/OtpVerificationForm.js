import React from 'react';
import './OtpVerificationForm.css';

function OtpVerificationForm({ otpCode, otpError, isLoading, onOtpChange, onSubmit, onBack }) {
  return (
    <div className="otp-verification-form">
      <h3>Zwei-Faktor-Authentifizierung</h3>
      <p className="verification-message">
        Bitte geben Sie den OTP-Code ein, um die Anmeldung abzuschließen.
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
            {isLoading ? 'Wird überprüft...' : 'Code bestätigen'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OtpVerificationForm;