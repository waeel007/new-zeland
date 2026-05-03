import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="punktum-header">
      {/* Top bar */}
      <div className="punktum-topbar">
        <div className="punktum-topbar-inner">
          <div className="punktum-topbar-left">
            <a href="#">PUNTKUM DK</a>
            <span>|</span>
            <a href="#">STATISTICS</a>
            <span>|</span>
            <a href="#">ENGLSIH</a>
          </div>
          <div className="punktum-topbar-right">
            <a href="#">LOG IN</a>
          </div>
        </div>
      </div>

      {/* Logo + Main Nav */}
      <div className="punktum-main-header">
        <div className="punktum-main-header-inner">
          <div className="punktum-logo">
            <img src={require('../assets/sb-logo_en.png')} alt="Punktum dk selvbetjening" />
          </div>
        </div>
        
      </div>
    </header>
  );
}

export default Header;