export const calculateLevel = (xp) => {
    // Basic formula: each level requires level * 100 XP
    // e.g., level 1->2 needs 100 XP, 2->3 needs 200 XP, etc.
    let level = 1;
    let xpForNextLevel = 100;
    let remainingXP = xp;
    
    while (remainingXP >= xpForNextLevel) {
      remainingXP -= xpForNextLevel;
      level++;
      xpForNextLevel = level * 100;
    }
    
    return level;
  };
  
  export const calculateRank = (level) => {
    if (level >= 50) return 'S';
    if (level >= 40) return 'A';
    if (level >= 30) return 'B';
    if (level >= 20) return 'C';
    if (level >= 10) return 'D';
    return 'E';
  };
  
  export const getXPForNextLevel = (level) => {
    return level * 100;
  };
  
  export const getTotalXPForLevel = (level) => {
    let total = 0;
    for (let i = 1; i < level; i++) {
      total += i * 100;
    }
    return total;
  };
  
  export const getCurrentLevelProgress = (xp) => {
    const currentLevel = calculateLevel(xp);
    const totalXPForCurrentLevel = getTotalXPForLevel(currentLevel);
    const xpInCurrentLevel = xp - totalXPForCurrentLevel;
    const xpNeededForNextLevel = getXPForNextLevel(currentLevel);
    
    return {
      currentXP: xpInCurrentLevel,
      requiredXP: xpNeededForNextLevel,
      percentage: Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100)
    };
  };