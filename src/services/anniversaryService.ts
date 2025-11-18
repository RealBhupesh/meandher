/**
 * Anniversary Service
 * Automatic anniversary tracking and celebration
 */

import { NotificationService } from './notificationService';

export interface Anniversary {
  type: 'monthly' | 'yearly' | 'special';
  date: Date;
  monthsCount?: number;
  yearsCount?: number;
  title: string;
  message: string;
}

export class AnniversaryService {
  /**
   * Calculate all anniversaries from relationship start
   */
  static calculateAnniversaries(relationshipStart: Date): Anniversary[] {
    const anniversaries: Anniversary[] = [];
    const now = new Date();
    const start = new Date(relationshipStart);

    // Calculate months and years
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const monthsCount = Math.floor(diffDays / 30);
    const yearsCount = Math.floor(monthsCount / 12);

    // Monthly anniversaries
    for (let i = 1; i <= monthsCount; i++) {
      const monthDate = new Date(start);
      monthDate.setMonth(start.getMonth() + i);

      anniversaries.push({
        type: 'monthly',
        date: monthDate,
        monthsCount: i,
        title: `${i} Month${i > 1 ? 's' : ''} Together`,
        message: `Celebrating ${i} amazing month${i > 1 ? 's' : ''} of love! 💕`,
      });
    }

    // Yearly anniversaries
    for (let i = 1; i <= yearsCount; i++) {
      const yearDate = new Date(start);
      yearDate.setFullYear(start.getFullYear() + i);

      anniversaries.push({
        type: 'yearly',
        date: yearDate,
        yearsCount: i,
        title: `${i} Year${i > 1 ? 's' : ''} Anniversary`,
        message: `🎉 ${i} incredible year${i > 1 ? 's' : ''} together! Here's to many more! 🥂`,
      });
    }

    // Special milestones
    const specialMilestones = [100, 365, 500, 730, 1000, 1095, 1825];
    specialMilestones.forEach(days => {
      if (diffDays >= days) {
        const milestoneDate = new Date(start);
        milestoneDate.setDate(start.getDate() + days);

        anniversaries.push({
          type: 'special',
          date: milestoneDate,
          title: `${days} Days Together!`,
          message: `Special milestone: ${days} days of love and happiness! 🌟`,
        });
      }
    });

    return anniversaries.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get upcoming anniversary
   */
  static getUpcomingAnniversary(relationshipStart: Date): Anniversary | null {
    const now = new Date();
    const start = new Date(relationshipStart);

    // Calculate next monthly anniversary
    const currentMonth = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const nextMonthDate = new Date(start);
    nextMonthDate.setMonth(start.getMonth() + currentMonth + 1);

    if (nextMonthDate > now) {
      return {
        type: 'monthly',
        date: nextMonthDate,
        monthsCount: currentMonth + 1,
        title: `${currentMonth + 1} Months Together`,
        message: `Get ready to celebrate ${currentMonth + 1} months of love! 💕`,
      };
    }

    return null;
  }

  /**
   * Check if today is an anniversary
   */
  static checkTodayAnniversary(relationshipStart: Date): Anniversary | null {
    const anniversaries = this.calculateAnniversaries(relationshipStart);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return anniversaries.find(ann => {
      const annDate = new Date(ann.date);
      annDate.setHours(0, 0, 0, 0);
      return annDate.getTime() === today.getTime();
    }) || null;
  }

  /**
   * Schedule anniversary notifications
   */
  static async scheduleAnniversaryNotifications(relationshipStart: Date): Promise<void> {
    const upcoming = this.getUpcomingAnniversary(relationshipStart);

    if (upcoming) {
      // Schedule notification 1 day before
      const oneDayBefore = new Date(upcoming.date);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);
      oneDayBefore.setHours(10, 0, 0, 0);

      if (oneDayBefore > new Date()) {
        await NotificationService.scheduleNotification(
          'Anniversary Tomorrow! 🎉',
          `Tomorrow you'll celebrate ${upcoming.title}. Plan something special! 💕`,
          oneDayBefore
        );
      }

      // Schedule notification on the day
      const anniversaryDay = new Date(upcoming.date);
      anniversaryDay.setHours(9, 0, 0, 0);

      if (anniversaryDay > new Date()) {
        await NotificationService.scheduleNotification(
          `Happy ${upcoming.title}! 🎊`,
          upcoming.message,
          anniversaryDay
        );
      }
    }
  }

  /**
   * Generate anniversary celebration suggestions
   */
  static getAnniversarySuggestions(monthsCount: number): string[] {
    const suggestions: string[] = [];

    // Basic suggestions
    suggestions.push('Write a heartfelt love letter');
    suggestions.push('Create a photo collage of your favorite memories');
    suggestions.push('Cook a special dinner together');
    suggestions.push('Watch your favorite movie together');
    suggestions.push('Exchange thoughtful gifts');

    // Month-specific suggestions
    if (monthsCount >= 6) {
      suggestions.push('Plan a weekend getaway');
      suggestions.push('Try a new restaurant you\'ve been wanting to visit');
      suggestions.push('Create a couple\'s bucket list for the next 6 months');
    }

    if (monthsCount >= 12) {
      suggestions.push('Recreate your first date');
      suggestions.push('Write down your favorite memories from the past year');
      suggestions.push('Plan a special trip');
      suggestions.push('Exchange promise rings or meaningful jewelry');
    }

    if (monthsCount >= 24) {
      suggestions.push('Have a photoshoot together');
      suggestions.push('Create a time capsule to open in another year');
      suggestions.push('Volunteer together for a cause you both care about');
    }

    // Batman's wisdom
    suggestions.push('🦇 Batman says: "Celebrate like Gotham depends on it!"');

    return suggestions;
  }

  /**
   * Get anniversary statistics
   */
  static getAnniversaryStats(relationshipStart: Date): {
    totalDays: number;
    totalMonths: number;
    totalYears: number;
    totalHours: number;
    nextMilestone: { days: number; label: string } | null;
  } {
    const now = new Date();
    const start = new Date(relationshipStart);
    const diffTime = now.getTime() - start.getTime();

    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMonths = Math.floor(totalDays / 30);
    const totalYears = Math.floor(totalMonths / 12);

    // Find next milestone
    const milestones = [
      { days: 100, label: '100 Days' },
      { days: 365, label: '1 Year' },
      { days: 500, label: '500 Days' },
      { days: 730, label: '2 Years' },
      { days: 1000, label: '1000 Days' },
      { days: 1095, label: '3 Years' },
      { days: 1825, label: '5 Years' },
      { days: 3650, label: '10 Years' },
    ];

    const nextMilestone = milestones.find(m => m.days > totalDays) || null;

    return {
      totalDays,
      totalMonths,
      totalYears,
      totalHours,
      nextMilestone,
    };
  }
}
