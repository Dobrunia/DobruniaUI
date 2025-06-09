import React, { useState } from 'react';
import { Breadcrumbs, Button, type BreadcrumbItem } from '@DobruniaUI';

// Простые иконки для демо
const HomeIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z' />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M4 4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2H4z' />
  </svg>
);

const FileIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' style={{ width: '12px', height: '12px' }}>
    <path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' />
  </svg>
);

const ArrowIcon = () => (
  <span style={{ fontSize: '14px', transform: 'rotate(-90deg)', display: 'inline-block' }}>▲</span>
);

export const BreadcrumbsDemo: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'underlined' | 'pills'>(
    'default'
  );
  const [selectedSeparator, setSelectedSeparator] = useState('/');
  const [showIcons, setShowIcons] = useState(true);
  const [maxItems, setMaxItems] = useState<number | undefined>(undefined);
  const [clickHistory, setClickHistory] = useState<string[]>([]);

  // Примеры данных
  const basicItems: BreadcrumbItem[] = [
    { label: 'Главная', href: '/', icon: <HomeIcon /> },
    { label: 'Каталог', href: '/catalog', icon: <FolderIcon /> },
    { label: 'Электроника', href: '/catalog/electronics', icon: <FolderIcon /> },
    { label: 'Смартфоны', href: '/catalog/electronics/smartphones', icon: <FolderIcon /> },
    { label: 'iPhone 15 Pro', icon: <FileIcon /> },
  ];

  const ecommerceItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <HomeIcon /> },
    { label: 'Women', href: '/women' },
    { label: 'Clothing', href: '/women/clothing' },
    { label: 'Dresses', href: '/women/clothing/dresses' },
    { label: 'Summer Collection', href: '/women/clothing/dresses/summer' },
    { label: 'Floral Print Dress' },
  ];

  const longPathItems: BreadcrumbItem[] = [
    { label: 'Root', href: '/', icon: <HomeIcon /> },
    { label: 'Documents', href: '/documents', icon: <FolderIcon /> },
    { label: 'Projects', href: '/documents/projects', icon: <FolderIcon /> },
    { label: '2024', href: '/documents/projects/2024', icon: <FolderIcon /> },
    { label: 'Q1', href: '/documents/projects/2024/q1', icon: <FolderIcon /> },
    { label: 'Frontend', href: '/documents/projects/2024/q1/frontend', icon: <FolderIcon /> },
    { label: 'React', href: '/documents/projects/2024/q1/frontend/react', icon: <FolderIcon /> },
    {
      label: 'Components',
      href: '/documents/projects/2024/q1/frontend/react/components',
      icon: <FolderIcon />,
    },
    {
      label: 'UI Library',
      href: '/documents/projects/2024/q1/frontend/react/components/ui',
      icon: <FolderIcon />,
    },
    { label: 'Breadcrumbs.tsx', icon: <FileIcon /> },
  ];

  const spaItems: BreadcrumbItem[] = [
    {
      label: 'Dashboard',
      icon: <HomeIcon />,
      onClick: () => {
        setClickHistory((prev) => [...prev, 'Navigated to Dashboard']);
      },
    },
    {
      label: 'Analytics',
      onClick: () => {
        setClickHistory((prev) => [...prev, 'Navigated to Analytics']);
      },
    },
    {
      label: 'Reports',
      onClick: () => {
        setClickHistory((prev) => [...prev, 'Navigated to Reports']);
      },
    },
    { label: 'Monthly Revenue Report' },
  ];

  const sizes = [
    { value: 'small' as const, label: 'Small' },
    { value: 'medium' as const, label: 'Medium' },
    { value: 'large' as const, label: 'Large' },
  ];

  const variants = [
    { value: 'default' as const, label: 'Default' },
    { value: 'underlined' as const, label: 'Underlined' },
    { value: 'pills' as const, label: 'Pills' },
  ];

  const separators = [
    { value: '/', label: 'Slash (/)' },
    { value: '>', label: 'Greater than (>)' },
    { value: '→', label: 'Arrow (→)' },
    { value: '•', label: 'Bullet (•)' },
    { value: '|', label: 'Pipe (|)' },
  ];

  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    setClickHistory((prev) => [...prev, `Clicked: "${item.label}" at index ${index}`]);
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'var(--font-family)' }}>
      <h1 style={{ color: 'var(--text-heading)', marginBottom: '24px' }}>Breadcrumbs Demo</h1>

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
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--radius-medium)',
            backgroundColor: 'var(--color-background)',
          }}
        >
          <h3 style={{ color: 'var(--text-heading)', marginBottom: '24px' }}>
            🧭 Настраиваемый компонент
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
            {/* Размер */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-heading)' }}>Размер:</h4>
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
                      onChange={(e) => setSelectedSize(e.target.value as any)}
                    />
                    <span>{size.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Вариант */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-heading)' }}>Стиль:</h4>
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
                      onChange={(e) => setSelectedVariant(e.target.value as any)}
                    />
                    <span>{variant.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Разделитель */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-heading)' }}>Разделитель:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {separators.map((sep) => (
                  <label
                    key={sep.value}
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
                      name='separator'
                      value={sep.value}
                      checked={selectedSeparator === sep.value}
                      onChange={(e) => setSelectedSeparator(e.target.value)}
                    />
                    <span>{sep.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Настройки */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-heading)' }}>Настройки:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-small)',
                  }}
                >
                  <input
                    type='checkbox'
                    checked={showIcons}
                    onChange={(e) => setShowIcons(e.target.checked)}
                  />
                  <span>Показывать иконки</span>
                </label>

                <div style={{ marginTop: '8px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '4px',
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--text-body)',
                    }}
                  >
                    Макс. элементов:
                  </label>
                  <input
                    type='number'
                    min='2'
                    max='10'
                    value={maxItems || ''}
                    placeholder='Без ограничений'
                    onChange={(e) =>
                      setMaxItems(e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    style={{
                      padding: '4px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-small)',
                      width: '120px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Предпросмотр */}
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--radius-medium)',
              marginBottom: '16px',
            }}
          >
            <Breadcrumbs
              items={basicItems}
              size={selectedSize}
              variant={selectedVariant}
              separator={selectedSeparator}
              showIcons={showIcons}
              maxItems={maxItems}
              onItemClick={handleItemClick}
            />
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-small)' }}>
            Попробуйте разные настройки выше для изменения внешнего вида
          </p>
        </div>

        {/* Примеры использования */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-medium)',
          }}
        >
          <h3 style={{ color: 'var(--text-heading)', marginBottom: '24px' }}>
            📚 Примеры использования
          </h3>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Базовый пример */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Базовая навигация (E-commerce)
              </h4>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: 'var(--radius-small)',
                }}
              >
                <Breadcrumbs items={ecommerceItems} />
              </div>
              <p
                style={{
                  marginTop: '8px',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--text-muted)',
                }}
              >
                Классический пример для интернет-магазина
              </p>
            </div>

            {/* Длинный путь */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Длинный путь с ограничением (maxItems=5)
              </h4>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: 'var(--radius-small)',
                }}
              >
                <Breadcrumbs items={longPathItems} maxItems={5} />
              </div>
              <p
                style={{
                  marginTop: '8px',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--text-muted)',
                }}
              >
                Автоматическое сворачивание с возможностью раскрытия (кликните на "...")
              </p>
            </div>

            {/* SPA навигация */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                SPA навигация с обработчиками onClick
              </h4>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: 'var(--radius-small)',
                }}
              >
                <Breadcrumbs
                  items={spaItems}
                  variant='pills'
                  separator={<ChevronIcon />}
                  onItemClick={handleItemClick}
                />
              </div>
              <p
                style={{
                  marginTop: '8px',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--text-muted)',
                }}
              >
                Использование onClick вместо href для SPA. Кликните на элементы!
              </p>
            </div>

            {/* Различные стили */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Различные варианты отображения
              </h4>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Default:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} variant='default' />
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Underlined:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} variant='underlined' />
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Pills:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} variant='pills' />
                </div>
              </div>
            </div>

            {/* Кастомные разделители */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Кастомные разделители
              </h4>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Стрелка (→):
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} separator='→' />
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Иконка шеврона:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} separator={<ChevronIcon />} />
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Кастомная стрелка:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} separator={<ArrowIcon />} />
                </div>
              </div>
            </div>

            {/* Разные размеры */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Размеры компонента
              </h4>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Small:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} size='small' />
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Medium:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} size='medium' />
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--color-background-secondary)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Large:
                  </p>
                  <Breadcrumbs items={basicItems.slice(0, 4)} size='large' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* История кликов */}
        {clickHistory.length > 0 && (
          <div
            style={{
              padding: '24px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-medium)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ color: 'var(--text-heading)', margin: 0 }}>📝 История кликов</h3>
              <Button variant='secondary' size='small' onClick={() => setClickHistory([])}>
                Очистить
              </Button>
            </div>

            <div
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: 'var(--color-background-secondary)',
                padding: '12px',
                borderRadius: 'var(--radius-small)',
                fontSize: 'var(--font-size-small)',
                fontFamily: 'monospace',
              }}
            >
              {clickHistory.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    padding: '4px 0',
                    borderBottom:
                      index < clickHistory.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>
                    [{new Date().toLocaleTimeString()}]
                  </span>{' '}
                  <span style={{ color: 'var(--text-body)' }}>{entry}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Практические советы */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-medium)',
            backgroundColor: 'var(--color-background-secondary)',
          }}
        >
          <h3 style={{ color: 'var(--text-heading)', marginBottom: '16px' }}>
            💡 Практические советы
          </h3>

          <ul
            style={{
              color: 'var(--text-body)',
              fontSize: 'var(--font-size-small)',
              lineHeight: '1.6',
              paddingLeft: '20px',
            }}
          >
            <li style={{ marginBottom: '8px' }}>
              <strong>Используйте href</strong> для обычных ссылок и <strong>onClick</strong> для
              SPA-навигации
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>maxItems</strong> помогает избежать переполнения при длинных путях
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>variant="pills"</strong> хорошо подходит для дашбордов и админ-панелей
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Кастомные разделители</strong> можно использовать для брендинга
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Иконки</strong> улучшают визуальное восприятие и UX
            </li>
            <li>
              <strong>onItemClick</strong> позволяет отслеживать взаимодействие для аналитики
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
