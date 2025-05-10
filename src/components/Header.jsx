import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import RankBadge from './RankBadge';

function Header() {
  const location = useLocation();
  const { user } = useUser();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Arise';
      case '/quests': return 'Daily Quests';
      case '/profile': return 'Hunter Profile';
      case '/about': return 'About System';
      default: return 'Solo Leveling Tracker';
    }
  };

  return (
    <header className="header system-box">
      <div className="header-content">
        <h1 className="system-title">{getPageTitle()}</h1>
        <div className="header-user-info">
          <div className="level-display">
            <span>Level {user.level}</span> 
            <RankBadge rank={user.rank} />
            <span className="day-counter">Day {user.days}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;