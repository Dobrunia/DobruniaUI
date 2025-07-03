// Design tokens как JS константы для избежания зависимости от CSS переменных
export const DESIGN_TOKENS = {
  // Layout
  layout: {
    content: {
      desktop: '1200px',
      tablet: '1000px',
      mobile: '100vw',
    },
    sidebar: {
      desktop: '300px',
      tablet: '220px',
      mobile: '160px',
    },
  },

  // Spacing
  spacing: {
    tiny: '0.2rem',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },

  // Radius
  radius: {
    small: '4px',
    medium: '6px',
    large: '16px',
  },

  // Transitions
  transition: {
    fast: '0.15s',
    slow: '0.3s',
  },

  // Font sizes
  fontSize: {
    small: '0.7rem',
    smallPlus: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
  },

  // Base heights
  baseHeight: {
    tiny: '20px',
    small: '32px',
    medium: '40px',
    large: '48px',
    extraLarge: '56px',
  },
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: '900px',
  tablet: '1200px',
} as const;

// Responsive layout tokens
export const RESPONSIVE_TOKENS = {
  tablet: {
    layout: {
      contentWidth: '1000px',
      sidebarWidth: '220px',
    },
  },
  mobile: {
    layout: {
      contentWidth: '100vw',
      sidebarWidth: '160px',
    },
  },
} as const;
