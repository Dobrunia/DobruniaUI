export type Theme =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'pink'
  | 'sunset'
  | 'charcoal'
  | 'slate'
  | 'midnight'
  | 'lunar'
  | 'fullmoon'
  | 'metallic'
  | 'graphite'
  | 'bloodmoon'
  | 'obsidian'
  | 'lavender'
  | 'vinokurov'
  | 'vasiliy'
  | 'dasha'
  | 'oldmoney';

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
      '--c-bg-default': '#eaf3fb',
      '--c-bg-subtle': '#ffffff',
      '--c-bg-elevated': '#f8fafc',
      '--c-text-primary': '#1a2233',
      '--c-text-secondary': '#6b7a90',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#e3eaf6',
      '--c-border-focus': '#4e93f5',
      '--c-accent': '#4e93f5',
      '--c-accent-hover': '#3a7bd5',
      '--c-accent-active': '#2563eb',
      '--c-success': '#10b981',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#3b82f6',
    },
  },
  {
    name: 'dark',
    label: 'Тёмная',
    icon: '🌙',
    description: 'Тёмная тема для ночного использования',
    variables: {
      '--c-bg-default': '#23252A',
      '--c-bg-subtle': '#282B31',
      '--c-bg-elevated': '#2D3037',
      '--c-text-primary': '#d5d9e9',
      '--c-text-secondary': '#b4bac0',
      '--c-text-inverse': '#F5F5F5',
      '--c-border': '#32363C',
      '--c-border-focus': '#1669CC',
      '--c-accent': '#1C84FF',
      '--c-accent-hover': '#1669CC',
      '--c-accent-active': '#1255A5',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#60a5fa',
    },
  },
  {
    name: 'ocean',
    label: 'Океан',
    icon: '🌊',
    description: 'Нежная морская тема в мягких тонах',
    variables: {
      '--c-bg-default': '#f0f8ff',
      '--c-bg-subtle': '#ffffff',
      '--c-bg-elevated': '#f8fcff',
      '--c-text-primary': '#1e3a5f',
      '--c-text-secondary': '#4a6fa5',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#c9e2ff',
      '--c-border-focus': '#5b9bd5',
      '--c-accent': '#5b9bd5',
      '--c-accent-hover': '#3a7bc8',
      '--c-accent-active': '#1e5f99',
      '--c-success': '#059669',
      '--c-error': '#dc2626',
      '--c-warning': '#d97706',
      '--c-info': '#3b82f6',
    },
  },
  {
    name: 'pink',
    label: 'Розовая',
    icon: '🌸',
    description: 'Мягкая пастельная тема',
    variables: {
      '--c-bg-default': '#fef7f7',
      '--c-bg-subtle': '#ffffff',
      '--c-bg-elevated': '#fffbfb',
      '--c-text-primary': '#5b2c6f',
      '--c-text-secondary': '#8b5a9e',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#f4c2c2',
      '--c-border-focus': '#d1477a',
      '--c-accent': '#d1477a',
      '--c-accent-hover': '#b83d6e',
      '--c-accent-active': '#9b2c5a',
      '--c-success': '#059669',
      '--c-error': '#dc2626',
      '--c-warning': '#d97706',
      '--c-info': '#7c3aed',
    },
  },
  {
    name: 'sunset',
    label: 'Закат',
    icon: '🌅',
    description: 'Тёплая персиковая тема в оттенках заката',
    variables: {
      '--c-bg-default': '#fff8f3',
      '--c-bg-subtle': '#fff1e8',
      '--c-bg-elevated': '#ffffff',
      '--c-text-primary': '#3d2a1e',
      '--c-text-secondary': '#7d675c',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#f6d3c0',
      '--c-border-focus': '#ff8650',
      '--c-accent': '#ff8650',
      '--c-accent-hover': '#ffa06f',
      '--c-accent-active': '#e56d3a',
      '--c-success': '#2bb07f',
      '--c-error': '#e15963',
      '--c-warning': '#f5b113',
      '--c-info': '#3fa4ff',
    },
  },

  {
    name: 'charcoal',
    label: 'Угольная',
    icon: '⚫',
    description: 'Элегантная монохромная тема',
    variables: {
      '--c-bg-default': '#121212',
      '--c-bg-subtle': '#1e1e1e',
      '--c-bg-elevated': '#2a2a2a',
      '--c-text-primary': '#e0e0e0',
      '--c-text-secondary': '#b0b0b0',
      '--c-text-inverse': '#000000',
      '--c-border': '#444444',
      '--c-border-focus': '#888888',
      '--c-accent': '#888888',
      '--c-accent-hover': '#777777',
      '--c-accent-active': '#666666',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#60a5fa',
    },
  },
  {
    name: 'slate',
    label: 'Сланцевая',
    icon: '🌫️',
    description: 'Мягкая тёмная тема с пастельными акцентами',
    variables: {
      '--c-bg-default': '#2c2c2c',
      '--c-bg-subtle': '#383838',
      '--c-bg-elevated': '#444444',
      '--c-text-primary': '#e4e4e4',
      '--c-text-secondary': '#b0b0b0',
      '--c-text-inverse': '#000000',
      '--c-border': '#555555',
      '--c-border-focus': '#a8dadc',
      '--c-accent': '#a8dadc',
      '--c-accent-hover': '#96c8ca',
      '--c-accent-active': '#84b6b8',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#b39cd0',
    },
  },
  {
    name: 'midnight',
    label: 'Полуночная',
    icon: '🌌',
    description: 'Глубокая тёмная с тёплыми акцентами',
    variables: {
      '--c-bg-default': '#222222',
      '--c-bg-subtle': '#2c2c2c',
      '--c-bg-elevated': '#3a3a3a',
      '--c-text-primary': '#ffffff',
      '--c-text-secondary': '#aaaaaa',
      '--c-text-inverse': '#000000',
      '--c-border': '#444444',
      '--c-border-focus': '#e5c287',
      '--c-accent': '#e5c287',
      '--c-accent-hover': '#d4b176',
      '--c-accent-active': '#c3a065',
      '--c-success': '#416d19',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#60a5fa',
    },
  },
  {
    name: 'lunar',
    label: 'Лунная',
    icon: '🌙',
    description: 'Холодная серебристая тема',
    variables: {
      '--c-bg-default': '#1a1a1f',
      '--c-bg-subtle': '#2a2a30',
      '--c-bg-elevated': '#3a3a42',
      '--c-text-primary': '#e8e8f0',
      '--c-text-secondary': '#b8b8c8',
      '--c-text-inverse': '#000000',
      '--c-border': '#4a4a55',
      '--c-border-focus': '#8a9ab1',
      '--c-accent': '#8a9ab1',
      '--c-accent-hover': '#7a8aa1',
      '--c-accent-active': '#6a7a91',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#60a5fa',
    },
  },
  {
    name: 'metallic',
    label: 'Металлическая',
    icon: '⚙️',
    description: 'Полированное железо с белыми искрами',
    variables: {
      '--c-bg-default': '#1a1a1a',
      '--c-bg-subtle': '#2a2a2a',
      '--c-bg-elevated': '#3a3a3a',
      '--c-text-primary': '#f5f5f5',
      '--c-text-secondary': '#c0c0c0',
      '--c-text-inverse': '#000000',
      '--c-border': '#555555',
      '--c-border-focus': '#e8e8e8',
      '--c-accent': '#e8e8e8',
      '--c-accent-hover': '#d8d8d8',
      '--c-accent-active': '#c8c8c8',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#60a5fa',
    },
  },
  {
    name: 'graphite',
    label: 'Графитовая',
    icon: '⬛',
    description: 'Настоящая графитовая тема',
    variables: {
      '--c-bg-default': '#2c2c2c',
      '--c-bg-subtle': '#3c3c3c',
      '--c-bg-elevated': '#4c4c4c',
      '--c-text-primary': '#e0e0e0',
      '--c-text-secondary': '#a0a0a0',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#5c5c5c',
      '--c-border-focus': '#7f7f7f',
      '--c-accent': '#7f7f7f',
      '--c-accent-hover': '#6f6f6f',
      '--c-accent-active': '#5f5f5f',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#60a5fa',
    },
  },
  {
    name: 'bloodmoon',
    label: 'Кровавая луна',
    icon: '🩸',
    description: 'Мистическая тёмная тема с ярко-красными акцентами',
    variables: {
      '--c-bg-default': '#0a0a0a',
      '--c-bg-subtle': '#1a1a1a',
      '--c-bg-elevated': '#2a2a2a',
      '--c-text-primary': '#f5f5f5',
      '--c-text-secondary': '#b8b8b8',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#3a3a3a',
      '--c-border-focus': '#dc2626',
      '--c-accent': '#7b1515',
      '--c-accent-hover': '#b91c1c',
      '--c-accent-active': '#991b1b',
      '--c-success': '#16a34a',
      '--c-error': '#ff4757',
      '--c-warning': '#ffa502',
      '--c-info': '#3742fa',
    },
  },
  {
    name: 'fullmoon',
    label: 'Полная луна',
    icon: '🌕',
    description: 'Золотистая луна над тёмным океаном',
    variables: {
      '--c-bg-default': '#0f1a2e',
      '--c-bg-subtle': '#1a2540',
      '--c-bg-elevated': '#253052',
      '--c-text-primary': '#f4e4a6',
      '--c-text-secondary': '#d4c486',
      '--c-text-inverse': '#000000',
      '--c-border': '#3a4564',
      '--c-border-focus': '#f4d03f',
      '--c-accent': '#f4d03f',
      '--c-accent-hover': '#e4c02f',
      '--c-accent-active': '#d4b01f',
      '--c-success': '#22c55e',
      '--c-error': '#ef4444',
      '--c-warning': '#f59e0b',
      '--c-info': '#3b82f6',
    },
  },
  {
    name: 'obsidian',
    label: 'Obsidian Purple',
    icon: '🔮',
    description: 'Тёмная тема в стиле Obsidian с фиолетовыми акцентами',
    variables: {
      '--c-bg-default': '#0f1118',
      '--c-bg-subtle': '#171a23',
      '--c-bg-elevated': '#1e2130',
      '--c-text-primary': '#e2e3f0',
      '--c-text-secondary': '#8b90a7',
      '--c-text-inverse': '#0f1118',
      '--c-border': '#2a2e3f',
      '--c-border-focus': '#a78bfa',
      '--c-accent': '#a78bfa',
      '--c-accent-hover': '#b6a3ff',
      '--c-accent-active': '#8d72e6',
      '--c-success': '#22c983',
      '--c-error': '#f14e6e',
      '--c-warning': '#ffa94d',
      '--c-info': '#4dabf7',
    },
  },
  {
    name: 'lavender',
    label: 'Lavender Light',
    icon: '💜',
    description: 'Светлая сиреневая тема для дневного использования',
    variables: {
      '--c-bg-default': '#f6f4ff',
      '--c-bg-subtle': '#eee9ff',
      '--c-bg-elevated': '#ffffff',
      '--c-text-primary': '#3c3554',
      '--c-text-secondary': '#6f6a8c',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#d5ceff',
      '--c-border-focus': '#7c5dff',
      '--c-accent': '#7c5dff',
      '--c-accent-hover': '#9278ff',
      '--c-accent-active': '#6648e6',
      '--c-success': '#2bb07f',
      '--c-error': '#e05d6f',
      '--c-warning': '#f5b248',
      '--c-info': '#4e8df7',
    },
  },
  {
    name: 'vinokurov',
    label: 'Александр Винокуров',
    icon: '🤓',
    description: 'Элегантная тема с розово-бирюзовой палитрой',
    variables: {
      '--c-bg-default': '#f5f0f2',
      '--c-bg-subtle': '#e8dde1',
      '--c-bg-elevated': '#ffffff',
      '--c-text-primary': '#2d2d2d',
      '--c-text-secondary': '#6b5b5e',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#c4a8b0',
      '--c-border-focus': '#4a9ca6',
      '--c-accent': '#4a9ca6',
      '--c-accent-hover': '#3d8a94',
      '--c-accent-active': '#2f7882',
      '--c-success': '#2bb07f',
      '--c-error': '#d67b7b',
      '--c-warning': '#e6a85c',
      '--c-info': '#6ba3d6',
    },
  },
  {
    name: 'vasiliy',
    label: 'Василий',
    icon: '🏺',
    description: 'Тёплая земляная тема в коричнево-золотистых тонах',
    variables: {
      '--c-bg-default': '#f5f2ed',
      '--c-bg-subtle': '#ede6db',
      '--c-bg-elevated': '#ffffff',
      '--c-text-primary': '#3d3025',
      '--c-text-secondary': '#6b5d4a',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#c4b59a',
      '--c-border-focus': '#b8860b',
      '--c-accent': '#b8860b',
      '--c-accent-hover': '#9a7209',
      '--c-accent-active': '#7c5e07',
      '--c-success': '#6b8e23',
      '--c-error': '#a0522d',
      '--c-warning': '#daa520',
      '--c-info': '#708090',
    },
  },
  {
    name: 'dasha',
    label: 'Даша',
    icon: '🧘‍♀️',
    description: 'Уютная персиково-оранжевая тема в тёплых тонах',
    variables: {
      '--c-bg-default': '#fdf6f0',
      '--c-bg-subtle': '#f7e6d7',
      '--c-bg-elevated': '#ffffff',
      '--c-text-primary': '#4a2c1a',
      '--c-text-secondary': '#8b5a3c',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#d4a574',
      '--c-border-focus': '#cd853f',
      '--c-accent': '#cd853f',
      '--c-accent-hover': '#b8722d',
      '--c-accent-active': '#a3601b',
      '--c-success': '#8fbc8f',
      '--c-error': '#cd5c5c',
      '--c-warning': '#daa520',
      '--c-info': '#87ceeb',
    },
  },
  {
    name: 'oldmoney',
    label: 'Old Money',
    icon: '🎩',
    description: 'Элегантная тема в стиле старых денег с бежево-коричневой палитрой',
    variables: {
      '--c-bg-default': '#f7f5f3',
      '--c-bg-subtle': '#f0ede8',
      '--c-bg-elevated': '#ffffff',
      '--c-text-primary': '#2c2419',
      '--c-text-secondary': '#6b5d4f',
      '--c-text-inverse': '#ffffff',
      '--c-border': '#d4c4a8',
      '--c-border-focus': '#8b7355',
      '--c-accent': '#8b7355',
      '--c-accent-hover': '#7a6449',
      '--c-accent-active': '#69553d',
      '--c-success': '#7d8471',
      '--c-error': '#a0674a',
      '--c-warning': '#b8860b',
      '--c-info': '#6b7c95',
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
    '--c-bg-default',
    '--c-bg-subtle',
    '--c-bg-elevated',
    '--c-text-primary',
    '--c-text-secondary',
    '--c-text-inverse',
    '--c-border',
    '--c-border-focus',
    '--c-accent',
    '--c-accent-hover',
    '--c-accent-active',
    '--c-success',
    '--c-error',
    '--c-warning',
    '--c-info',
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

  // Диспатчим событие для синхронизации компонентов
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeName }));
  }
};

/**
 * Получает текущую тему
 * @returns текущая тема или null если не установлена
 */
export const getTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const savedTheme = localStorage.getItem('dobrunia-theme');
  return savedTheme as Theme | null;
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

  // Диспатчим событие для синхронизации компонентов
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: null }));
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
 * Проверяет, является ли строка валидной темой
 * @param themeName - имя темы для проверки
 * @returns true если тема существует
 */
const isValidTheme = (themeName: string): themeName is Theme => {
  return getThemeConfig(themeName) !== undefined;
};

/**
 * Инициализирует систему тем
 */
export const initThemeSystem = (): void => {
  if (typeof window === 'undefined') return;

  const savedTheme = getTheme();
  if (savedTheme && isValidTheme(savedTheme)) {
    // Применяем сохранённую тему только если она существует
    setTheme(savedTheme);
  } else {
    // Если нет сохранённой темы или она недействительна, используем светлую
    if (savedTheme && !isValidTheme(savedTheme)) {
      console.warn(`Saved theme "${savedTheme}" not found, falling back to light theme`);
      // Очищаем недействительную тему из localStorage
      localStorage.removeItem('dobrunia-theme');
    }
    setTheme('light');
  }
};
