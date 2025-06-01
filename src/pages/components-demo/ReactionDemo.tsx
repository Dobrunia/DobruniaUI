import { Reaction } from '@DobruniaUI';

const users = [
  {
    id: '1',
    name: 'Аня',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Иван',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Оля',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '4',
    name: 'Петр',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
];

const currentUserId = '2'; // Иван

export const ReactionDemo = () => {
  const handleClick = (emoji: string) => {
    alert(`Вы кликнули по реакции: ${emoji}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        background: 'var(--color-elevated)',
        padding: 32,
        borderRadius: 16,
      }}
    >
      <Reaction
        emoji='❤️'
        users={users.slice(0, 2)}
        currentUserId={currentUserId}
        onClick={() => handleClick('❤️')}
      />
      <Reaction
        emoji='😂'
        users={users.slice(0, 3)}
        currentUserId={currentUserId}
        onClick={() => handleClick('😂')}
      />
      <Reaction
        emoji='👍'
        users={users}
        currentUserId={currentUserId}
        onClick={() => handleClick('👍')}
      />
      <Reaction
        emoji='🔥'
        users={users.slice(1, 4)}
        currentUserId={currentUserId}
        onClick={() => handleClick('🔥')}
      />
    </div>
  );
};
