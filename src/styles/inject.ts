// Импортируем CSS переменные
import './variables.pcss';

// Автоматическая инжекция CSS стилей
let stylesInjected = false;

export const injectStyles = () => {
  if (stylesInjected || typeof document === 'undefined') {
    return;
  }

  stylesInjected = true;
};

// Функция для установки темы по умолчанию
const setDefaultTheme = () => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Если тема уже установлена, не меняем
  if (root.hasAttribute('data-theme')) return;

  // Определяем тему на основе системных настроек
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = prefersDark ? 'dark' : 'light';

  root.setAttribute('data-theme', defaultTheme);
};

// Автоматически инжектируем стили и устанавливаем тему при импорте
injectStyles();
setDefaultTheme();
