import { useState } from 'react';
import { ActionsMenu, Button, type ActionsMenuAction, type ActionsMenuGroup, DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

// Статичная версия ActionsMenu для демо (убираем position: absolute)
const DemoActionsMenu = styled(ActionsMenu)`
  position: static !important;
`;

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

// const MoreIcon = () => (
//   <svg viewBox='0 0 24 24' fill='currentColor'>
//     <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
//   </svg>
// );

export const ActionsMenuDemo = () => {
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

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>ActionsMenu Demo</h1>

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
            borderRadius: DESIGN_TOKENS.radius.medium,
            backgroundColor: 'var(--c-bg-elevated)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
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
            {/* Тип меню */}
            <div>
              <h4 style={{ marginBottom: '8px', color: 'var(--c-text-primary)' }}>Тип меню:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: DESIGN_TOKENS.fontSize.small,
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
                    fontSize: DESIGN_TOKENS.fontSize.small,
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
              backgroundColor: 'var(--c-bg-elevated)',
              borderRadius: DESIGN_TOKENS.radius.medium,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
              position: 'relative',
            }}
          >
            <DemoActionsMenu items={showSimpleMenu ? simpleActions : messageActions} />
          </div>

          <p
            style={{
              color: 'var(--c-text-secondary)',
              fontSize: DESIGN_TOKENS.fontSize.small,
            }}
          >
            Попробуйте разные настройки выше. Кликайте на действия в меню!
          </p>
        </div>

        {/* Примеры использования */}
        <div
          style={{
            padding: '24px',
            border: '1px solid var(--c-bg-elevated)',
            borderRadius: DESIGN_TOKENS.radius.medium,
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
            📱 Примеры использования
          </h3>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Контекстное меню сообщения */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--c-text-primary)' }}>
                Контекстное меню сообщения
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
                    background: 'var(--c-accent)',
                    color: 'var(--c-text-inverse)',
                    padding: '12px 16px',
                    borderRadius: DESIGN_TOKENS.radius.medium,
                    maxWidth: '300px',
                    position: 'relative',
                  }}
                >
                  <p style={{ margin: 0, fontSize: DESIGN_TOKENS.fontSize.medium }}>
                    Привет! Как дела? Это тестовое сообщение для демонстрации контекстного меню.
                  </p>
                  <div
                    style={{
                      fontSize: DESIGN_TOKENS.fontSize.small,
                      opacity: 0.8,
                      marginTop: '4px',
                    }}
                  >
                    14:32
                  </div>
                </div>

                {/* Контекстное меню */}
                <DemoActionsMenu items={messageActions} />
              </div>

              <p
                style={{
                  marginTop: '8px',
                  fontSize: DESIGN_TOKENS.fontSize.small,
                  color: 'var(--c-text-secondary)',
                }}
              >
                Полнофункциональное меню с группировкой действий и горячими клавишами
              </p>
            </div>

            {/* Компактное меню */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--c-text-primary)' }}>
                Компактное меню
              </h4>

              <DemoActionsMenu items={compactActions} />

              <p
                style={{
                  marginTop: '8px',
                  fontSize: DESIGN_TOKENS.fontSize.small,
                  color: 'var(--c-text-secondary)',
                }}
              >
                Минимальный набор действий для быстрого доступа
              </p>
            </div>

            {/* Типы действий */}
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--c-text-primary)' }}>
                Типы действий
              </h4>

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
                      fontSize: DESIGN_TOKENS.fontSize.small,
                      fontWeight: '600',
                    }}
                  >
                    Default
                  </p>
                  <DemoActionsMenu
                    items={[
                      {
                        label: 'Обычное действие',
                        icon: <EditIcon />,
                        onClick: () => logAction('Default action'),
                      },
                    ]}
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: DESIGN_TOKENS.fontSize.small,
                      fontWeight: '600',
                    }}
                  >
                    Primary
                  </p>
                  <DemoActionsMenu
                    items={[
                      {
                        label: 'Важное действие',
                        icon: <PinIcon />,
                        onClick: () => logAction('Primary action'),
                        type: 'primary',
                      },
                    ]}
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      marginBottom: '8px',
                      fontSize: DESIGN_TOKENS.fontSize.small,
                      fontWeight: '600',
                    }}
                  >
                    Destructive
                  </p>
                  <DemoActionsMenu
                    items={[
                      {
                        label: 'Удаление',
                        icon: <DeleteIcon />,
                        onClick: () => logAction('Destructive action'),
                        type: 'destructive',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* История действий */}
        {actionHistory.length > 0 && (
          <div
            style={{
              padding: '24px',
              border: '1px solid var(--c-bg-elevated)',
              borderRadius: DESIGN_TOKENS.radius.medium,
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
              <h3 style={{ color: 'var(--c-text-primary)', margin: 0 }}>📋 История действий</h3>
              <Button variant='secondary' size='small' onClick={() => setActionHistory([])}>
                Очистить
              </Button>
            </div>

            <div
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: 'var(--c-bg-elevated)',
                padding: '12px',
                borderRadius: DESIGN_TOKENS.radius.medium,
                fontSize: DESIGN_TOKENS.fontSize.small,
                fontFamily: 'monospace',
              }}
            >
              {actionHistory.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    padding: '4px 0',
                    borderBottom:
                      index < actionHistory.length - 1 ? '1px solid var(--c-bg-elevated)' : 'none',
                    color: 'var(--c-text-primary)',
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
            border: '1px solid var(--c-bg-elevated)',
            borderRadius: DESIGN_TOKENS.radius.medium,
            backgroundColor: 'var(--c-bg-elevated)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '16px' }}>
            💡 Особенности и советы
          </h3>

          <ul
            style={{
              color: 'var(--c-text-primary)',
              fontSize: DESIGN_TOKENS.fontSize.small,
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
              <strong>Позиционирование:</strong> Меню использует <code>position: absolute</code>,
              требует relative контейнер
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
