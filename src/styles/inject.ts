import { CSS_VARIABLES } from './cssInJs';
import { initThemeSystem } from '../utils/theme';

// Функция для инжекции CSS переменных
const injectStyles = () => {
  if (typeof document === 'undefined') return;

  // Проверяем, не были ли стили уже инжектированы
  if (document.getElementById('dobrunia-ui-styles')) return;

  const style = document.createElement('style');
  style.id = 'dobrunia-ui-styles';
  style.textContent = CSS_VARIABLES;
  document.head.appendChild(style);

  console.log('🎨 DobruniaUI стили инжектированы');
};

// Автоматически инжектируем стили и инициализируем темы при импорте
if (typeof window !== 'undefined') {
  // Если DOM уже готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      initThemeSystem();
    });
  } else {
    // DOM уже готов
    injectStyles();
    initThemeSystem();
  }
} else if (typeof global !== 'undefined') {
  // Серверная среда - подготавливаем для гидратации
  console.log('🔄 DobruniaUI готов к гидратации на клиенте');
}
