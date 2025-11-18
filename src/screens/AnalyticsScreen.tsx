/**
 * Relationship Analytics Screen
 * Advanced insights and trends for your relationship
 */

import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Text, Card } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const { tasks, dreams, memories, watchList, loveNotes, events, couple } = useStore();

  // Calculate comprehensive statistics
  const analytics = useMemo(() => {
    // Task analytics
    const completedTasks = tasks.filter(t => t.completed).length;
    const taskCompletionRate = tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

    // Dream analytics
    const completedDreams = dreams.filter(d => d.status === 'completed').length;
    const inProgressDreams = dreams.filter(d => d.status === 'in-progress').length;
    const dreamProgress = dreams.length > 0
      ? Math.round((completedDreams / dreams.length) * 100)
      : 0;

    // Memory analytics
    const photoMemories = memories.filter(m => m.type === 'photo').length;
    const videoMemories = memories.filter(m => m.type === 'video').length;
    const favoriteMemories = memories.filter(m => m.favorite).length;
    const totalLikes = memories.reduce((sum, m) => sum + m.likes, 0);

    // Watch list analytics
    const watchedItems = watchList.filter(w => w.watched).length;
    const averageRating = watchList
      .filter(w => w.watched && w.yourRating)
      .reduce((sum, w) => sum + (w.yourRating || 0) + (w.partnerRating || 0), 0) /
      (watchedItems * 2) || 0;

    // Activity trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTasks = tasks.filter(t =>
      t.createdAt && new Date(t.createdAt) > thirtyDaysAgo
    ).length;
    const recentMemories = memories.filter(m =>
      new Date(m.createdAt) > thirtyDaysAgo
    ).length;
    const recentLoveNotes = loveNotes.filter(n =>
      new Date(n.createdAt) > thirtyDaysAgo
    ).length;

    // Milestone calculations
    const relationshipDays = couple?.relationshipStart
      ? Math.floor((new Date().getTime() - new Date(couple.relationshipStart).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      tasks: {
        total: tasks.length,
        completed: completedTasks,
        completionRate: taskCompletionRate,
      },
      dreams: {
        total: dreams.length,
        completed: completedDreams,
        inProgress: inProgressDreams,
        progress: dreamProgress,
      },
      memories: {
        total: memories.length,
        photos: photoMemories,
        videos: videoMemories,
        favorites: favoriteMemories,
        totalLikes,
      },
      watchList: {
        total: watchList.length,
        watched: watchedItems,
        averageRating: averageRating.toFixed(1),
      },
      recentActivity: {
        tasks: recentTasks,
        memories: recentMemories,
        loveNotes: recentLoveNotes,
      },
      milestones: {
        relationshipDays,
        tulipsEarned: (completedTasks * 2) + (completedDreams * 4),
        achievementsUnlocked: Math.floor(completedTasks / 10) + Math.floor(completedDreams / 5),
      },
    };
  }, [tasks, dreams, memories, watchList, loveNotes, couple]);

  // Generate insights
  const insights = useMemo(() => {
    const result = [];

    // Task insight
    if (analytics.tasks.completionRate >= 80) {
      result.push({
        icon: '🎯',
        title: 'Power Couple!',
        description: `You're crushing it with ${analytics.tasks.completionRate}% task completion!`,
        color: colors.primary.sharedPurple,
      });
    }

    // Dream insight
    if (analytics.dreams.inProgress >= 3) {
      result.push({
        icon: '🚀',
        title: 'Dream Chasers',
        description: `${analytics.dreams.inProgress} dreams actively in progress. Keep going!`,
        color: colors.primary.tulipRed,
      });
    }

    // Memory insight
    if (analytics.recentActivity.memories >= 5) {
      result.push({
        icon: '📸',
        title: 'Memory Makers',
        description: `${analytics.recentActivity.memories} new memories this month. Beautiful!`,
        color: colors.primary.gayuPink,
      });
    }

    // Love notes insight
    if (analytics.recentActivity.loveNotes >= 10) {
      result.push({
        icon: '💕',
        title: 'Love Language Champions',
        description: `${analytics.recentActivity.loveNotes} love notes this month. So romantic!`,
        color: colors.primary.tulipRed,
      });
    }

    // Milestone insight
    const monthsCount = Math.floor(analytics.milestones.relationshipDays / 30);
    if (monthsCount % 6 === 0 && monthsCount > 0) {
      result.push({
        icon: '🎉',
        title: 'Milestone Alert!',
        description: `${monthsCount} months together! Time flies when you're in love.`,
        color: colors.primary.sharedPurple,
      });
    }

    // Batman wisdom
    result.push({
      icon: '🦇',
      title: 'Batman Says',
      description: '"A strong relationship is built on trust, communication, and... completing your tasks together!"',
      color: colors.accent.batmanDark,
    });

    return result;
  }, [analytics]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            📊 Relationship Analytics
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Your journey together, by the numbers
          </Text>
        </View>

        {/* Overview Stats */}
        <Card style={styles.statsCard} variant="purple">
          <Text variant="h3" style={styles.sectionTitle}>
            Overview
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text variant="h1" style={styles.statNumber}>
                {analytics.milestones.relationshipDays}
              </Text>
              <Text variant="caption">Days Together</Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="h1" style={styles.statNumber}>
                {analytics.milestones.tulipsEarned}
              </Text>
              <Text variant="caption">🌷 Tulips</Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="h1" style={styles.statNumber}>
                {analytics.milestones.achievementsUnlocked}
              </Text>
              <Text variant="caption">Achievements</Text>
            </View>
          </View>
        </Card>

        {/* Task Analytics */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.cardTitle}>
            ✅ Task Performance
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${analytics.tasks.completionRate}%` },
              ]}
            />
          </View>
          <Text variant="bodySmall" style={styles.progressText}>
            {analytics.tasks.completed} of {analytics.tasks.total} completed ({analytics.tasks.completionRate}%)
          </Text>
          <View style={styles.miniStats}>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.tasks.completed}</Text>
              <Text variant="caption">Completed</Text>
            </View>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.tasks.total - analytics.tasks.completed}</Text>
              <Text variant="caption">Pending</Text>
            </View>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.recentActivity.tasks}</Text>
              <Text variant="caption">This Month</Text>
            </View>
          </View>
        </Card>

        {/* Dream Analytics */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.cardTitle}>
            🎯 Dream Progress
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${analytics.dreams.progress}%`, backgroundColor: colors.primary.tulipRed },
              ]}
            />
          </View>
          <Text variant="bodySmall" style={styles.progressText}>
            {analytics.dreams.completed} of {analytics.dreams.total} achieved ({analytics.dreams.progress}%)
          </Text>
          <View style={styles.miniStats}>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.dreams.completed}</Text>
              <Text variant="caption">Achieved</Text>
            </View>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.dreams.inProgress}</Text>
              <Text variant="caption">In Progress</Text>
            </View>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.dreams.total - analytics.dreams.completed - analytics.dreams.inProgress}</Text>
              <Text variant="caption">Upcoming</Text>
            </View>
          </View>
        </Card>

        {/* Memory Analytics */}
        <Card style={styles.card} variant="pink">
          <Text variant="h3" style={styles.cardTitle}>
            💝 Memory Collection
          </Text>
          <View style={styles.memoryGrid}>
            <View style={styles.memoryStat}>
              <Text variant="h2">{analytics.memories.total}</Text>
              <Text variant="caption">Total Memories</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text variant="h2">{analytics.memories.photos}</Text>
              <Text variant="caption">📸 Photos</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text variant="h2">{analytics.memories.videos}</Text>
              <Text variant="caption">🎥 Videos</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text variant="h2">{analytics.memories.favorites}</Text>
              <Text variant="caption">❤️ Favorites</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text variant="h2">{analytics.memories.totalLikes}</Text>
              <Text variant="caption">Total Hearts</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text variant="h2">{analytics.recentActivity.memories}</Text>
              <Text variant="caption">This Month</Text>
            </View>
          </View>
        </Card>

        {/* Watch List Analytics */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.cardTitle}>
            🎬 Watch List Stats
          </Text>
          <View style={styles.miniStats}>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.watchList.watched}</Text>
              <Text variant="caption">Watched</Text>
            </View>
            <View style={styles.miniStat}>
              <Text variant="h2">{analytics.watchList.total - analytics.watchList.watched}</Text>
              <Text variant="caption">To Watch</Text>
            </View>
            <View style={styles.miniStat}>
              <Text variant="h2">⭐ {analytics.watchList.averageRating}</Text>
              <Text variant="caption">Avg Rating</Text>
            </View>
          </View>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.cardTitle}>
            📈 Last 30 Days
          </Text>
          <View style={styles.activityItem}>
            <Text variant="body">✅ {analytics.recentActivity.tasks} tasks created</Text>
          </View>
          <View style={styles.activityItem}>
            <Text variant="body">📸 {analytics.recentActivity.memories} memories captured</Text>
          </View>
          <View style={styles.activityItem}>
            <Text variant="body">💕 {analytics.recentActivity.loveNotes} love notes exchanged</Text>
          </View>
        </Card>

        {/* Insights */}
        <Text variant="h3" style={styles.sectionHeader}>
          💡 INSIGHTS & TRENDS
        </Text>
        {insights.map((insight, index) => (
          <Card key={index} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Text variant="h2">{insight.icon}</Text>
              <Text variant="h3" style={[styles.insightTitle, { color: insight.color }]}>
                {insight.title}
              </Text>
            </View>
            <Text variant="body">{insight.description}</Text>
          </Card>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.light.secondary,
    textAlign: 'center',
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.text.light.disabled,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.sharedPurple,
  },
  progressText: {
    color: colors.text.light.secondary,
    marginBottom: spacing.md,
  },
  miniStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  miniStat: {
    alignItems: 'center',
  },
  memoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  memoryStat: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityItem: {
    paddingVertical: spacing.xs,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.md,
    color: colors.primary.sharedPurple,
  },
  insightCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  insightTitle: {
    flex: 1,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default AnalyticsScreen;
