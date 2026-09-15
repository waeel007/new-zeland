import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { isIPBlocked, isISPBlocked } from '../utils/blockedIPs';

export const useIPBlocker = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [userIP, setUserIP] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkIP = async () => {
      try {
        // 🔥 Check if we're already on blocked page
        if (location.pathname === '/blocked') {
          console.log('📌 Already on blocked page, stopping');
          setIsChecking(false);
          return;
        }

        // 🔥 CRITICAL: Check session storage first
        const hasChecked = sessionStorage.getItem('ip_checked');
        const sessionBlocked = sessionStorage.getItem('blocked_ip');
        
        // If already checked (even if blocked), skip everything
        if (hasChecked === 'true') {
          // If blocked, redirect to blocked page
          if (sessionBlocked) {
            console.log('🚫 Session says blocked, redirecting');
            navigate('/blocked');
          } else {
            console.log('✅ IP already checked this session, skipping');
          }
          setIsChecking(false);
          return;
        }

        // 🔥 Only run the full check ONCE per session
        console.log('🔍 First time check - running IP verification...');
        setIsChecking(true);

        // Get user's IP address
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        setUserIP(ip);
        
        // Check main blockedIPs list
        if (isIPBlocked(ip)) {
          sessionStorage.setItem('blocked_ip', ip);
          sessionStorage.setItem('block_reason', 'IP address is in blocked list');
          sessionStorage.setItem('ip_checked', 'true');
          navigate('/blocked');
          setIsChecking(false);
          return;
        }
        
        // Check admin panel's localStorage
        const adminBlockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        if (adminBlockedIPs.includes(ip)) {
          sessionStorage.setItem('blocked_ip', ip);
          sessionStorage.setItem('block_reason', 'IP address blocked by admin');
          sessionStorage.setItem('ip_checked', 'true');
          navigate('/blocked');
          setIsChecking(false);
          return;
        }

        // Check ISP blocking
        try {
          const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`, { timeout: 5000 });
          if (geoResponse.data && !geoResponse.data.error) {
            const isp = geoResponse.data.org || geoResponse.data.isp || '';
            if (isp && isISPBlocked(isp)) {
              sessionStorage.setItem('blocked_ip', ip);
              sessionStorage.setItem('block_reason', `ISP blocked: ${isp}`);
              sessionStorage.setItem('ip_checked', 'true');
              navigate('/blocked');
              setIsChecking(false);
              return;
            }
          }
        } catch (geoError) {
          console.log('ISP check skipped - API unavailable');
        }

        // ✅ IP is clean, mark as checked for this session
        sessionStorage.setItem('ip_checked', 'true');
        console.log('✅ IP check passed, saved to session');
        
      } catch (error) {
        console.error('Error checking IP:', error);
        // Don't block on error, just let user through
        sessionStorage.setItem('ip_checked', 'true');
      } finally {
        setIsChecking(false);
      }
    };

    checkIP();
  }, [navigate, location]);

  return { isChecking, userIP };
};