/**
 * Anniversary Screen
 * Celebrate your relationship milestones
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { AnniversaryService, Anniversary } from '../services/anniversaryService';

const AnniversaryScreen = () => {
  const { couple } = useStore();
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [todayAnniversary, setTodayAnniversary] = useState<Anniversary | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Celebration animations
  const confettiScale = useSharedValue(0);
  const heartScale = useSharedValue(1);

  useEffect(() => {
    if (couple?.relationshipStart) {
      // Load anniversaries
      const annList = AnniversaryService.calculateAnniversaries(new Date(couple.relationshipStart));
      setAnniversaries(annList.slice(0, 10)); // Show last 10

      // Check today's anniversary
      const today = AnniversaryService.checkTodayAnniversary(new Date(couple.relationshipStart));
      setTodayAnniversary(today);

      // Get stats
      const annStats = AnniversaryService.getAnniversaryStats(new Date(couple.relationshipStart));
      setStats(annStats);

      // Get suggestions
      const suggest = AnniversaryService.getAnniversarySuggestions(annStats.totalMonths);
      setSuggestions(suggest);

      // Trigger celebrations if today is an anniversary
      if (today) {
        triggerCelebration();
      }
    }
  }, [couple]);

  useEffect(() => {
    // Heartbeat animation
    heartScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const triggerCelebration = () => {
    confettiScale.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) })
    );
  };

  const confettiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confettiScale.value }],
    opacity: confettiScale.value,
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleScheduleNotifications = async () => {
    if (couple?.relationshipStart) {
      await AnniversaryService.scheduleAnniversaryNotifications(new Date(couple.relationshipStart));
      Alert.alert('Success!', 'Anniversary notifications scheduled! 🎉');
    }
  };

  if (!couple?.relationshipStart) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text variant="hero">💕</Text>
          <Text variant="h2" style={styles.emptyText}>
            Set Your Relationship Start Date
          </Text>
          <Text variant="body" style={styles.emptySubtext}>
            Go to Profile to set your relationship start date and start tracking anniversaries!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary.tulipWhite, colors.background.light]}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Confetti Overlay */}
          {todayAnniversary && (
            <Animated.View style={[styles.confetti, confettiStyle]}>
              <Text style={styles.confettiEmoji}>🎊🎉✨💕🌟🎊🎉✨💕🌟</Text>
            </Animated.View>
          )}

          {/* Header */}
          <View style={styles.header}>
            <Animated.View style={heartStyle}>
              <Text variant="hero">💕</Text>
            </Animated.View>
            <Text variant="h1" style={styles.title}>
              Our Anniversaries
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Celebrating every moment together
            </Text>
          </View>

          {/* Today's Anniversary Banner */}
          {todayAnniversary && (
            <Card style={styles.todayBanner} variant="purple">
              <Text variant="h2" style={styles.todayIcon}>
                🎊
              </Text>
              <Text variant="h2" style={styles.todayTitle}>
                {todayAnniversary.title}
              </Text>
              <Text variant="body" style={styles.todayMessage}>
                {todayAnniversary.message}
              </Text>
              <Button
                title="🎉 Celebrate!"
                onPress={triggerCelebration}
                variant="primary"
                style={styles.celebrateButton}
              />
            </Card>
          )}

          {/* Stats */}
          {stats && (
            <Card style={styles.statsCard}>
              <Text variant="h3" style={styles.sectionTitle}>
                Time Together
              </Text>
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text variant="h1" style={styles.statNumber}>
                    {stats.totalDays}
                  </Text>
                  <Text variant="caption">Days</Text>
                </View>
                <View style={styles.statBox}>
                  <Text variant="h1" style={styles.statNumber}>
                    {stats.totalMonths}
                  </Text>
                  <Text variant="caption">Months</Text>
                </View>
                <View style={styles.statBox}>
                  <Text variant="h1" style={styles.statNumber}>
                    {stats.totalHours.toLocaleString()}
                  </Text>
                  <Text variant="caption">Hours</Text>
                </View>
              </View>

              {stats.nextMilestone && (
                <View style={styles.nextMilestone}>
                  <Text variant="bodySmall" style={styles.nextMilestoneText}>
                    🎯 Next milestone: {stats.nextMilestone.label} in{' '}
                    {stats.nextMilestone.days - stats.totalDays} days!
                  </Text>
                </View>
              )}
            </Card>
          )}

          {/* Celebration Suggestions */}
          <Card style={styles.suggestionsCard} variant="pink">
            <Text variant="h3" style={styles.sectionTitle}>
              💡 Celebration Ideas
            </Text>
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Text variant="body">• {suggestion}</Text>
              </View>
            ))}
          </Card>

          {/* Anniversary Timeline */}
          <Text variant="h3" style={styles.sectionHeader}>
            🎉 MILESTONE TIMELINE
          </Text>
          {anniversaries.map((anniversary, index) => {
            const isPast = anniversary.date < new Date();
            return (
              <Card key={index} style={styles.anniversaryCard}>
                <View style={styles.anniversaryHeader}>
                  <Text variant="h2">
                    {anniversary.type === 'yearly'
                      ? '🎂'
                      : anniversary.type === 'special'
                      ? '🌟'
                      : '💕'}
                  </Text>
                  <View style={styles.anniversaryInfo}>
                    <Text variant="h3" style={styles.anniversaryTitle}>
                      {anniversary.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.anniversaryDate}>
                      {anniversary.date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                  {isPast && (
                    <Text variant="caption" style={styles.completedBadge}>
                      ✓ Celebrated
                    </Text>
                  )}
                </View>
              </Card>
            );
          })}

          {/* Schedule Notifications */}
          <Card style={styles.notificationCard}>
            <Text variant="h3" style={styles.sectionTitle}>
              🔔 Never Forget
            </Text>
            <Text variant="body" style={styles.notificationText}>
              Get reminded about upcoming anniversaries so you can plan something special!
            </Text>
            <Button
              title="Schedule Anniversary Reminders"
              onPress={handleScheduleNotifications}
              variant="secondary"
              style={styles.scheduleButton}
            />
          </Card>

          {/* Batman Wisdom */}
          <Card style={styles.batmanCard}>
            <Text variant="h2">🦇</Text>
            <Text variant="h3" style={styles.batmanTitle}>
              Batman's Anniversary Wisdom
            </Text>
            <Text variant="body" style={styles.batmanText}>
              "Even the Dark Knight knows that celebrating love is the greatest superpower. Never forget your anniversaries, Robin!"
            </Text>
          </Card>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  gradient: {
    flex: 1,
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  confettiEmoji: {
    fontSize: 40,
    letterSpacing: 10,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.primary.sharedPurple,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.light.secondary,
    textAlign: 'center',
  },
  todayBanner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  todayIcon: {
    marginBottom: spacing.sm,
  },
  todayTitle: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  todayMessage: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  celebrateButton: {
    marginTop: spacing.sm,
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
    marginBottom: spacing.md,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
  },
  nextMilestone: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.text.light.disabled,
  },
  nextMilestoneText: {
    textAlign: 'center',
    color: colors.primary.tulipRed,
  },
  suggestionsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  suggestionItem: {
    paddingVertical: spacing.xs,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  anniversaryCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  anniversaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  anniversaryInfo: {
    flex: 1,
  },
  anniversaryTitle: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
  },
  anniversaryDate: {
    color: colors.text.light.secondary,
  },
  completedBadge: {
    color: colors.semantic.success,
    fontWeight: '600',
  },
  notificationCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  notificationText: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  scheduleButton: {
    marginTop: spacing.sm,
  },
  batmanCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    backgroundColor: colors.accent.batmanDark + '10',
  },
  batmanTitle: {
    color: colors.accent.batmanDark,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  batmanText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: colors.accent.batmanDark,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.primary.sharedPurple,
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: spacing.sm,
    color: colors.text.light.secondary,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default AnniversaryScreen;
