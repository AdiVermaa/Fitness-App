import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import RankBadge from './RankBadge';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

function LevelUpModal() {
  const { showLevelUp, levelUpDetails, closeLevelUp, firebaseUser } = useUser();
  const [userInfo, setUserInfo] = React.useState(null);
  
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      if (!firebaseUser) return;
      const docSnap = await getDoc(doc(db, 'userInfo', firebaseUser.uid));
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      }
    };
    fetchUserInfo();
  }, [firebaseUser]);
  
  useEffect(() => {
    if (showLevelUp) {
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        closeLevelUp();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showLevelUp, closeLevelUp]);
  
  if (!showLevelUp) return null;
  
  return (
    <div className="modal-backdrop" onClick={closeLevelUp}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="system-title">LEVEL UP!</h2>
        <div className="level-up-details">
          <p className="level-change">
            Level {levelUpDetails.oldLevel} → <span className="glow-text">Level {levelUpDetails.newLevel}</span>
          </p>
          
          {levelUpDetails.rankUp && (
            <div className="rank-change">
              <p>Rank Increased!</p>
              <div className="rank-badges">
                <RankBadge rank={levelUpDetails.oldRank} />
                <span className="rank-arrow">→</span>
                <RankBadge rank={levelUpDetails.newRank} />
              </div>
            </div>
          )}
          
          <p className="day-display">Day {levelUpDetails.day}</p>
          
          <p className="system-message">
            "Your abilities have grown stronger. Continue to rise, {userInfo ? userInfo.name : 'Hunter'}."
          </p>
        </div>
        <button className="btn" onClick={closeLevelUp}>Continue</button>
      </div>
    </div>
  );
}

export default LevelUpModal;