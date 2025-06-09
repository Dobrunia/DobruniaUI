export type Theme = 'light' | 'dark';

/**
 * Устанавливает тему DobruniaUI
 * @param theme - 'light' | 'dark'
 */
export const setTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
};

/**
 * Получает текущую тему
 * @returns текущая тема или null если не установлена
 */
export const getTheme = (): Theme | null => {
  if (typeof document === 'undefined') return null;
  return document.documentElement.getAttribute('data-theme') as Theme | null;
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
  if (typeof document === 'undefined') return;
  document.documentElement.removeAttribute('data-theme');
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
