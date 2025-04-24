// utils/questGenerator.js
import { questTemplates, specialQuests, systemQuests } from '../data/questsData';

export const generateDailyQuests = (level, rank) => {
  // Select 4-5 quests randomly from the template pool
  const numQuests = Math.floor(Math.random() * 2) + 4; // 4 or 5 quests
  const selectedQuests = [];
  const usedTypes = new Set();
  
  // Calculate difficulty multiplier based on rank
  const rankMultipliers = {
    'E': 1,
    'D': 1.5,
    'C': 2,
    'B': 2.5,
    'A': 3,
    'S': 4
  };
  
  const rankMultiplier = rankMultipliers[rank] || 1;
  
  // Helper to get a random quest that's not already selected
  const getRandomQuest = () => {
    const availableQuests = questTemplates.filter(q => !usedTypes.has(q.type));
    if (availableQuests.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableQuests.length);
    return availableQuests[randomIndex];
  };
  
  // Generate each quest
  for (let i = 0; i < numQuests; i++) {
    const questTemplate = getRandomQuest();
    if (!questTemplate) break;
    
    usedTypes.add(questTemplate.type);
    
    // Calculate scaled values based on level and rank
    const levelFactor = Math.max(1, (level - 1) / 5 + 1); // Gradual increase with level
    const count = Math.floor(questTemplate.baseCount + (questTemplate.scaling * levelFactor * rankMultiplier));
    const xp = Math.floor(questTemplate.baseXP * levelFactor * rankMultiplier);
    
    // Create the quest
    selectedQuests.push({
      id: `${questTemplate.type}_${Date.now()}_${i}`,
      type: questTemplate.type,
      title: questTemplate.title,
      description: questTemplate.description.replace('{count}', count),
      count: count,
      xp: xp,
      completed: false,
      category: questTemplate.category
    });
  }
  
  // Check for special rank-up quests
  const applicableSpecialQuests = specialQuests.filter(quest => 
    quest.requiredLevel === level && quest.requiredRank === rank
  );
  
  // Add special quests if applicable
  applicableSpecialQuests.forEach(specialQuest => {
    selectedQuests.push({
      id: `${specialQuest.type}_${Date.now()}`,
      ...specialQuest,
      completed: false
    });
  });
  
  // Add system quests (always present)
  const dailyLoginQuest = {
    id: `system_${Date.now()}`,
    type: 'daily_login',
    title: 'Daily Login',
    description: 'Login to the System today',
    xp: systemQuests[0].baseXP * level,
    completed: false,
    isSystem: true,
    category: 'system'
  };
  
  return [dailyLoginQuest, ...selectedQuests];
};

// Get appropriate special quests for the current level/rank
export const getSpecialQuests = (level, rank) => {
  return specialQuests.filter(quest => 
    quest.requiredLevel <= level && 
    (quest.requiredRank === rank || 
     (quest.requiredRank === 'E' && rank === 'D') || 
     (quest.requiredRank === 'D' && rank === 'C') ||
     (quest.requiredRank === 'C' && rank === 'B') ||
     (quest.requiredRank === 'B' && rank === 'A') ||
     (quest.requiredRank === 'A' && rank === 'S')
    )
  );
};