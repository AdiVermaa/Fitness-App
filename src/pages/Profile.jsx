import React from 'react';
import { useUser } from '../context/UserContext';
import XPBar from '../components/XPBar';
import RankBadge from '../components/RankBadge';

function Profile() {
  const { user, resetProgress } = useUser();
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Group completed quests by date
  const groupQuestsByDate = () => {
    const grouped = {};
    
    // Sort by date (newest first)
    const sortedQuests = [...user.completedQuests].sort((a, b) => 
      new Date(b.completedAt) - new Date(a.completedAt)
    );
    
    sortedQuests.forEach(quest => {
      const date = new Date(quest.completedAt).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(quest);
    });
    
    return grouped;
  };
  
  const questsByDate = groupQuestsByDate();
  
  return (
    <div className="profile-page">
      <div className="system-box">
        <h2 className="system-title">Hunter Profile</h2>
        
        <div className="profile-status">
          <div className="profile-header">
            <div className="profile-level">
              Level {user.level} <RankBadge rank={user.rank} />
            </div>
          </div>
          
          <XPBar />
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">Total XP:</span>
              <span className="stat-value">{user.xp}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Quests Completed:</span>
              <span className="stat-value">{user.completedQuests.length}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Days Active:</span>
                <span className="stat-value">{user.days}</span>
            </div>
          </div>
        </div>
        
        <div className="quest-history">
          <h3 className="system-title">Quest History</h3>
          
          {Object.keys(questsByDate).length > 0 ? (
            Object.entries(questsByDate).map(([date, quests]) => (
              <div key={date} className="quest-day">
                <h4 className="date-header">{date}</h4>
                <div className="day-quests">
                  {quests.map(quest => (
                    <div key={quest.id} className="quest-history-item">
                      <div className="quest-header">
                        <span className="quest-title">{quest.title}</span>
                        <span className="quest-xp">+{quest.xp} XP</span>
                      </div>
                      <p className="quest-description">{quest.description}</p>
                      <div className="completed-time">
                        Completed: {formatDate(quest.completedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="no-history">No completed quests yet. Rise, hunter!</p>
          )}
        </div>
        
        <div className="reset-section">
          <h3 className="system-title">Danger Zone</h3>
          <p>Reset all progress and start over as E-Rank Hunter.</p>
          <button className="btn danger-btn" onClick={resetProgress}>
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;