import React, { useState } from 'react';
import { ChatList } from '@DobruniaUI';

const demoChats = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Дочь Бабушки',
    lastMessage: 'да',
    time: '0:40',
    isRead: true,
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Тинкер',
    lastMessage: 'https://vk.com/clip-221298038_456244519?c=1',
    time: '22:18',
    status: 'offline' as const,
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Егор',
    lastMessage: 'Ща',
    time: '21:05',
    isRead: true,
    status: 'dnd' as const,
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Саня Винокуров',
    lastMessage: 'Ща',
    time: '18:38',
    status: 'online' as const,
  },
  {
    id: '5',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Вячеслав Буглов',
    lastMessage: 'Спасибо',
    time: '11:14',
    isRead: true,
    status: 'offline' as const,
  },
  {
    id: '6',
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
    name: 'Паштет',
    lastMessage: 'Привет, я в этот семестр все проебал, так что ниче...',
    time: '10:09',
    status: 'dnd' as const,
  },
  {
    id: '7',
    name: 'Перекуп кала 100 за кг',
    lastMessage: 'Сегодня не могу',
    time: 'Вс',
    status: 'offline' as const,
  },
];

export const ChatListDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div
      style={{
        maxWidth: 340,
        background: 'var(--color-elevated)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <button onClick={() => setLoading((v) => !v)} style={{ margin: 8 }}>
        {loading ? 'Показать чаты' : 'Показать skeleton'}
      </button>
      <ChatList items={demoChats} loading={loading} selectedId={selected} onSelect={setSelected} />
    </div>
  );
};
