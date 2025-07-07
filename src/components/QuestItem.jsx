import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function QuestItem({ quest }) {
  const { completeQuest } = useUser();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const handleComplete = () => {
    if (!quest.completed) {
      setIsCompleting(true);
      setTimeout(() => {
        completeQuest(quest.id);
        setTimeout(() => {
          setIsVisible(false);
        }, 800);
      }, 1000);
    }
  };
  
  // If system quest and all other quests completed, keep it visible
  useEffect(() => {
    if (quest.completed && !quest.isSystem) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500); // Give time for the completion animation
      return () => clearTimeout(timer);
    }
  }, [quest.completed, quest.isSystem]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`quest-item ${quest.completed ? 'completed' : ''} ${isCompleting ? 'completing' : ''}`}
      style={{ position: 'relative', transition: 'box-shadow 0.3s', boxShadow: isCompleting ? '0 0 24px #ffd70099' : '0 2px 12px #0002' }}>
      <div className="quest-header">
        <h3 className="quest-title">{quest.title}</h3>
        <span className="quest-xp">+{quest.xp} XP</span>
      </div>
      <p className="quest-description">{quest.description}</p>
      {isCompleting && !quest.completed && (
        <div className="completing-animation">
          <span className="completing-text">COMPLETING...</span>
        </div>
      )}
      <button 
        className="btn quest-btn"
        onClick={handleComplete}
        disabled={quest.completed || isCompleting}
        title={!quest.completed && !isCompleting ? 'You can do it! Complete this quest!' : ''}
      >
        {quest.completed ? 'Completed' : isCompleting ? 'Completing...' : 'Complete Quest'}
      </button>
    </div>
  );
}

export default QuestItem;