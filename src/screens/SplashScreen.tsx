/**
 * Splash Screen
 * Beautiful tulip blooming animation
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../components';
import { colors, spacing } from '../theme';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const seedOpacity = useRef(new Animated.Value(1)).current;
  const stemHeight = useRef(new Animated.Value(0)).current;
  const budScale = useRef(new Animated.Value(0)).current;
  const flowerScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const batmanOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stage 1: Seed glows (0-1s)
    Animated.sequence([
      Animated.timing(seedOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      // Stage 2: Stem grows (1-2s)
      Animated.parallel([
        Animated.timing(seedOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(stemHeight, {
          toValue: 100,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),

      // Stage 3: Bud forms (2-2.5s)
      Animated.spring(budScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),

      // Stage 4: Flower blooms (2.5-3.5s)
      Animated.parallel([
        Animated.spring(flowerScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(budScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      // Stage 5: Text appears (3.5-4s)
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      // Stage 6: Batman swoops (4-4.5s)
      Animated.timing(batmanOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      // Wait before finishing (4.5-5s)
      Animated.delay(500),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary.tulipWhite, colors.background.light]}
        style={styles.gradient}
      >
        <View style={styles.animationContainer}>
          {/* Seed */}
          <Animated.View
            style={[
              styles.seed,
              {
                opacity: seedOpacity,
              },
            ]}
          >
            <Text variant="hero">🌱</Text>
          </Animated.View>

          {/* Stem */}
          <Animated.View
            style={[
              styles.stem,
              {
                transform: [{ scaleY: stemHeight.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }) }],
              },
            ]}
          />

          {/* Bud */}
          <Animated.View
            style={[
              styles.bud,
              {
                opacity: budScale,
                transform: [{ scale: budScale }],
              },
            ]}
          >
            <Text variant="hero">🌷</Text>
          </Animated.View>

          {/* Flower */}
          <Animated.View
            style={[
              styles.flower,
              {
                opacity: flowerScale,
                transform: [{ scale: flowerScale }],
              },
            ]}
          >
            <Text style={styles.flowerEmoji}>🌷</Text>
          </Animated.View>

          {/* App Name */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: textOpacity,
              },
            ]}
          >
            <Text variant="hero" style={styles.appName}>
              Gayu & B
            </Text>
            <Text variant="body" style={styles.tagline}>
              Where Love Meets Productivity
            </Text>
          </Animated.View>

          {/* Batman */}
          <Animated.View
            style={[
              styles.batmanContainer,
              {
                opacity: batmanOpacity,
                transform: [
                  {
                    translateX: batmanOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text variant="h2">🦇</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seed: {
    position: 'absolute',
  },
  stem: {
    position: 'absolute',
    bottom: '50%',
    width: 4,
    height: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  bud: {
    position: 'absolute',
  },
  flower: {
    position: 'absolute',
  },
  flowerEmoji: {
    fontSize: 120,
  },
  textContainer: {
    position: 'absolute',
    bottom: spacing.xxxl,
    alignItems: 'center',
  },
  appName: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
    fontSize: 48,
  },
  tagline: {
    color: colors.text.light.secondary,
  },
  batmanContainer: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.xl,
  },
});

export default SplashScreen;
