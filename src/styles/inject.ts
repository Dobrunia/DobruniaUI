import { initThemeSystem } from '../utils/theme';

// Автоматически инжектируем стили и инициализируем темы при импорте
if (typeof window !== 'undefined') {
  // Если DOM уже готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initThemeSystem();
    });
  } else {
    // DOM уже готов
    initThemeSystem();
  }
} else if (typeof global !== 'undefined') {
  // Серверная среда - подготавливаем для гидратации
  console.log('🔄 DobruniaUI готов к гидратации на клиенте');
}
