import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 🔥 Fix: Set IP check flag before app loads to prevent re-check on refresh
if (sessionStorage.getItem('ip_checked') === 'true') {
  console.log('✅ IP already checked this session, skipping on refresh');
  // Ensure the flag stays set
  sessionStorage.setItem('ip_checked', 'true');
}

// S'assurer que l'élément root existe avant de rendre l'application
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Élément avec id "root" non trouvé dans le DOM');
}