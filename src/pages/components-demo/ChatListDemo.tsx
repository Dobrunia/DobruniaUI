import React, { useState } from 'react';
import { ChatList } from '@DobruniaUI';

const demoChats = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Алиса Морозова',
    lastMessage: 'Отлично! Встречаемся завтра в 15:00',
    time: '12:45',
    isRead: true,
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Максим Dev',
    lastMessage: 'Проверь последний коммит, там исправил баг с формой',
    time: '11:23',
    status: 'offline' as const,
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    name: 'Артём Кузнецов',
    lastMessage: 'Кофе не забудь! ☕',
    time: '10:07',
    isRead: true,
    status: 'dnd' as const,
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    name: 'Мария Белкина',
    lastMessage: 'Документы отправила на почту, посмотри пожалуйста',
    time: '09:41',
    status: 'online' as const,
  },
  {
    id: '5',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    name: 'Денис Волков',
    lastMessage: 'Спасибо за помощь! 🙏',
    time: '08:15',
    isRead: true,
    status: 'offline' as const,
  },
  {
    id: '6',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Софья Лебедева',
    lastMessage: 'Презентацию нужно доработать, обсудим детали на встрече',
    time: '07:52',
    status: 'dnd' as const,
  },
  {
    id: '7',
    name: 'Frontend Team',
    lastMessage: 'Релиз откладывается на неделю из-за критического бага',
    time: 'Вчера',
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
        background: 'var(--c-bg-elevated)',
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
