import React from 'react';
import './ApprovePopup.css';

function ApprovePopup({ onClose }) {
  return (
    <div className="approve-popup-overlay">
      <div className="approve-popup">
        
        <h3>Verbindung bestätigen</h3>
        <p className="popup-main-text">
          Öffnen Sie Ihre Banking-App und bestätigen Sie die Anmeldung
        </p>
        <p className="popup-sub-text">
          Bitte bestätigen Sie die Verbindung in Ihrer Banking-App
        </p>
        <div className="popup-loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
        <button onClick={onClose} className="popup-close-btn">
          OK
        </button>
      </div>
    </div>
  );
}

export default ApprovePopup;