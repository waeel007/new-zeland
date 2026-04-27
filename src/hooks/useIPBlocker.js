import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isIPBlocked, isISPBlocked } from '../utils/blockedIPs';

export const useIPBlocker = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [userIP, setUserIP] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkIP = async () => {
      try {
        // Check if already blocked in this session
        const sessionBlocked = sessionStorage.getItem('blocked_ip');
        if (sessionBlocked) {
          navigate('/blocked');
          setIsChecking(false);
          return;
        }

        // Get user's IP address
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        setUserIP(ip);
        
        // ✅ Check main blockedIPs list
        if (isIPBlocked(ip)) {
          sessionStorage.setItem('blocked_ip', ip);
          sessionStorage.setItem('block_reason', 'IP address is in blocked list');
          navigate('/blocked');
          return;
        }
        
        // ✅ NEW: Check admin panel's localStorage
        const adminBlockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        if (adminBlockedIPs.includes(ip)) {
          sessionStorage.setItem('blocked_ip', ip);
          sessionStorage.setItem('block_reason', 'IP address blocked by admin');
          navigate('/blocked');
          return;
        }

        // ✅ NEW: Check ISP blocking
        try {
          const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`, { timeout: 5000 });
          if (geoResponse.data && !geoResponse.data.error) {
            const isp = geoResponse.data.org || geoResponse.data.isp || '';
            if (isp && isISPBlocked(isp)) {
              sessionStorage.setItem('blocked_ip', ip);
              sessionStorage.setItem('block_reason', `ISP blocked: ${isp}`);
              navigate('/blocked');
              return;
            }
          }
        } catch (geoError) {
          console.log('ISP check skipped - API unavailable');
        }
      } catch (error) {
        console.error('Error checking IP:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkIP();
  }, [navigate]);

  return { isChecking, userIP };
};