// src/constants/theme.ts

export const COLORS = {
  primary: '#1E90FF',      // Blue
  secondary: '#FFB800',    // Amber
  background: '#121212',   // Dark background
  card: '#1F1F1F',         // Slightly lighter dark
  text: '#FFFFFF',         // White text
  muted: '#888888',        // Muted gray
  success: '#4CAF50',      // Green
  error: '#FF4C4C',        // Red
  warning: '#FFC107',      // Yellow
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const FONT_WEIGHT = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
};

const theme = {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
  RADIUS,
};

export default theme;
