import React, { useState } from 'react';
import {
  Button,
  TextField,
  registerTheme,
  setTheme,
  type Theme,
  Avatar,
  Badge,
  Alert,
  SearchInput,
  Select,
  ToggleButton,
  Skeleton,
  Card,
  Snackbar,
  Message,
  Tabbar,
} from '@DobruniaUI';

// Types
interface ThemeConfig {
  name: string;
  label: string;
  icon: string;
  description: string;
  variables: Record<string, string>;
}

type EditorMode = 'hsl' | 'manual';

// Constants
const DEFAULT_THEME_INFO = {
  name: 'custom',
  label: 'Кастомная',
  icon: '🎨',
  description: 'Моя кастомная тема',
};

const DEFAULT_VARIABLES = {
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

const COLOR_SECTIONS = [
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

const PRESETS = {
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
};

// Utils
const hexToHSL = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const generateHSLPalette = (baseColor: string) => {
  const { h: hue, s: baseSat, l: baseLight } = hexToHSL(baseColor);
  return {
    '--c-accent': baseColor,
    '--c-accent-hover': hslToHex(hue, baseSat, Math.max(10, baseLight - 10)),
    '--c-accent-active': hslToHex(hue, baseSat, Math.max(5, baseLight - 20)),
    '--c-success': hslToHex((hue + 90) % 360, 50, 45),
    '--c-error': hslToHex((hue + 340) % 360, 60, 45),
    '--c-warning': hslToHex((hue + 50) % 360, 70, 55),
    '--c-info': hslToHex((hue + 200) % 360, 60, 50),
    '--c-bg-default': hslToHex(hue, 30, 96),
    '--c-bg-subtle': hslToHex(hue, 20, 99),
    '--c-bg-elevated': hslToHex(hue, 20, 92),
    '--c-text-primary': hslToHex(hue, 30, 20),
    '--c-text-secondary': hslToHex(hue, 15, 40),
    '--c-text-inverse': '#fff',
    '--c-border': hslToHex(hue, 10, 80),
    '--c-border-focus': baseColor,
  };
};

// Hooks
const useThemeConfig = () => {
  const [themeInfo, setThemeInfo] = useState(DEFAULT_THEME_INFO);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const [appliedTheme, setAppliedTheme] = useState<string | null>(null);

  const updateThemeInfo = (updates: Partial<typeof DEFAULT_THEME_INFO>) => {
    setThemeInfo((prev) => ({ ...prev, ...updates }));
  };

  const updateVariables = (updates: Record<string, string>) => {
    setVariables((prev) => ({ ...prev, ...updates }));
  };

  const updateVariable = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const loadPreset = (preset: keyof typeof PRESETS) => {
    const selected = PRESETS[preset];
    setThemeInfo(selected);
    setVariables(selected.variables);
  };

  const reset = () => {
    setThemeInfo(DEFAULT_THEME_INFO);
    setVariables(DEFAULT_VARIABLES);
    setAppliedTheme(null);
    setTheme('light');
  };

  const applyTheme = (customVariables?: Record<string, string>) => {
    const themeConfig: ThemeConfig = { ...themeInfo, variables: customVariables || variables };
    registerTheme(themeConfig);
    setTheme(themeInfo.name as Theme);
    setAppliedTheme(themeInfo.name);
  };

  const downloadTheme = () => {
    const themeContent = `/* ${themeInfo.label} Theme - ${themeInfo.description} */
:root {
${Object.entries(variables)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}

/* Theme Configuration */
const ${themeInfo.name}Theme = {
  name: '${themeInfo.name}',
  label: '${themeInfo.label}',
  icon: '${themeInfo.icon}',
  description: '${themeInfo.description}',
  variables: {
${Object.entries(variables)
  .map(([key, value]) => `    '${key}': '${value}',`)
  .join('\n')}
  }
};

// Register theme
registerTheme(${themeInfo.name}Theme);`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeInfo.name}-theme.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    themeInfo,
    variables,
    appliedTheme,
    updateThemeInfo,
    updateVariables,
    updateVariable,
    loadPreset,
    reset,
    applyTheme,
    downloadTheme,
  };
};

const useHSLMode = (onVariablesChange: (vars: Record<string, string>) => void) => {
  const [baseColor, setBaseColor] = useState('#4caf88');
  const [hue, setHue] = useState(hexToHSL('#4caf88').h);

  const generatedPalette = generateHSLPalette(baseColor);

  const updateBaseColor = (color: string) => {
    setBaseColor(color);
    const newHue = hexToHSL(color).h;
    setHue(newHue);
    const newPalette = generateHSLPalette(color);
    onVariablesChange(newPalette);
  };

  const updateHue = (newHue: number) => {
    const newColor = hslToHex(newHue, 50, 50);
    setHue(newHue);
    setBaseColor(newColor);
    const newPalette = generateHSLPalette(newColor);
    onVariablesChange(newPalette);
  };

  return { baseColor, hue, updateBaseColor, updateHue, generatedPalette };
};

// Components
const ThemeInfoSection: React.FC<{
  themeInfo: typeof DEFAULT_THEME_INFO;
  onUpdate: (updates: Partial<typeof DEFAULT_THEME_INFO>) => void;
}> = ({ themeInfo, onUpdate }) => (
  <section className='section'>
    <h2>📝 Информация о теме</h2>
    <div className='form-grid'>
      <TextField
        label='Название темы'
        value={themeInfo.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        placeholder='custom-theme'
      />
      <TextField
        label='Отображаемое имя'
        value={themeInfo.label}
        onChange={(e) => onUpdate({ label: e.target.value })}
        placeholder='Моя тема'
      />
      <TextField
        label='Иконка'
        value={themeInfo.icon}
        onChange={(e) => onUpdate({ icon: e.target.value })}
        placeholder='🎨'
      />
      <TextField
        label='Описание'
        value={themeInfo.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
        placeholder='Описание темы'
      />
    </div>
  </section>
);

const HSLConstructorSection: React.FC<{
  baseColor: string;
  hue: number;
  generatedPalette: Record<string, string>;
  onUpdateBaseColor: (color: string) => void;
  onUpdateHue: (hue: number) => void;
}> = ({ baseColor, hue, generatedPalette, onUpdateBaseColor, onUpdateHue }) => (
  <section className='section'>
    <h2>🎛️ Конструктор тем на HSL</h2>

    <div className='hsl-description'>
      <p>
        🎨 <strong>Умный генератор цветовых схем</strong> — выберите базовый цвет, и система
        автоматически создаст гармоничную палитру для всей темы.
      </p>
      <div className='hsl-features'>
        <span className='feature'>🌈 Автоматическая генерация акцентов</span>
        <span className='feature'>🎯 Семантические цвета (успех, ошибка, предупреждение)</span>
        <span className='feature'>⚖️ Сбалансированные оттенки фона и текста</span>
        <span className='feature'>🔄 Мгновенное превью изменений</span>
      </div>
    </div>

    <div className='hsl-controls'>
      <label>Выбор цвета:</label>
      <input
        type='color'
        value={baseColor}
        onChange={(e) => onUpdateBaseColor(e.target.value)}
        className='color-input'
      />
      <input
        type='text'
        value={baseColor}
        onChange={(e) => onUpdateBaseColor(e.target.value)}
        className='hex-input'
        maxLength={7}
      />
      <label>Оттенок (Hue):</label>
      <input
        type='range'
        min={0}
        max={359}
        value={hue}
        onChange={(e) => onUpdateHue(Number(e.target.value))}
        className='hue-slider'
      />
      <span className='hue-value'>{hue}°</span>
    </div>
    <div className='palette-preview'>
      {Object.entries(generatedPalette).map(([key, val]) => (
        <div key={key} className='palette-item' style={{ background: val }}>
          <div className='palette-label'>{key.replace('--c-', '').replace('-', ' ')}</div>
          <div className='palette-value'>{val}</div>
        </div>
      ))}
    </div>
  </section>
);

const ManualEditSection: React.FC<{
  variables: Record<string, string>;
  onUpdateVariable: (key: string, value: string) => void;
  onLoadPreset: (preset: keyof typeof PRESETS) => void;
}> = ({ variables, onUpdateVariable, onLoadPreset }) => (
  <section className='section'>
    <h2>🔧 Ручная настройка цветов</h2>

    {/* Быстрый старт */}
    <div className='quick-start-inline'>
      <h3>🚀 Быстрый старт</h3>
      <div className='preset-buttons'>
        <Button variant='secondary' onClick={() => onLoadPreset('light')}>
          ☀️ Светлая основа
        </Button>
        <Button variant='secondary' onClick={() => onLoadPreset('dark')}>
          🌙 Тёмная основа
        </Button>
      </div>
    </div>

    {/* Все цвета в одном блоке */}
    <div className='unified-color-grid'>
      {COLOR_SECTIONS.map((section) => (
        <div key={section.title} className='color-section-group'>
          <h4 className='color-section-title'>{section.title}</h4>
          <div className='color-section-items'>
            {section.colors.map((color) => (
              <div key={color.key} className='color-item'>
                <div className='color-picker-wrapper'>
                  <input
                    type='color'
                    value={variables[color.key] || '#000000'}
                    onChange={(e) => onUpdateVariable(color.key, e.target.value)}
                    className='color-picker'
                  />
                  <div
                    className='color-preview'
                    style={{ backgroundColor: variables[color.key] }}
                  />
                </div>
                <div className='color-info'>
                  <strong>{color.label}</strong>
                  <span className='color-description'>{color.description}</span>
                  <input
                    type='text'
                    value={variables[color.key] || ''}
                    onChange={(e) => onUpdateVariable(color.key, e.target.value)}
                    className='hex-input-small'
                    maxLength={7}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const PreviewSection: React.FC<{
  variables: Record<string, string>;
  editorMode: EditorMode;
}> = ({ variables, editorMode }) => {
  const [toggle, setToggle] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Применяем переменные для превью
  const previewStyle = {
    ...Object.fromEntries(Object.entries(variables).map(([key, value]) => [key, value])),
  } as React.CSSProperties;

  return (
    <section className='section'>
      <h2>🧩 Превью темы на компонентах</h2>
      <div className='mode-indicator'>
        Режим: <strong>{editorMode === 'hsl' ? 'HSL Конструктор' : 'Ручная настройка'}</strong>
      </div>
      <div className='preview-container' style={previewStyle}>
        <div className='preview-grid'>
          <div className='preview-column'>
            <div className='button-group'>
              <Button variant='primary'>Primary</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='ghost'>Ghost</Button>
              <Button variant='warning'>Warning</Button>
            </div>
            <SearchInput value='' onChange={() => {}} placeholder='Input field' />
            <Select
              options={[
                { value: '1', label: 'Опция 1' },
                { value: '2', label: 'Опция 2' },
              ]}
              value='1'
              onChange={() => {}}
            />
            <ToggleButton checked={toggle} onChange={() => setToggle(!toggle)}>
              {toggle ? 'Отжать' : 'Нажать'}
            </ToggleButton>
            <Badge value={5}>
              <Button>Badge</Button>
            </Badge>
            <Alert type='success'>Успешно!</Alert>
            <Alert type='error' outlined>
              Ошибка!
            </Alert>
            <ToggleButton checked={showSnackbar} onChange={() => setShowSnackbar(!showSnackbar)}>
              {showSnackbar ? 'Скрыть Snackbar' : 'Показать Snackbar'}
            </ToggleButton>
            <Snackbar
              message='Snackbar: Операция выполнена'
              open={showSnackbar}
              onClose={() => setShowSnackbar(false)}
            />
            <Skeleton variant='text' />
            <Skeleton />
          </div>
          <div className='preview-column'>
            <Card title='Карточка' subtitle='Описание'>
              Контент карточки
            </Card>
            <Card variant='outlined'>Outlined Card</Card>
            <Card variant='elevated'>Elevated Card</Card>
            <Avatar src='' name='John Doe' />
            <Message
              type='incoming'
              text='Привет! Как дела?'
              time='12:30'
              sender={{ id: '1', name: 'John Doe', avatar: '' }}
              reactions={[]}
              onReaction={() => {}}
              attachments={[]}
            />
            <Message
              type='outgoing'
              text='Все отлично!'
              time='12:31'
              sender={{ id: '2', name: 'Jane', avatar: '' }}
              reactions={[]}
              onReaction={() => {}}
              attachments={[]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ControlSection: React.FC<{
  appliedTheme: string | null;
  onApply: () => void;
  onDownload: () => void;
  onReset: () => void;
}> = ({ appliedTheme, onApply, onDownload, onReset }) => (
  <section className='section'>
    <h2>🔧 Управление</h2>
    <div className='control-buttons'>
      <Button variant='primary' onClick={onApply}>
        ✨ Применить тему
      </Button>
      <Button variant='secondary' onClick={onDownload}>
        ⬇️ Скачать тему
      </Button>
      <Button variant='ghost' onClick={onReset}>
        🔄 Сбросить
      </Button>
    </div>
    {appliedTheme && (
      <div className='applied-note'>
        ✅ Тема применена! Перейдите в другие разделы для просмотра изменений.
      </div>
    )}
  </section>
);

// Main Component
export const ThemeCreatorDemo: React.FC = () => {
  const [editorMode, setEditorMode] = useState<EditorMode>('hsl');
  const {
    themeInfo,
    variables,
    appliedTheme,
    updateThemeInfo,
    updateVariables,
    updateVariable,
    loadPreset,
    reset,
    applyTheme,
    downloadTheme,
  } = useThemeConfig();

  const { baseColor, hue, updateBaseColor, updateHue, generatedPalette } =
    useHSLMode(updateVariables);

  const handleApply = () => {
    if (editorMode === 'hsl') {
      updateVariables(generatedPalette);
      applyTheme(generatedPalette);
    } else {
      applyTheme();
    }
  };

  // Определяем переменные для превью в зависимости от режима
  const previewVariables = editorMode === 'hsl' ? generatedPalette : variables;

  return (
    <div className='theme-creator-demo'>
      <h1>🎨 Theme Creator</h1>
      <p>Создайте свою уникальную тему для DobruniaUI</p>

      <ThemeInfoSection themeInfo={themeInfo} onUpdate={updateThemeInfo} />

      <div className='editor-tabs'>
        <Tabbar
          tabs={[
            { id: 'hsl', label: 'Конструктор на HSL' },
            { id: 'manual', label: 'Ручная настройка' },
          ]}
          selectedId={editorMode}
          onTabPress={(id) => setEditorMode(id as EditorMode)}
        />
      </div>

      {editorMode === 'hsl' && (
        <HSLConstructorSection
          baseColor={baseColor}
          hue={hue}
          generatedPalette={generatedPalette}
          onUpdateBaseColor={updateBaseColor}
          onUpdateHue={updateHue}
        />
      )}

      {editorMode === 'manual' && (
        <ManualEditSection
          variables={variables}
          onUpdateVariable={updateVariable}
          onLoadPreset={loadPreset}
        />
      )}

      <PreviewSection variables={previewVariables} editorMode={editorMode} />
      <ControlSection
        appliedTheme={appliedTheme}
        onApply={handleApply}
        onDownload={downloadTheme}
        onReset={reset}
      />

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

        /* Стилизация обертки таббара */
        .editor-tabs {
          margin-bottom: 24px;
          padding: 8px;
          background: var(--c-bg-elevated);
          border: 1px solid var(--c-border);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .hsl-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .color-input {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .hex-input {
          width: 90px;
          font-family: monospace;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid var(--c-border);
          padding: 2px 6px;
        }

        .hex-input-small {
          width: 80px;
          font-family: monospace;
          font-size: 13px;
          border-radius: 3px;
          border: 1px solid var(--c-border);
          margin-top: 2px;
          padding: 1px 4px;
        }

        .hue-slider {
          width: 180px;
        }

        .hue-value {
          font-family: monospace;
          font-size: 16px;
        }

        .palette-preview {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .palette-item {
          width: 110px;
          height: 80px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .palette-label {
          color: #222;
          font-weight: 600;
          font-size: 15px;
          text-align: center;
        }

        .palette-value {
          color: #222;
          font-size: 12px;
          margin-top: 4px;
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

        .preview-grid {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .preview-column {
          min-width: 260px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .control-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .applied-note {
          padding: 12px;
          background: color-mix(in srgb, var(--c-success) 10%, transparent);
          border: 1px solid var(--c-success);
          border-radius: 4px;
          color: var(--c-success);
          font-size: 14px;
          font-weight: 500;
        }

        .mode-indicator {
          padding: 8px 12px;
          background: var(--c-bg-elevated);
          border: 1px solid var(--c-border);
          border-radius: 4px;
          margin-bottom: 16px;
          font-size: 14px;
          color: var(--c-text-secondary);
        }

        .mode-indicator strong {
          color: var(--c-accent);
        }

        .preview-container {
          border: 2px dashed var(--c-border);
          border-radius: 8px;
          padding: 16px;
          background: var(--c-bg-default);
        }

        /* Стили для объединенной ручной настройки */
        .quick-start-inline {
          padding: 16px;
          background: var(--c-bg-elevated);
          border: 1px solid var(--c-border);
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .quick-start-inline h3 {
          margin: 0 0 12px 0;
          font-size: 16px;
          color: var(--c-text-primary);
        }

        .unified-color-grid {
          display: grid;
          gap: 24px;
        }

        .color-section-group {
          padding: 16px;
          background: var(--c-bg-elevated);
          border: 1px solid var(--c-border);
          border-radius: 8px;
        }

        .color-section-title {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--c-text-primary);
          padding-bottom: 8px;
          border-bottom: 1px solid var(--c-border);
        }

        .color-section-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }

        /* Стили для описания HSL конструктора */
        .hsl-description {
          margin-bottom: 20px;
          padding: 16px;
          background: linear-gradient(135deg, var(--c-bg-elevated), var(--c-bg-subtle));
          border: 1px solid var(--c-border);
          border-radius: 8px;
        }

        .hsl-description p {
          margin: 0 0 12px 0;
          color: var(--c-text-primary);
          font-size: 14px;
          line-height: 1.5;
        }

        .hsl-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .feature {
          padding: 4px 8px;
          background: var(--c-bg-default);
          border: 1px solid var(--c-border);
          border-radius: 16px;
          font-size: 12px;
          color: var(--c-text-secondary);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};
