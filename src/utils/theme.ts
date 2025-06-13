export type Theme = string;

// Интерфейс для описания темы
export interface ThemeConfig {
  name: string;
  label: string;
  icon?: string;
  description?: string;
  variables: Record<string, string>;
}

// Реестр тем
const themeRegistry = new Map<string, ThemeConfig>();

// Встроенные темы
const builtInThemes: ThemeConfig[] = [
  {
    name: 'light',
    label: 'Светлая',
    icon: '🌞',
    description: 'Светлая тема для дневного использования',
    variables: {
      '--color-bg': '#eaf3fb',
      '--color-surface': '#ffffff',
      '--color-elevated': '#e3eaf6',
      '--color-elevated-active': '#c8d4e6',
      '--color-primary': 'rgb(78, 147, 245)',
      '--color-secondary': '#78b4f8',
      '--color-secondary-active': 'rgb(145, 194, 251)',
      '--color-accent': '#3a7bd5',
      '--color-error': '#d44c4a',
      '--text-heading': '#1a2233',
      '--text-body': '#2d3a4d',
      '--text-secondary': '#6b7a90',
      '--text-disabled': '#b0b8c9',
      '--color-border': '#e3eaf6',
    },
  },
  {
    name: 'dark',
    label: 'Тёмная',
    icon: '🌙',
    description: 'Тёмная тема для ночного использования',
    variables: {
      '--color-bg': '#0f0f0f',
      '--color-surface': '#1a1a1a',
      '--color-elevated': '#262626',
      '--color-elevated-active': '#333333',
      '--color-primary': '#4a90e2',
      '--color-secondary': '#5ba3f5',
      '--color-secondary-active': '#7bb8ff',
      '--color-accent': '#357abd',
      '--color-error': '#ff4757',
      '--text-heading': '#ffffff',
      '--text-body': '#e8e8e8',
      '--text-secondary': '#b8b8b8',
      '--text-disabled': '#666666',
      '--color-border': '#333333',
    },
  },
  {
    name: 'ocean',
    label: 'Океан',
    icon: '🌊',
    description: 'Морская тема в голубых тонах',
    variables: {
      '--color-bg': '#e6f3ff',
      '--color-surface': '#ffffff',
      '--color-elevated': '#cce7ff',
      '--color-elevated-active': '#99d6ff',
      '--color-primary': '#0066cc',
      '--color-secondary': '#3399ff',
      '--color-secondary-active': '#66b3ff',
      '--color-accent': '#004499',
      '--color-error': '#cc3300',
      '--text-heading': '#003366',
      '--text-body': '#004080',
      '--text-secondary': '#0066cc',
      '--text-disabled': '#99ccff',
      '--color-border': '#cce7ff',
    },
  },
  {
    name: 'pink',
    label: 'Розовая',
    icon: '🌸',
    description: 'Нежная розовая тема',
    variables: {
      '--color-bg': '#fdf2f8',
      '--color-surface': '#ffffff',
      '--color-elevated': '#fce7f3',
      '--color-elevated-active': '#f9a8d4',
      '--color-primary': '#ec4899',
      '--color-secondary': '#f472b6',
      '--color-secondary-active': '#f9a8d4',
      '--color-accent': '#be185d',
      '--color-error': '#dc2626',
      '--text-heading': '#831843',
      '--text-body': '#9d174d',
      '--text-secondary': '#be185d',
      '--text-disabled': '#f9a8d4',
      '--color-border': '#fce7f3',
    },
  },
  {
    name: 'orange',
    label: 'Тёплая',
    icon: '🔥',
    description: 'Тёплая оранжевая тема',
    variables: {
      '--color-bg': '#fff7ed',
      '--color-surface': '#ffffff',
      '--color-elevated': '#fed7aa',
      '--color-elevated-active': '#fdba74',
      '--color-primary': '#ea580c',
      '--color-secondary': '#fb923c',
      '--color-secondary-active': '#fdba74',
      '--color-accent': '#c2410c',
      '--color-error': '#dc2626',
      '--text-heading': '#9a3412',
      '--text-body': '#c2410c',
      '--text-secondary': '#ea580c',
      '--text-disabled': '#fed7aa',
      '--color-border': '#fed7aa',
    },
  },
  {
    name: 'graphite',
    label: 'Графитовая',
    icon: '⚫',
    description: 'Элегантная графитовая тема',
    variables: {
      '--color-bg': '#18181b',
      '--color-surface': '#27272a',
      '--color-elevated': '#3f3f46',
      '--color-elevated-active': '#52525b',
      '--color-primary': '#a1a1aa',
      '--color-secondary': '#d4d4d8',
      '--color-secondary-active': '#e4e4e7',
      '--color-accent': '#71717a',
      '--color-error': '#ef4444',
      '--text-heading': '#fafafa',
      '--text-body': '#e4e4e7',
      '--text-secondary': '#a1a1aa',
      '--text-disabled': '#71717a',
      '--color-border': '#52525b',
    },
  },
];

// Инициализация встроенных тем
builtInThemes.forEach((theme) => {
  themeRegistry.set(theme.name, theme);
});

/**
 * Регистрирует новую тему
 * @param theme - конфигурация темы
 */
export const registerTheme = (theme: ThemeConfig): void => {
  themeRegistry.set(theme.name, theme);
};

/**
 * Получает все зарегистрированные темы
 * @returns массив всех тем
 */
export const getAllThemes = (): ThemeConfig[] => {
  return Array.from(themeRegistry.values());
};

/**
 * Получает конфигурацию темы по имени
 * @param name - имя темы
 * @returns конфигурация темы или undefined
 */
export const getThemeConfig = (name: string): ThemeConfig | undefined => {
  return themeRegistry.get(name);
};

/**
 * Применяет CSS переменные темы к документу
 * @param variables - объект с CSS переменными
 */
const applyCSSVariables = (variables: Record<string, string>): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

/**
 * Очищает CSS переменные темы
 */
const clearCSSVariables = (): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const themeVariables = [
    '--color-bg',
    '--color-surface',
    '--color-elevated',
    '--color-elevated-active',
    '--color-primary',
    '--color-secondary',
    '--color-secondary-active',
    '--color-accent',
    '--color-error',
    '--text-heading',
    '--text-body',
    '--text-secondary',
    '--text-disabled',
    '--color-border',
  ];

  themeVariables.forEach((property) => {
    root.style.removeProperty(property);
  });
};

/**
 * Устанавливает тему DobruniaUI
 * @param themeName - имя темы
 */
export const setTheme = (themeName: Theme): void => {
  if (typeof document === 'undefined') return;

  const themeConfig = getThemeConfig(themeName);
  if (!themeConfig) {
    console.warn(`Theme "${themeName}" not found`);
    return;
  }

  // Сохраняем выбранную тему
  localStorage.setItem('dobrunia-theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);

  // Применяем переменные темы
  applyCSSVariables(themeConfig.variables);
};

/**
 * Получает текущую тему
 * @returns текущая тема или null если не установлена
 */
export const getTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('dobrunia-theme');
};

/**
 * Переключает тему между светлой и тёмной
 */
export const toggleTheme = (): void => {
  const current = getTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

/**
 * Удаляет установленную тему (будет использоваться системная)
 */
export const removeTheme = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('dobrunia-theme');
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-theme');
    clearCSSVariables();
  }
};

/**
 * Определяет, предпочитает ли система тёмную тему
 */
export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * Инициализирует систему тем
 */
export const initThemeSystem = (): void => {
  if (typeof window === 'undefined') return;

  const savedTheme = getTheme();
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Если нет сохранённой темы, используем светлую
    setTheme('light');
  }
};
