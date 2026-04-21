import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/easybank-logo.png';

function Header() {
  const [showMessage, setShowMessage] = useState(false);

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleRegisterClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide after 3 seconds
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={handleLogoClick}>
          <img src={logo} alt="easybank" className="logo-image" />
        </div>

        {/* Register Button */}
        <button className="register-btn" onClick={handleRegisterClick}>
          Jetzt registrieren
        </button>
      </div>

      {/* Custom Popup Message */}
      {showMessage && (
        <div className="register-popup">

          <span className="popup-text">Kontoerstellung ist momentan nicht verfügbar.</span>
        </div>
      )}
    </header>
  );
}

export default Header;