import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateLevel, calculateRank } from '../utils/levelSystem';
import { generateDailyQuests } from '../utils/questGenerator';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize state with defaults
  const [user, setUser] = useState({
    xp: 0,
    level: 1,
    rank: 'E',
    days: 1,
    completedQuests: [],
    lastQuestRefresh: new Date().toISOString()
  });

  const [quests, setQuests] = useState(() => {
    return generateDailyQuests(user.level, user.rank);
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpDetails, setLevelUpDetails] = useState({ 
    oldLevel: 0, 
    newLevel: 0, 
    oldRank: '', 
    newRank: '' 
  });

  // Check if we need to generate new daily quests
  useEffect(() => {
    const now = new Date();
    const lastRefresh = user.lastQuestRefresh ? new Date(user.lastQuestRefresh) : null;
    
    // Generate new quests if it's a new day or no quests exist
    if (!lastRefresh || now.getDate() !== lastRefresh.getDate() || now.getMonth() !== lastRefresh.getMonth()) {
      const newQuests = generateDailyQuests(user.level, user.rank);
      setQuests(newQuests);
      setUser(prev => ({
        ...prev,
        lastQuestRefresh: now.toISOString()
      }));
    }
  }, [user.level, user.rank, user.lastQuestRefresh]);

  // Add XP and handle level ups
  const addXP = (amount) => {
    const oldLevel = user.level;
    const oldRank = user.rank;
    
    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);
    const newRank = calculateRank(newLevel);
    
    // Check if level up occurred
    if (newLevel > oldLevel) {
      setLevelUpDetails({
        oldLevel,
        newLevel,
        oldRank,
        newRank,
        day: user.days,
        rankUp: newRank !== oldRank
      });
      setShowLevelUp(true);
      
      // If level up, generate new quests based on new level
      if (newLevel > oldLevel) {
        const newQuests = generateDailyQuests(newLevel, newRank);
        setQuests(newQuests);
      }
    }
    
    setUser(prev => ({
      ...prev,
      xp: newXP,
      level: newLevel,
      rank: newRank
    }));
  };

  // Complete a quest
  const completeQuest = (questId) => {
    // Find the quest
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;
    
    // Mark quest as completed
    const updatedQuests = quests.map(q => 
      q.id === questId ? { ...q, completed: true } : q
    );
    
    setQuests(updatedQuests);
    
    // Add XP for completing the quest
    addXP(quest.xp);
    
    // Add to completed quests history
    setUser(prev => ({
      ...prev,
      completedQuests: [...prev.completedQuests, {
        ...quest,
        completedAt: new Date().toISOString()
      }]
    }));
  };

  // Force generate new quests for the next day
  const generateNextDayQuests = () => {
    // Create a "next day" date (current date + 1 day)
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Generate new quests based on current level and rank
    const newQuests = generateDailyQuests(user.level, user.rank);
    setQuests(newQuests);
    
    // Update the last refresh time to the "next day"
    setUser(prev => ({
      ...prev,
      days: prev.days + 1,
      lastQuestRefresh: nextDay.toISOString()
    }));
  };

  // Reset progress
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      const newUser = {
        xp: 0,
        level: 1,
        rank: 'E',
        days: 1,
        completedQuests: [],
        lastQuestRefresh: new Date().toISOString()
      };
      setUser(newUser);
      setQuests(generateDailyQuests(1, 'E'));
    }
  };

  // Close level up modal
  const closeLevelUp = () => {
    setShowLevelUp(false);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      quests, 
      addXP, 
      completeQuest,
      resetProgress,
      showLevelUp,
      levelUpDetails,
      closeLevelUp,
      generateNextDayQuests
    }}>
      {children}
    </UserContext.Provider>
  );
};