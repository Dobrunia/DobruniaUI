// Импортируем CSS переменные как строку из TypeScript файла
import { CSS_VARIABLES } from './cssInJs';

// Автоматическая инжекция CSS стилей
let stylesInjected = false;

export const injectStyles = () => {
  if (stylesInjected || typeof document === 'undefined') {
    return;
  }

  // Проверяем, не были ли стили уже добавлены
  const existingStyles = document.getElementById('dobruniaui-styles');
  if (existingStyles) {
    stylesInjected = true;
    return;
  }

  // Создаем и добавляем style элемент с высоким приоритетом
  const styleElement = document.createElement('style');
  styleElement.id = 'dobruniaui-styles';
  styleElement.type = 'text/css';
  styleElement.textContent = CSS_VARIABLES;

  // Добавляем в самое начало head для высокого приоритета
  const head = document.head;
  if (head.firstChild) {
    head.insertBefore(styleElement, head.firstChild);
  } else {
    head.appendChild(styleElement);
  }

  stylesInjected = true;

  console.log('✅ DobruniaUI стили успешно загружены');
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

  console.log(`🎨 DobruniaUI тема установлена: ${defaultTheme}`);
};

// Автоматически инжектируем стили и устанавливаем тему при импорте
if (typeof window !== 'undefined') {
  // Если DOM уже готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      setDefaultTheme();
    });
  } else {
    // DOM уже готов
    injectStyles();
    setDefaultTheme();
  }
} else if (typeof global !== 'undefined') {
  // Серверная среда - подготавливаем для гидратации
  console.log('🔄 DobruniaUI готов к гидратации на клиенте');
}
