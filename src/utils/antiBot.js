// src/utils/antiBot.js

let loginStartTime = null;
let firstKeyPressTime = null;
let keyPressCount = 0;
let mouseMovements = 0;
let suspiciousPatterns = 0;
let keyPressTimes = []; // Track timing between each key
let mousePositions = []; // Track mouse movement variety

const startTimer = () => {
  loginStartTime = Date.now();
  firstKeyPressTime = null;
  keyPressCount = 0;
  mouseMovements = 0;
  suspiciousPatterns = 0;
  keyPressTimes = [];
  mousePositions = [];
  console.log('⏰ Timer started');
};

const trackTyping = () => {
  const now = Date.now();
  keyPressCount++;
  
  if (firstKeyPressTime === null) {
    firstKeyPressTime = now;
  } else {
    // Track time between keystrokes
    const lastKeyTime = keyPressTimes[keyPressTimes.length - 1] || firstKeyPressTime;
    const timeDiff = now - lastKeyTime;
    keyPressTimes.push(now);
    
    // Bots have VERY consistent timing
    if (keyPressTimes.length > 5) {
      const times = keyPressTimes.slice(-5).map((t, i, arr) => 
        i === 0 ? 0 : t - arr[i-1]
      ).slice(1);
      
      // Check if timing is too consistent (bots)
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const variance = times.map(t => Math.abs(t - avgTime)).reduce((a, b) => a + b, 0) / times.length;
      
      if (variance < 5) {
        suspiciousPatterns += 5;
        console.log('🚫 BOT: Keystroke timing too consistent!');
      }
    }
    
    // INSTANT typing detection
    if (timeDiff < 30) {
      suspiciousPatterns += 2;
      console.log('⚠️ Suspicious: Keys pressed too fast!');
    }
  }
  
  // Check overall speed
  if (keyPressCount > 3) {
    const timeSpent = (now - firstKeyPressTime) / 1000;
    const speed = keyPressCount / timeSpent;
    
    if (speed > 5) {
      suspiciousPatterns += 3;
      console.log('⚠️ Suspicious: Typing speed > 5 keys/sec');
    }
  }
};

const trackInteraction = (e) => {
  mouseMovements++;
  
  // Track mouse positions to detect lack of variety
  if (e) {
    mousePositions.push({ x: e.clientX, y: e.clientY });
    
    // Keep only last 20 positions
    if (mousePositions.length > 20) {
      mousePositions.shift();
    }
  }
};

// Check if mouse movement is natural
const checkMouseNatural = () => {
  if (mousePositions.length < 5) return false;
  
  // Check if mouse moved in straight line (bot-like)
  let straightLineCount = 0;
  for (let i = 2; i < mousePositions.length; i++) {
    const p1 = mousePositions[i-2];
    const p2 = mousePositions[i-1];
    const p3 = mousePositions[i];
    
    // Check if points are collinear (straight line)
    const area = Math.abs((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y));
    if (area < 100) {
      straightLineCount++;
    }
  }
  
  return straightLineCount < 5; // Less than 5 straight line segments = natural
};

const detectAutomation = () => {
  const automationIndicators = [];
  
  // Check webdriver
  if (navigator.webdriver) automationIndicators.push('webdriver');
  
  // Check for headless
  if (navigator.userAgent.includes('Headless')) automationIndicators.push('headless');
  
  // Check languages
  if (!navigator.languages || navigator.languages.length === 0) {
    automationIndicators.push('no_languages');
  }
  
  // Check plugins
  if (!navigator.plugins || navigator.plugins.length === 0) {
    automationIndicators.push('no_plugins');
  }
  
  // Check screen size
  if (window.screen.width < 800 || window.screen.height < 600) {
    automationIndicators.push('small_screen');
  }
  
  // Check if inner dimensions match screen (bot behavior)
  if (window.innerWidth === window.screen.width && window.innerHeight === window.screen.height) {
    automationIndicators.push('fullscreen_match');
  }
  
  // Check for missing features
  if (!window.chrome) automationIndicators.push('no_chrome');
  if (!navigator.mediaDevices) automationIndicators.push('no_media');
  
  return automationIndicators;
};

const checkAntiBot = () => {
  if (loginStartTime === null) {
    startTimer();
  }
  
  console.log('🔍 Anti-Bot Check Results:');
  console.log('  - Key presses:', keyPressCount);
  console.log('  - Mouse moves:', mouseMovements);
  console.log('  - Suspicious patterns:', suspiciousPatterns);
  
  // 1. Automation check
  const automationIndicators = detectAutomation();
  if (automationIndicators.length > 0) {
    console.log('🚫 BLOCKED: Automation detected:', automationIndicators);
    return { 
      passed: false, 
      reason: `Automation: ${automationIndicators.join(', ')}` 
    };
  }
  
  // 2. Suspicious patterns check (AGGRESSIVE)
  if (suspiciousPatterns >= 2) {
    console.log('🚫 BLOCKED: Too many suspicious patterns:', suspiciousPatterns);
    return { 
      passed: false, 
      reason: `Suspicious patterns: ${suspiciousPatterns}` 
    };
  }
  
  // 3. No mouse movement = BOT
  if (keyPressCount > 0 && mouseMovements === 0) {
    console.log('🚫 BLOCKED: No mouse movement detected');
    return { 
      passed: false, 
      reason: 'No mouse movement' 
    };
  }
  
  // 4. Unnatural mouse movement
  if (mousePositions.length > 5 && !checkMouseNatural()) {
    console.log('🚫 BLOCKED: Unnatural mouse movement');
    return { 
      passed: false, 
      reason: 'Unnatural mouse movement' 
    };
  }
  
  // 5. Typed too fast with no pause
  if (keyPressCount > 10) {
    const totalTime = (Date.now() - firstKeyPressTime) / 1000;
    if (totalTime < 1.5) {
      console.log('🚫 BLOCKED: Typed too fast:', totalTime.toFixed(1) + 's');
      return { 
        passed: false, 
        reason: `Typed 10+ chars in ${totalTime.toFixed(1)}s` 
      };
    }
  }
  
  // 6. Too few mouse movements for amount of typing
  if (keyPressCount > 5 && mouseMovements < 3) {
    console.log('🚫 BLOCKED: Not enough mouse movement');
    return { 
      passed: false, 
      reason: 'Insufficient mouse activity' 
    };
  }
  
  console.log('✅ Anti-bot check PASSED - Human verified!');
  return { 
    passed: true, 
    reason: 'Human behavior confirmed' 
  };
};

const resetAntiBot = () => {
  loginStartTime = null;
  firstKeyPressTime = null;
  keyPressCount = 0;
  mouseMovements = 0;
  suspiciousPatterns = 0;
  keyPressTimes = [];
  mousePositions = [];
};

// Track mouse movement with coordinates
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    trackInteraction(e);
  });
}

export {
  startTimer,
  trackInteraction,
  trackTyping,
  checkAntiBot,
  resetAntiBot
};