import { Reaction } from '../../data-display';

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

export const ReactionDemo = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        background: '#232a36',
        padding: 32,
        borderRadius: 16,
      }}
    >
      <Reaction emoji="❤️" users={users.slice(0, 2)} />
      <Reaction emoji="😂" users={users.slice(0, 3)} />
      <Reaction emoji="👍" users={users} />
      <Reaction emoji="🔥" users={users.slice(1, 4)} />
    </div>
  );
};
