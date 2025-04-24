// src/data/questsData.js

// Quest templates with difficulty scaling factors
export const questTemplates = [
    {
      type: 'push_ups',
      title: 'Push-ups',
      description: 'Complete {count} push-ups',
      baseCount: 5,
      scaling: 2,
      baseXP: 20,
      category: 'strength'
    },
    {
      type: 'squats',
      title: 'Squats',
      description: 'Complete {count} squats',
      baseCount: 10,
      scaling: 3,
      baseXP: 15,
      category: 'strength'
    },
    {
      type: 'sit_ups',
      title: 'Sit-ups',
      description: 'Complete {count} sit-ups',
      baseCount: 8,
      scaling: 2,
      baseXP: 18,
      category: 'strength'
    },
    {
      type: 'plank',
      title: 'Plank',
      description: 'Hold a plank for {count} seconds',
      baseCount: 20,
      scaling: 5,
      baseXP: 25,
      category: 'endurance'
    },
    {
      type: 'jumping_jacks',
      title: 'Jumping Jacks',
      description: 'Complete {count} jumping jacks',
      baseCount: 15,
      scaling: 5,
      baseXP: 12,
      category: 'cardio'
    },
    {
      type: 'water',
      title: 'Stay Hydrated',
      description: 'Drink {count} glasses of water',
      baseCount: 4,
      scaling: 1,
      baseXP: 10,
      category: 'health'
    },
    {
      type: 'steps',
      title: 'Steps',
      description: 'Walk {count} steps',
      baseCount: 2000,
      scaling: 500,
      baseXP: 25,
      category: 'cardio'
    },
    {
      type: 'meditation',
      title: 'Mind Training',
      description: 'Meditate for {count} minutes',
      baseCount: 5,
      scaling: 2,
      baseXP: 15,
      category: 'mental'
    },
    {
      type: 'stretching',
      title: 'Flexibility',
      description: 'Complete a {count}-minute stretching routine',
      baseCount: 5,
      scaling: 2,
      baseXP: 12,
      category: 'flexibility'
    },
    {
      type: 'stairs',
      title: 'Stair Climbing',
      description: 'Climb {count} flights of stairs',
      baseCount: 3,
      scaling: 1,
      baseXP: 20,
      category: 'cardio'
    },
    {
      type: 'fruit',
      title: 'Hunter\'s Diet',
      description: 'Eat {count} servings of fruit or vegetables',
      baseCount: 2,
      scaling: 1,
      baseXP: 15,
      category: 'nutrition'
    },
    {
      type: 'sleep',
      title: 'Rest & Recovery',
      description: 'Get {count} hours of sleep tonight',
      baseCount: 7,
      scaling: 0.5,
      baseXP: 20,
      category: 'health'
    },
    {
      type: 'burpees',
      title: 'Burpees Challenge',
      description: 'Complete {count} burpees',
      baseCount: 5,
      scaling: 3,
      baseXP: 30,
      category: 'strength'
    },
    {
      type: 'reading',
      title: 'Knowledge Hunter',
      description: 'Read for {count} minutes',
      baseCount: 15,
      scaling: 5,
      baseXP: 15,
      category: 'mental'
    },
    {
      type: 'no_sugar',
      title: 'Sugar Free',
      description: 'Avoid sugary drinks and snacks for {count} hours',
      baseCount: 8,
      scaling: 2,
      baseXP: 20,
      category: 'nutrition'
    }
  ];
  
  // Special quests that appear at specific rank or level milestones
  export const specialQuests = [
    {
      type: 'rank_up_test_d',
      title: 'D-Rank Qualification Test',
      description: 'Complete 50 push-ups, 50 squats, and a 1-minute plank',
      xp: 100,
      requiredLevel: 10,
      requiredRank: 'E',
      category: 'milestone'
    },
    {
      type: 'rank_up_test_c',
      title: 'C-Rank Qualification Test',
      description: 'Complete a 5km run or walk',
      xp: 200,
      requiredLevel: 20,
      requiredRank: 'D',
      category: 'milestone'
    },
    {
      type: 'rank_up_test_b',
      title: 'B-Rank Qualification Test',
      description: 'Complete 100 push-ups, 100 squats, 100 sit-ups, and a 10km run',
      xp: 300,
      requiredLevel: 30,
      requiredRank: 'C',
      category: 'milestone'
    },
    {
      type: 'rank_up_test_a',
      title: 'A-Rank Qualification Test',
      description: 'Exercise every day for 7 consecutive days',
      xp: 400,
      requiredLevel: 40,
      requiredRank: 'B',
      category: 'milestone'
    },
    {
      type: 'rank_up_test_s',
      title: 'S-Rank Qualification Test',
      description: 'Complete a full fitness challenge of your choice (marathon, tough mudder, etc.)',
      xp: 500,
      requiredLevel: 50,
      requiredRank: 'A',
      category: 'milestone'
    }
  ];
  
  // System quests that always appear
  export const systemQuests = [
    {
      type: 'daily_login',
      title: 'Daily Login',
      description: 'Login to the System today',
      baseXP: 10,
      scaling: 1, // Scales with level
      category: 'system'
    },
    {
      type: 'consecutive_login',
      title: 'Consecutive Login',
      description: 'Login {count} days in a row',
      baseXP: 20,
      scaling: 2,
      category: 'system'
    }
  ];
  
  // Rank information for the about page
  export const rankInfo = [
    {
      rank: 'E',
      levelRange: '1-9',
      description: 'Beginner hunters who are just starting their journey.'
    },
    {
      rank: 'D',
      levelRange: '10-19',
      description: 'Showing potential with basic fitness abilities.'
    },
    {
      rank: 'C',
      levelRange: '20-29',
      description: 'Intermediate hunters with established fitness routines.'
    },
    {
      rank: 'B',
      levelRange: '30-39',
      description: 'Advanced hunters with strong discipline and willpower.'
    },
    {
      rank: 'A',
      levelRange: '40-49',
      description: 'Elite hunters nearing the peak of human potential.'
    },
    {
      rank: 'S',
      levelRange: '50+',
      description: 'The strongest hunters who have broken their limits.'
    }
  ];