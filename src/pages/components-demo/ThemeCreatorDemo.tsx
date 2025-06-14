import React, { useState } from 'react';
import { Button, TextField, registerTheme, setTheme } from '@DobruniaUI';

interface ThemeVariables extends Record<string, string> {
  '--c-bg-default': string;
  '--c-bg-subtle': string;
  '--c-bg-elevated': string;
  '--c-text-primary': string;
  '--c-text-secondary': string;
  '--c-text-inverse': string;
  '--c-border': string;
  '--c-border-focus': string;
  '--c-accent': string;
  '--c-accent-hover': string;
  '--c-accent-active': string;
  '--c-success': string;
  '--c-error': string;
  '--c-warning': string;
  '--c-info': string;
}

const defaultVariables: ThemeVariables = {
  '--c-bg-default': '#faf5ff',
  '--c-bg-subtle': '#ffffff',
  '--c-bg-elevated': '#f3e8ff',
  '--c-text-primary': '#581c87',
  '--c-text-secondary': '#7c3aed',
  '--c-text-inverse': '#ffffff',
  '--c-border': '#e9d5ff',
  '--c-border-focus': '#8b5cf6',
  '--c-accent': '#8b5cf6',
  '--c-accent-hover': '#7c3aed',
  '--c-accent-active': '#6d28d9',
  '--c-success': '#059669',
  '--c-error': '#dc2626',
  '--c-warning': '#d97706',
  '--c-info': '#3b82f6',
};

const colorSections = [
  {
    title: '🎨 Background Colors',
    colors: [
      {
        key: '--c-bg-default',
        label: 'Default Background',
        description: 'Основной фон приложения',
      },
      {
        key: '--c-bg-subtle',
        label: 'Subtle Background',
        description: 'Слегка приподнятые блоки и карты',
      },
      {
        key: '--c-bg-elevated',
        label: 'Elevated Background',
        description: 'Модальные окна и выпадающие списки',
      },
    ],
  },
  {
    title: '📝 Text Colors',
    colors: [
      { key: '--c-text-primary', label: 'Primary Text', description: 'Основной текст' },
      { key: '--c-text-secondary', label: 'Secondary Text', description: 'Вторичный текст' },
      {
        key: '--c-text-inverse',
        label: 'Inverse Text',
        description: 'Текст на тёмных/акцентных элементах',
      },
    ],
  },
  {
    title: '🔲 Border Colors',
    colors: [
      { key: '--c-border', label: 'Border', description: 'Обычные границы' },
      { key: '--c-border-focus', label: 'Focus Border', description: 'Границы в состоянии фокуса' },
    ],
  },
  {
    title: '⭐ Accent Colors',
    colors: [
      { key: '--c-accent', label: 'Accent', description: 'Основной акцентный цвет' },
      {
        key: '--c-accent-hover',
        label: 'Accent Hover',
        description: 'Акцентный цвет при наведении',
      },
      {
        key: '--c-accent-active',
        label: 'Accent Active',
        description: 'Акцентный цвет в активном состоянии',
      },
    ],
  },
  {
    title: '🚦 Semantic Colors',
    colors: [
      { key: '--c-success', label: 'Success', description: 'Цвет успеха' },
      { key: '--c-error', label: 'Error', description: 'Цвет ошибки' },
      { key: '--c-warning', label: 'Warning', description: 'Цвет предупреждения' },
      { key: '--c-info', label: 'Info', description: 'Информационный цвет' },
    ],
  },
];

export const ThemeCreatorDemo: React.FC = () => {
  const [themeName, setThemeName] = useState('custom');
  const [themeLabel, setThemeLabel] = useState('Кастомная');
  const [themeIcon, setThemeIcon] = useState('🎨');
  const [themeDescription, setThemeDescription] = useState('Моя кастомная тема');
  const [variables, setVariables] = useState<ThemeVariables>(defaultVariables);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (key: keyof ThemeVariables, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const applyTheme = () => {
    const themeConfig = {
      name: themeName,
      label: themeLabel,
      icon: themeIcon,
      description: themeDescription,
      variables,
    };

    registerTheme(themeConfig);
    setTheme(themeName as any);
    setPreviewMode(true);
  };

  const downloadTheme = () => {
    const themeContent = `/* ${themeLabel} Theme - ${themeDescription} */
:root {
${Object.entries(variables)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}

/* Theme Configuration */
const ${themeName}Theme = {
  name: '${themeName}',
  label: '${themeLabel}',
  icon: '${themeIcon}',
  description: '${themeDescription}',
  variables: {
${Object.entries(variables)
  .map(([key, value]) => `    '${key}': '${value}',`)
  .join('\n')}
  }
};

// Register theme
registerTheme(${themeName}Theme);`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeName}-theme.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetTheme = () => {
    setThemeName('custom');
    setThemeLabel('Кастомная');
    setThemeIcon('🎨');
    setThemeDescription('Моя кастомная тема');
    setVariables(defaultVariables);
    setPreviewMode(false);
    setTheme('light');
  };

  const loadPreset = (preset: 'light' | 'dark' | 'purple') => {
    const presets = {
      light: {
        name: 'light-custom',
        label: 'Светлая кастомная',
        icon: '☀️',
        description: 'Кастомная светлая тема',
        variables: {
          '--c-bg-default': '#ffffff',
          '--c-bg-subtle': '#f8fafc',
          '--c-bg-elevated': '#ffffff',
          '--c-text-primary': '#1a202c',
          '--c-text-secondary': '#718096',
          '--c-text-inverse': '#ffffff',
          '--c-border': '#e2e8f0',
          '--c-border-focus': '#3182ce',
          '--c-accent': '#3182ce',
          '--c-accent-hover': '#2c5aa0',
          '--c-accent-active': '#2a4a7c',
          '--c-success': '#38a169',
          '--c-error': '#e53e3e',
          '--c-warning': '#d69e2e',
          '--c-info': '#3182ce',
        },
      },
      dark: {
        name: 'dark-custom',
        label: 'Тёмная кастомная',
        icon: '🌙',
        description: 'Кастомная тёмная тема',
        variables: {
          '--c-bg-default': '#1a1a1a',
          '--c-bg-subtle': '#2d2d2d',
          '--c-bg-elevated': '#3a3a3a',
          '--c-text-primary': '#ffffff',
          '--c-text-secondary': '#a0a0a0',
          '--c-text-inverse': '#000000',
          '--c-border': '#4a4a4a',
          '--c-border-focus': '#6a9fb5',
          '--c-accent': '#6a9fb5',
          '--c-accent-hover': '#58859a',
          '--c-accent-active': '#4a6c7f',
          '--c-success': '#48bb78',
          '--c-error': '#f56565',
          '--c-warning': '#ed8936',
          '--c-info': '#4299e1',
        },
      },
      purple: {
        name: 'purple-custom',
        label: 'Фиолетовая кастомная',
        icon: '🟣',
        description: 'Кастомная фиолетовая тема',
        variables: defaultVariables,
      },
    };

    const selected = presets[preset];
    setThemeName(selected.name);
    setThemeLabel(selected.label);
    setThemeIcon(selected.icon);
    setThemeDescription(selected.description);
    setVariables(selected.variables);
  };

  return (
    <div className='theme-creator-demo'>
      <h1>🎨 Theme Creator</h1>
      <p>Создайте свою уникальную тему для DobruniaUI</p>

      {/* Базовая информация о теме */}
      <section className='section'>
        <h2>📝 Информация о теме</h2>
        <div className='form-grid'>
          <TextField
            label='Название темы'
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            placeholder='custom-theme'
          />
          <TextField
            label='Отображаемое имя'
            value={themeLabel}
            onChange={(e) => setThemeLabel(e.target.value)}
            placeholder='Моя тема'
          />
          <TextField
            label='Иконка'
            value={themeIcon}
            onChange={(e) => setThemeIcon(e.target.value)}
            placeholder='🎨'
          />
          <TextField
            label='Описание'
            value={themeDescription}
            onChange={(e) => setThemeDescription(e.target.value)}
            placeholder='Описание темы'
          />
        </div>
      </section>

      {/* Пресеты */}
      <section className='section'>
        <h2>🚀 Быстрый старт</h2>
        <div className='preset-buttons'>
          <Button variant='secondary' onClick={() => loadPreset('light')}>
            ☀️ Светлая основа
          </Button>
          <Button variant='secondary' onClick={() => loadPreset('dark')}>
            🌙 Тёмная основа
          </Button>
          <Button variant='secondary' onClick={() => loadPreset('purple')}>
            🟣 Фиолетовая основа
          </Button>
        </div>
      </section>

      {/* Цветовые секции */}
      {colorSections.map((section) => (
        <section key={section.title} className='section'>
          <h2>{section.title}</h2>
          <div className='color-grid'>
            {section.colors.map((color) => (
              <div key={color.key} className='color-item'>
                <div className='color-picker-wrapper'>
                  <input
                    type='color'
                    value={variables[color.key as keyof ThemeVariables]}
                    onChange={(e) =>
                      handleColorChange(color.key as keyof ThemeVariables, e.target.value)
                    }
                    className='color-picker'
                  />
                  <div
                    className='color-preview'
                    style={{ backgroundColor: variables[color.key as keyof ThemeVariables] }}
                  />
                </div>
                <div className='color-info'>
                  <strong>{color.label}</strong>
                  <span className='color-description'>{color.description}</span>
                  <code className='color-code'>{variables[color.key as keyof ThemeVariables]}</code>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Preview секция */}
      <section className='section'>
        <h2>👀 Превью темы</h2>
        <div
          className='preview-container'
          style={{
            background: variables['--c-bg-default'],
            border: `1px solid ${variables['--c-border']}`,
            borderRadius: '8px',
            padding: '20px',
            color: variables['--c-text-primary'],
          }}
        >
          <div
            className='preview-card'
            style={{
              background: variables['--c-bg-subtle'],
              border: `1px solid ${variables['--c-border']}`,
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: variables['--c-text-primary'] }}>
              {themeIcon} {themeLabel}
            </h3>
            <p style={{ margin: '0 0 12px 0', color: variables['--c-text-secondary'] }}>
              {themeDescription}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                style={{
                  background: variables['--c-accent'],
                  color: variables['--c-text-inverse'],
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Primary Button
              </button>
              <button
                style={{
                  background: variables['--c-success'],
                  color: variables['--c-text-inverse'],
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Success
              </button>
              <button
                style={{
                  background: variables['--c-error'],
                  color: variables['--c-text-inverse'],
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Error
              </button>
              <button
                style={{
                  background: variables['--c-warning'],
                  color: variables['--c-text-inverse'],
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Warning
              </button>
            </div>
          </div>

          <div
            className='preview-elevated'
            style={{
              background: variables['--c-bg-elevated'],
              border: `1px solid ${variables['--c-border']}`,
              borderRadius: '6px',
              padding: '16px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: variables['--c-text-primary'] }}>
              Elevated Card
            </h4>
            <p style={{ margin: '0', color: variables['--c-text-secondary'] }}>
              Пример приподнятого элемента (модальные окна, выпадающие списки)
            </p>
          </div>
        </div>
      </section>

      {/* Управление */}
      <section className='section'>
        <h2>🔧 Управление</h2>
        <div className='control-buttons'>
          <Button variant='primary' onClick={applyTheme}>
            ✨ Применить тему
          </Button>
          <Button variant='secondary' onClick={downloadTheme}>
            ⬇️ Скачать тему
          </Button>
          <Button variant='ghost' onClick={resetTheme}>
            🔄 Сбросить
          </Button>
        </div>
        {previewMode && (
          <div className='preview-note'>
            ✅ Тема "{themeLabel}" применена! Перейдите в другие разделы для просмотра изменений.
          </div>
        )}
      </section>

      <style>{`
        .theme-creator-demo {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section {
          margin-bottom: 30px;
          padding: 20px;
          background: var(--c-bg-subtle);
          border: 1px solid var(--c-border);
          border-radius: 8px;
        }

        .section h2 {
          margin-top: 0;
          margin-bottom: 16px;
          color: var(--c-text-primary);
          font-size: 18px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .preset-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .color-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--c-bg-elevated);
          border: 1px solid var(--c-border);
          border-radius: 6px;
        }

        .color-picker-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .color-picker {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          opacity: 0;
        }

        .color-preview {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          border: 1px solid var(--c-border);
          pointer-events: none;
        }

        .color-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .color-info strong {
          color: var(--c-text-primary);
          font-size: 14px;
        }

        .color-description {
          color: var(--c-text-secondary);
          font-size: 12px;
        }

        .color-code {
          color: var(--c-accent);
          font-size: 11px;
          font-family: monospace;
          background: var(--c-bg-default);
          padding: 2px 4px;
          border-radius: 3px;
          align-self: flex-start;
        }

        .preview-container {
          margin-top: 12px;
        }

        .control-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .preview-note {
          padding: 12px;
          background: color-mix(in srgb, var(--c-success) 10%, transparent);
          border: 1px solid var(--c-success);
          border-radius: 4px;
          color: var(--c-success);
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
