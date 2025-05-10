import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import XPBar from '../components/XPBar';
import LevelUpModal from '../components/LevelUpModal';

function Home() {
  const { user } = useUser();
  
  return (
    <div className="home-page">
      <LevelUpModal />
      
      <div className="system-box welcome-box">
        <h2 className="system-title">Welcome, Hunter</h2>
        <p>The world needs your strength. Complete daily quests to level up and increase your rank.</p>
        
        <div className="player-status">
          <h3>Current Status</h3>
          <XPBar />
          <p>Total XP: {user.xp}</p>
          <p>Quests Completed: {user.completedQuests.length}</p>
        </div>
        
        <div className="button-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/quests" className="btn">View Daily Quests</Link>
        </div>
      </div>
      
      <div className="system-box motivation-box">
        <h2 className="system-title">The System</h2>
        <p className="quote">"I alone level up."</p>
        <p>Your journey from weakness to strength begins now. Will you rise to become the world's strongest hunter?</p>
      </div>
    </div>
  );
}

export default Home;