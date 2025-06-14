import React, { useState, useEffect } from 'react';
import {
  Select,
  type SelectOption,
  getAllThemes,
  getTheme,
  setTheme,
  type Theme,
  type ThemeConfig,
} from '@DobruniaUI';

export const ThemeSelect: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme() || 'light');

  // Отслеживаем изменения темы из других мест
  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = getTheme() || 'light';
      setCurrentTheme(newTheme);
    };

    // Слушаем изменения localStorage (для других вкладок)
    window.addEventListener('storage', handleThemeChange);

    // Слушаем кастомное событие для изменений в той же вкладке
    window.addEventListener('theme-changed', handleThemeChange);

    // Проверяем текущую тему при монтировании
    handleThemeChange();

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, []);

  // Получаем все доступные темы из реестра
  const themeOptions: SelectOption[] = getAllThemes().map((theme: ThemeConfig) => ({
    value: theme.name,
    label: theme.label,
    icon: theme.icon,
    description: theme.description,
  }));

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
    setCurrentTheme(value as Theme);
  };

  return (
    <Select
      options={themeOptions}
      value={currentTheme}
      onChange={handleThemeChange}
      placeholder='Выберите тему'
      width={200}
    />
  );
};
