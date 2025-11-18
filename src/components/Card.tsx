/**
 * Card Component
 * Beautiful card container with tulip petal texture
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'light' | 'dark' | 'pink' | 'purple';
  shadow?: 'light' | 'medium' | 'heavy' | 'none';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'light',
  shadow = 'medium',
}) => {
  const cardStyles = [
    styles.card,
    styles[variant],
    shadow !== 'none' && shadows[shadow],
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    backgroundColor: colors.background.cardLight,
  },

  // Variants
  light: {
    backgroundColor: colors.background.cardLight,
  },
  dark: {
    backgroundColor: colors.background.cardDark,
  },
  pink: {
    backgroundColor: colors.primary.tulipWhite,
    borderWidth: 1,
    borderColor: colors.primary.gayuPink,
  },
  purple: {
    backgroundColor: colors.primary.sharedPurple + '10',
    borderWidth: 1,
    borderColor: colors.primary.sharedPurple + '30',
  },
});
