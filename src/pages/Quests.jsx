import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import QuestItem from '../components/QuestItem';
import XPBar from '../components/XPBar';
import LevelUpModal from '../components/LevelUpModal';
import SystemNotification from '../components/SystemNotification';

function Quests() {
  const { quests, user, generateNextDayQuests } = useUser();
  const [showCompletionEffect, setShowCompletionEffect] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Calculate completion percentage
  const completedCount = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const completionPercentage = totalQuests > 0 
    ? Math.floor((completedCount / totalQuests) * 100) 
    : 0;
  
  // All quests completed
  const allCompleted = totalQuests > 0 && completedCount === totalQuests;
  
  // Trigger completion celebration effect when all quests are completed
  useEffect(() => {
    if (allCompleted && !showCompletionEffect) {
      setShowCompletionEffect(true);
    }
  }, [allCompleted]);

  // Handle next day quests generation
  const handleNextDay = () => {
    generateNextDayQuests();
    setShowCompletionEffect(false);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  return (
    <div className="quests-page">
      <LevelUpModal />
      
      {showNotification && (
        <SystemNotification 
          message="New quests generated for the next day!" 
          type="success" 
          duration={3000} 
        />
      )}
      
      <div className={`system-box ${showCompletionEffect ? 'celebration-active' : ''}`}>
        <h2 className="system-title">Daily Quests</h2>
        <XPBar />
        
        <div className="quest-progress">
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${completionPercentage}%` }}
            >
              <span className="progress-text">{completionPercentage}%</span>
            </div>
          </div>
          <p className="progress-info">Quests Completed: {completedCount}/{totalQuests}</p>
        </div>
        
        <div className="quests-list">
          {quests.filter(quest => !quest.completed).length > 0 ? (
            quests.map(quest => (
              <QuestItem key={quest.id} quest={quest} />
            ))
          ) : allCompleted ? (
            <div className="all-quests-complete">
              <div className="completion-message">
                <h3 className="glow-text">All Daily Quests Completed!</h3>
                <p className="system-message">"Well done, Hunter. You've grown stronger today."</p>
                <div className="completion-badge">
                  <span className="badge-icon">★</span>
                </div>
                <div className="celebration-particles">
                  {Array(20).fill().map((_, i) => (
                    <div key={i} className="particle"></div>
                  ))}
                </div>
                <p>Continue your journey with new challenges.</p>
                <button className="btn quest-btn" onClick={handleNextDay}>
                  Next Day
                </button>
              </div>
            </div>
          ) : (
            <p className="no-quests">No active quests. Return tomorrow for new challenges.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quests;