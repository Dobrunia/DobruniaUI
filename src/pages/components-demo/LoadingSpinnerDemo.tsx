import React, { useState } from 'react';
import { LoadingSpinner, Button, type SpinnerVariant, type SpinnerSize } from '@DobruniaUI';

export const LoadingSpinnerDemo: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<SpinnerVariant>('classic');
  const [selectedSize, setSelectedSize] = useState<SpinnerSize>('medium');
  const [selectedColor, setSelectedColor] = useState('var(--c-accent)');
  const [isLoading, setIsLoading] = useState(false);

  const variants: { value: SpinnerVariant; label: string; description: string }[] = [
    { value: 'classic', label: 'Classic', description: 'Классическое кольцо с цветным верхом' },
    { value: 'pulse', label: 'Pulse', description: 'Пульсирующие кольца (ваш дизайн)' },
    { value: 'dots', label: 'Dots', description: 'Мигающие точки (ваш дизайн)' },
    { value: 'ring', label: 'Ring', description: 'Быстрая дуга без фона' },
    { value: 'bars', label: 'Bars', description: 'Анимированные полоски' },
    { value: 'waves', label: 'Waves', description: 'Волновые полоски (ваш дизайн)' },
  ];

  const sizes: { value: SpinnerSize; label: string }[] = [
    { value: 'small', label: 'Small (24px)' },
    { value: 'medium', label: 'Medium (48px)' },
    { value: 'large', label: 'Large (72px)' },
  ];

  const colors = [
    { value: 'var(--c-accent)', label: 'Accent' },
    { value: 'var(--c-success)', label: 'Success' },
    { value: 'var(--c-error)', label: 'Error' },
    { value: 'var(--c-warning)', label: 'Warning' },
    { value: 'var(--c-info)', label: 'Info' },
    { value: '#9b59b6', label: 'Purple' },
  ];

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'var(--font-family)' }}>
      <h1 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>LoadingSpinner Demo</h1>

      <div
        style={{
          display: 'grid',
          gap: '32px',
          maxWidth: '1200px',
        }}
      >
        {/* Основная демонстрация */}
        <div
          style={{
            padding: '32px',
            border: '2px solid var(--c-accent)',
            borderRadius: 'var(--radius-medium)',
            backgroundColor: 'var(--c-bg-default)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
            🎡 Настраиваемый спиннер
          </h3>

          {/* Контролы */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            {/* Выбор варианта */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>Тип анимации:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {variants.map((variant) => (
                  <label
                    key={variant.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                    }}
                  >
                    <input
                      type='radio'
                      name='variant'
                      value={variant.value}
                      checked={selectedVariant === variant.value}
                      onChange={(e) => setSelectedVariant(e.target.value as SpinnerVariant)}
                    />
                    <span>
                      <strong>{variant.label}</strong> - {variant.description}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Выбор размера */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>Размер:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {sizes.map((size) => (
                  <label
                    key={size.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                    }}
                  >
                    <input
                      type='radio'
                      name='size'
                      value={size.value}
                      checked={selectedSize === size.value}
                      onChange={(e) => setSelectedSize(e.target.value as SpinnerSize)}
                    />
                    <span>{size.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Выбор цвета */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>Цвет:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {colors.map((color) => (
                  <label
                    key={color.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                    }}
                  >
                    <input
                      type='radio'
                      name='color'
                      value={color.value}
                      checked={selectedColor === color.value}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    />

                    <span>{color.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Предпросмотр */}
          <div
            style={{
              padding: '48px',
              backgroundColor: 'var(--c-bg-subtle)',
              borderRadius: 'var(--radius-medium)',
              marginBottom: '16px',
            }}
          >
            <LoadingSpinner variant={selectedVariant} size={selectedSize} color={selectedColor} />
          </div>

          <p style={{ color: 'var(--c-text-secondary)', fontSize: 'var(--font-size-small)' }}>
            Попробуйте разные комбинации настроек выше
          </p>
        </div>

        {/* Все варианты в одном месте */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-medium)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
            🎯 Все варианты спиннеров
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {variants.map((variant) => (
              <div
                key={variant.value}
                style={{
                  padding: '16px',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-small)',
                  textAlign: 'center',
                }}
              >
                <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>
                  {variant.label}
                </h4>
                <p
                  style={{
                    marginBottom: '16px',
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--c-text-secondary)',
                  }}
                >
                  {variant.description}
                </p>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--c-bg-subtle)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <LoadingSpinner variant={variant.value} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Размеры */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-medium)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
            📏 Размеры (на примере Waves)
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            {sizes.map((size) => (
              <div key={size.value} style={{ textAlign: 'center' }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>
                  {size.label}
                </h4>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--c-bg-subtle)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <LoadingSpinner variant='waves' size={size.value} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Цвета */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-medium)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
            🎨 Цвета (на примере Dots)
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
            }}
          >
            {colors.map((color) => (
              <div key={color.value} style={{ textAlign: 'center' }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>
                  {color.label}
                </h4>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--c-bg-subtle)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <LoadingSpinner variant='dots' color={color.value} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Практическое применение */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-medium)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '16px' }}>
            💼 Практическое применение
          </h3>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <Button onClick={simulateLoading} disabled={isLoading}>
              {isLoading ? 'Загрузка...' : 'Симулировать загрузку'}
            </Button>
          </div>

          {isLoading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--c-bg-subtle)',
                borderRadius: 'var(--radius-small)',
              }}
            >
              <LoadingSpinner variant='classic' size='small' />
              <span style={{ color: 'var(--c-text-primary)' }}>
                Выполняется операция, пожалуйста подождите...
              </span>
            </div>
          )}

          <div
            style={{
              marginTop: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Пример карточки загрузки */}
            <div
              style={{
                padding: '16px',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-small)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ marginBottom: '12px', color: 'var(--c-text-primary)' }}>
                Загрузка данных
              </h4>
              <LoadingSpinner variant='ring' size='medium' />
              <p
                style={{
                  marginTop: '8px',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Получение информации...
              </p>
            </div>

            {/* Пример оверлея */}
            <div
              style={{
                padding: '16px',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-small)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <h4 style={{ marginBottom: '12px', color: 'var(--c-text-primary)' }}>
                Оверлей загрузки
              </h4>
              <div
                style={{
                  position: 'relative',
                  padding: '24px',
                  backgroundColor: 'var(--c-bg-subtle)',
                  borderRadius: 'var(--radius-small)',
                  opacity: 0.6,
                }}
              >
                <p>Содержимое страницы</p>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <LoadingSpinner variant='waves' />
                </div>
              </div>
            </div>

            {/* Новый пример с waves */}
            <div
              style={{
                padding: '16px',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-small)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ marginBottom: '12px', color: 'var(--c-text-primary)' }}>
                Новый Waves спиннер
              </h4>
              <LoadingSpinner variant='waves' size='medium' color='#1abc9c' />
              <p
                style={{
                  marginTop: '8px',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--c-text-secondary)',
                }}
              >
                Волновая анимация
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
