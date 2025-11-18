/**
 * Text Component
 * Typography component with predefined styles
 */

import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { typography, colors } from '../theme';

interface TextProps {
  children: React.ReactNode;
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'body' | 'bodySmall' | 'caption';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
  onPress,
}) => {
  const textStyles = [
    styles[variant],
    color && { color },
    style,
  ];

  return (
    <RNText
      style={textStyles}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  hero: {
    ...typography.hero,
    color: colors.text.light.primary,
  },
  h1: {
    ...typography.h1,
    color: colors.text.light.primary,
  },
  h2: {
    ...typography.h2,
    color: colors.text.light.primary,
  },
  h3: {
    ...typography.h3,
    color: colors.text.light.primary,
  },
  bodyLarge: {
    ...typography.bodyLarge,
    color: colors.text.light.primary,
  },
  body: {
    ...typography.body,
    color: colors.text.light.primary,
  },
  bodySmall: {
    ...typography.bodySmall,
    color: colors.text.light.secondary,
  },
  caption: {
    ...typography.caption,
    color: colors.text.light.tertiary,
  },
});
