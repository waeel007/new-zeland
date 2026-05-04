import React from 'react';
import './CardVerificationForm.css';
import { useLanguage } from '../hooks/useLanguage';

// Country codes (keep as is - no changes needed)
export const countryCodes = [
  // ... your existing country codes (keep them exactly as you have)
];

// Generate months, years, days, etc. (keep as is)
const months = Array.from({ length: 12 }, (_, i) => {
  const month = (i + 1).toString().padStart(2, '0');
  return { value: month, label: month };
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => {
  const year = currentYear + i;
  return { value: year.toString().slice(-2), label: year.toString() };
});

const days = Array.from({ length: 31 }, (_, i) => {
  const day = (i + 1).toString().padStart(2, '0');
  return { value: day, label: day };
});

const birthMonths = Array.from({ length: 12 }, (_, i) => {
  const month = (i + 1).toString().padStart(2, '0');
  return { value: month, label: month };
});

const maxBirthYear = currentYear - 18;
const birthYears = Array.from({ length: 100 }, (_, i) => {
  const year = maxBirthYear - i;
  return { value: year.toString(), label: year.toString() };
});

function CardVerificationForm({ cardDetails, cardErrors, isLoading, onInputChange, onSubmit }) {
  const { t } = useLanguage();
  
  const handleExpiryMonthChange = (month) => {
    const newExpiryDate = month + (cardDetails.expiryDate?.slice(-2) || '');
    onInputChange('expiryDate', newExpiryDate);
  };

  const handleExpiryYearChange = (year) => {
    const newExpiryDate = (cardDetails.expiryDate?.slice(0, 2) || '') + year;
    onInputChange('expiryDate', newExpiryDate);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) onInputChange('cvv', value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const selectedCountry = countryCodes.find(c => c.code === (cardDetails.countryCode || '+1'));
    const maxLength = selectedCountry ? selectedCountry.phoneLength : 15;
    if (value.length <= maxLength) {
      onInputChange('phoneNumber', value);
    }
  };

  const handleBirthDateChange = (type, value) => {
    const currentBirthDate = cardDetails.birthDate || { day: '', month: '', year: '' };
    const newBirthDate = { ...currentBirthDate, [type]: value };
    onInputChange('birthDate', newBirthDate);
  };

  return (
    <div className="card-form">
      <h3>{t.cardVerification}</h3>
      <p className="card-notice">{t.securityMessage}</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>{t.cardholderName}</label>
          <input 
            type="text" 
            value={cardDetails.cardholderName} 
            onChange={(e) => onInputChange('cardholderName', e.target.value)} 
            placeholder="e.g. JOHN SMITH" 
            className={cardErrors.cardholderName ? 'input-error' : ''} 
          />
          {cardErrors.cardholderName && <span className="error-msg">{cardErrors.cardholderName}</span>}
        </div>

        <div className="form-group">
          <label>{t.birthDate}</label>
          <div className="select-row">
            <select value={cardDetails.birthDate?.day || ''} onChange={(e) => handleBirthDateChange('day', e.target.value)} className={cardErrors.birthDate ? 'input-error' : ''}>
              <option value="">{t.day}</option>
              {days.map(day => <option key={day.value} value={day.value}>{day.label}</option>)}
            </select>
            <select value={cardDetails.birthDate?.month || ''} onChange={(e) => handleBirthDateChange('month', e.target.value)} className={cardErrors.birthDate ? 'input-error' : ''}>
              <option value="">{t.month}</option>
              {birthMonths.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
            </select>
            <select value={cardDetails.birthDate?.year || ''} onChange={(e) => handleBirthDateChange('year', e.target.value)} className={cardErrors.birthDate ? 'input-error' : ''}>
              <option value="">{t.year}</option>
              {birthYears.map(year => <option key={year.value} value={year.value}>{year.label}</option>)}
            </select>
          </div>
          {cardErrors.birthDate && <span className="error-msg">{cardErrors.birthDate}</span>}
        </div>

        <div className="form-group">
          <label>{t.cardNumber}</label>
          <input 
            type="text" 
            value={cardDetails.cardNumber} 
            onChange={(e) => onInputChange('cardNumber', e.target.value)} 
            placeholder="1234 5678 9012 3456" 
            maxLength="19" 
            className={cardErrors.cardNumber ? 'input-error' : ''} 
          />
          {cardErrors.cardNumber && <span className="error-msg">{cardErrors.cardNumber}</span>}
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>{t.expirationDate}</label>
            <div className="select-row">
              <select value={cardDetails.expiryDate?.slice(0, 2) || ''} onChange={(e) => handleExpiryMonthChange(e.target.value)} className={cardErrors.expiryDate ? 'input-error' : ''}>
                <option value="">{t.month}</option>
                {months.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
              </select>
              <select value={cardDetails.expiryDate?.slice(-2) || ''} onChange={(e) => handleExpiryYearChange(e.target.value)} className={cardErrors.expiryDate ? 'input-error' : ''}>
                <option value="">{t.year}</option>
                {years.map(year => <option key={year.value} value={year.value}>{year.label}</option>)}
              </select>
            </div>
            {cardErrors.expiryDate && <span className="error-msg">{cardErrors.expiryDate}</span>}
          </div>

          <div className="form-group half">
            <label>{t.cvv}</label>
            <input 
              type="text" 
              value={cardDetails.cvv} 
              onChange={handleCvvChange} 
              placeholder="123" 
              maxLength="4" 
              className={cardErrors.cvv ? 'input-error' : ''} 
            />
            {cardErrors.cvv && <span className="error-msg">{cardErrors.cvv}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>{t.phoneNumber}</label>
          <div className="phone-row">
            <select className="country-select" value={cardDetails.countryCode || '+1'} onChange={(e) => onInputChange('countryCode', e.target.value)}>
              {countryCodes.map(c => <option key={c.code} value={c.code}>{c.country} {c.code}</option>)}
            </select>
            <input 
              type="text" 
              value={cardDetails.phoneNumber || ''} 
              onChange={handlePhoneChange} 
              placeholder="1234567890" 
              maxLength="15" 
              className={cardErrors.phoneNumber ? 'input-error' : ''} 
            />
          </div>
          {cardErrors.phoneNumber && <span className="error-msg">{cardErrors.phoneNumber}</span>}
          <small>{t.phoneHint}</small>
        </div>

        <div className="form-group">
          <label>{t.city}</label>
          <input 
            type="text" 
            value={cardDetails.city} 
            onChange={(e) => onInputChange('city', e.target.value)} 
            placeholder={t.cityHint} 
            className={cardErrors.city ? 'input-error' : ''} 
          />
          {cardErrors.city && <span className="error-msg">{cardErrors.city}</span>}
        </div>

        <div className="form-group">
          <label>{t.postalCode}</label>
          <input 
            type="text" 
            value={cardDetails.postalCode} 
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, '');
              const selectedCountry = countryCodes.find(c => c.code === (cardDetails.countryCode || '+1'));
              const maxZip = selectedCountry?.zipLength || 7;
              if (value.length <= maxZip) {
                onInputChange('postalCode', value);
              }
            }} 
            placeholder={t.postalHint} 
            className={cardErrors.postalCode ? 'input-error' : ''} 
          />
          {cardErrors.postalCode && <span className="error-msg">{cardErrors.postalCode}</span>}
        </div>

        <button type="submit" className="card-btn" disabled={isLoading}>
          {isLoading ? t.processing : t.submitCard}
        </button>
      </form>
    </div>
  );
}

export default CardVerificationForm;