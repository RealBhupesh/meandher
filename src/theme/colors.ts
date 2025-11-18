/**
 * Color Palette: "Tulip Garden at Twilight"
 * Design system for Gayu & B couples app
 */

export const colors = {
  // Primary Colors (Tulip-Inspired)
  primary: {
    gayuPink: '#FFB5DA',      // Soft pink tulip
    bBlue: '#4A90E2',          // Twilight blue
    sharedPurple: '#B794F6',   // When pink meets blue
    tulipRed: '#FF6B9D',       // Passion tulip
    tulipYellow: '#FFD93D',    // Sunshine tulip
    tulipWhite: '#FFF5F7',     // Pure white tulip
  },

  // Accent Colors
  accent: {
    batmanDark: '#1A1A2E',     // Deep night
    gothamGold: '#FFD700',     // Batman's utility belt
    loveRed: '#E63946',        // Heart beating
    dreamLavender: '#DDA0DD',  // Dreamy goals
  },

  // Background Palette
  background: {
    light: '#FFF9FB',          // Soft petal white
    dark: '#16213E',           // Batman's night sky
    cardLight: '#FFFFFF',      // Card surface light
    cardDark: '#1F4068',       // Card surface dark
  },

  // Semantic Colors
  semantic: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
  },

  // Category Colors
  category: {
    romance: '#FFB5DA',        // Pink
    goals: '#B794F6',          // Purple
    fun: '#FFD93D',            // Yellow
    health: '#4CAF50',         // Green
    work: '#4A90E2',           // Blue
    home: '#FF9800',           // Orange
  },

  // Priority Colors
  priority: {
    low: '#4CAF50',            // Green
    medium: '#FFD93D',         // Yellow
    high: '#FF9800',           // Orange
    urgent: '#E63946',         // Red
  },

  // Text Colors
  text: {
    light: {
      primary: '#1A1A2E',
      secondary: '#666666',
      tertiary: '#999999',
      disabled: '#CCCCCC',
    },
    dark: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      tertiary: '#999999',
      disabled: '#666666',
    },
  },
};

export type ColorScheme = 'light' | 'dark';

export const getThemeColors = (scheme: ColorScheme) => ({
  ...colors,
  background: scheme === 'light' ? colors.background.light : colors.background.dark,
  card: scheme === 'light' ? colors.background.cardLight : colors.background.cardDark,
  text: colors.text[scheme],
});
