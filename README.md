# 🎨 DobruniaUI

**Современная React UI библиотека компонентов с TypeScript и styled-components**

[![npm version](https://img.shields.io/npm/v/dobruniaui.svg)](https://www.npmjs.com/package/dobruniaui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DobruniaUI - это комплексная библиотека React компонентов, разработанная с упором на современный дизайн, производительность и удобство использования. Все компоненты написаны на TypeScript и стилизованы с помощью styled-components.

## 🎮 Демо

**[Попробуйте все компоненты в интерактивном плейграунде →](https://dobrunia.github.io/DobruniaUI/)**

## ☕ Поддержать

Вы можете поддержать развитие библиотеки:

[![Boosty](https://img.shields.io/badge/Boosty-Поддержать-orange?logo=buymeacoffee)](https://boosty.to/sentryez/donate)

## 📦 Установка

```bash
npm install dobruniaui react react-dom
```

## 🚀 Быстрый старт

```tsx
import React, { useEffect } from 'react';
import { Button, initThemeSystem } from 'dobruniaui';

export default function App() {
  useEffect(() => {
    // Инициализируем систему тем при монтировании приложения
    initThemeSystem();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--c-bg-default)',
        color: 'var(--c-text-primary)',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          color: 'var(--c-text-primary)',
        }}
      >
        DobruniaUI
      </h1>

      <p
        style={{
          fontSize: '1.2rem',
          margin: '0 0 2rem 0',
          color: 'var(--c-text-secondary)',
        }}
      >
        Современная React UI библиотека компонентов
      </p>

      <Button
        variant='secondary'
        onClick={() => window.open('https://github.com/Dobrunia/dobruniaui#readme', '_blank')}
      >
        Документация
      </Button>
    </div>
  );
}
```

## 🎨 Глобальные стили

Для лучшей интеграции с системой тем добавьте в ваш главный CSS файл:

```css
/* Базовые стили */
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif; /* или ваш предпочитаемый шрифт */
}

html {
  font-size: 16px;
}

@media (max-width: 450px) {
  html {
    font-size: 14px;
  }
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--c-bg-default);
  color: var(--c-text-primary);
}

/* Опциональные utility классы для размеров шрифтов */
.font-small {
  font-size: 0.7rem;
}
.font-small-plus {
  font-size: 0.8rem;
}
.font-medium {
  font-size: 1rem;
}
.font-large {
  font-size: 1.2rem;
}
```

> 💡 **Совет**: Использование CSS переменных тем (`var(--c-bg-default)`, `var(--c-text-primary)`) обеспечит автоматическое переключение цветов при смене темы.

## 🎨 Система тем

DobruniaUI включает гибкую систему управления темами с возможностью легкого добавления кастомных тем.

### Встроенные темы

**Светлые темы:**

- 🌞 **Светлая** - классическая светлая тема (по умолчанию)
- 🌊 **Океан** - нежная морская тема в мягких тонах
- 🌸 **Розовая** - мягкая пастельная тема
- 🌅 **Закат** - тёплая персиковая тема в оттенках заката
- 💜 **Lavender Light** - светлая сиреневая тема для дневного использования

**Тёмные темы:**

- 🌙 **Тёмная** - современная тёмная тема с улучшенной контрастностью
- ⚫ **Угольная** - элегантная монохромная тема
- 🌫️ **Сланцевая** - мягкая тёмная с пастельными акцентами
- 🌌 **Полуночная** - глубокая тёмная с тёплыми акцентами
- 🌙 **Лунная** - холодная серебристая тема
- 🌕 **Полная луна** - золотистая луна над тёмным океаном
- ⚙️ **Металлическая** - полированное железо с белыми искрами
- ⬛ **Графитовая** - настоящая графитовая тема
- 🩸 **Кровавая луна** - мистическая тёмная тема с ярко-красными акцентами
- 🔮 **Obsidian Purple** - тёмная тема в стиле Obsidian с фиолетовыми акцентами
- 🎩 **Old Money** - элегантная тема в стиле старых денег с бежево-коричневой палитрой

### Управление темами

**Базовые функции:**

```tsx
import {
  setTheme,
  getTheme,
  toggleTheme,
  removeTheme,
  getSystemTheme,
  initThemeSystem,
} from 'dobruniaui';

// Установить тему
setTheme('light'); // светлая
setTheme('dark'); // тёмная
setTheme('ocean'); // океан
setTheme('pink'); // розовая
setTheme('sunset'); // закат
setTheme('charcoal'); // угольная
setTheme('slate'); // сланцевая
setTheme('midnight'); // полуночная
setTheme('lunar'); // лунная
setTheme('fullmoon'); // полная луна
setTheme('metallic'); // металлическая
setTheme('graphite'); // графитовая
setTheme('bloodmoon'); // кровавая луна
setTheme('obsidian'); // obsidian purple
setTheme('lavender'); // lavender light
setTheme('oldmoney'); // old money

// Получить текущую тему
const currentTheme = getTheme(); // Theme | null

// Переключить между светлой и тёмной
toggleTheme();

// Удалить сохранённую тему (очистить localStorage и CSS переменные)
removeTheme();

// Получить системную тему пользователя
const systemTheme = getSystemTheme(); // 'light' | 'dark'

// ⚠️ ОБЯЗАТЕЛЬНО: Инициализируем систему тем при монтировании приложения!
initThemeSystem();
```

**Компонент выбора темы:**

```tsx
import { ThemeSelect } from 'dobruniaui';

function App() {
  useEffect(() => {
    // Инициализируем систему тем при монтировании приложения
    initThemeSystem();
  }, []);

  return (
    <div>
      <ThemeSelect />
    </div>
  );
}
```

### Создание кастомных тем

```tsx
import { registerTheme } from 'dobruniaui';

// Регистрируем новую тему
registerTheme({
  name: 'violet',
  label: 'Фиолетовая',
  icon: '🟣',
  description: 'Элегантная фиолетовая тема',
  variables: {
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
  },
});

// Тема автоматически появится в ThemeSelect
```

**Получение информации о темах:**

```tsx
import { getAllThemes, getThemeConfig } from 'dobruniaui';

// Получить все зарегистрированные темы
const themes = getAllThemes();

// Получить конфигурацию конкретной темы
const darkTheme = getThemeConfig('dark');
```

### API Reference

**Основные функции:**

- `setTheme(themeName: string)` - устанавливает тему и сохраняет в localStorage
- `getTheme()` - возвращает текущую сохранённую тему или null
- `toggleTheme()` - переключает между светлой и тёмной темой
- `removeTheme()` - удаляет сохранённую тему и очищает CSS переменные
- `getSystemTheme()` - определяет системную тему пользователя ('light' | 'dark')
- `initThemeSystem()` - инициализирует систему тем (ОБЯЗАТЕЛЬНО Инициализируем систему тем при монтировании приложения!)

**Управление темами:**

- `registerTheme(theme: ThemeConfig)` - регистрирует новую тему в системе
- `getAllThemes()` - возвращает массив всех зарегистрированных тем
- `getThemeConfig(name: string)` - возвращает конфигурацию темы по имени

**Типы:**

- `Theme` - строковый тип для имени темы
- `ThemeConfig` - интерфейс конфигурации темы с полями name, label, icon, description, variables

## 🧩 Компоненты

### 📝 Inputs (Формы и ввод)

#### **Button** - Кнопки

**Пропсы:**

- `variant?: 'primary' | 'secondary' | 'ghost' | 'warning' | 'send' | 'close'` - стиль кнопки
- `size?: 'small' | 'medium' | 'large'` - размер кнопки
- `shape?: 'default' | 'circle' | 'square'` - форма кнопки
- `fullWidth?: boolean` - растянуть на всю ширину
- `isLoading?: boolean` - состояние загрузки
- `leftIcon?: React.ReactNode` - иконка слева
- `rightIcon?: React.ReactNode` - иконка справа
- `outlined?: boolean` - контурная кнопка
- `disabled?: boolean` - заблокированное состояние
- `onClick?: () => void` - обработчик клика
- `children?: React.ReactNode` - содержимое кнопки
- `className?: string` - дополнительные CSS классы

**Варианты кнопок:**

- `primary` - основная кнопка с акцентным цветом
- `secondary` - вторичная кнопка с мягким стилем
- `ghost` - прозрачная кнопка без фона
- `warning` - кнопка предупреждения
- `send` - специальная кнопка для отправки (компактная)
- `close` - кнопка закрытия с красным акцентом

**Формы кнопок:**

- `default` - стандартная прямоугольная форма
- `circle` - круглая кнопка (идеально для иконок)
- `square` - квадратная кнопка

```tsx
<Button variant='primary' size='large' isLoading onClick={() => console.log('Clicked')}>
  Отправить
</Button>

<Button variant='secondary' shape='circle' size='small'>
  ↓
</Button>

<Button variant='close' shape='circle' size='small'>
  ×
</Button>
```

#### **ErrorButton** - Кнопка ошибки с tooltip

**Пропсы:**

- `tooltipText?: string` - текст подсказки при наведении
- `size?: 'small' | 'medium' | 'large'` - размер кнопки
- `disabled?: boolean` - заблокированное состояние
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - обработчик клика
- `className?: string` - дополнительные CSS классы

```tsx
<ErrorButton tooltipText='Удалить элемент' size='medium' onClick={() => handleDelete()} />
```

#### **IconBtn** - Квадратные кнопки-иконки

**Пропсы:**

- `icon: 'clock' | 'exclamation' | 'question' | 'dots' | 'exit' | 'settings' | 'add' | 'search'` - тип иконки (обязательный)
- `size?: 'small' | 'medium' | 'large'` - размер кнопки
- `variant?: 'primary' | 'secondary' | 'ghost' | 'warning'` - стиль кнопки
- `title?: string` - текст для tooltip при наведении
- `iconColor?: string` - цвет иконки (по умолчанию наследует цвет текста кнопки)
- `disabled?: boolean` - заблокированное состояние
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - обработчик клика
- `className?: string` - дополнительные CSS классы

**Доступные иконки:**

- `clock` - часы/время
- `exclamation` - восклицательный знак
- `question` - вопросительный знак
- `dots` - три точки (меню)
- `exit` - выход/логин
- `settings` - настройки/шестеренка
- `add` - плюс (добавление)
- `search` - лупа (поиск)

```tsx
<IconBtn icon='add' variant='primary' title='Добавить элемент' onClick={() => addItem()} />
<IconBtn icon='search' variant='secondary' title='Поиск' onClick={() => openSearch()} />
<IconBtn icon='clock' variant='ghost' title='Показать время' onClick={() => showTimeMenu()} />
<IconBtn icon='exclamation' variant='warning' size='large' title='Предупреждение' />
<IconBtn icon='dots' variant='ghost' title='Меню' onClick={() => openContextMenu()} />
<IconBtn icon='settings' variant='secondary' title='Настройки' onClick={() => openSettings()} />
```

#### **SlottedButton** - Кнопки с тремя независимыми слотами

**Основные пропсы:**

- `variant?: 'primary' | 'secondary' | 'ghost' | 'warning'` - стиль кнопки (по умолчанию 'primary')
- `size?: 'small' | 'medium' | 'large'` - размер кнопки (по умолчанию 'medium')
- `outlined?: boolean` - outlined вариант кнопки (по умолчанию false)
- `centerSlot: SlotProps` - центральный слот (**ОБЯЗАТЕЛЬНЫЙ**)
- `leftSlot?: SlotProps` - левый слот (опциональный)
- `rightSlot?: SlotProps` - правый слот (опциональный)
- `className?: string` - дополнительные CSS классы

**SlotProps (для каждого слота):**

- `children?: React.ReactNode` - содержимое слота (текст, иконка)
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - обработчик клика по слоту
- `onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void` - обработчик наведения
- `onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void` - обработчик ухода курсора
- `disabled?: boolean` - заблокированное состояние конкретного слота

```tsx
<SlottedButton
  variant="secondary"
  leftSlot={{
    children: "+",
    onClick: () => handleAdd(),
  }}
  centerSlot={{
    children: "Добавить в планы",
    onClick: () => handleMain(),
  }}
  rightSlot={{
    children: "▼",
    onClick: () => handleDropdown(),
  }}
/>

<SlottedButton
  variant="primary"
  outlined
  leftSlot={{
    children: "🔖",
    onClick: () => handleBookmark(),
  }}
  centerSlot={{
    children: "В просмотренное",
  }}
  rightSlot={{
    children: "📋",
    onClick: () => handleCopy(),
  }}
/>

<SlottedButton
  variant="ghost"
  leftSlot={{
    children: "📱",
    onClick: () => alert('Icon clicked'),
  }}
  centerSlot={{
    children: "Download App",
    onClick: () => alert('Text clicked'),
  }}
/>

<SlottedButton
  variant="warning"
  size="large"
  leftSlot={{
    children: "⚠️",
    onClick: () => alert('Warning clicked'),
    disabled: false,
  }}
  centerSlot={{
    children: "Delete Project",
    onClick: () => alert('Delete clicked'),
  }}
  rightSlot={{
    children: "🗑️",
    onClick: () => alert('Trash clicked'),
  }}
/>
```

#### **TextField** - Текстовые поля с floating label

**Пропсы:**

- `label?: string` - метка поля
- `type?: 'text' | 'password' | 'email' | 'phone' | 'number'` - тип поля
- `value?: string` - значение поля
- `autoComplete?: string | boolean` - автозаполнение браузера (по умолчанию true)
- `width?: string` - ширина компонента
- `error?: boolean` - состояние ошибки
- `errorText?: string` - текст ошибки
- `helperText?: string` - вспомогательный текст
- `disabled?: boolean` - заблокированное состояние
- `onChange?: (value: string) => void` - обработчик изменения
- `className?: string` - дополнительные CSS классы

```tsx
// Базовое использование с автозаполнением
<TextField
  label='Email'
  type='email'
  value={email}
  onChange={setEmail}
  error={!isValidEmail}
  errorText='Введите корректный email'
/>
```

#### **SearchInput** - Поиск с красивым дизайном

**Пропсы:**

- `value: string` - значение поиска (обязательный)
- `onChange: (value: string) => void` - обработчик изменения (обязательный)
- `size?: 'small' | 'medium' | 'large'` - размер поля (по умолчанию 'medium')
- `placeholder?: string` - placeholder текст (по умолчанию 'Поиск')
- `...rest` - все остальные HTML атрибуты input (ref, disabled, autoFocus, etc.)

**Размеры:**

- `small` — min-height: 32px, font-size: 0.7rem
- `medium` — min-height: 40px, font-size: 1rem (по умолчанию)
- `large` — min-height: 48px, font-size: 1.2rem

```tsx
<SearchInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder='Введите запрос для поиска...'
  size='large' // small | medium | large
/>
```

#### **FileInput** - Кнопка для выбора файлов

**Пропсы:**

- `onFilesChange: (files: File[]) => void` - обработчик изменения файлов (обязательный)
- `disabled?: boolean` - отключить компонент
- `multiple?: boolean` - разрешить множественный выбор (по умолчанию true)
- `accept?: string` - принимаемые типы файлов
- `className?: string` - дополнительные CSS классы

```tsx
<FileInput onFilesChange={setSelectedFiles} multiple accept='image/*' />
```

#### **EmojiInput** - Выбор эмодзи с hover picker

**Пропсы:**

- `onEmojiSelect: (emoji: string) => void` - обработчик выбора эмодзи (обязательный)
- `align?: 'left' | 'right'` - выравнивание picker'а (по умолчанию 'left')
- `className?: string` - дополнительные CSS классы

```tsx
<EmojiInput onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)} align='right' />
```

#### **AudioInput** - Запись аудио с анимацией

**Пропсы:**

- `onAudioRecord: (audio: Blob) => void` - обработчик записи аудио (обязательный)
- `className?: string` - дополнительные CSS классы

**Особенности:**

- **Визуальная обратная связь** - анимация во время записи
- **Автоматическое определение длительности** - показывает время записи
- **Простое управление** - один клик для начала/остановки записи
- **Качественная запись** - использует Web Audio API

```tsx
<AudioInput onAudioRecord={handleAudioRecord} />
```

#### **MessageInput** - Компонент ввода сообщений с поддержкой файлов, эмодзи и аудио

**Пропсы:**

- `value: string` - текст сообщения (обязательный)
- `onChange: (value: string) => void` - обработчик изменения текста (обязательный)
- `files: File[]` - массив прикрепленных файлов (обязательный)
- `onFilesChange: (files: File[]) => void` - обработчик изменения файлов (обязательный)
- `placeholder?: string` - placeholder для текстового поля (по умолчанию 'Введите сообщение...')
- `onSend?: () => void` - обработчик отправки сообщения
- `onEmojiSelect?: (emoji: string) => void` - дополнительный обработчик выбора эмодзи (автоматически добавляется в текст)
- `onAudioRecord?: (audio: Blob) => void` - обработчик записи аудио
- `disabled?: boolean` - отключить компонент
- `className?: string` - дополнительные CSS классы

**Особенности:**

- **Авто-высота textarea** - автоматически изменяет высоту при вводе текста
- **Превью файлов** - показывает миниатюры изображений и иконки для других типов файлов
- **Lightbox для изображений** - полноэкранный просмотр прикрепленных изображений
- **Отправка по Ctrl+Enter** - комбинация клавиш для быстрой отправки
- **Автофокус** - автоматически фокусируется на поле ввода после отправки
- **Оптимизированная производительность** - использует React.memo для предотвращения лишних ререндеров

```tsx
<MessageInput
  value={messageText}
  onChange={setMessageText}
  files={attachedFiles}
  onFilesChange={setAttachedFiles}
  placeholder='Введите сообщение...'
  onSend={handleSendMessage}
  onEmojiSelect={handleEmojiSelect}
  onAudioRecord={handleAudioRecord}
/>
```

#### **Textarea** - Многострочный ввод

**Пропсы:**

- `label?: string` - метка поля
- `value?: string` - значение поля
- `rows?: number` - количество строк
- `autoHeight?: boolean` - автоматическая высота
- `disabled?: boolean` - заблокированное состояние
- `error?: boolean` - состояние ошибки
- `errorText?: string` - текст ошибки
- `onChange?: (value: string) => void` - обработчик изменения
- `className?: string` - дополнительные CSS классы

```tsx
<Textarea label='Комментарий' rows={4} autoHeight value={comment} onChange={setComment} />
```

#### **Checkbox** - Чекбоксы

**Пропсы:**

- `checked?: boolean` - состояние чекбокса
- `disabled?: boolean` - заблокированное состояние
- `onChange?: (checked: boolean) => void` - обработчик изменения
- `children?: React.ReactNode` - текст рядом с чекбоксом
- `className?: string` - дополнительные CSS классы

```tsx
<Checkbox checked={agreed} onChange={setAgreed}>
  Согласен с условиями
</Checkbox>
```

#### **Radio** - Радио кнопки

**Пропсы:**

- `name?: string` - имя группы радио кнопок
- `value?: string` - значение радио кнопки
- `checked?: boolean` - состояние выбора
- `disabled?: boolean` - заблокированное состояние
- `onChange?: (value: string) => void` - обработчик изменения
- `children?: React.ReactNode` - текст рядом с радио кнопкой
- `className?: string` - дополнительные CSS классы

```tsx
<Radio name='option' value='1' checked={selectedOption === '1'} onChange={setSelectedOption}>
  Вариант 1
</Radio>
```

#### **Switch** - Переключатели

**Базовый Switch:**

- `checked?: boolean` - состояние переключателя
- `disabled?: boolean` - заблокированное состояние
- `onChange?: (checked: boolean) => void` - обработчик изменения
- `className?: string` - дополнительные CSS классы

**Специальные варианты:**

- `RollingSwitch` - с анимацией качения
- `YinYangSwitch` - в стиле инь-янь
- `FlipSwitch` - с флип анимацией
- `PowerSwitch` - кнопка питания

```tsx
<Switch checked={isEnabled} onChange={setIsEnabled} />
<YinYangSwitch checked={isDarkMode} onChange={setIsDarkMode} />
```

#### **Select** - Продвинутые выпадающие списки

**Пропсы:**

- `options: SelectOption[]` - массив опций
- `value?: string | number` - выбранное значение
- `placeholder?: string` - placeholder текст
- `disabled?: boolean` - заблокированное состояние
- `clearable?: boolean` - возможность очистки
- `trigger?: 'click' | 'hover'` - способ открытия
- `width?: number | string` - ширина компонента
- `onChange?: (value: string | number | null) => void` - обработчик изменения
- `className?: string` - дополнительные CSS классы

```tsx
<Select
  options={[
    {
      value: 'fruits',
      label: 'Фрукты',
      icon: '🍎',
      submenu: [
        { value: 'apple', label: 'Яблоко', icon: '🍎' },
        { value: 'banana', label: 'Банан', icon: '🍌' },
      ],
    },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder='Выберите категорию'
  clearable
/>
```

#### **Dropdown** - Простые выпадающие списки

**Пропсы:**

- `options: DropdownOption[]` - массив опций
- `value?: string` - выбранное значение
- `label?: string` - метка поля
- `disabled?: boolean` - заблокированное состояние
- `clearable?: boolean` - возможность очистки
- `error?: boolean` - состояние ошибки
- `errorText?: string` - текст ошибки
- `onChange?: (value: string | null) => void` - обработчик изменения
- `className?: string` - дополнительные CSS классы

```tsx
<Dropdown
  options={[
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
  ]}
  value={selected}
  onChange={setSelected}
  label='Выберите опцию'
  clearable
/>
```

#### **ToggleButton** - Переключатели состояний

**Пропсы:**

- `checked?: boolean` - состояние переключателя
- `disabled?: boolean` - заблокированное состояние
- `size?: 'small' | 'medium' | 'large'` - размер кнопки
- `showIcon?: boolean` - показывать иконку огонька
- `name?: string` - имя для группировки (radio режим)
- `value?: string` - значение для radio режима
- `onChange?: (checked: boolean, value?: string) => void` - обработчик изменения
- `children?: React.ReactNode` - текст кнопки
- `className?: string` - дополнительные CSS классы

```tsx
<ToggleButton checked={isActive} onChange={setIsActive} showIcon>
  Уведомления
</ToggleButton>
```

#### **SidebarList** - Списки для сайдбара

**Пропсы:**

- `sections: SidebarSection[]` - массив секций
- `selected?: string` - выбранный элемент
- `onSelect?: (key: string) => void` - обработчик выбора
- `className?: string` - дополнительные CSS классы

```tsx
<SidebarList
  sections={[
    {
      title: 'Навигация',
      items: [
        { key: 'home', label: 'Главная' },
        { key: 'about', label: 'О нас' },
      ],
    },
  ]}
  selected='home'
  onSelect={handleSelect}
/>
```

### 🎯 Data Display (Отображение данных)

#### **Avatar** - Аватары пользователей

**Пропсы:**

- `src?: string` - URL изображения
- `alt?: string` - альтернативный текст для изображения
- `name?: string` - имя пользователя (для инициалов)
- `size?: 'xxs' | 'sm' | 'md' | 'lg'` - размер аватара (20px/32px/40px/56px)
- `status?: 'online' | 'offline' | 'dnd' | 'invisible'` - статус пользователя
- `showStatus?: boolean` - показывать статус
- `onStatusChange?: (status: Presence) => void` - обработчик изменения статуса
- `onClick?: () => void` - обработчик клика по аватару
- `language?: 'ru' | 'en'` - язык интерфейса для статусов
- `className?: string` - дополнительные CSS классы

**Особенности:**

- **Кликабельность** - cursor pointer только когда есть `onClick` или `onStatusChange`
- **Приоритет обработчиков** - если есть `onClick`, он выполняется; если нет `onClick` но есть `onStatusChange`, открывается меню статусов
- **Статусы** - поддержка 4 статусов с цветовыми индикаторами
- **Инициалы** - автоматическая генерация инициалов из имени при отсутствии изображения

```tsx
<Avatar src='/avatar.jpg' name='John Doe' size='lg' status='online' showStatus />
<Avatar name='Иван Иванов' size='md' status='dnd' onStatusChange={setStatus} language='ru' />
<Avatar name='Кликабельный' onClick={() => alert('Аватар кликнут!')} />
<Avatar name='Не кликабельный' /> {/* cursor: default */}
```

#### **Badge** - Значки и счетчики

**Пропсы:**

- `value?: number | string` - значение бейджа
- `max?: number` - максимальное значение для числового бейджа
- `variant?: 'default' | 'message-date'` - вариант отображения
- `date?: Date | string | number` - дата (для message-date)
- `locale?: string` - локаль для форматирования даты
- `children?: React.ReactNode` - элемент для прикрепления бейджа
- `className?: string` - дополнительные CSS классы

```tsx
<Badge value={5} max={99}>
  <Button>Уведомления</Button>
</Badge>
```

#### **Message** - Сообщения чата

**Пропсы:**

- `type: 'incoming' | 'outgoing'` - тип сообщения
- `text?: string` - текст сообщения
- `time?: string` - время отправки
- `isRead?: boolean` - прочитано ли сообщение
- `sender?: MessageSender` - отправитель сообщения (id, name, avatar, status = 'offline', showStatus = false)
- `reactions?: MessageReaction[]` - массив реакций
- `reactionEmojis?: string[]` - доступные эмодзи для реакций
- `actions?: ActionItem[]` - действия в контекстном меню
- `attachments?: MessageAttachment[]` - вложения
- `replyTo?: ReplyMessage` - ответ на сообщение
- `forwardedFrom?: ForwardedUser` - пересланное от пользователя
- `currentUserId?: string` - ID текущего пользователя
- `showActionsOnClick?: boolean` - показывать меню при клике
- `onReaction?: (emoji: string) => void` - обработчик реакции
- `onReplyClick?: (messageId: string) => void` - обработчик клика по ответу
- `onForwardedClick?: (userId: string) => void` - обработчик клика по пересланному
- `className?: string` - дополнительные CSS классы

```tsx
<Message
  type='incoming'
  text='Привет! Как дела?'
  time='12:30'
  sender={{
    id: '1',
    name: 'John Doe',
    avatar: '/avatar.jpg',
    status: 'online',
    showStatus: true,
  }}
  reactions={[
    {
      emoji: '👍',
      users: [{ id: '2', name: 'Jane' }],
    },
  ]}
  reactionEmojis={['❤️', '😂', '👍', '🔥']}
  onReaction={handleReaction}
/>
```

#### **ChatList** - Список чатов

**Пропсы:**

- `items?: ChatListItem[]` - массив чатов
- `loading?: boolean` - состояние загрузки
- `skeletonCount?: number` - количество skeleton элементов
- `selectedId?: string` - ID выбранного чата
- `onSelect?: (id: string) => void` - обработчик выбора чата
- `className?: string` - дополнительные CSS классы

**Типы:**

```tsx
type MessageStatus = 'unread' | 'read' | 'error';
type Presence = 'online' | 'offline' | 'dnd' | 'invisible';

interface ChatListItem {
  id: string;
  avatar?: string;
  name: string;
  lastMessage: string;
  time: string;
  messageStatus?: MessageStatus;
  isOutgoing?: boolean; // true - исходящее сообщение, false - входящее
  status?: Presence;
  unreadCount?: number; // количество непрочитанных сообщений
  isTyping?: boolean; // индикатор печати пользователя
}
```

**Логика отображения статусов:**

- **Исходящие сообщения** (`isOutgoing: true`):

  - `unread` → ✔✔ серые (собеседник не прочитал)
  - `read` → ✔✔ синие (собеседник прочитал)
  - `error` → ! красный (ошибка отправки)

- **Входящие сообщения** (`isOutgoing: false`):
  - `unread` → текст синий + жирный (я не прочитал)
  - `read` → текст обычный серый (я прочитал)
  - `error` → ! красный (ошибка получения)

**Индикатор печати:**

- Показывает анимированные точки когда пользователь печатает (`isTyping: true`)
- Заменяет последнее сообщение во время печати
- Скрывает галочки статуса и бейдж непрочитанных во время печати
- Анимация с задержкой для каждой точки создает эффект волны

```tsx
<ChatList
  items={[
    {
      id: '1',
      name: 'Алиса',
      lastMessage: 'Привет!',
      time: '12:30',
      messageStatus: 'read',
      isOutgoing: true, // моё сообщение, прочитанное
      status: 'online',
      unreadCount: 3, // количество непрочитанных сообщений
    },
    {
      id: '2',
      name: 'Максим',
      lastMessage: 'Как дела?',
      time: '12:25',
      messageStatus: 'unread',
      isOutgoing: false, // входящее непрочитанное
      status: 'offline',
    },
    {
      id: '3',
      name: 'Иван',
      lastMessage: '',
      time: 'сейчас',
      messageStatus: 'read',
      isOutgoing: false,
      status: 'online',
      isTyping: true, // показывает индикатор печати
    },
  ]}
  selectedId={selectedChatId}
  onSelect={setSelectedChatId}
  loading={isLoading}
/>
```

#### **ActionsMenu** - Контекстное меню действий

**Пропсы:**

- `items: ActionGroup[] | ActionItem[]` - элементы меню
- `onClose?: () => void` - обработчик закрытия
- `className?: string` - дополнительные CSS классы

```tsx
<ActionsMenu
  items={[
    {
      label: 'Редактировать',
      icon: <EditIcon />,
      onClick: handleEdit,
      shortcut: '⌘E',
      type: 'primary',
    },
    {
      label: 'Удалить',
      icon: <DeleteIcon />,
      onClick: handleDelete,
      type: 'destructive',
    },
  ]}
  onClose={() => setMenuOpen(false)}
/>
```

#### **Reaction** - Реакции и эмодзи

**Пропсы:**

- `emoji: string` - эмодзи реакции
- `users: ReactionUser[]` - пользователи, поставившие реакцию
- `currentUserId?: string` - ID текущего пользователя
- `onClick?: (event: React.MouseEvent) => void` - обработчик клика
- `className?: string` - дополнительные CSS классы

```tsx
<Reaction
  emoji='👍'
  users={[
    { id: '1', name: 'John', avatar: '/avatar1.jpg' },
    { id: '2', name: 'Jane', avatar: '/avatar2.jpg' },
  ]}
  currentUserId='1'
  onClick={handleReactionClick}
/>
```

### 💭 Feedback (Обратная связь)

#### **Alert** - Уведомления и оповещения

**Пропсы:**

- `type?: 'success' | 'info' | 'warning' | 'error'` - тип уведомления
- `outlined?: boolean` - контурный стиль
- `children: React.ReactNode` - содержимое уведомления
- `className?: string` - дополнительные CSS классы

**Особенности:**

- **Цветной фон** - фон в цвет уведомления (или контур при `outlined`)
- **Иконка** - соответствующая иконка для каждого типа
- **Компактный дизайн** - идеально для коротких сообщений

```tsx
<Alert type='success' outlined>
  <strong>Успешно!</strong> Данные сохранены.
</Alert>
```

#### **AlertWithBorder** - Структурированные уведомления с левой границей

**Пропсы:**

- `type: 'success' | 'info' | 'warning' | 'error'` - тип уведомления (обязательный)
- `title?: string` - заголовок уведомления
- `description?: string` - описание уведомления
- `children?: React.ReactNode` - дополнительный контент
- `className?: string` - дополнительные CSS классы

**Особенности:**

- **Левая граница** - цветная граница слева в соответствии с типом
- **Светлый фон** - нежный фон с оттенком цвета уведомления
- **Структурированный контент** - заголовок, описание и дополнительный контент
- **Гибкость** - можно использовать только заголовок, только описание или только children

```tsx
<AlertWithBorder
  type="success"
  title="Успешное выполнение"
  description="Операция была выполнена успешно. Все данные сохранены в системе."
>
  Дополнительная информация может быть размещена здесь.
</AlertWithBorder>

<AlertWithBorder
  type="error"
  title="Ошибка"
  description="Произошла ошибка при обработке запроса."
/>

<AlertWithBorder type="info" title="Только заголовок" />
<AlertWithBorder type="warning" description="Только описание" />
<AlertWithBorder type="success">Только контент</AlertWithBorder>
```

#### **Modal** - Модальные окна

**Пропсы:**

- `isOpen: boolean` - состояние открытия
- `onClose: () => void` - обработчик закрытия
- `title?: string` - заголовок модального окна
- `size?: 'small' | 'medium' | 'large'` - размер окна
- `showCloseButton?: boolean` - показывать кнопку закрытия
- `closeable?: boolean` - возможность закрытия
- `closeOnBackdropClick?: boolean` - закрытие при клике на фон
- `closeOnEscape?: boolean` - закрытие по Escape
- `children: React.ReactNode` - содержимое модального окна
- `className?: string` - дополнительные CSS классы

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title='Настройки' size='medium'>
  <p>Содержимое модального окна</p>
</Modal>
```

#### **ModalSubmit** - Модальные окна с формами

**Пропсы:**

- `isOpen: boolean` - состояние открытия
- `onClose: () => void` - обработчик закрытия
- `onSubmit: () => void | Promise<void>` - обработчик отправки
- `title: string` - заголовок модального окна
- `submitText?: string` - текст кнопки подтверждения
- `cancelText?: string` - текст кнопки отмены
- `submitVariant?: 'primary' | 'warning'` - вариант кнопки подтверждения
- `isLoading?: boolean` - состояние загрузки
- `disabled?: boolean` - заблокированное состояние
- `size?: 'small' | 'medium' | 'large'` - размер окна
- `preventCloseOnSubmit?: boolean` - не закрывать после отправки
- `children: React.ReactNode` - содержимое формы
- `className?: string` - дополнительные CSS классы

```tsx
<ModalSubmit
  isOpen={isOpen}
  onSubmit={handleSubmit}
  onClose={handleClose}
  title='Создать элемент'
  isLoading={isSubmitting}
>
  <TextField label='Название' />
</ModalSubmit>
```

#### **Snackbar** - Всплывающие уведомления

**Пропсы:**

- `message: string` - текст уведомления
- `type?: 'success' | 'info' | 'warning' | 'error'` - тип уведомления
- `isVisible: boolean` - видимость уведомления
- `duration?: number` - длительность показа (мс)
- `onClose?: () => void` - обработчик закрытия
- `className?: string` - дополнительные CSS классы

```tsx
<Snackbar
  message='Операция выполнена успешно'
  type='success'
  isVisible={showSnackbar}
  onClose={hideSnackbar}
/>
```

#### **UndoSnackbar** - Snackbar с отменой действия

**Пропсы:**

- `message: string` - текст уведомления
- `isVisible: boolean` - видимость уведомления
- `undoText?: string` - текст кнопки отмены
- `duration?: number` - длительность показа (мс)
- `onUndo?: () => void` - обработчик отмены
- `onClose?: () => void` - обработчик закрытия
- `className?: string` - дополнительные CSS классы

```tsx
<UndoSnackbar
  message='Элемент удален'
  onUndo={handleUndo}
  isVisible={showUndo}
  onClose={hideUndo}
/>
```

#### **LoadingSpinner** - Индикаторы загрузки

**Пропсы:**

- `variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'wave'` - тип анимации
- `size?: 'small' | 'medium' | 'large'` - размер индикатора
- `color?: string` - цвет индикатора
- `className?: string` - дополнительные CSS классы

```tsx
<LoadingSpinner variant='dots' size='large' />
```

#### **Progress** - Индикаторы прогресса

**Пропсы:**

- `value: number` - значение прогресса (0-100)
- `variant?: 'linear' | 'circular'` - тип прогресса
- `size?: 'small' | 'medium' | 'large'` - размер (для circular)
- `showLabel?: boolean` - показывать процент
- `className?: string` - дополнительные CSS классы

```tsx
<Progress value={75} variant="linear" />
<Progress value={60} variant="circular" showLabel />
```

#### **Skeleton** - Скелетоны загрузки

**Пропсы:**

- `variant?: 'text' | 'rectangular' | 'circular' | 'card'` - тип скелетона
- `width?: number | string` - ширина
- `height?: number | string` - высота
- `lines?: number` - количество строк (для text)
- `className?: string` - дополнительные CSS классы

```tsx
<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" width={40} height={40} />
```

### 🧭 Navigation (Навигация)

#### **Breadcrumbs** - Хлебные крошки

**Пропсы:**

- `items: BreadcrumbItem[]` - массив элементов навигации
- `separator?: string` - разделитель между элементами
- `className?: string` - дополнительные CSS классы

```tsx
<Breadcrumbs
  items={[
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: 'Товар' },
  ]}
/>
```

#### **Pagination** - Пагинация

**Пропсы:**

- `current: number` - текущая страница
- `total: number` - общее количество страниц
- `pageSize?: number` - размер страницы
- `showSizeChanger?: boolean` - показывать селектор размера
- `onChange?: (page: number, pageSize?: number) => void` - обработчик изменения
- `className?: string` - дополнительные CSS классы

```tsx
<Pagination current={currentPage} total={totalPages} onChange={handlePageChange} showSizeChanger />
```

#### **Tabbar** - Вкладки

**Пропсы:**

- `tabs: TabData[]` - массив вкладок
- `selectedId: string | number` - ID выбранной вкладки
- `onTabPress: (id: string | number) => void` - обработчик выбора вкладки
- `className?: string` - дополнительные CSS классы

```tsx
<Tabbar
  tabs={[
    { id: 'tab1', label: 'Вкладка 1', notification: 5 },
    { id: 'tab2', label: 'Вкладка 2' },
  ]}
  selectedId='tab1'
  onTabPress={handleTabPress}
/>
```

#### **Tab** - Отдельная вкладка

**Пропсы:**

- `tab: TabData` - данные вкладки
- `selected: boolean` - состояние выбора
- `onClick: (id: string | number) => void` - обработчик клика
- `className?: string` - дополнительные CSS классы

```tsx
<Tab tab={{ id: 1, label: 'Home', notification: 3 }} selected={false} onClick={handleTabClick} />
```

### 🏗️ Layout (Макеты)

#### **Row** - Гибкие строки

**Пропсы:**

- `left?: React.ReactNode` - левый слот
- `center?: React.ReactNode` - центральный слот
- `right?: React.ReactNode` - правый слот
- `centerJustify?: 'left' | 'center' | 'right'` - горизонтальное выравнивание содержимого центра (по умолчанию 'left')
- `padding?: string` - внутренние отступы
- `minHeight?: string` - минимальная высота
- `onClick?: () => void` - обработчик клика
- `className?: string` - дополнительные CSS классы

```tsx
<Row
  left={<Avatar name='John Doe' />}
  center={<span>Имя пользователя</span>}
  right={<Button variant='ghost'>Действие</Button>}
  centerJustify='center'
  onClick={() => navigate('/profile')}
/>
```

#### **Card** - Карточки для контента

**Пропсы:**

- `title?: string` - заголовок карточки
- `subtitle?: string` - подзаголовок карточки
- `footer?: React.ReactNode` - футер карточки
- `variant?: 'default' | 'outlined' | 'elevated' | 'flat'` - вариант отображения
- `clickable?: boolean` - кликабельная карточка
- `width?: string` - ширина карточки
- `maxWidth?: string` - максимальная ширина
- `onClick?: () => void` - обработчик клика
- `children: React.ReactNode` - содержимое карточки
- `className?: string` - дополнительные CSS классы

```tsx
<Card
  title='Продукт'
  subtitle='Описание продукта'
  variant='elevated'
  clickable
  onClick={() => navigate('/product')}
  footer={<Button variant='primary'>Купить</Button>}
>
  Детальная информация о продукте
</Card>
```

#### **PageBlock** - Блоки страниц

**Пропсы:**

- `stretched?: boolean` - растянуть на всю ширину
- `left?: React.ReactNode` - левая боковая панель
- `right?: React.ReactNode` - правая боковая панель
- `children: React.ReactNode` - основной контент
- `className?: string` - дополнительные CSS классы

```tsx
<PageBlock left={<SidebarContent />} right={<AdditionalInfo />} stretched>
  <MainContent />
</PageBlock>
```

#### **Portal** - Порталы для модальных окон

**Пропсы:**

- `children: React.ReactNode` - контент для портала
- `container?: HTMLElement | string` - контейнер для портала
- `disabled?: boolean` - отключить портал
- `className?: string` - дополнительные CSS классы

```tsx
<Portal container='#modal-root'>
  <ModalContent />
</Portal>
```

## 🎨 Дизайн токены

DobruniaUI использует гибридную систему дизайн токенов для оптимальной производительности:

### Цветовые токены (CSS переменные)

Цветовые токены применяются динамически через JavaScript для поддержки системы тем:

```css
/* Нейтральные поверхности */
--c-bg-default: ; /* основной фон */
--c-bg-subtle: ; /* слегка приподнятые блоки */
--c-bg-elevated: ; /* модальные окна, выпадающие списки */

/* Текст */
--c-text-primary: ; /* основной текст */
--c-text-secondary: ; /* вторичный текст */
--c-text-inverse: ; /* текст на тёмных/акцентных кнопках */

/* Границы */
--c-border: ; /* обычные границы */
--c-border-focus: ; /* границы в фокусе */

/* Акцент */
--c-accent: ; /* основной акцентный цвет */
--c-accent-hover: ; /* hover состояние */
--c-accent-active: ; /* active состояние */

/* Семантические цвета */
--c-success: ; /* успех */
--c-error: ; /* ошибка */
--c-warning: ; /* предупреждение */
--c-info: ; /* информация */
```

### Статические токены (JavaScript константы)

Статические значения определены в JavaScript для оптимальной производительности:

```tsx
import { DESIGN_TOKENS, BREAKPOINTS, RESPONSIVE_TOKENS } from 'dobruniaui';

// Отступы
DESIGN_TOKENS.spacing.tiny; // 0.2rem
DESIGN_TOKENS.spacing.small; // 0.5rem
DESIGN_TOKENS.spacing.medium; // 1rem
DESIGN_TOKENS.spacing.large; // 2rem

// Радиусы скругления
DESIGN_TOKENS.radius.small; // 4px
DESIGN_TOKENS.radius.medium; // 6px
DESIGN_TOKENS.radius.large; // 16px

// Размеры шрифтов
DESIGN_TOKENS.fontSize.small; // 0.7rem
DESIGN_TOKENS.fontSize.smallPlus; // 0.8rem
DESIGN_TOKENS.fontSize.medium; // 1rem
DESIGN_TOKENS.fontSize.large; // 1.2rem

// Высоты компонентов
DESIGN_TOKENS.baseHeight.tiny; // 20px
DESIGN_TOKENS.baseHeight.small; // 32px
DESIGN_TOKENS.baseHeight.medium; // 40px
DESIGN_TOKENS.baseHeight.large; // 48px
DESIGN_TOKENS.baseHeight.extraLarge; // 56px

// Переходы
DESIGN_TOKENS.transition.fast; // 0.15s
DESIGN_TOKENS.transition.slow; // 0.3s

// Макеты
DESIGN_TOKENS.layout.content.desktop; // 1200px
DESIGN_TOKENS.layout.content.tablet; // 1000px
DESIGN_TOKENS.layout.content.mobile; // 100vw

DESIGN_TOKENS.layout.sidebar.desktop; // 300px
DESIGN_TOKENS.layout.sidebar.tablet; // 220px
DESIGN_TOKENS.layout.sidebar.mobile; // 160px

// Брейкпоинты
BREAKPOINTS.mobile; // 900px
BREAKPOINTS.tablet; // 1200px

// Адаптивные токены
RESPONSIVE_TOKENS.tablet.layout.contentWidth; // 1000px
RESPONSIVE_TOKENS.tablet.layout.sidebarWidth; // 220px
RESPONSIVE_TOKENS.mobile.layout.contentWidth; // 100vw
RESPONSIVE_TOKENS.mobile.layout.sidebarWidth; // 160px
```

## 🔧 Разработка

```bash
# Клонировать репозиторий
git clone https://github.com/Dobrunia/DobruniaUI.git

# Установить зависимости
npm install

# Запустить dev server
npm run dev

# Собрать библиотеку
npm run build

# Собрать демо
npm run build:demo
```

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-component`)
3. Commit изменения (`git commit -m 'Add amazing component'`)
4. Push в branch (`git push origin feature/amazing-component`)
5. Создайте Pull Request

## 📄 Лицензия

MIT © [Dobrunia](https://github.com/Dobrunia)

## 🔗 Полезные ссылки

- [🎮 Интерактивное демо](https://dobrunia.github.io/DobruniaUI/)
- [📖 Документация](https://github.com/Dobrunia/dobruniaui#readme)
- [🐛 Сообщить об ошибке](https://github.com/Dobrunia/dobruniaui/issues)
- [![Boosty](https://img.shields.io/badge/Boosty-Поддержать-orange?logo=buymeacoffee)](https://boosty.to/sentryez/donate)
