# 🎨 DobruniaUI

**Современная React UI библиотека компонентов с TypeScript и styled-components**

[![npm version](https://img.shields.io/npm/v/dobruniaui.svg)](https://www.npmjs.com/package/dobruniaui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DobruniaUI - это комплексная библиотека React компонентов, разработанная с упором на современный дизайн, производительность и удобство использования. Все компоненты написаны на TypeScript и стилизованы с помощью styled-components.

## 📦 Установка

```bash
# npm
npm install dobruniaui styled-components react react-dom
```

## 🚀 Быстрый старт

```tsx
import React from 'react';
import { Button, Alert, TextField } from 'dobruniaui';

function App() {
  return (
    <div>
      <Alert type='success'>Добро пожаловать в DobruniaUI! 🎉</Alert>

      <TextField label='Имя пользователя' type='email' helperText='Введите ваш email' />

      <Button variant='primary' size='large'>
        Начать работу
      </Button>
    </div>
  );
}

export default App;
```

> 🎨 **Автоматические стили**: DobruniaUI автоматически инжектирует CSS стили при импорте любого компонента. Никаких дополнительных CSS файлов подключать не нужно!

## 🎨 Темы

DobruniaUI автоматически определяет и применяет тему на основе системных настроек. Вы также можете управлять темой вручную:

**Через утилиты библиотеки:**

```tsx
import { setTheme, getTheme, toggleTheme, getSystemTheme } from 'dobruniaui';

// Установить тему
setTheme('dark');
setTheme('light');

// Получить текущую тему
const currentTheme = getTheme(); // 'light' | 'dark' | null

// Переключить тему
toggleTheme();

// Получить системную тему
const systemTheme = getSystemTheme(); // 'light' | 'dark'
```

**Через DOM напрямую:**

```tsx
// Установить светлую тему
document.documentElement.setAttribute('data-theme', 'light');

// Установить тёмную тему
document.documentElement.setAttribute('data-theme', 'dark');

// Удалить тему (будет использоваться системная)
document.documentElement.removeAttribute('data-theme');
```

## 🧩 Компоненты

### 📝 Components (Формы и ввод)

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

#### **Dropdown** - Выпадающие списки

- Floating label
- Поиск и очистка
- Группировка опций

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

- Поддержка различных типов контента
- Временные метки
- Статусы доставки

```tsx
<Message type='text' content='Привет! Как дела?' timestamp='14:30' isOwn={false} />
```

#### **ChatList** - Список чатов

```tsx
<ChatList chats={chatData} selectedId='chat1' onSelect={handleChatSelect} />
```

#### **MessageContainer** - Контейнер сообщений

```tsx
<MessageContainer messages={messages} />
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

```tsx
<Reaction emoji='👍' count={5} active onClick={handleReaction} />
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

## 🎨 Настройка темы

DobruniaUI использует CSS переменные для кастомизации:

```css
:root {
  --color-primary: #2196f3;
  --color-secondary: #f5f5f5;
  --color-error: #f44336;
  --color-success: #4caf50;
  --color-warning: #ff9800;

  --font-family: 'Inter', sans-serif;
  --font-size-small: 0.875rem;
  --font-size-medium: 1rem;
  --font-size-large: 1.125rem;

  --spacing-small: 8px;
  --spacing-medium: 16px;
  --spacing-large: 24px;

  --radius-small: 4px;
  --radius-medium: 8px;
  --radius-large: 12px;
}
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
import { Button, type ButtonProps } from 'dobruniaui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
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

- [Документация](https://github.com/Dobrunia/dobruniaui#readme)
- [Примеры использования](https://github.com/Dobrunia/dobruniaui/tree/main/src/pages/components-demo)
- [Сообщить об ошибке](https://github.com/Dobrunia/dobruniaui/issues)

---

**Создано с ❤️ для современной веб-разработки**
