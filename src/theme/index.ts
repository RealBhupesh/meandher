/**
 * Theme Configuration
 * Main theme export for Gayu & B app
 */

import { colors, getThemeColors, ColorScheme } from './colors';
import { typography, fonts, fontSizes, fontWeights, lineHeights } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
  colors,
  typography,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

export { getThemeColors, ColorScheme };

export * from './colors';
export * from './typography';
export * from './spacing';
