/**
 * Date Suggestion Service
 * AI-powered (algorithm-based) date suggestions
 */

import { Task, Dream, Memory, WatchItem } from '../types';

export interface DateSuggestion {
  id: string;
  category: 'romantic' | 'adventure' | 'relaxing' | 'creative' | 'food' | 'cultural' | 'active';
  title: string;
  description: string;
  estimatedCost: 'free' | 'low' | 'medium' | 'high';
  estimatedDuration: string;
  activities: string[];
  bestTime: string;
  tips: string[];
  icon: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  season?: 'spring' | 'summer' | 'fall' | 'winter' | 'any';
}

export class DateSuggestionService {
  /**
   * Generate personalized date suggestions based on couple's data
   */
  static generateSuggestions(params: {
    tasks: Task[];
    dreams: Dream[];
    memories: Memory[];
    watchList: WatchItem[];
    relationshipMonths: number;
    budget?: 'any' | 'free' | 'low' | 'medium' | 'high';
    mood?: 'romantic' | 'adventurous' | 'relaxing' | 'any';
  }): DateSuggestion[] {
    const { tasks, dreams, memories, watchList, relationshipMonths, budget = 'any', mood = 'any' } = params;

    let suggestions: DateSuggestion[] = [];

    // Analyze couple's preferences
    const preferences = this.analyzePreferences(tasks, dreams, memories, watchList);

    // Get base suggestions
    const allSuggestions = this.getAllSuggestions();

    // Filter by mood
    if (mood !== 'any') {
      suggestions = allSuggestions.filter(s =>
        mood === 'romantic' ? s.category === 'romantic' :
        mood === 'adventurous' ? s.category === 'adventure' :
        mood === 'relaxing' ? s.category === 'relaxing' :
        true
      );
    } else {
      suggestions = [...allSuggestions];
    }

    // Filter by budget
    if (budget !== 'any') {
      suggestions = suggestions.filter(s => s.estimatedCost === budget);
    }

    // Score and sort suggestions based on preferences
    suggestions = suggestions.map(suggestion => ({
      ...suggestion,
      score: this.scoreSuggestion(suggestion, preferences, relationshipMonths),
    })).sort((a: any, b: any) => b.score - a.score);

    // Add personalized suggestions based on their data
    const personalizedSuggestions = this.getPersonalizedSuggestions(dreams, watchList);
    suggestions = [...personalizedSuggestions, ...suggestions];

    return suggestions.slice(0, 15); // Return top 15
  }

  /**
   * Analyze couple's preferences from their data
   */
  private static analyzePreferences(
    tasks: Task[],
    dreams: Dream[],
    memories: Memory[],
    watchList: WatchItem[]
  ): {
    favoriteCategories: string[];
    activityLevel: 'low' | 'medium' | 'high';
    romanticScore: number;
  } {
    const categories = dreams.map(d => d.category);
    const categoryCount: Record<string, number> = {};

    categories.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const favoriteCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);

    // Calculate activity level based on dreams and tasks
    const adventureDreams = dreams.filter(d => d.category === 'adventure').length;
    const activityLevel = adventureDreams > 5 ? 'high' : adventureDreams > 2 ? 'medium' : 'low';

    // Calculate romantic score
    const romanticDreams = dreams.filter(d => d.category === 'romance').length;
    const romanticMemories = memories.filter(m => m.mood === 'loved-it').length;
    const romanticScore = (romanticDreams * 2 + romanticMemories) / (dreams.length + memories.length || 1);

    return {
      favoriteCategories,
      activityLevel,
      romanticScore,
    };
  }

  /**
   * Score a suggestion based on preferences
   */
  private static scoreSuggestion(
    suggestion: DateSuggestion,
    preferences: any,
    relationshipMonths: number
  ): number {
    let score = 50; // Base score

    // Favorite categories bonus
    if (preferences.favoriteCategories.includes(suggestion.category)) {
      score += 20;
    }

    // Activity level matching
    if (preferences.activityLevel === 'high' && suggestion.category === 'adventure') {
      score += 15;
    } else if (preferences.activityLevel === 'low' && suggestion.category === 'relaxing') {
      score += 15;
    }

    // Romantic score bonus
    if (suggestion.category === 'romantic' && preferences.romanticScore > 0.7) {
      score += 25;
    }

    // Relationship stage bonus
    if (relationshipMonths < 6) {
      // New relationship - boost romantic and simple dates
      if (suggestion.category === 'romantic' || suggestion.difficulty === 'easy') {
        score += 10;
      }
    } else if (relationshipMonths > 12) {
      // Established relationship - boost adventure and unique dates
      if (suggestion.category === 'adventure' || suggestion.difficulty === 'challenging') {
        score += 10;
      }
    }

    return score;
  }

  /**
   * Get all base date suggestions
   */
  private static getAllSuggestions(): DateSuggestion[] {
    return [
      // Romantic
      {
        id: 'romantic-1',
        category: 'romantic',
        title: 'Sunset Picnic',
        description: 'Pack a basket with your favorite treats and watch the sunset together',
        estimatedCost: 'low',
        estimatedDuration: '2-3 hours',
        activities: ['Prepare picnic basket', 'Find scenic location', 'Watch sunset', 'Stargazing'],
        bestTime: 'Evening, during golden hour',
        tips: [
          'Bring a cozy blanket',
          'Pack finger foods that are easy to eat',
          'Download a stargazing app',
          'Bring a portable speaker for music',
        ],
        icon: '🌅',
        difficulty: 'easy',
        season: 'any',
      },
      {
        id: 'romantic-2',
        category: 'romantic',
        title: 'Home Spa Night',
        description: 'Transform your home into a relaxing spa retreat',
        estimatedCost: 'medium',
        estimatedDuration: '3-4 hours',
        activities: ['Set up spa atmosphere', 'Couples massage', 'Face masks', 'Bubble bath'],
        bestTime: 'Evening',
        tips: [
          'Light scented candles',
          'Prepare cucumber water',
          'Use essential oils',
          'Play relaxing music',
        ],
        icon: '🛁',
        difficulty: 'easy',
        season: 'any',
      },
      {
        id: 'romantic-3',
        category: 'romantic',
        title: 'Candlelit Dinner at Home',
        description: 'Cook a special meal together and dine by candlelight',
        estimatedCost: 'medium',
        estimatedDuration: '3-4 hours',
        activities: ['Plan menu', 'Shop for ingredients', 'Cook together', 'Romantic dinner'],
        bestTime: 'Evening',
        tips: [
          'Dress up for each other',
          'Set the table with nice dishes',
          'Make a new recipe together',
          'No phones at dinner',
        ],
        icon: '🕯️',
        difficulty: 'medium',
        season: 'any',
      },

      // Adventure
      {
        id: 'adventure-1',
        category: 'adventure',
        title: 'Hiking Adventure',
        description: 'Explore a new trail and discover nature together',
        estimatedCost: 'free',
        estimatedDuration: '4-6 hours',
        activities: ['Choose trail', 'Pack supplies', 'Hike', 'Take photos'],
        bestTime: 'Morning',
        tips: [
          'Bring plenty of water',
          'Wear comfortable shoes',
          'Pack snacks',
          'Check weather forecast',
        ],
        icon: '🥾',
        difficulty: 'medium',
        season: 'spring',
      },
      {
        id: 'adventure-2',
        category: 'adventure',
        title: 'Road Trip to Unknown',
        description: 'Pick a random direction and drive to somewhere new',
        estimatedCost: 'medium',
        estimatedDuration: 'Full day',
        activities: ['Choose direction', 'Drive', 'Explore stops', 'Find local food'],
        bestTime: 'All day',
        tips: [
          'Make a road trip playlist',
          'Pack road trip snacks',
          'Have a full tank of gas',
          'Be spontaneous with stops',
        ],
        icon: '🚗',
        difficulty: 'easy',
        season: 'any',
      },

      // Relaxing
      {
        id: 'relaxing-1',
        category: 'relaxing',
        title: 'Book Club for Two',
        description: 'Read the same book and discuss it over coffee',
        estimatedCost: 'low',
        estimatedDuration: 'Ongoing',
        activities: ['Choose book', 'Read together', 'Discuss chapters', 'Coffee date'],
        bestTime: 'Evening',
        tips: [
          'Pick a book you both find interesting',
          'Set reading goals',
          'Take notes for discussion',
          'Create a cozy reading nook',
        ],
        icon: '📚',
        difficulty: 'easy',
        season: 'any',
      },

      // Creative
      {
        id: 'creative-1',
        category: 'creative',
        title: 'Paint Night at Home',
        description: 'Set up an art studio at home and paint together',
        estimatedCost: 'low',
        estimatedDuration: '2-3 hours',
        activities: ['Get supplies', 'Set up workspace', 'Paint', 'Display art'],
        bestTime: 'Afternoon or evening',
        tips: [
          'No judgment - have fun!',
          'Try painting each other',
          'Use wine or mocktails',
          'Frame your favorite pieces',
        ],
        icon: '🎨',
        difficulty: 'easy',
        season: 'any',
      },
      {
        id: 'creative-2',
        category: 'creative',
        title: 'DIY Project Together',
        description: 'Build or create something for your home',
        estimatedCost: 'medium',
        estimatedDuration: '4-8 hours',
        activities: ['Choose project', 'Get materials', 'Work together', 'Enjoy creation'],
        bestTime: 'Weekend',
        tips: [
          'Start with a manageable project',
          'Watch tutorials together',
          'Delegate tasks',
          'Celebrate completion',
        ],
        icon: '🔨',
        difficulty: 'medium',
        season: 'any',
      },

      // Food
      {
        id: 'food-1',
        category: 'food',
        title: 'Food Tour in Your City',
        description: 'Visit multiple restaurants and try different cuisines',
        estimatedCost: 'high',
        estimatedDuration: '4-5 hours',
        activities: ['Plan route', 'Visit 4-5 spots', 'Try signature dishes', 'Rate places'],
        bestTime: 'Afternoon to evening',
        tips: [
          'Share dishes to try more',
          'Walk between locations',
          'Research best local spots',
          'Take food photos',
        ],
        icon: '🍽️',
        difficulty: 'easy',
        season: 'any',
      },
      {
        id: 'food-2',
        category: 'food',
        title: 'Cooking Challenge',
        description: 'Choose a cuisine neither of you has cooked and try it',
        estimatedCost: 'medium',
        estimatedDuration: '3-4 hours',
        activities: ['Choose cuisine', 'Find recipes', 'Shop', 'Cook together'],
        bestTime: 'Evening',
        tips: [
          'Make it fun, not stressful',
          'Watch cooking videos',
          'Get all ingredients ready first',
          'Enjoy the adventure',
        ],
        icon: '👨‍🍳',
        difficulty: 'medium',
        season: 'any',
      },

      // Cultural
      {
        id: 'cultural-1',
        category: 'cultural',
        title: 'Museum Hop',
        description: 'Visit museums and galleries in your area',
        estimatedCost: 'low',
        estimatedDuration: '4-5 hours',
        activities: ['Choose museums', 'Visit exhibits', 'Discuss art', 'Museum cafe'],
        bestTime: 'Afternoon',
        tips: [
          'Check for free admission days',
          'Don't rush through',
          'Take turns choosing exhibits',
          'Share your interpretations',
        ],
        icon: '🏛️',
        difficulty: 'easy',
        season: 'any',
      },

      // Active
      {
        id: 'active-1',
        category: 'active',
        title: 'Dance Class Together',
        description: 'Try a new dance style as a couple',
        estimatedCost: 'medium',
        estimatedDuration: '1-2 hours',
        activities: ['Find class', 'Take lesson', 'Practice together', 'Show off moves'],
        bestTime: 'Evening',
        tips: [
          'Choose beginner-friendly class',
          'Laugh at mistakes',
          'Practice at home',
          'Consider salsa or swing',
        ],
        icon: '💃',
        difficulty: 'medium',
        season: 'any',
      },
      {
        id: 'active-2',
        category: 'active',
        title: 'Bike Ride & Brunch',
        description: 'Bike to a new brunch spot together',
        estimatedCost: 'medium',
        estimatedDuration: '3-4 hours',
        activities: ['Plan route', 'Bike ride', 'Brunch', 'Bike back'],
        bestTime: 'Morning',
        tips: [
          'Check bike safety',
          'Plan safe route',
          'Research brunch spot',
          'Bring water bottles',
        ],
        icon: '🚴',
        difficulty: 'medium',
        season: 'spring',
      },
    ];
  }

  /**
   * Generate personalized suggestions based on couple's dreams and watch list
   */
  private static getPersonalizedSuggestions(
    dreams: Dream[],
    watchList: WatchItem[]
  ): DateSuggestion[] {
    const suggestions: DateSuggestion[] = [];

    // Movie night suggestion if they have unwatched items
    const unwatched = watchList.filter(w => !w.watched);
    if (unwatched.length > 0) {
      suggestions.push({
        id: 'personalized-movie',
        category: 'relaxing',
        title: 'Movie Marathon Night',
        description: `You have ${unwatched.length} movies/shows to watch! Perfect for a cozy night in.`,
        estimatedCost: 'free',
        estimatedDuration: '3-4 hours',
        activities: ['Choose from watch list', 'Prepare snacks', 'Set up cozy space', 'Watch together'],
        bestTime: 'Evening',
        tips: [
          'Make it a theme night',
          'Prepare movie snacks',
          'Turn off phones',
          'Cuddle up with blankets',
        ],
        icon: '🍿',
        difficulty: 'easy',
        season: 'any',
      });
    }

    // Dream-based suggestions
    const travelDreams = dreams.filter(d => d.category === 'travel' && d.status !== 'completed');
    if (travelDreams.length > 0) {
      suggestions.push({
        id: 'personalized-travel-plan',
        category: 'romantic',
        title: 'Dream Trip Planning Night',
        description: 'Plan your next adventure together over wine and wanderlust',
        estimatedCost: 'low',
        estimatedDuration: '2-3 hours',
        activities: ['Review bucket list', 'Research destinations', 'Create itinerary', 'Start saving plan'],
        bestTime: 'Evening',
        tips: [
          'Look at travel blogs together',
          'Create a Pinterest board',
          'Calculate rough budget',
          'Set a target date',
        ],
        icon: '✈️',
        difficulty: 'easy',
        season: 'any',
      });
    }

    return suggestions;
  }

  /**
   * Get Batman's date wisdom
   */
  static getBatmanWisdom(): string[] {
    return [
      "Even Batman takes time for date night. The city can wait.",
      "A great date is like a well-planned mission - preparation is key!",
      "Robin taught me: the best dates are the ones where you're fully present.",
      "Justice is important, but so is romance. Balance, young grasshopper.",
      "The Batmobile is impressive, but nothing beats a romantic evening together.",
      "Remember: it's not about the cost, it's about the effort and thought.",
    ];
  }
}
