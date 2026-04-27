import React, { useState, useEffect } from 'react';
import { addBlockedIP, getBlockedIPs, removeBlockedIP } from '../utils/blockedIPs';
import './AdminPanel.css';

function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ipInput, setIpInput] = useState('');
  const [blockedList, setBlockedList] = useState([]);
  const [message, setMessage] = useState('');

  const ADMIN_PASSWORD = 'admin123';

  // Toggle with Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setBlockedList(getBlockedIPs());
    } else {
      setMessage('❌ Falsches Passwort!');
    }
  };

  const handleBlockIP = () => {
    if (!ipInput) return;
    if (addBlockedIP(ipInput.trim())) {
      setMessage(`✅ IP ${ipInput} blockiert!`);
      setBlockedList(getBlockedIPs());
      setIpInput('');
    } else {
      setMessage('⚠️ IP bereits blockiert!');
    }
  };

  const handleUnblockIP = (ip) => {
    if (removeBlockedIP(ip)) {
      setMessage(`🔓 IP ${ip} freigegeben!`);
      setBlockedList(getBlockedIPs());
    }
  };

  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel">
        <h2>🚫 IP Block Manager</h2>
        {!isAuthenticated ? (
          <>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" />
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
              <input type="text" value={ipInput} onChange={(e) => setIpInput(e.target.value)} placeholder="IP eingeben..." style={{flex:1, padding:'8px'}} />
              <button onClick={handleBlockIP} style={{background:'#e53e3e', color:'white', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer'}}>🚫 Block</button>
            </div>
            <div style={{maxHeight:'200px', overflowY:'auto'}}>
              {blockedList.map((ip, i) => (
                <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}>
                  <span style={{color:'#e53e3e', fontFamily:'monospace'}}>{ip}</span>
                  <button onClick={() => handleUnblockIP(ip)}>🔓</button>
                </div>
              ))}
            </div>
          </>
        )}
        <button onClick={() => setIsOpen(false)} style={{marginTop:'12px', width:'100%'}}>Schließen</button>
        {message && <div style={{marginTop:'8px', padding:'8px', background: message.includes('✅') ? '#f0fff4' : '#fff5f5'}}>{message}</div>}
      </div>
    </div>
  );
}

export default AdminPanel;