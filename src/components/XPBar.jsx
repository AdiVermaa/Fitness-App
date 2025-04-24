import React from 'react';
import { useUser } from '../context/UserContext';
import { getCurrentLevelProgress } from '../utils/levelSystem';

function XPBar() {
  const { user } = useUser();
  const progress = getCurrentLevelProgress(user.xp);
  
  return (
    <div className="xp-container">
      <div 
        className="xp-fill" 
        style={{ width: `${progress.percentage}%` }}
      ></div>
      <div className="xp-text">
        {progress.currentXP} / {progress.requiredXP} XP
      </div>
    </div>
  );
}

export default XPBar;