import React from 'react';
import './LoginScreen.css';

function LoginScreen({ loginName, password, errors, isLoading, onInputChange, onLogin }) {
  return (
    <div className="login-screen">
      <h1 className="login-welcome">Willkommen bei Ihrem Online-Banking</h1>

      <div className="login-form">
        <div className="form-group">
          <label htmlFor="loginName"></label>
          <input
            type="text"
            id="loginName"
            value={loginName}
            onChange={(e) => onInputChange('loginName', e.target.value)}
            placeholder="Benutzername"
            className={errors.loginName ? 'input-error' : ''}
          />
          {errors.loginName && (
            <span className="login-error-message">
              Bitte überprüfen Sie Ihre Anmeldedaten
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => onInputChange('password', e.target.value)}
            placeholder="Passwort"
            className={errors.password ? 'input-error' : ''}
          />
        </div>

        <button onClick={onLogin} className="login-btn" disabled={isLoading}>
          {isLoading ? 'Wird geladen...' : 'Anmelden'}
        </button>

        
      </div>
    </div>
  );
}

export default LoginScreen;