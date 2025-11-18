/**
 * Surprise Generator Service
 * Random surprise ideas to delight your partner
 */

export interface Surprise {
  id: string;
  category: 'romantic' | 'thoughtful' | 'fun' | 'practical' | 'grand';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cost: 'free' | 'low' | 'medium' | 'high';
  timeNeeded: string;
  icon: string;
  howTo: string[];
  tips: string[];
}

export class SurpriseService {
  /**
   * Get all surprise ideas
   */
  private static getAllSurprises(): Surprise[] {
    return [
      // Romantic
      {
        id: 'romantic-1',
        category: 'romantic',
        title: 'Love Letter Under Their Pillow',
        description: 'Write a heartfelt love letter and hide it under their pillow for them to find at bedtime',
        difficulty: 'easy',
        cost: 'free',
        timeNeeded: '30 minutes',
        icon: '💌',
        howTo: [
          'Find nice stationery or paper',
          'Write from the heart about why you love them',
          'Include specific memories or moments',
          'Seal it in an envelope',
          'Hide it under their pillow when they\'re not looking',
        ],
        tips: [
          'Use your best handwriting',
          'Spray a bit of your perfume/cologne',
          'Draw a little doodle or heart',
          'Date it for future memories',
        ],
      },
      {
        id: 'romantic-2',
        category: 'romantic',
        title: 'Star Named After Them',
        description: 'Register a star in their name through an official star registry',
        difficulty: 'easy',
        cost: 'medium',
        timeNeeded: '1 hour',
        icon: '⭐',
        howTo: [
          'Choose a reputable star registry service',
          'Select a star and name it after them',
          'Get the certificate printed',
          'Present it in a special moment',
          'Use a stargazing app to find "their" star together',
        ],
        tips: [
          'Frame the certificate',
          'Plan a stargazing date to reveal it',
          'Create a romantic presentation',
          'Keep the coordinates to find it later',
        ],
      },
      {
        id: 'romantic-3',
        category: 'romantic',
        title: 'Recreate Your First Date',
        description: 'Surprise them by recreating every detail of your first date',
        difficulty: 'hard',
        cost: 'medium',
        timeNeeded: '1 week planning',
        icon: '📅',
        howTo: [
          'Recall all details of your first date',
          'Book the same restaurant or location',
          'Wear similar outfits if possible',
          'Play the same music',
          'Surprise them with the plan',
        ],
        tips: [
          'Take photos to compare with original date',
          'Recreate inside jokes from that night',
          'End with something new to add to the memory',
          'Create a scrapbook page about both dates',
        ],
      },

      // Thoughtful
      {
        id: 'thoughtful-1',
        category: 'thoughtful',
        title: 'Breakfast in Bed',
        description: 'Wake up early and prepare their favorite breakfast to serve in bed',
        difficulty: 'easy',
        cost: 'low',
        timeNeeded: '1 hour',
        icon: '🍳',
        howTo: [
          'Wake up before them',
          'Prepare their favorite breakfast',
          'Set up a tray nicely',
          'Add fresh flowers or a note',
          'Gently wake them up with breakfast ready',
        ],
        tips: [
          'Include fresh orange juice',
          'Add a small vase with a flower',
          'Make their coffee/tea exactly how they like it',
          'Turn off your alarm so you don\'t wake them early',
        ],
      },
      {
        id: 'thoughtful-2',
        category: 'thoughtful',
        title: 'Complete Their To-Do List',
        description: 'Secretly complete tasks from their to-do list',
        difficulty: 'medium',
        cost: 'free',
        timeNeeded: '2-3 hours',
        icon: '✅',
        howTo: [
          'Check their to-do list or planner',
          'Choose tasks you can do',
          'Complete them without them knowing',
          'Leave a note saying "Your to-do fairy visited ✨"',
        ],
        tips: [
          'Focus on tasks they\'ve been putting off',
          'Do it when they\'re at work or out',
          'Take before/after photos',
          'Don\'t expect anything in return',
        ],
      },
      {
        id: 'thoughtful-3',
        category: 'thoughtful',
        title: 'Care Package for Tough Week',
        description: 'Create a personalized care package for when they\'re stressed',
        difficulty: 'medium',
        cost: 'medium',
        timeNeeded: '2 hours',
        icon: '🎁',
        howTo: [
          'Get a nice box or basket',
          'Include their favorite snacks',
          'Add stress-relief items (bath bombs, tea, etc.)',
          'Include a handwritten encouraging note',
          'Present it when they need it most',
        ],
        tips: [
          'Personalize based on their preferences',
          'Include a playlist of calming music',
          'Add a coupon for a free massage from you',
          'Make it look beautiful with ribbon',
        ],
      },

      // Fun
      {
        id: 'fun-1',
        category: 'fun',
        title: 'Scavenger Hunt',
        description: 'Create a surprise scavenger hunt with clues leading to a special gift or date',
        difficulty: 'medium',
        cost: 'low',
        timeNeeded: '3-4 hours planning',
        icon: '🗺️',
        howTo: [
          'Create 5-7 clues',
          'Hide them in meaningful locations',
          'Each clue leads to the next',
          'Final clue leads to a gift or surprise date',
          'Give them the first clue to start',
        ],
        tips: [
          'Use places with special meaning to you both',
          'Make clues creative (riddles, photos, puzzles)',
          'Include small treats at each stop',
          'Have the final surprise be really special',
        ],
      },
      {
        id: 'fun-2',
        category: 'fun',
        title: 'Surprise Movie Night Setup',
        description: 'Transform your living room into a luxury cinema while they\'re out',
        difficulty: 'easy',
        cost: 'low',
        timeNeeded: '1 hour',
        icon: '🎬',
        howTo: [
          'Rearrange furniture for best viewing',
          'Hang fairy lights or dim the lights',
          'Prepare movie snacks (popcorn, candy)',
          'Set up blankets and pillows',
          'Have their favorite movie ready to play',
        ],
        tips: [
          'Make "tickets" for the movie',
          'Dress up as an usher',
          'Create a movie menu',
          'Pick a movie they\'ve wanted to see',
        ],
      },
      {
        id: 'fun-3',
        category: 'fun',
        title: 'Flash Mob Style Dance',
        description: 'Learn a dance routine and surprise them by performing it',
        difficulty: 'hard',
        cost: 'free',
        timeNeeded: '2 weeks practice',
        icon: '💃',
        howTo: [
          'Choose their favorite song',
          'Learn a simple routine from YouTube',
          'Practice until you\'re confident',
          'Surprise them by performing it',
          'Invite them to join you',
        ],
        tips: [
          'Keep it simple and fun',
          'Film it for memories',
          'Don\'t worry about perfection',
          'End with a dramatic pose or kiss',
        ],
      },

      // Practical
      {
        id: 'practical-1',
        category: 'practical',
        title: 'Car Detailed & Gassed Up',
        description: 'Get their car detailed and fill up the tank as a surprise',
        difficulty: 'easy',
        cost: 'medium',
        timeNeeded: '2-3 hours',
        icon: '🚗',
        howTo: [
          'Take their car while they\'re occupied',
          'Get it professionally detailed',
          'Fill up the gas tank',
          'Leave a note on the dashboard',
          'Return it before they notice',
        ],
        tips: [
          'Make sure you have spare keys',
          'Vacuum it yourself if budget is tight',
          'Add an air freshener they like',
          'Leave some treats in the cup holder',
        ],
      },
      {
        id: 'practical-2',
        category: 'practical',
        title: 'Organize Their Workspace',
        description: 'Surprise them by organizing and beautifying their workspace',
        difficulty: 'medium',
        cost: 'low',
        timeNeeded: '2-3 hours',
        icon: '🖥️',
        howTo: [
          'Do it while they\'re away',
          'Organize desk and supplies',
          'Clean thoroughly',
          'Add a plant or decoration',
          'Stock supplies they need',
        ],
        tips: [
          'Don\'t throw anything away without asking',
          'Keep their system/layout similar',
          'Add something inspirational',
          'Include their favorite candy or snack',
        ],
      },

      // Grand
      {
        id: 'grand-1',
        category: 'grand',
        title: 'Surprise Weekend Getaway',
        description: 'Plan a complete surprise weekend trip with everything arranged',
        difficulty: 'hard',
        cost: 'high',
        timeNeeded: '2 weeks planning',
        icon: '✈️',
        howTo: [
          'Choose a destination they\'d love',
          'Book accommodations and activities',
          'Pack their bag secretly',
          'Clear their schedule (coordinate with work/friends)',
          'Surprise them at the last moment',
        ],
        tips: [
          'Make sure their passport is current',
          'Check the weather for the destination',
          'Pack essentials but make them feel spontaneous',
          'Coordinate with their boss/friends',
        ],
      },
      {
        id: 'grand-2',
        category: 'grand',
        title: 'Commission Custom Art',
        description: 'Commission an artist to create custom artwork of you both',
        difficulty: 'medium',
        cost: 'high',
        timeNeeded: '1 month',
        icon: '🎨',
        howTo: [
          'Find an artist whose style you both like',
          'Choose photos for reference',
          'Commission the piece',
          'Have it framed',
          'Present it on a special occasion',
        ],
        tips: [
          'Choose a meaningful photo',
          'Consider different art styles',
          'Frame it professionally',
          'Present it with the story behind it',
        ],
      },

      // Batman Special
      {
        id: 'batman-1',
        category: 'fun',
        title: 'Batman-Style Secret Mission',
        description: 'Create a spy/superhero themed surprise adventure',
        difficulty: 'hard',
        cost: 'medium',
        timeNeeded: '1 week',
        icon: '🦇',
        howTo: [
          'Create "mission briefing" document',
          'Set up Batman/spy themed challenges',
          'Each completed mission leads to next clue',
          'Final mission reveals the surprise',
          'Use Batman quotes and themes throughout',
        ],
        tips: [
          'Use dramatic music',
          'Dress up if you\'re brave',
          'Include fun "gadgets"',
          '"Even Batman needs a partner" - end with this',
        ],
      },
    ];
  }

  /**
   * Get random surprise
   */
  static getRandomSurprise(): Surprise {
    const surprises = this.getAllSurprises();
    return surprises[Math.floor(Math.random() * surprises.length)];
  }

  /**
   * Get surprise by category
   */
  static getSurprisesByCategory(category: Surprise['category']): Surprise[] {
    return this.getAllSurprises().filter(s => s.category === category);
  }

  /**
   * Get surprise by difficulty
   */
  static getSurprisesByDifficulty(difficulty: Surprise['difficulty']): Surprise[] {
    return this.getAllSurprises().filter(s => s.difficulty === difficulty);
  }

  /**
   * Get surprise by budget
   */
  static getSurprisesByBudget(budget: Surprise['cost']): Surprise[] {
    return this.getAllSurprises().filter(s => s.cost === budget);
  }

  /**
   * Get filtered surprises
   */
  static getFilteredSurprises(filters: {
    category?: Surprise['category'];
    difficulty?: Surprise['difficulty'];
    cost?: Surprise['cost'];
  }): Surprise[] {
    let surprises = this.getAllSurprises();

    if (filters.category) {
      surprises = surprises.filter(s => s.category === filters.category);
    }

    if (filters.difficulty) {
      surprises = surprises.filter(s => s.difficulty === filters.difficulty);
    }

    if (filters.cost) {
      surprises = surprises.filter(s => s.cost === filters.cost);
    }

    return surprises;
  }

  /**
   * Get Batman's surprise wisdom
   */
  static getBatmanSurpriseWisdom(): string[] {
    return [
      "Surprise is my greatest weapon. Use it to delight, not frighten.",
      "Even the smallest surprise can have the biggest impact. -Batman",
      "Plan your surprises like you plan to save Gotham - with precision and heart.",
      "Robin loves surprises. So does your partner. Never stop surprising them.",
      "The best surprises come from knowing your partner better than they know themselves.",
      "Gotham taught me: timing is everything. Surprise them when they least expect it (but most need it).",
    ];
  }
}
