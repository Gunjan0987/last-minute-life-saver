/**
 * Last Minute Life Saver — Design System
 * Premium dark-mode theme with glassmorphism support
 */

export const Colors = {
  dark: {
    // Core backgrounds
    background: '#0A0E1A',
    surface: '#131729',
    surfaceLight: '#1C2039',
    surfaceHover: '#232847',

    // Accent colors
    accent: '#4F8CFF',
    accentLight: '#7BA8FF',
    accentDark: '#2D6AE0',
    accentPurple: '#8B5CF6',
    accentPurpleLight: '#A78BFA',
    accentGreen: '#10B981',
    accentGreenLight: '#34D399',
    accentYellow: '#F59E0B',
    accentYellowLight: '#FBBF24',
    accentOrange: '#F97316',
    accentOrangeLight: '#FB923C',
    accentRed: '#EF4444',
    accentRedLight: '#F87171',
    accentPink: '#EC4899',
    accentCyan: '#06B6D4',
    accentTeal: '#14B8A6',

    // Text
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textDim: '#475569',

    // Glass
    glassBg: 'rgba(255,255,255,0.06)',
    glassBgHover: 'rgba(255,255,255,0.10)',
    glassBorder: 'rgba(255,255,255,0.12)',
    glassBorderLight: 'rgba(255,255,255,0.18)',

    // Gradients (as arrays for LinearGradient)
    gradientPrimary: ['#4F8CFF', '#8B5CF6'] as const,
    gradientRescue: ['#EF4444', '#F97316'] as const,
    gradientSuccess: ['#10B981', '#06B6D4'] as const,
    gradientWarning: ['#F59E0B', '#F97316'] as const,
    gradientPurple: ['#8B5CF6', '#EC4899'] as const,
    gradientDark: ['#0A0E1A', '#131729'] as const,
    gradientApple: ['#2F80ED', '#B294FF', '#EC4899'] as const,
    gradientAI: ['#8B5CF6', '#4F8CFF', '#06B6D4'] as const,
    gradientCard: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'] as const,

    // Overlays
    overlay: 'rgba(0,0,0,0.5)',
    overlayLight: 'rgba(0,0,0,0.3)',
    overlayHeavy: 'rgba(0,0,0,0.7)',
  },
};

export const PriorityColors = {
  critical: { bg: '#EF4444', text: '#FEE2E2', label: 'CRITICAL' },
  high: { bg: '#F97316', text: '#FFF7ED', label: 'HIGH' },
  medium: { bg: '#F59E0B', text: '#FFFBEB', label: 'MEDIUM' },
  low: { bg: '#10B981', text: '#ECFDF5', label: 'LOW' },
};

export const BurnoutColors = {
  healthy: { color: '#10B981', label: 'Healthy', range: '0-30' },
  caution: { color: '#F59E0B', label: 'Caution', range: '31-60' },
  atRisk: { color: '#F97316', label: 'At Risk', range: '61-80' },
  critical: { color: '#EF4444', label: 'Critical', range: '81-100' },
};

export const CategoryIcons: Record<string, { icon: string; color: string }> = {
  work: { icon: 'briefcase', color: '#4F8CFF' },
  personal: { icon: 'person', color: '#8B5CF6' },
  health: { icon: 'heart', color: '#EF4444' },
  learning: { icon: 'book', color: '#F59E0B' },
  admin: { icon: 'document-text', color: '#94A3B8' },
  creative: { icon: 'color-palette', color: '#EC4899' },
  meeting: { icon: 'people', color: '#06B6D4' },
  finance: { icon: 'cash', color: '#10B981' },
};

export const SourceIcons: Record<string, { icon: string; color: string }> = {
  gmail: { icon: 'mail', color: '#EA4335' },
  slack: { icon: 'chatbubbles', color: '#4A154B' },
  whatsapp: { icon: 'logo-whatsapp', color: '#25D366' },
  calendar: { icon: 'calendar', color: '#4285F4' },
  manual: { icon: 'create', color: '#8B5CF6' },
  telegram: { icon: 'paper-plane', color: '#0088CC' },
};

export const Typography = {
  hero: {
    fontSize: 34,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
    lineHeight: 34,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  bodySm: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySmMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '700' as const,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  number: {
    fontSize: 40,
    fontWeight: '800' as const,
    lineHeight: 48,
  },
  numberSm: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 56,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  }),
};

export const GlassStyle = {
  card: {
    backgroundColor: Colors.dark.glassBg,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    borderRadius: BorderRadius.lg,
  },
  cardElevated: {
    backgroundColor: Colors.dark.glassBgHover,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorderLight,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
};

export const AnimationConfig = {
  fast: 200,
  normal: 300,
  slow: 500,
  spring: {
    tension: 150,
    friction: 15,
  },
  springBouncy: {
    tension: 200,
    friction: 12,
  },
  easing: {
    // Built-in Animated easing is used separately
  },
};
