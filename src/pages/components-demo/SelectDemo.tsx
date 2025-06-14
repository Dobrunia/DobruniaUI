import React, { useState } from 'react';
import { Select, type SelectOption } from '@DobruniaUI';

const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Яблоко' },
  { value: 'banana', label: 'Банан' },
  { value: 'orange', label: 'Апельсин' },
  { value: 'grape', label: 'Виноград' },
];

const iconOptions: SelectOption[] = [
  { value: 'home', label: 'Главная', icon: '🏠' },
  { value: 'profile', label: 'Профиль', icon: '👤' },
  { value: 'settings', label: 'Настройки', icon: '⚙️' },
  { value: 'help', label: 'Помощь', icon: '❓' },
];

const detailedOptions: SelectOption[] = [
  {
    value: 'react',
    label: 'React',
    icon: '⚛️',
    description: 'Библиотека для создания пользовательских интерфейсов',
  },
  {
    value: 'vue',
    label: 'Vue.js',
    icon: '💚',
    description: 'Прогрессивный фреймворк для создания UI',
  },
  {
    value: 'angular',
    label: 'Angular',
    icon: '🅰️',
    description: 'Платформа для создания мобильных и веб-приложений',
  },
  {
    value: 'svelte',
    label: 'Svelte',
    icon: '🧡',
    description: 'Компилируемый фреймворк для создания веб-приложений',
  },
];

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Активный', icon: '🟢' },
  { value: 'inactive', label: 'Неактивный', icon: '🔴' },
  { value: 'pending', label: 'Ожидание', icon: '🟡' },
  { value: 'suspended', label: 'Приостановлен', icon: '⚫' },
];

// Новые опции с подменю
const menuOptions: SelectOption[] = [
  {
    value: 'file',
    label: 'Файл',
    icon: '📁',
    submenu: [
      { value: 'new', label: 'Создать', icon: '📄' },
      { value: 'open', label: 'Открыть', icon: '📂' },
      { value: 'save', label: 'Сохранить', icon: '💾' },
      {
        value: 'recent',
        label: 'Недавние',
        icon: '🕒',
        submenu: [
          { value: 'doc1', label: 'Документ 1.txt' },
          { value: 'doc2', label: 'Презентация.pptx' },
          { value: 'doc3', label: 'Таблица.xlsx' },
        ],
      },
    ],
  },
  {
    value: 'edit',
    label: 'Правка',
    icon: '✏️',
    submenu: [
      { value: 'undo', label: 'Отменить', icon: '↶' },
      { value: 'redo', label: 'Повторить', icon: '↷' },
      { value: 'cut', label: 'Вырезать', icon: '✂️' },
      { value: 'copy', label: 'Копировать', icon: '📋' },
      { value: 'paste', label: 'Вставить', icon: '📄' },
    ],
  },
  {
    value: 'view',
    label: 'Вид',
    icon: '👁️',
    submenu: [
      {
        value: 'zoom',
        label: 'Масштаб',
        icon: '🔍',
        submenu: [
          { value: 'zoom-in', label: 'Увеличить', icon: '🔍+' },
          { value: 'zoom-out', label: 'Уменьшить', icon: '🔍-' },
          { value: 'zoom-100', label: '100%' },
          { value: 'zoom-fit', label: 'По размеру окна' },
        ],
      },
      { value: 'fullscreen', label: 'Полный экран', icon: '⛶' },
      { value: 'sidebar', label: 'Боковая панель', icon: '📋' },
    ],
  },
  { value: 'help', label: 'Справка', icon: '❓' },
];

const categoryOptions: SelectOption[] = [
  {
    value: 'electronics',
    label: 'Электроника',
    icon: '📱',
    submenu: [
      {
        value: 'phones',
        label: 'Телефоны',
        icon: '📱',
        submenu: [
          { value: 'iphone', label: 'iPhone' },
          { value: 'samsung', label: 'Samsung' },
          { value: 'xiaomi', label: 'Xiaomi' },
        ],
      },
      {
        value: 'laptops',
        label: 'Ноутбуки',
        icon: '💻',
        submenu: [
          { value: 'macbook', label: 'MacBook' },
          { value: 'thinkpad', label: 'ThinkPad' },
          { value: 'dell', label: 'Dell' },
        ],
      },
      { value: 'tablets', label: 'Планшеты', icon: '📱' },
    ],
  },
  {
    value: 'clothing',
    label: 'Одежда',
    icon: '👕',
    submenu: [
      { value: 'shirts', label: 'Рубашки' },
      { value: 'pants', label: 'Брюки' },
      { value: 'shoes', label: 'Обувь' },
    ],
  },
  { value: 'books', label: 'Книги', icon: '📚' },
];

export const SelectDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [iconValue, setIconValue] = useState('home');
  const [detailedValue, setDetailedValue] = useState('react');
  const [statusValue, setStatusValue] = useState('active');
  const [disabledValue, setDisabledValue] = useState('option1');
  const [menuValue, setMenuValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  // Новые состояния для hover режима
  const [hoverBasicValue, setHoverBasicValue] = useState('');
  const [hoverMenuValue, setHoverMenuValue] = useState('');
  const [hoverCategoryValue, setHoverCategoryValue] = useState('');

  return (
    <div
      style={{
        padding: 'var(--spacing-large)',
        maxWidth: 800,
        margin: '0 auto',
        background: 'var(--c-bg-default)',
        borderRadius: 'var(--radius-large)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-large)',
      }}
    >
      <h2 style={{ color: 'var(--c-text-primary)', marginBottom: 0 }}>Select Demo</h2>

      {/* Режимы работы */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Режимы работы (Click vs Hover)
        </h3>

        <div style={{ marginBottom: 'var(--spacing-large)' }}>
          <h4 style={{ color: 'var(--c-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
            Click режим (по умолчанию)
          </h4>
          <div style={{ display: 'flex', gap: 'var(--spacing-medium)', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  marginBottom: 'var(--spacing-small)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Базовый Select с очисткой
              </div>
              <Select
                options={basicOptions}
                value={basicValue}
                onChange={setBasicValue}
                placeholder='Кликните для выбора'
                width={200}
                clearable
              />
              <div
                style={{
                  marginTop: 'var(--spacing-small)',
                  color: 'var(--c-text-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Выбрано: {basicValue || 'ничего'}
              </div>
            </div>

            <div>
              <div
                style={{
                  marginBottom: 'var(--spacing-small)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Меню с подменю
              </div>
              <Select
                options={menuOptions}
                value={menuValue}
                onChange={setMenuValue}
                placeholder='Кликните для выбора'
                width={200}
                clearable
              />
              <div
                style={{
                  marginTop: 'var(--spacing-small)',
                  color: 'var(--c-text-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Выбрано: {menuValue || 'ничего'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'var(--c-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
            Hover режим
          </h4>
          <div style={{ display: 'flex', gap: 'var(--spacing-medium)', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  marginBottom: 'var(--spacing-small)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Базовый Select (hover)
              </div>
              <Select
                options={basicOptions}
                value={hoverBasicValue}
                onChange={setHoverBasicValue}
                placeholder='Наведите курсор'
                width={200}
                trigger='hover'
                clearable
              />
              <div
                style={{
                  marginTop: 'var(--spacing-small)',
                  color: 'var(--c-text-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Выбрано: {hoverBasicValue || 'ничего'}
              </div>
            </div>

            <div>
              <div
                style={{
                  marginBottom: 'var(--spacing-small)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Меню с подменю (hover)
              </div>
              <Select
                options={menuOptions}
                value={hoverMenuValue}
                onChange={setHoverMenuValue}
                placeholder='Наведите курсор'
                width={200}
                trigger='hover'
                clearable
              />
              <div
                style={{
                  marginTop: 'var(--spacing-small)',
                  color: 'var(--c-text-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Выбрано: {hoverMenuValue || 'ничего'}
              </div>
            </div>

            <div>
              <div
                style={{
                  marginBottom: 'var(--spacing-small)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Категории (hover)
              </div>
              <Select
                options={categoryOptions}
                value={hoverCategoryValue}
                onChange={setHoverCategoryValue}
                placeholder='Наведите курсор'
                width={200}
                trigger='hover'
                clearable
              />
              <div
                style={{
                  marginTop: 'var(--spacing-small)',
                  color: 'var(--c-text-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Выбрано: {hoverCategoryValue || 'ничего'}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 'var(--spacing-medium)',
            padding: 'var(--spacing-medium)',
            backgroundColor: 'var(--c-bg-elevated)',
            borderRadius: 'var(--radius-medium)',
            border: '1px solid var(--c-border)',
          }}
        >
          <h5 style={{ color: 'var(--c-text-primary)', marginBottom: 'var(--spacing-small)' }}>
            Особенности режимов:
          </h5>
          <ul
            style={{
              color: 'var(--c-text-secondary)',
              fontSize: 'var(--font-size-small)',
              margin: 0,
              paddingLeft: 'var(--spacing-medium)',
            }}
          >
            <li>
              <strong>Click режим:</strong> Открытие по клику, закрытие по клику вне области или
              Escape
            </li>
            <li>
              <strong>Hover режим:</strong> Открытие при наведении, закрытие при уходе курсора с
              задержкой
            </li>
            <li>
              <strong>Подменю:</strong> Всегда открываются при наведении курсора (независимо от
              основного режима)
            </li>
            <li>
              <strong>Кнопка очистки:</strong> Появляется при установке clearable=true и наличии
              выбранного значения
            </li>
            <li>Одновременно может быть открыт только один Select</li>
          </ul>
        </div>
      </div>

      {/* Базовый Select */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Базовый Select
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-medium)', flexWrap: 'wrap' }}>
          <div>
            <div
              style={{
                marginBottom: 'var(--spacing-small)',
                fontSize: 'var(--font-size-small)',
                color: 'var(--c-text-secondary)',
              }}
            >
              Обычный Select
            </div>
            <Select
              options={basicOptions}
              value={basicValue}
              onChange={setBasicValue}
              placeholder='Выберите фрукт'
              width={250}
            />
            <div
              style={{
                marginTop: 'var(--spacing-small)',
                color: 'var(--c-text-secondary)',
                fontSize: 'var(--font-size-small)',
              }}
            >
              Выбрано: {basicValue || 'ничего не выбрано'}
            </div>
          </div>

          <div>
            <div
              style={{
                marginBottom: 'var(--spacing-small)',
                fontSize: 'var(--font-size-small)',
                color: 'var(--c-text-secondary)',
              }}
            >
              С кнопкой очистки
            </div>
            <Select
              options={basicOptions}
              value={basicValue}
              onChange={setBasicValue}
              placeholder='Выберите фрукт'
              width={250}
              clearable
            />
            <div
              style={{
                marginTop: 'var(--spacing-small)',
                color: 'var(--c-text-secondary)',
                fontSize: 'var(--font-size-small)',
              }}
            >
              Кнопка × появляется при выборе
            </div>
          </div>
        </div>
      </div>

      {/* Select с иконками */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Select с иконками
        </h3>
        <Select options={iconOptions} value={iconValue} onChange={setIconValue} width={250} />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {iconOptions.find((opt) => opt.value === iconValue)?.label}
        </div>
      </div>

      {/* Select с подменю - Меню приложения */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Select с подменю - Меню приложения
        </h3>
        <Select
          options={menuOptions}
          value={menuValue}
          onChange={setMenuValue}
          placeholder='Выберите действие'
          width={300}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {menuValue || 'ничего не выбрано'}
        </div>
      </div>

      {/* Select с подменю - Категории товаров */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Select с подменю - Категории товаров
        </h3>
        <Select
          options={categoryOptions}
          value={categoryValue}
          onChange={setCategoryValue}
          placeholder='Выберите категорию'
          width={350}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {categoryValue || 'ничего не выбрано'}
        </div>
      </div>

      {/* Select с описаниями */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Select с описаниями
        </h3>
        <Select
          options={detailedOptions}
          value={detailedValue}
          onChange={setDetailedValue}
          width={350}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {detailedOptions.find((opt) => opt.value === detailedValue)?.label}
        </div>
      </div>

      {/* Статусы */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Выбор статуса
        </h3>
        <Select options={statusOptions} value={statusValue} onChange={setStatusValue} width={200} />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Статус: {statusOptions.find((opt) => opt.value === statusValue)?.label}
        </div>
      </div>

      {/* Заблокированный Select */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Заблокированный Select
        </h3>
        <Select
          options={[
            { value: 'option1', label: 'Опция 1' },
            { value: 'option2', label: 'Опция 2' },
          ]}
          value={disabledValue}
          onChange={setDisabledValue}
          disabled={true}
          width={250}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Этот Select заблокирован
        </div>
      </div>

      {/* Разные размеры */}
      <div>
        <h3
          style={{
            color: 'var(--c-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Разные размеры
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-medium)', flexWrap: 'wrap' }}>
          <Select
            options={basicOptions}
            value=''
            onChange={() => {}}
            placeholder='Маленький'
            width={150}
          />
          <Select
            options={basicOptions}
            value=''
            onChange={() => {}}
            placeholder='Средний'
            width={250}
          />
          <Select
            options={basicOptions}
            value=''
            onChange={() => {}}
            placeholder='Большой'
            width={350}
          />
        </div>
      </div>
    </div>
  );
};
