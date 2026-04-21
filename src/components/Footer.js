import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <nav className="footer-links">
          <a href="/faq">FAQ</a>
          <span className="separator">|</span>
          <a href="/kontakt">Kontakt</a>
          <span className="separator">|</span>
          <a href="/impressum">Impressum</a>
          <span className="separator">|</span>
          <a href="/datenschutz">Datenschutz</a>
          <span className="separator">|</span>
          <a href="/agb">AGB</a>
          <span className="separator">|</span>
          <a href="/barrierefreiheit">Barrierefreiheit</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;