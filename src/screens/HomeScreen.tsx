/**
 * Home Screen
 * Main dashboard showing "Our Universe"
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';

const HomeScreen = ({ navigation }: any) => {
  const { currentUser, partner, couple, tasks, dreams, watchList, memories } = useStore();

  // Calculate days together
  const getDaysTogether = () => {
    if (!couple?.relationshipStart) return { months: 0, days: 0 };
    const start = new Date(couple.relationshipStart);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    return { months, days };
  };

  const { months, days } = getDaysTogether();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary.tulipWhite, colors.background.light]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text variant="h2">👧</Text>
              </View>
              <Text variant="h1" style={styles.title}>
                Gayu & B
              </Text>
              <View style={styles.avatar}>
                <Text variant="h2">👦</Text>
              </View>
            </View>

            <View style={styles.heartContainer}>
              <Text variant="h2">💗</Text>
            </View>

            <Text variant="body" style={styles.togetherText}>
              Together for: {months} months, {days} days 🌷
            </Text>
          </View>

          {/* Tulip Garden Preview */}
          <Card style={styles.gardenCard} variant="purple">
            <Text variant="h3" style={styles.sectionTitle}>
              🌷 Our Tulip Garden
            </Text>
            <View style={styles.tulipPreview}>
              <Text variant="hero">🌷🌷🌷🌷🌷</Text>
            </View>
            <Text variant="bodySmall" style={styles.centered}>
              {247} tulips planted
            </Text>
          </Card>

          {/* Quick Access Cards */}
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionHeader}>
              🌸 TODAY'S MAGIC 🌸
            </Text>

            <View style={styles.cardGrid}>
              <TouchableOpacity
                style={styles.quickCard}
                onPress={() => navigation.navigate('Tasks')}
              >
                <Card variant="light">
                  <Ionicons
                    name="checkmark-circle"
                    size={32}
                    color={colors.primary.sharedPurple}
                  />
                  <Text variant="h3" style={styles.cardTitle}>
                    To-Do List
                  </Text>
                  <Text variant="bodySmall">
                    {tasks.filter(t => !t.completed).length} tasks
                  </Text>
                  <Text variant="caption">🌷🌷🌷</Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickCard}
                onPress={() => navigation.navigate('Goals')}
              >
                <Card variant="light">
                  <Ionicons
                    name="flag"
                    size={32}
                    color={colors.primary.tulipRed}
                  />
                  <Text variant="h3" style={styles.cardTitle}>
                    Bucket List
                  </Text>
                  <Text variant="bodySmall">
                    {dreams.length} dreams
                  </Text>
                  <Text variant="caption">💫 Next: Paris</Text>
                </Card>
              </TouchableOpacity>
            </View>

            <View style={styles.cardGrid}>
              <TouchableOpacity
                style={styles.quickCard}
                onPress={() => navigation.navigate('WatchList')}
              >
                <Card variant="light">
                  <Ionicons
                    name="film"
                    size={32}
                    color={colors.primary.bBlue}
                  />
                  <Text variant="h3" style={styles.cardTitle}>
                    Watch List
                  </Text>
                  <Text variant="bodySmall">
                    {watchList.filter(w => !w.watched).length} to watch
                  </Text>
                  <Text variant="caption">🎬 Next: Dune 2</Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickCard}
                onPress={() => navigation.navigate('Memories')}
              >
                <Card variant="light">
                  <Ionicons
                    name="heart"
                    size={32}
                    color={colors.primary.tulipRed}
                  />
                  <Text variant="h3" style={styles.cardTitle}>
                    Memories
                  </Text>
                  <Text variant="bodySmall">
                    {memories.length} moments
                  </Text>
                  <Text variant="caption">📸 Latest: Today</Text>
                </Card>
              </TouchableOpacity>
            </View>

            <View style={styles.cardGrid}>
              <TouchableOpacity
                style={styles.quickCard}
                onPress={() => navigation.navigate('Calendar')}
              >
                <Card variant="light">
                  <Ionicons
                    name="calendar"
                    size={32}
                    color={colors.primary.sharedPurple}
                  />
                  <Text variant="h3" style={styles.cardTitle}>
                    Calendar
                  </Text>
                  <Text variant="bodySmall">
                    Our schedule
                  </Text>
                  <Text variant="caption">📅 Together</Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickCard}
                onPress={() => {
                  // Batman surprise - could navigate to a special feature
                  console.log('Batman easter egg!');
                }}
              >
                <Card variant="light" style={{ backgroundColor: colors.accent.batmanDark + '10' }}>
                  <Text variant="h2">🦇</Text>
                  <Text variant="h3" style={styles.cardTitle}>
                    Batcave
                  </Text>
                  <Text variant="bodySmall">
                    Secret features
                  </Text>
                  <Text variant="caption">🦇 Explore</Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>

          {/* Calendar Preview */}
          <Card style={styles.calendarCard}>
            <Text variant="h3" style={styles.sectionTitle}>
              📅 Our Calendar
            </Text>
            <View style={styles.eventItem}>
              <Text variant="body">• Tomorrow: Date Night 🍝</Text>
            </View>
            <View style={styles.eventItem}>
              <Text variant="body">• Friday: Movie Marathon 🎬</Text>
            </View>
            <View style={styles.eventItem}>
              <Text variant="body">• Next Week: Anniversary! 🎉</Text>
            </View>
          </Card>

          {/* Batman Easter Egg */}
          <View style={styles.batmanContainer}>
            <Text variant="caption" style={styles.batmanText}>
              🦇 Gotham is safe... and so is your love! 💙
            </Text>
          </View>

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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.primary.sharedPurple,
  },
  heartContainer: {
    marginTop: spacing.sm,
  },
  togetherText: {
    marginTop: spacing.md,
    color: colors.text.light.secondary,
  },
  gardenCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tulipPreview: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.primary.tulipRed,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  cardGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  quickCard: {
    flex: 1,
  },
  cardTitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  calendarCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  eventItem: {
    paddingVertical: spacing.xs,
  },
  centered: {
    textAlign: 'center',
  },
  batmanContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  batmanText: {
    fontStyle: 'italic',
    color: colors.accent.batmanDark,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default HomeScreen;
