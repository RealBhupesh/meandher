/**
 * Typography System: "Love Letters"
 * Font families and text styles for Gayu & B
 */

export const fonts = {
  // Font Families
  families: {
    // For headlines - Romantic serif
    headline: 'System',  // Will be replaced with Playfair Display when custom fonts added

    // For Gayu's sections - Soft, rounded, feminine
    gayu: 'System',      // Will be replaced with Quicksand

    // For B's sections - Clean, modern, reliable
    b: 'System',         // Will be replaced with Poppins

    // Shared content - Friendly, balanced
    shared: 'System',    // Will be replaced with Nunito

    // Special moments - Handwritten script
    special: 'System',   // Will be replaced with Sacramento

    // Batman Easter Eggs
    batman: 'System',    // Will be replaced with Gotham Bold

    // Body text
    body: 'System',      // Will be replaced with Inter
  },
};

export const fontSizes = {
  // Hero: 56px (Desktop), 36px (Mobile)
  hero: 36,

  // H1: 40px / 28px
  h1: 28,

  // H2: 32px / 24px
  h2: 24,

  // H3: 24px / 20px
  h3: 20,

  // Body Large: 18px
  bodyLarge: 18,

  // Body: 16px
  body: 16,

  // Body Small: 14px
  bodySmall: 14,

  // Caption: 12px
  caption: 12,
};

export const lineHeights = {
  hero: 44,
  h1: 36,
  h2: 32,
  h3: 28,
  bodyLarge: 28,
  body: 24,
  bodySmall: 20,
  caption: 16,
};

export const fontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const typography = {
  hero: {
    fontFamily: fonts.families.headline,
    fontSize: fontSizes.hero,
    lineHeight: lineHeights.hero,
    fontWeight: fontWeights.bold,
  },
  h1: {
    fontFamily: fonts.families.headline,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.h1,
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontFamily: fonts.families.shared,
    fontSize: fontSizes.h2,
    lineHeight: lineHeights.h2,
    fontWeight: fontWeights.semibold,
  },
  h3: {
    fontFamily: fonts.families.shared,
    fontSize: fontSizes.h3,
    lineHeight: lineHeights.h3,
    fontWeight: fontWeights.semibold,
  },
  bodyLarge: {
    fontFamily: fonts.families.body,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    fontWeight: fontWeights.regular,
  },
  body: {
    fontFamily: fonts.families.body,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontFamily: fonts.families.body,
    fontSize: fontSizes.bodySmall,
    lineHeight: lineHeights.bodySmall,
    fontWeight: fontWeights.regular,
  },
  caption: {
    fontFamily: fonts.families.body,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    fontWeight: fontWeights.regular,
  },
  button: {
    fontFamily: fonts.families.shared,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    fontWeight: fontWeights.semibold,
  },
};
