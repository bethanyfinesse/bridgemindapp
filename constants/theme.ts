/**
 * BridgeMind Color Theme
 * Inspired by the interwoven logo design
 */

export const BrandColors = {
  // Primary brand colors from logo
  teal: '#2B6B7F',
  orange: '#D97941',
  purple: '#8B7BA8',
  green: '#6BA587',
  cream: '#C9B991',
  
  // Extended palette for UI
  tealLight: '#4A8A9E',
  tealDark: '#1D4D5C',
  orangeLight: '#E89964',
  purpleLight: '#A594BD',
  greenLight: '#85BFA1',
  
  // Neutral tones
  lightBg: '#F8F9FA',
  lightCard: '#FFFFFF',
  lightText: '#2A2D35',
  lightTextSecondary: '#6B7280',
  lightBorder: '#E8ECF1',
  
  darkBg: '#1A1D23',
  darkCard: '#252931',
  darkText: '#F8F9FA',
  darkTextSecondary: '#A8B2C1',
  darkBorder: '#2A2D35',
};

export const Colors = {
  light: {
    text: BrandColors.lightText,
    textSecondary: BrandColors.lightTextSecondary,
    background: BrandColors.lightBg,
    card: BrandColors.lightCard,
    tint: BrandColors.teal,
    accent: BrandColors.orange,
    secondary: BrandColors.purple,
    tertiary: BrandColors.green,
    border: BrandColors.lightBorder,
    tabIconDefault: '#A8B2C1',
    tabIconSelected: BrandColors.teal,
  },
  dark: {
    text: BrandColors.darkText,
    textSecondary: BrandColors.darkTextSecondary,
    background: BrandColors.darkBg,
    card: BrandColors.darkCard,
    tint: BrandColors.tealLight,
    accent: BrandColors.orangeLight,
    secondary: BrandColors.purpleLight,
    tertiary: BrandColors.greenLight,
    border: BrandColors.darkBorder,
    tabIconDefault: '#6B7280',
    tabIconSelected: BrandColors.tealLight,
  },
};