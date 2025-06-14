# 🎨 DobruniaUI

**Современная React UI библиотека компонентов с TypeScript и styled-components**

[![npm version](https://img.shields.io/npm/v/dobruniaui.svg)](https://www.npmjs.com/package/dobruniaui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DobruniaUI - это комплексная библиотека React компонентов, разработанная с упором на современный дизайн, производительность и удобство использования. Все компоненты написаны на TypeScript и стилизованы с помощью styled-components.

## 🎮 Демо

**[Попробуйте все компоненты в интерактивном плейграунде →](https://dobrunia.github.io/DobruniaUI/)**

## 📦 Установка

```bash
# npm
npm install dobruniaui styled-components react react-dom
```

## 🚀 Быстрый старт

```tsx
import React from 'react';
import { Button } from 'dobruniaui';

function App() {
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
        fontFamily: 'var(--font-family)',
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

export default App;
```

> 🎨 **Автоматические стили**: DobruniaUI автоматически инжектирует CSS стили при импорте любого компонента. Никаких дополнительных CSS файлов подключать не нужно!

## 🎨 Система тем

DobruniaUI включает гибкую систему управления темами с возможностью легкого добавления кастомных тем.

### Встроенные темы

**Светлые темы:**

- 🌞 **Светлая** - классическая светлая тема (по умолчанию)
- 🌊 **Океан** - нежная морская тема в мягких тонах
- 🌸 **Розовая** - мягкая пастельная тема
- 🌅 **Закат** - тёплая тема в оттенках заката

**Тёмные темы:**

- 🌙 **Тёмная** - современная тёмная тема с улучшенной контрастностью
- ⚫ **Угольная** - элегантная монохромная тема
- 🌫️ **Сланцевая** - мягкая тёмная с пастельными акцентами
- 🌌 **Полуночная** - глубокая тёмная с тёплыми акцентами
- 🌙 **Лунная** - холодная серебристая тема
- 🌕 **Полная луна** - золотистая луна над тёмным океаном
- ⚙️ **Металлическая** - полированное железо с белыми искрами
- ⬛ **Графитовая** - настоящая графитовая тема
- 🌋 **Кровавая луна** - мистическая тема в стиле Blood Moon

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
setTheme('lava'); // кровавая луна

// Получить текущую тему
const currentTheme = getTheme(); // Theme | null

// Переключить между светлой и тёмной
toggleTheme();

// Удалить сохранённую тему (очистить localStorage и CSS переменные)
removeTheme();

// Получить системную тему пользователя
const systemTheme = getSystemTheme(); // 'light' | 'dark'

// Инициализировать систему тем (вызывается автоматически при импорте)
initThemeSystem();
```

**Компонент выбора темы:**

```tsx
import { ThemeSelect } from 'dobruniaui';

function App() {
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
- `initThemeSystem()` - инициализирует систему тем (автоматически при импорте)

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

- 6 вариантов: `primary`, `secondary`, `ghost`, `warning`, `send`, `close`
- 3 размера: `small`, `medium`, `large`
- 3 формы: `default`, `circle`, `square`
- Поддержка: loading состояние, иконки, outline стиль

```tsx
<Button variant="primary" size="large" isLoading>
  Отправить
</Button>
<Button variant="close" shape="circle" />
```

#### **TextField** - Текстовые поля с floating label

- Типы: `text`, `password`, `email`, `phone`, `number`
- Автоматическая валидация
- Floating label анимация
- Показ/скрытие пароля

```tsx
<TextField label='Email' type='email' errorText='Введите корректный email' />
```

#### **Input** - Базовые поля ввода

```tsx
<Input placeholder='Введите текст...' />
```

#### **Textarea** - Многострочный ввод

```tsx
<Textarea label='Комментарий' rows={4} />
```

#### **Checkbox** - Чекбоксы

```tsx
<Checkbox checked onChange={handleChange}>
  Согласен с условиями
</Checkbox>
```

#### **Radio** - Радио кнопки

```tsx
<Radio name='option' value='1' checked>
  Вариант 1
</Radio>
```

#### **Switch** - Переключатели (5 вариантов)

- `Switch` - классический
- `RollingSwitch` - с анимацией качения
- `YinYangSwitch` - инь-янь дизайн
- `FlipSwitch` - с флип анимацией
- `PowerSwitch` - кнопка питания

```tsx
<Switch checked onChange={handleToggle} />
<YinYangSwitch checked onChange={handleToggle} />
```

#### **Select** - Продвинутые выпадающие списки

- Поддержка подменю (вложенные опции)
- Два режима открытия: `click` и `hover`
- Иконки, описания, очистка
- Портальный рендеринг подменю
- Глобальное управление состоянием (только один Select открыт)

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
    { value: 'vegetables', label: 'Овощи', icon: '🥕' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder='Выберите категорию'
  trigger='click' // или 'hover'
  clearable
  width={250}
/>
```

#### **Dropdown** - Простые выпадающие списки

- Floating label анимация
- Возможность очистки выбора
- Обработка длинных текстов с ellipsis
- Состояния ошибки и отключения

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
  error={hasError}
  errorText='Поле обязательно для заполнения'
/>
```

#### **ToggleButton** - Переключатели состояний

- Простой цветной индикатор (по умолчанию) или иконки (огонек/круг)
- 3 размера: `small`, `medium`, `large`
- Свечение индикатора в активном состоянии
- Поддержка группировки для radio/checkbox режимов

```tsx
// Простой переключатель с цветным индикатором
<ToggleButton checked={isActive} onChange={setIsActive}>
  Уведомления
</ToggleButton>

// С иконками огонька и круга
<ToggleButton showIcon checked={isEnabled} onChange={setIsEnabled}>
  С огоньком
</ToggleButton>

// Группа переключателей (множественный выбор)
<ToggleButton checked={features.darkMode} onChange={handleToggle}>
  Тёмная тема
</ToggleButton>
<ToggleButton checked={features.sounds} onChange={handleToggle}>
  Звуки
</ToggleButton>

// Радио-режим (одиночный выбор)
<ToggleButton
  name="size"
  value="small"
  checked={selectedSize === 'small'}
  onChange={handleSizeChange}
>
  Маленький
</ToggleButton>
<ToggleButton
  name="size"
  value="large"
  checked={selectedSize === 'large'}
  onChange={handleSizeChange}
>
  Большой
</ToggleButton>
```

#### **ThemeSelect** - Селектор тем

Готовый компонент для переключения тем:

```tsx
<ThemeSelect />
```

#### **SidebarList** - Списки для сайдбара

- Группировка секций
- Сворачивание разделов
- Активные состояния

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

```tsx
<Avatar src='/avatar.jpg' name='John Doe' size='large' />
```

#### **Badge** - Значки и счетчики

```tsx
<Badge count={5} color='red'>
  <Button>Уведомления</Button>
</Badge>
```

#### **Message** - Сообщения чата

- Входящие и исходящие сообщения с автоматической стилизацией
- Поддержка реакций на сообщения с эмодзи
- Вложения: изображения, файлы, аудио с проигрывателем
- Пересланные сообщения и ответы на сообщения
- Временные метки и статусы прочтения
- Меню действий с сообщениями
- Аватары отправителей

```tsx
<Message
  type='incoming'
  text='Привет! Как дела?'
  time='12:30'
  sender={{
    id: '1',
    name: 'John Doe',
    avatar: '/path/to/avatar.jpg',
  }}
  reactions={[
    {
      emoji: '👍',
      users: [{ id: '2', name: 'Jane' }],
    },
  ]}
  onReaction={(emoji) => handleReaction(emoji)}
  attachments={[
    {
      type: 'image',
      url: '/path/to/image.jpg',
      name: 'photo.jpg',
    },
  ]}
/>
```

#### **ChatList** - Список чатов

```tsx
<ChatList chats={chatData} selectedId='chat1' onSelect={handleChatSelect} />
```

#### **MessageContainer** - Контейнер сообщений

- Вертикальный скролл с красивым скроллбаром
- Автоматический скролл к новым сообщениям
- Кнопка "Вниз" при прокрутке вверх с плавной анимацией
- Программный скролл к конкретному сообщению по ID
- Поддержка плавной анимации скролла

```tsx
<MessageContainer autoScrollToBottom={true} lastMessageId={messages[messages.length - 1]?.id}>
  {messages.map((msg) => (
    <Message key={msg.id} {...msg} />
  ))}
</MessageContainer>
```

#### **ActionsMenu** - Меню действий

- Группировка действий
- Иконки и разделители

```tsx
<ActionsMenu
  actions={[
    { id: 'edit', label: 'Редактировать', icon: EditIcon },
    { id: 'delete', label: 'Удалить', icon: DeleteIcon },
  ]}
  onAction={handleAction}
/>
```

#### **Reaction** - Реакции и эмодзи

- Отображение эмодзи с аватарами пользователей
- Стэкинг аватаров при множественных реакциях
- Подсветка активных реакций текущего пользователя
- Счетчик количества реакций (+N для больших чисел)
- Плавные анимации и hover эффекты

```tsx
<Reaction
  emoji='👍'
  users={[
    { id: '1', name: 'John', avatar: '/path/to/avatar1.jpg' },
    { id: '2', name: 'Jane', avatar: '/path/to/avatar2.jpg' },
  ]}
  onClick={(e) => handleReactionClick(e)}
  currentUserId='1' // для подсветки активной реакции
/>
```

### 💭 Feedback (Обратная связь)

#### **Alert** - Уведомления и оповещения

- 4 типа: `success`, `info`, `warning`, `error`
- Обычный и outlined стили
- Богатое содержимое (HTML, ссылки)

```tsx
<Alert type='success' outlined>
  <strong>Успешно!</strong> Данные сохранены.
</Alert>
```

#### **Modal** - Модальные окна

```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <h2>Заголовок модального окна</h2>
  <p>Содержимое...</p>
</Modal>
```

#### **ModalSubmit** - Модальные окна с формами

```tsx
<ModalSubmit
  isOpen={isOpen}
  onSubmit={handleSubmit}
  onClose={handleClose}
  title='Создать новый элемент'
>
  <TextField label='Название' />
</ModalSubmit>
```

#### **Snackbar** - Всплывающие уведомления

```tsx
<Snackbar
  message='Операция выполнена успешно'
  type='success'
  isVisible={showSnackbar}
  onClose={hideSnackbar}
/>
```

#### **UndoSnackbar** - Snackbar с отменой действия

```tsx
<UndoSnackbar message='Элемент удален' onUndo={handleUndo} isVisible={showUndo} />
```

#### **LoadingSpinner** - Индикаторы загрузки

- 5 вариантов анимации
- 3 размера
- Настраиваемые цвета

```tsx
<LoadingSpinner variant='dots' size='large' />
```

#### **Progress** - Индикаторы прогресса

- Линейный и круговой прогресс
- С подписями и без

```tsx
<LinearProgress value={75} />
<CircularProgressWithLabel value={60} />
```

#### **Skeleton** - Скелетоны загрузки

```tsx
<Skeleton variant="text" lines={3} />
<Skeleton variant="card" />
```

### 🧭 Navigation (Навигация)

#### **Breadcrumbs** - Хлебные крошки

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

```tsx
<Pagination current={currentPage} total={totalPages} onChange={handlePageChange} />
```

#### **Tabbar** - Вкладки

```tsx
<Tabbar
  tabs={[
    { key: 'tab1', label: 'Вкладка 1' },
    { key: 'tab2', label: 'Вкладка 2' },
  ]}
  active='tab1'
  onTabChange={handleTabChange}
/>
```

### 🏗️ Layout (Макеты)

#### **PageBlock** - Блоки страниц

```tsx
<PageBlock title='Настройки' subtitle='Управление аккаунтом'>
  <SettingsContent />
</PageBlock>
```

#### **Portal** - Порталы для модальных окон

```tsx
<Portal target='#modal-root'>
  <ModalContent />
</Portal>
```

## 🎨 Настройка тем

DobruniaUI использует современную систему CSS токенов для кастомизации. Все темы применяются динамически через JavaScript:

### Базовые токены (не зависят от темы)

```css
:root {
  /* Layout */
  --layout-content-width: 1200px;
  --layout-sidebar-width: 300px;

  /* Spacing */
  --spacing-tiny: 0.2rem;
  --spacing-small: 0.5rem;
  --spacing-medium: 1rem;
  --spacing-large: 2rem;

  /* Border radius */
  --radius-medium: 6px;
  --radius-large: 16px;

  /* Transitions */
  --transition-fast: 0.15s;
  --transition-slow: 0.3s;

  /* Font sizes */
  --font-size-small: 0.7rem;
  --font-size-small-plus: 0.8rem;
  --font-size-medium: 1rem;
  --font-size-large: 1.2rem;

  /* Font family */
  --font-family: 'Rubik', sans-serif;

  /* Avatar status colors */
  --avatar-status-online: #4cd964;
  --avatar-status-offline: #b0b8c9;
  --avatar-status-dnd: #d44c4a;
}
```

### Тематические токены (устанавливаются динамически)

```css
/* Применяются через JavaScript при выборе темы */

/* Нейтральные поверхности */
--c-bg-default: ; /* основной фон */
--c-bg-subtle: ; /* слегка приподнятые блоки / cards */
--c-bg-elevated: ; /* модальные, выпадашки */

/* Текст */
--c-text-primary: ; /* основной текст */
--c-text-secondary: ; /* вторичный текст */
--c-text-inverse: ; /* текст на тёмных/акцентных кнопках */

/* Бордеры / разделители */
--c-border: ; /* обычные границы */
--c-border-focus: ; /* границы в фокусе */

/* Акцент (brand) */
--c-accent: ; /* primary / brand цвет */
--c-accent-hover: ; /* hover состояние */
--c-accent-active: ; /* active состояние */

/* Семантические цвета */
--c-success: ; /* успех */
--c-error: ; /* ошибка */
--c-warning: ; /* предупреждение */
--c-info: ; /* информация */
```

## 🔧 Разработка

```bash
# Клонировать репозиторий
git clone https://github.com/Dobrunia/dobruniaui.git

# Установить зависимости
yarn install

# Запустить dev server
yarn dev

# Собрать библиотеку
yarn build

# Запустить линтер
yarn lint
```

## 📋 TypeScript

Все компоненты полностью типизированы. Типы экспортируются вместе с компонентами:

```tsx
import { Button, type ButtonProps, type ThemeConfig, type SelectOption } from 'dobruniaui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

// Типы для системы тем
const customTheme: ThemeConfig = {
  name: 'custom',
  label: 'Кастомная',
  variables: {
    // CSS переменные
  },
};

// Типы для Select опций
const selectOptions: SelectOption[] = [
  {
    value: 'option1',
    label: 'Опция 1',
    icon: '🎯',
    description: 'Описание опции',
    submenu: [
      // Вложенные опции
    ],
  },
];
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
