import React, { useState, useEffect } from 'react';

function SystemNotification({ message, duration = 3000, type = 'info' }) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  if (!visible) return null;
  
  return (
    <div className={`system-notification ${type}`} style={getNotificationStyles(type)}>
      <p>{message}</p>
    </div>
  );
}

// Helper function to get styles based on notification type
function getNotificationStyles(type) {
  const baseStyles = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out',
    textAlign: 'center',
    fontWeight: '600',
  };
  
  // Different styles based on notification type
  switch (type) {
    case 'success':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(25, 135, 84, 0.95)',
        border: '1px solid #28a745',
        color: 'white'
      };
    case 'warning':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 193, 7, 0.95)',
        border: '1px solid #ffc107',
        color: '#212529'
      };
    case 'error':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(220, 53, 69, 0.95)',
        border: '1px solid #dc3545',
        color: 'white'
      };
    default: // info
      return {
        ...baseStyles,
        backgroundColor: 'rgba(13, 110, 253, 0.95)',
        border: '1px solid #0d6efd',
        color: 'white'
      };
  }
}

export default SystemNotification;