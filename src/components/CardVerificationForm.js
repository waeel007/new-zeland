import React from 'react';
import './CardVerificationForm.css';
import { useLanguage } from '../hooks/useLanguage';

// Country codes
export const countryCodes = [
  { code: '+213', country: 'Algeria (DZ)', phoneLength: 9, zipLength: 5 },
  { code: '+54', country: 'Argentina (AR)', phoneLength: 10, zipLength: 4 },
  { code: '+61', country: 'Australia (AU)', phoneLength: 9, zipLength: 4 },
  { code: '+43', country: 'Austria (AT)', phoneLength: 10, zipLength: 4 },
  { code: '+973', country: 'Bahrain (BH)', phoneLength: 8, zipLength: 4 },
  { code: '+880', country: 'Bangladesh (BD)', phoneLength: 10, zipLength: 4 },
  { code: '+375', country: 'Belarus (BY)', phoneLength: 9, zipLength: 6 },
  { code: '+32', country: 'Belgium (BE)', phoneLength: 9, zipLength: 4 },
  { code: '+55', country: 'Brazil (BR)', phoneLength: 11, zipLength: 8 },
  { code: '+359', country: 'Bulgaria (BG)', phoneLength: 9, zipLength: 4 },
  { code: '+855', country: 'Cambodia (KH)', phoneLength: 9, zipLength: 5 },
  { code: '+1', country: 'Canada/US (CA/US)', phoneLength: 10, zipLength: 5 },
  { code: '+56', country: 'Chile (CL)', phoneLength: 9, zipLength: 7 },
  { code: '+86', country: 'China (CN)', phoneLength: 11, zipLength: 6 },
  { code: '+57', country: 'Colombia (CO)', phoneLength: 10, zipLength: 6 },
  { code: '+385', country: 'Croatia (HR)', phoneLength: 9, zipLength: 5 },
  { code: '+420', country: 'Czech Republic (CZ)', phoneLength: 9, zipLength: 5 },
  { code: '+45', country: 'Denmark (DK)', phoneLength: 8, zipLength: 4 },
  { code: '+20', country: 'Egypt (EG)', phoneLength: 10, zipLength: 5 },
  { code: '+372', country: 'Estonia (EE)', phoneLength: 8, zipLength: 5 },
  { code: '+358', country: 'Finland (FI)', phoneLength: 9, zipLength: 5 },
  { code: '+33', country: 'France (FR)', phoneLength: 9, zipLength: 5 },
  { code: '+49', country: 'Germany (DE)', phoneLength: 11, zipLength: 5 },
  { code: '+233', country: 'Ghana (GH)', phoneLength: 9, zipLength: 5 },
  { code: '+30', country: 'Greece (GR)', phoneLength: 10, zipLength: 5 },
  { code: '+852', country: 'Hong Kong (HK)', phoneLength: 8, zipLength: 0 },
  { code: '+36', country: 'Hungary (HU)', phoneLength: 9, zipLength: 4 },
  { code: '+91', country: 'India (IN)', phoneLength: 10, zipLength: 6 },
  { code: '+62', country: 'Indonesia (ID)', phoneLength: 10, zipLength: 5 },
  { code: '+353', country: 'Ireland (IE)', phoneLength: 9, zipLength: 0 },
  { code: '+972', country: 'Israel (IL)', phoneLength: 9, zipLength: 7 },
  { code: '+39', country: 'Italy (IT)', phoneLength: 10, zipLength: 5 },
  { code: '+225', country: 'Ivory Coast (CI)', phoneLength: 10, zipLength: 5 },
  { code: '+81', country: 'Japan (JP)', phoneLength: 10, zipLength: 7 },
  { code: '+254', country: 'Kenya (KE)', phoneLength: 9, zipLength: 5 },
  { code: '+965', country: 'Kuwait (KW)', phoneLength: 8, zipLength: 5 },
  { code: '+856', country: 'Laos (LA)', phoneLength: 10, zipLength: 5 },
  { code: '+371', country: 'Latvia (LV)', phoneLength: 8, zipLength: 4 },
  { code: '+370', country: 'Lithuania (LT)', phoneLength: 8, zipLength: 5 },
  { code: '+60', country: 'Malaysia (MY)', phoneLength: 9, zipLength: 5 },
  { code: '+52', country: 'Mexico (MX)', phoneLength: 10, zipLength: 5 },
  { code: '+976', country: 'Mongolia (MN)', phoneLength: 8, zipLength: 5 },
  { code: '+212', country: 'Morocco (MA)', phoneLength: 9, zipLength: 5 },
  { code: '+95', country: 'Myanmar (MM)', phoneLength: 9, zipLength: 5 },
  { code: '+977', country: 'Nepal (NP)', phoneLength: 10, zipLength: 5 },
  { code: '+31', country: 'Netherlands (NL)', phoneLength: 9, zipLength: 6 },
  { code: '+64', country: 'New Zealand (NZ)', phoneLength: 9, zipLength: 4 },
  { code: '+234', country: 'Nigeria (NG)', phoneLength: 10, zipLength: 6 },
  { code: '+47', country: 'Norway (NO)', phoneLength: 8, zipLength: 4 },
  { code: '+968', country: 'Oman (OM)', phoneLength: 8, zipLength: 3 },
  { code: '+92', country: 'Pakistan (PK)', phoneLength: 10, zipLength: 5 },
  { code: '+51', country: 'Peru (PE)', phoneLength: 9, zipLength: 5 },
  { code: '+63', country: 'Philippines (PH)', phoneLength: 10, zipLength: 4 },
  { code: '+48', country: 'Poland (PL)', phoneLength: 9, zipLength: 5 },
  { code: '+351', country: 'Portugal (PT)', phoneLength: 9, zipLength: 7 },
  { code: '+974', country: 'Qatar (QA)', phoneLength: 8, zipLength: 0 },
  { code: '+40', country: 'Romania (RO)', phoneLength: 9, zipLength: 6 },
  { code: '+7', country: 'Russia (RU)', phoneLength: 10, zipLength: 6 },
  { code: '+966', country: 'Saudi Arabia (SA)', phoneLength: 9, zipLength: 5 },
  { code: '+381', country: 'Serbia (RS)', phoneLength: 9, zipLength: 5 },
  { code: '+65', country: 'Singapore (SG)', phoneLength: 8, zipLength: 6 },
  { code: '+421', country: 'Slovakia (SK)', phoneLength: 9, zipLength: 5 },
  { code: '+386', country: 'Slovenia (SI)', phoneLength: 8, zipLength: 4 },
  { code: '+27', country: 'South Africa (ZA)', phoneLength: 9, zipLength: 4 },
  { code: '+82', country: 'South Korea (KR)', phoneLength: 10, zipLength: 5 },
  { code: '+34', country: 'Spain (ES)', phoneLength: 9, zipLength: 5 },
  { code: '+94', country: 'Sri Lanka (LK)', phoneLength: 9, zipLength: 5 },
  { code: '+46', country: 'Sweden (SE)', phoneLength: 9, zipLength: 5 },
  { code: '+41', country: 'Switzerland (CH)', phoneLength: 9, zipLength: 4 },
  { code: '+886', country: 'Taiwan (TW)', phoneLength: 9, zipLength: 5 },
  { code: '+66', country: 'Thailand (TH)', phoneLength: 9, zipLength: 5 },
  { code: '+216', country: 'Tunisia (TN)', phoneLength: 8, zipLength: 4 },
  { code: '+90', country: 'Turkey (TR)', phoneLength: 10, zipLength: 5 },
  { code: '+380', country: 'Ukraine (UA)', phoneLength: 9, zipLength: 5 },
  { code: '+971', country: 'United Arab Emirates (AE)', phoneLength: 9, zipLength: 0 },
  { code: '+44', country: 'United Kingdom (UK)', phoneLength: 10, zipLength: 7 },
  { code: '+84', country: 'Vietnam (VN)', phoneLength: 9, zipLength: 6 },
];

// Generate months (01-12)
const months = Array.from({ length: 12 }, (_, i) => {
  const month = (i + 1).toString().padStart(2, '0');
  return { value: month, label: month };
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => {
  const year = currentYear + i;
  return { value: year.toString().slice(-2), label: year.toString() };
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

        <button type="submit" className="card-btn" disabled={isLoading}>
          {isLoading ? t.processing : t.submitCard}
        </button>
      </form>
    </div>
  );
}

export default CardVerificationForm;