import React, { useState } from 'react';
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
