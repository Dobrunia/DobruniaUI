import { useState } from 'react';
import { ActionsMenu, Button, type ActionsMenuAction, type ActionsMenuGroup } from '@DobruniaUI';

// Простые SVG иконки для демо
const ReplyIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z' />
  </svg>
);

const ForwardIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14 15v4l7-7-7-7v4.1c-5 0-8.5-1.6-11-5.1 1 5 4 10 11 11z' />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>
);

const EditIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>
);

const PinIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14,4V10.5L12,9L10,10.5V4H14M16,2H8V13L12,10L16,13V2Z' />
  </svg>
);

const SelectIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
  </svg>
);

export const ActionsMenuDemo = () => {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedAnimation, setSelectedAnimation] = useState<
    'left' | 'right' | 'top' | 'bottom' | 'center'
  >('center');
  const [showSimpleMenu, setShowSimpleMenu] = useState(true);
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  const logAction = (action: string) => {
    setActionHistory((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${action}`]);
  };

  // Простые действия
  const simpleActions: ActionsMenuAction[] = [
    {
      label: 'Редактировать',
      icon: <EditIcon />,
      onClick: () => logAction('Редактирование'),
      shortcut: '⌘E',
    },
    {
      label: 'Скопировать',
      icon: <CopyIcon />,
      onClick: () => logAction('Скопировано'),
      shortcut: '⌘C',
    },
    {
      label: 'Закрепить',
      icon: <PinIcon />,
      onClick: () => logAction('Закреплено'),
      type: 'primary',
    },
    {
      label: 'Удалить',
      icon: <DeleteIcon />,
      onClick: () => logAction('Удалено'),
      type: 'destructive',
      shortcut: '⌫',
    },
  ];

  // Группированные действия (как в Telegram)
  const messageActions: ActionsMenuGroup[] = [
    {
      title: 'Сообщение',
      actions: [
        {
          label: 'Ответить',
          icon: <ReplyIcon />,
          onClick: () => logAction('Ответ на сообщение'),
          shortcut: '⌘R',
        },
        {
          label: 'Переслать',
          icon: <ForwardIcon />,
          onClick: () => logAction('Пересылка сообщения'),
          shortcut: '⌘F',
        },
        {
          label: 'Копировать текст',
          icon: <CopyIcon />,
          onClick: () => logAction('Копирование текста'),
          shortcut: '⌘C',
        },
      ],
    },
    {
      actions: [
        {
          label: 'Выбрать',
          icon: <SelectIcon />,
          onClick: () => logAction('Выбор сообщения'),
        },
        {
          label: 'Закрепить',
          icon: <PinIcon />,
          onClick: () => logAction('Закрепление сообщения'),
          type: 'primary',
        },
      ],
    },
    {
      actions: [
        {
          label: 'Удалить',
          icon: <DeleteIcon />,
          onClick: () => logAction('Удаление сообщения'),
          type: 'destructive',
        },
      ],
    },
  ];

  // Компактные действия
  const compactActions: ActionsMenuAction[] = [
    {
      label: 'Изменить',
      icon: <EditIcon />,
      onClick: () => logAction('Быстрое изменение'),
    },
    {
      label: 'Удалить',
      icon: <DeleteIcon />,
      onClick: () => logAction('Быстрое удаление'),
      type: 'destructive',
    },
  ];

  const sizes = [
    { value: 'small' as const, label: 'Small' },
    { value: 'medium' as const, label: 'Medium' },
    { value: 'large' as const, label: 'Large' },
  ];

  const animations = [
    { value: 'left' as const, label: 'Left' },
    { value: 'right' as const, label: 'Right' },
    { value: 'top' as const, label: 'Top' },
    { value: 'bottom' as const, label: 'Bottom' },
    { value: 'center' as const, label: 'Center' },
  ];

  return (
    <div style={{ padding: '32px', fontFamily: 'var(--font-family)' }}>
      <h1 style={{ color: 'var(--text-heading)', marginBottom: '24px' }}>ActionsMenu Demo</h1>

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
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <h3 style={{ color: 'var(--text-heading)', marginBottom: '24px' }}>
            🎛️ Настраиваемое меню
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

            {/* Анимация */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-heading)' }}>Анимация:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {animations.map((animation) => (
                  <label
                    key={animation.value}
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
                      name='animation'
                      value={animation.value}
                      checked={selectedAnimation === animation.value}
                      onChange={(e) => setSelectedAnimation(e.target.value as any)}
                    />
                    <span>{animation.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Тип меню */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-heading)' }}>Тип меню:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                    type='radio'
                    name='menuType'
                    checked={showSimpleMenu}
                    onChange={() => setShowSimpleMenu(true)}
                  />
                  <span>Простое меню</span>
                </label>
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
                    type='radio'
                    name='menuType'
                    checked={!showSimpleMenu}
                    onChange={() => setShowSimpleMenu(false)}
                  />
                  <span>Групповое меню</span>
                </label>
              </div>
            </div>
          </div>

          {/* Предпросмотр */}
          <div
            style={{
              padding: '48px',
              backgroundColor: 'var(--color-elevated)',
              borderRadius: 'var(--radius-medium)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <ActionsMenu
              items={showSimpleMenu ? simpleActions : messageActions}
              size={selectedSize}
              animationOrigin={selectedAnimation}
            />
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-small)' }}>
            Попробуйте разные настройки выше. Кликайте на действия в меню!
          </p>
        </div>

        {/* Примеры использования */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--color-elevated)',
            borderRadius: 'var(--radius-medium)',
          }}
        >
          <h3 style={{ color: 'var(--text-heading)', marginBottom: '24px' }}>
            📱 Примеры использования
          </h3>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Контекстное меню сообщения */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Контекстное меню сообщения (Telegram-style)
              </h4>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Имитация сообщения */}
                <div
                  style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-medium)',
                    maxWidth: '300px',
                    position: 'relative',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 'var(--font-size-medium)' }}>
                    Привет! Как дела? Это тестовое сообщение для демонстрации контекстного меню.
                  </p>
                  <div
                    style={{
                      fontSize: 'var(--font-size-small)',
                      opacity: 0.8,
                      marginTop: '4px',
                    }}
                  >
                    14:32
                  </div>
                </div>

                {/* Контекстное меню */}
                <ActionsMenu items={messageActions} size='medium' animationOrigin='left' />
              </div>

              <p
                style={{
                  marginTop: '8px',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--text-secondary)',
                }}
              >
                Полнофункциональное меню с группировкой действий и горячими клавишами
              </p>
            </div>

            {/* Разные размеры */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>Размеры меню</h4>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Small
                  </p>
                  <ActionsMenu
                    items={compactActions}
                    size='small'
                    animationOrigin='center'
                    maxWidth={160}
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Medium
                  </p>
                  <ActionsMenu
                    items={simpleActions.slice(0, 3)}
                    size='medium'
                    animationOrigin='center'
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Large
                  </p>
                  <ActionsMenu
                    items={simpleActions.slice(0, 3)}
                    size='large'
                    animationOrigin='center'
                  />
                </div>
              </div>
            </div>

            {/* Типы действий */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>Типы действий</h4>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Default
                  </p>
                  <ActionsMenu
                    items={[
                      {
                        label: 'Обычное действие',
                        icon: <EditIcon />,
                        onClick: () => logAction('Default action'),
                      },
                    ]}
                    size='medium'
                    animationOrigin='center'
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Primary
                  </p>
                  <ActionsMenu
                    items={[
                      {
                        label: 'Важное действие',
                        icon: <PinIcon />,
                        onClick: () => logAction('Primary action'),
                        type: 'primary',
                      },
                    ]}
                    size='medium'
                    animationOrigin='center'
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: '600',
                    }}
                  >
                    Destructive
                  </p>
                  <ActionsMenu
                    items={[
                      {
                        label: 'Удаление',
                        icon: <DeleteIcon />,
                        onClick: () => logAction('Destructive action'),
                        type: 'destructive',
                      },
                    ]}
                    size='medium'
                    animationOrigin='center'
                  />
                </div>
              </div>
            </div>

            {/* Направления анимации */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--text-heading)' }}>
                Направления анимации
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                {animations.map((animation) => (
                  <div key={animation.value} style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        marginBottom: '8px',
                        fontSize: 'var(--font-size-small)',
                        fontWeight: '600',
                      }}
                    >
                      {animation.label}
                    </p>
                    <ActionsMenu
                      items={compactActions}
                      size='small'
                      animationOrigin={animation.value}
                      maxWidth={140}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* История действий */}
        {actionHistory.length > 0 && (
          <div
            style={{
              padding: '24px',
              border: '1px solid var(--color-elevated)',
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
              <h3 style={{ color: 'var(--text-heading)', margin: 0 }}>📋 История действий</h3>
              <Button variant='secondary' size='small' onClick={() => setActionHistory([])}>
                Очистить
              </Button>
            </div>

            <div
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: 'var(--color-elevated)',
                padding: '12px',
                borderRadius: 'var(--radius-medium)',
                fontSize: 'var(--font-size-small)',
                fontFamily: 'monospace',
              }}
            >
              {actionHistory.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    padding: '4px 0',
                    borderBottom:
                      index < actionHistory.length - 1 ? '1px solid var(--color-surface)' : 'none',
                    color: 'var(--text-body)',
                  }}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Практические советы */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--color-elevated)',
            borderRadius: 'var(--radius-medium)',
            backgroundColor: 'var(--color-elevated)',
          }}
        >
          <h3 style={{ color: 'var(--text-heading)', marginBottom: '16px' }}>
            💡 Особенности и советы
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
              <strong>Группировка:</strong> Используйте группы для логического разделения действий
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Типы действий:</strong> <code>destructive</code> для удаления,{' '}
              <code>primary</code> для важных действий
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Горячие клавиши:</strong> Добавляйте <code>shortcut</code> для улучшения UX
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Анимации:</strong> Выбирайте направление анимации в зависимости от позиции
              триггера
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Размеры:</strong> <code>small</code> для компактных интерфейсов,{' '}
              <code>large</code> для touch-устройств
            </li>
            <li>
              <strong>Accessibility:</strong> Все элементы поддерживают навигацию с клавиатуры и
              focus-visible
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
