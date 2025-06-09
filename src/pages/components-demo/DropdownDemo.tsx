import React, { useState } from 'react';
import { Dropdown } from '@DobruniaUI';

const fruitOptions = [
  { value: 'apple', label: 'Яблоко' },
  { value: 'banana', label: 'Банан' },
  { value: 'orange', label: 'Апельсин' },
  { value: 'grape', label: 'Виноград' },
  { value: 'strawberry', label: 'Клубника' },
];

const longOptions = [
  { value: 'short', label: 'Короткий' },
  { value: 'medium', label: 'Средний по длине вариант' },
  { value: 'long', label: 'Очень длинный вариант который должен обрезаться с многоточием' },
  {
    value: 'extra-long',
    label:
      'Супер мега очень длинный вариант текста который точно должен обрезаться с многоточием потому что он не помещается',
  },
];

const categoryOptions = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'books', label: 'Книги' },
  { value: 'sports', label: 'Спорт и отдых' },
];

export const DropdownDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [clearableValue, setClearableValue] = useState('apple');
  const [errorValue, setErrorValue] = useState('');
  const [longValue, setLongValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('electronics');

  // Состояния для "Разные размеры"
  const [sizeValue, setSizeValue] = useState('');
  const [languageValue, setLanguageValue] = useState('ru');
  const [answerValue, setAnswerValue] = useState('');

  return (
    <div
      style={{
        padding: 'var(--spacing-large)',
        maxWidth: 600,
        margin: '0 auto',
        background: 'var(--color-bg)',
        borderRadius: 'var(--radius-large)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-large)',
      }}
    >
      <h2 style={{ color: 'var(--text-heading)', marginBottom: 0 }}>Dropdown Demo</h2>

      {/* Базовый вариант */}
      <div>
        <h3
          style={{
            color: 'var(--text-heading)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Базовый Dropdown
        </h3>
        <Dropdown
          options={fruitOptions}
          value={basicValue}
          onChange={setBasicValue}
          label='Выберите фрукт'
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {basicValue || 'ничего не выбрано'}
        </div>
      </div>

      {/* С возможностью очистки */}
      <div>
        <h3
          style={{
            color: 'var(--text-heading)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          С кнопкой очистки
        </h3>
        <Dropdown
          options={fruitOptions}
          value={clearableValue}
          onChange={setClearableValue}
          label='Фрукт'
          clearable={true}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {clearableValue || 'ничего не выбрано'}
        </div>
      </div>

      {/* С ошибкой */}
      <div>
        <h3
          style={{
            color: 'var(--text-heading)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          С ошибкой
        </h3>
        <Dropdown
          options={fruitOptions}
          value={errorValue}
          onChange={setErrorValue}
          label='Обязательное поле'
          error={!errorValue}
          errorText='Необходимо выбрать значение'
          clearable={true}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {errorValue || 'ничего не выбрано'}
        </div>
      </div>

      {/* Заблокированный */}
      <div>
        <h3
          style={{
            color: 'var(--text-heading)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Заблокированный
        </h3>
        <Dropdown
          options={categoryOptions}
          value={categoryValue}
          onChange={setCategoryValue}
          label='Категория (заблокировано)'
          disabled={true}
          clearable={true}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {categoryValue}
        </div>
      </div>

      {/* Длинные тексты */}
      <div>
        <h3
          style={{
            color: 'var(--text-heading)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Длинные тексты (ellipsis)
        </h3>
        <Dropdown
          options={longOptions}
          value={longValue}
          onChange={setLongValue}
          label='Очень длинный label который должен обрезаться'
          clearable={true}
        />
        <div
          style={{
            marginTop: 'var(--spacing-small)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          Выбрано: {longValue || 'ничего не выбрано'}
        </div>
      </div>

      {/* Компактные варианты */}
      <div>
        <h3
          style={{
            color: 'var(--text-heading)',
            marginBottom: 'var(--spacing-medium)',
            fontSize: 'var(--font-size-large)',
          }}
        >
          Разные размеры
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-medium)', flexWrap: 'wrap' }}>
          <Dropdown
            options={[
              { value: 'xs', label: 'XS' },
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
            ]}
            value={sizeValue}
            onChange={setSizeValue}
            label='Размер'
            clearable={true}
          />
          <Dropdown
            options={[
              { value: 'ru', label: 'Русский' },
              { value: 'en', label: 'English' },
              { value: 'fr', label: 'Français' },
            ]}
            value={languageValue}
            onChange={setLanguageValue}
            label='Язык'
            clearable={true}
          />
          <Dropdown
            options={[
              { value: 'yes', label: 'Да' },
              { value: 'no', label: 'Нет' },
            ]}
            value={answerValue}
            onChange={setAnswerValue}
            label='Ответ'
          />
        </div>
      </div>
    </div>
  );
};
