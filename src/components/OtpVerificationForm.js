import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import './OtpVerificationForm.css';

function OtpVerificationForm({ otpCode, otpError, isLoading, onOtpChange, onSubmit, onBack }) {
  const { t } = useLanguage();

  // Safe translations with fallbacks
  const safeT = {
    otpMessage: "Please enter the OTP code to complete the registration.",
    otpCode: "OTP-Code",
    otpPlaceholder: "000000",
    confirmCode: "Confirm code",
    verifying: "Verifying...",
    ...t
  };

  return (
    <div className="otp-verification-form">
      <p className="verification-message">
        {safeT.otpMessage}
      </p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="otpCode">{safeT.otpCode}</label>
          <input
            type="text"
            id="otpCode"
            value={otpCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              onOtpChange(value);
            }}
            placeholder={safeT.otpPlaceholder}
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
            {isLoading ? safeT.verifying : safeT.confirmCode}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OtpVerificationForm;