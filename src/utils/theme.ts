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
