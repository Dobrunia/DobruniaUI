import React, { useState } from 'react';
import { ChatList } from '@DobruniaUI';

const demoChats = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Алиса Морозова',
    lastMessage: 'Входящее: (не прочитано)',
    time: '12:45',
    messageStatus: 'unread' as const,
    isOutgoing: false,
    status: 'online' as const,
    unreadCount: 4,
  },
  {
    id: '2',
    name: 'Максим Dev',
    lastMessage: 'Моё: (не прочитано)',
    time: '11:23',
    messageStatus: 'unread' as const,
    isOutgoing: true,
    status: 'offline' as const,
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    name: 'Артём Кузнецовввввввввввввввввввввввввввввввввввв',
    lastMessage: 'Входящее: (прочитано) (очень длинное сообщение) ',
    time: '10:07',
    messageStatus: 'read' as const,
    isOutgoing: false,
    status: 'dnd' as const,
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    name: 'Мария Белкина',
    lastMessage: 'Моё: (прочитано)',
    time: '09:41',
    messageStatus: 'read' as const,
    isOutgoing: true,
    status: 'online' as const,
  },
  {
    id: '5',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    name: 'Денис Волков',
    lastMessage: 'Входящее: (ошибка)',
    time: '08:15',
    messageStatus: 'error' as const,
    isOutgoing: false,
    status: 'offline' as const,
  },
  {
    id: '6',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Софья Лебедева',
    lastMessage: 'Моё: (ошибка отправки)',
    time: '07:52',
    messageStatus: 'error' as const,
    isOutgoing: true,
    status: 'dnd' as const,
  },
  {
    id: '7',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    name: 'Иван Петров',
    lastMessage: '',
    time: 'сейчас',
    messageStatus: 'read' as const,
    isOutgoing: false,
    status: 'online' as const,
    isTyping: true,
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
      <ChatList items={demoChats} skeletonCount={7} loading={loading} selectedId={selected} onSelect={setSelected} />
    </div>
  );
};
