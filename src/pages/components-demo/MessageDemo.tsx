import { Badge, Message, MessageContainer, type MessageType } from '@DobruniaUI';
import { useState } from 'react';

const userMe = {
  id: 'me',
  name: 'Я',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};
const userOther = {
  id: 'other',
  name: 'Аня',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

const initialMessages: Array<{
  type: MessageType;
  text: string;
  time: string;
  reactions: { emoji: string; users: (typeof userMe)[] }[];
  sender?: typeof userMe;
  isRead: boolean;
  id: string;
  attachments?: {
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
    size?: number;
    duration?: number;
  }[];
  forwardedFrom?: { id: string; name: string };
  replyTo?: {
    id: string;
    text: string;
    sender: { name: string };
  };
}> = [
  {
    id: 'msg-1',
    type: 'incoming',
    text: 'Привет! Как дела?',
    time: '8:10',
    reactions: [
      { emoji: '❤️', users: [userMe, userOther] },
      { emoji: '😂', users: [userOther] },
      { emoji: '👍', users: [userMe] },
      { emoji: '🔥', users: [userMe] },
    ],
    sender: userOther,
    isRead: false,
  },
  {
    id: 'msg-2',
    type: 'outgoing',
    text: 'Все отлично, спасибо! 😊',
    time: '8:10',
    reactions: [{ emoji: '❤️', users: [userMe, userOther] }],
    sender: userMe,
    isRead: false,
  },
  {
    id: 'msg-3',
    type: 'incoming',
    text: 'Посмотри, какая красивая картинка!',
    time: '8:11',
    reactions: [],
    sender: userOther,
    isRead: true,
    attachments: [
      {
        type: 'image',
        url: '/src/assets/204596508.jfif',
        name: 'beautiful-image.jpg',
      },
    ],
  },
  {
    id: 'msg-4',
    type: 'outgoing',
    text: 'А вот мое голосовое сообщение',
    time: '8:12',
    reactions: [],
    sender: userMe,
    isRead: true,
    attachments: [
      {
        type: 'audio',
        url: '/src/assets/cxdy-spooky-szn.mp3',
        name: 'voice-message.mp3',
        duration: 180, // 3 minutes in seconds
      },
    ],
  },
  {
    id: 'msg-5',
    type: 'incoming',
    text: 'Всем привет!',
    time: '8:13',
    reactions: [],
    sender: userOther,
    isRead: true,
  },
  {
    id: 'msg-6',
    type: 'incoming',
    text: 'Это сообщение без отправителя.',
    time: '8:14',
    reactions: [],
    sender: undefined,
    isRead: false,
  },
  {
    id: 'msg-7',
    type: 'outgoing',
    text: 'Это сообщение без отправителя.',
    time: '8:15',
    reactions: [],
    sender: undefined,
    isRead: false,
  },
  {
    id: 'msg-8',
    type: 'outgoing',
    text: 'Все отлично, спасибо! 😊',
    time: '8:16',
    reactions: [
      { emoji: '❤️', users: [userMe, userOther] },
      { emoji: '😂', users: [userOther] },
      { emoji: '👍', users: [userMe] },
      { emoji: '🔥', users: [userMe] },
    ],
    sender: userMe,
    isRead: true,
  },
  {
    id: 'msg-9',
    type: 'outgoing',
    text: 'В',
    time: '8:17',
    reactions: [],
    sender: userMe,
    isRead: true,
  },
  {
    id: 'msg-10',
    type: 'incoming',
    text: 'А плагина для экспресс нету ?\nЕсть, я посмотрел, переписать?',
    time: '1:03',
    reactions: [],
    sender: {
      id: 'peter',
      name: 'Peter',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    isRead: true,
    forwardedFrom: { id: 'peter', name: 'Peter' },
  },
  {
    id: 'msg-11',
    type: 'outgoing',
    text: 'Да, могу переписать!',
    time: '1:04',
    reactions: [],
    sender: userMe,
    isRead: true,
    replyTo: {
      id: 'msg-3',
      text: 'Посмотри, какая красивая картинка!',
      sender: { name: 'Аня' },
    },
  },
];

const actionsDemo = [
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

export const MessageDemo = () => {
  const [messages, setMessages] = useState(initialMessages);

  // Добавление реакции к сообщению по индексу
  const handleReaction = (msgIdx: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg, i) => {
        if (i !== msgIdx) return msg;
        // Проверяем, есть ли уже такая реакция от userMe
        const existing = msg.reactions.find(
          (r) => r.emoji === emoji && r.users.some((u) => u.id === userMe.id)
        );
        if (existing) {
          // Если уже есть, убираем реакцию userMe
          return {
            ...msg,
            reactions: msg.reactions
              .map((r) =>
                r.emoji === emoji ? { ...r, users: r.users.filter((u) => u.id !== userMe.id) } : r
              )
              .filter((r) => r.users.length > 0),
          };
        } else {
          // Если нет, добавляем реакцию userMe
          const found = msg.reactions.find((r) => r.emoji === emoji);
          if (found) {
            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji ? { ...r, users: [...r.users, userMe] } : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, users: [userMe] }],
            };
          }
        }
      })
    );
  };

  const handleForwardedClick = (id: string) => {
    alert('Переход к сообщению пользователя с id: ' + id);
  };

  return (
    <MessageContainer
      style={{
        maxWidth: 720,
        margin: '40px auto',
        background: 'var(--color-elevated)',
        padding: 24,
        borderRadius: 16,
        height: 600,
      }}
      lastMessageId={
        messages.length
          ? messages[messages.length - 1].replyTo?.id || 'msg-' + (messages.length - 1)
          : undefined
      }
    >
      <Badge variant='message-date' date={new Date()} locale='ru' />
      {messages.map((msg, idx) => (
        <Message
          key={msg.id}
          {...msg}
          onReaction={(emoji: string) => handleReaction(idx, emoji)}
          currentUserId={userMe.id}
          actions={actionsDemo}
          onForwardedClick={msg.forwardedFrom ? handleForwardedClick : undefined}
        />
      ))}
    </MessageContainer>
  );
};
