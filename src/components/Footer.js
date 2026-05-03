import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer style={{
      background: '#3c3c3c',
      color: '#f2f2f2',
      padding: '30px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap'
    }}>
      <div>
        <h4>Punktum dk A/S</h4>
        <p>Administrator for .dk domæner</p>
      </div>
      <div>
        <h4>Kontakt os</h4>
        <p>Ørestads Boulevard 108, 2300 København S</p>
        <p>Tlf +45 33 64 60 60</p>
      </div>
      <div>
        <h4>Information</h4>
        <p>Vilkår | Privatliv | Cookies</p>
      </div>
    </footer>
  );
}
export default Footer;