import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isIPBlocked } from '../utils/blockedIPs';

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
        
        // Check if IP is blocked
        if (isIPBlocked(ip)) {
          sessionStorage.setItem('blocked_ip', ip);
          sessionStorage.setItem('block_reason', 'IP address is in blocked list');
          navigate('/blocked');
        }
      } catch (error) {
        console.error('Error checking IP:', error);
        // If IP check fails, allow access
      } finally {
        setIsChecking(false);
      }
    };

    checkIP();
  }, [navigate]);

  return { isChecking, userIP };
};