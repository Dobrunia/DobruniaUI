import { ActionsMenu, type ActionsMenuAction } from '@DobruniaUI';

const actions: ActionsMenuAction[] = [
  {
    label: 'Ответить',
    icon: <span style={{ fontSize: 20 }}>↩️</span>,
    onClick: () => alert('Ответить'),
  },
  {
    label: 'Копировать текст',
    icon: <span style={{ fontSize: 20 }}>📋</span>,
    onClick: () => alert('Скопировано!'),
  },
  {
    label: 'Переслать',
    icon: <span style={{ fontSize: 20 }}>🔀</span>,
    onClick: () => alert('Переслано!'),
  },
  {
    label: 'Удалить',
    icon: <span style={{ fontSize: 20 }}>🗑️</span>,
    onClick: () => alert('Удалено!'),
  },
];

export const ActionsMenuDemo = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
    }}
  >
    <ActionsMenu actions={actions} />
  </div>
);
