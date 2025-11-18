/**
 * 3D Tulip Garden Screen
 * Interactive visualization of achievements
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Text, Card } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';

const { width, height } = Dimensions.get('window');
const TULIP_SIZE = 40;
const GARDEN_WIDTH = width - spacing.lg * 2;
const GARDEN_HEIGHT = 400;

interface TulipPosition {
  x: number;
  y: number;
  color: string;
  type: string;
  title: string;
  delay: number;
}

const TulipGardenScreen = () => {
  const { tasks, dreams, memories, watchList } = useStore();

  // Calculate tulip positions based on achievements
  const tulips: TulipPosition[] = [];

  // Tasks completed
  tasks.filter(t => t.completed).forEach((task, index) => {
    tulips.push({
      x: (index % 6) * (GARDEN_WIDTH / 6) + 20,
      y: Math.floor(index / 6) * 60 + 20,
      color: colors.primary.tulipYellow,
      type: 'task',
      title: task.title,
      delay: index * 50,
    });
  });

  // Dreams achieved
  dreams.filter(d => d.status === 'completed').forEach((dream, index) => {
    tulips.push({
      x: (index % 6) * (GARDEN_WIDTH / 6) + 20,
      y: Math.floor(index / 6) * 60 + 200,
      color: colors.primary.sharedPurple,
      type: 'dream',
      title: dream.title,
      delay: index * 50 + 300,
    });
  });

  // Memories created
  memories.forEach((memory, index) => {
    if (index < 10) { // Limit to 10 for visualization
      tulips.push({
        x: (index % 6) * (GARDEN_WIDTH / 6) + 20,
        y: Math.floor(index / 6) * 60 + 300,
        color: colors.primary.gayuPink,
        type: 'memory',
        title: memory.caption || 'Memory',
        delay: index * 50 + 500,
      });
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            🌷 Our Tulip Garden
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Every tulip represents a beautiful moment together
          </Text>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard} variant="purple">
          <Text variant="h3" style={styles.statsTitle}>
            Garden Stats
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text variant="h2">{tulips.length}</Text>
              <Text variant="caption">Total Tulips</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{tasks.filter(t => t.completed).length}</Text>
              <Text variant="caption">💛 Tasks</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{dreams.filter(d => d.status === 'completed').length}</Text>
              <Text variant="caption">💜 Dreams</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{Math.min(memories.length, 10)}</Text>
              <Text variant="caption">💕 Memories</Text>
            </View>
          </View>
        </Card>

        {/* 3D Garden Visualization */}
        <Card style={styles.gardenCard}>
          <View style={styles.garden}>
            {/* Grass background */}
            <View style={styles.grass} />

            {/* Render tulips */}
            {tulips.map((tulip, index) => (
              <AnimatedTulip
                key={`tulip-${index}`}
                position={tulip}
                index={index}
              />
            ))}

            {/* Sun */}
            <AnimatedSun />
          </View>
        </Card>

        {/* Legend */}
        <Card style={styles.legendCard}>
          <Text variant="h3" style={styles.legendTitle}>
            Legend
          </Text>
          <View style={styles.legendItem}>
            <Text variant="h2">🌷</Text>
            <Text variant="body" style={styles.legendText}>
              Yellow = Completed Tasks
            </Text>
          </View>
          <View style={styles.legendItem}>
            <Text variant="h2">🌷</Text>
            <Text variant="body" style={styles.legendText}>
              Purple = Achieved Dreams
            </Text>
          </View>
          <View style={styles.legendItem}>
            <Text variant="h2">🌷</Text>
            <Text variant="body" style={styles.legendText}>
              Pink = Cherished Memories
            </Text>
          </View>
        </Card>

        {/* Fun Facts */}
        <Card style={styles.funFactsCard} variant="pink">
          <Text variant="h3" style={styles.funFactsTitle}>
            🦇 Batman's Garden Tips
          </Text>
          <Text variant="body" style={styles.funFact}>
            • "Every tulip starts with a seed of effort" - Batman
          </Text>
          <Text variant="body" style={styles.funFact}>
            • Complete tasks to grow yellow tulips
          </Text>
          <Text variant="body" style={styles.funFact}>
            • Achieve dreams to bloom purple tulips
          </Text>
          <Text variant="body" style={styles.funFact}>
            • Create memories to plant pink tulips
          </Text>
          <Text variant="body" style={styles.funFact}>
            • Together, you can create the most beautiful garden! 💕
          </Text>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Animated Tulip Component
const AnimatedTulip: React.FC<{ position: TulipPosition; index: number }> = ({
  position,
  index,
}) => {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Grow animation
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
      delay: position.delay,
    });

    // Gentle sway animation
    rotate.value = withRepeat(
      withTiming(Math.random() * 10 - 5, {
        duration: 2000 + Math.random() * 1000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.tulip,
        {
          left: position.x,
          top: position.y,
        },
        animatedStyle,
      ]}
    >
      <Text style={{ fontSize: TULIP_SIZE, color: position.color }}>🌷</Text>
    </Animated.View>
  );
};

// Animated Sun Component
const AnimatedSun = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.sun, animatedStyle]}>
      <Text style={{ fontSize: 40 }}>☀️</Text>
    </Animated.View>
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
  statsTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: '20%',
    marginBottom: spacing.sm,
  },
  gardenCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  garden: {
    width: GARDEN_WIDTH,
    height: GARDEN_HEIGHT,
    position: 'relative',
  },
  grass: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#E8F5E9',
  },
  tulip: {
    position: 'absolute',
    width: TULIP_SIZE,
    height: TULIP_SIZE,
  },
  sun: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  legendCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  legendTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  legendText: {
    flex: 1,
  },
  funFactsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  funFactsTitle: {
    marginBottom: spacing.md,
    color: colors.primary.tulipRed,
  },
  funFact: {
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default TulipGardenScreen;
