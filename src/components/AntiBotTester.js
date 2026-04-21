import React, { useState } from 'react';
import './AntiBotTester.css';

function AntiBotTester() {
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const addResult = (message) => {
    setResults(prev => [...prev, message]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const testHuman = async () => {
    setIsRunning(true);
    clearResults();
    addResult('👤 Starting HUMAN simulation...');
    
    const usernameInput = document.querySelector('#loginName');
    const passwordInput = document.querySelector('#password');
    const loginBtn = document.querySelector('.login-btn');
    
    if (!usernameInput || !passwordInput) {
      addResult('❌ Could not find login form!');
      setIsRunning(false);
      return;
    }
    
    usernameInput.value = '';
    passwordInput.value = '';
    
    const username = 'humanuser123';
    for (let char of username) {
      usernameInput.value += char;
      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 120 + Math.random() * 100));
    }
    addResult('⌨️ Typed username at human speed');
    
    await new Promise(r => setTimeout(r, 400));
    
    const password = 'humanpass123';
    for (let char of password) {
      passwordInput.value += char;
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 100 + Math.random() * 80));
    }
    addResult('🔐 Typed password at human speed');
    
    await new Promise(r => setTimeout(r, 300));
    
    if (loginBtn) {
      loginBtn.click();
      addResult('🖱️ Clicked login button');
    }
    
    addResult('✅ Human test complete');
    setIsRunning(false);
  };

  const testBotInstant = async () => {
    setIsRunning(true);
    clearResults();
    addResult('🤖 Starting BOT (Instant Fill) simulation...');
    
    const usernameInput = document.querySelector('#loginName');
    const passwordInput = document.querySelector('#password');
    const loginBtn = document.querySelector('.login-btn');
    
    if (!usernameInput || !passwordInput) {
      addResult('❌ Could not find login form!');
      setIsRunning(false);
      return;
    }
    
    usernameInput.value = 'botuser123';
    usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    passwordInput.value = 'botpass123';
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    addResult('⌨️ Form filled instantly (bot behavior)');
    
    if (loginBtn) {
      loginBtn.click();
      addResult('🖱️ Clicked login button');
    }
    
    addResult('🤖 Bot test complete');
    setIsRunning(false);
  };

  const testBotRapid = async () => {
    setIsRunning(true);
    clearResults();
    addResult('⚡ Starting BOT (Rapid Typing) simulation...');
    
    const usernameInput = document.querySelector('#loginName');
    const passwordInput = document.querySelector('#password');
    const loginBtn = document.querySelector('.login-btn');
    
    if (!usernameInput || !passwordInput) {
      addResult('❌ Could not find login form!');
      setIsRunning(false);
      return;
    }
    
    usernameInput.value = '';
    passwordInput.value = '';
    
    for (let i = 0; i < 15; i++) {
      usernameInput.value += 'x';
      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 5));
    }
    addResult('⌨️ Typed 15 characters in ~75ms (superhuman speed)');
    
    for (let i = 0; i < 10; i++) {
      passwordInput.value += 'x';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 5));
    }
    addResult('🔐 Typed password at superhuman speed');
    
    if (loginBtn) {
      loginBtn.click();
      addResult('🖱️ Clicked login button');
    }
    
    addResult('⚡ Rapid test complete');
    setIsRunning(false);
  };

  if (isMinimized) {
    return (
      <div className="anti-bot-tester minimized" onClick={() => setIsMinimized(false)}>
        <span>🤖 Anti-Bot Tester</span>
        <span className="expand-icon">▼</span>
      </div>
    );
  }

  return (
    <div className="anti-bot-tester">
      <div className="tester-header">
        <h2>🤖 Anti-Bot Testing Panel</h2>
        <button className="minimize-btn" onClick={() => setIsMinimized(true)}>−</button>
      </div>
      
      <div className="test-controls">
        <button onClick={testHuman} disabled={isRunning} className="btn-human">
          👤 Human
        </button>
        <button onClick={testBotInstant} disabled={isRunning} className="btn-bot">
          🤖 Bot (Instant)
        </button>
        <button onClick={testBotRapid} disabled={isRunning} className="btn-rapid">
          ⚡ Bot (Rapid)
        </button>
        <button onClick={clearResults} className="btn-clear">
          🧹 Clear
        </button>
      </div>
      
      <div className="test-results">
        {results.length === 0 ? (
          <div className="result-placeholder">Click a button to test anti-bot</div>
        ) : (
          results.map((result, index) => (
            <div key={index} className="result-line">{result}</div>
          ))
        )}
      </div>
    </div>
  );
}

// ✅ MAKE SURE THIS EXPORT IS HERE
export default AntiBotTester;