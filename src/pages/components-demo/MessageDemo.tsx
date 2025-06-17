import {
  Badge,
  Message,
  MessageContainer,
  type MessageType,
  type ActionsMenuAction,
} from '@DobruniaUI';
import { useState } from 'react';

// SVG иконки для действий с сообщениями
const ReplyIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z' />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
  </svg>
);

const ForwardIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14 15v4l7-7-7-7v4.1c-5 0-8.5-1.6-11-5.1 1 5 4 10 11 11z' />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>
);

const SelectIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
  </svg>
);

const PinIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14,4V10.5L12,9L10,10.5V4H14M16,2H8V13L12,10L16,13V2Z' />
  </svg>
);

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
        url: 'https://cdn.fishki.net/upload/post/2021/02/16/3613245/tn/alberta-2297204-1280.jpg',
        name: 'beautiful-landscape.jpg',
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
        url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        name: 'voice-message.mp3',
        duration: 15, // 15 seconds
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
    text: 'Это сообщение переслано от Vasya',
    time: '1:03',
    reactions: [],
    sender: {
      id: 'Vasya',
      name: 'Vasya',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    isRead: true,
    forwardedFrom: { id: 'Vasya', name: 'Vasya' },
  },
  {
    id: 'msg-11',
    type: 'outgoing',
    text: 'Это сообщение ответное на сообщение от Аня',
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

// Действия для контекстного меню сообщений (Telegram-style)
const actionsDemo: ActionsMenuAction[] = [
  {
    label: 'Ответить',
    icon: <ReplyIcon />,
    onClick: () => alert('Ответить на сообщение'),
    shortcut: '⌘R',
  },
  {
    label: 'Копировать текст',
    icon: <CopyIcon />,
    onClick: () => {
      navigator.clipboard?.writeText('Текст сообщения скопирован!');
      alert('Текст скопирован в буфер обмена!');
    },
    shortcut: '⌘C',
  },
  {
    label: 'Переслать',
    icon: <ForwardIcon />,
    onClick: () => alert('Сообщение переслано'),
    shortcut: '⌘F',
  },
  {
    label: 'Выбрать',
    icon: <SelectIcon />,
    onClick: () => alert('Сообщение выбрано для группового действия'),
  },
  {
    label: 'Закрепить',
    icon: <PinIcon />,
    onClick: () => alert('Сообщение закреплено'),
    type: 'primary',
  },
  {
    label: 'Удалить',
    icon: <DeleteIcon />,
    onClick: () => {
      if (confirm('Вы уверены, что хотите удалить это сообщение?')) {
        alert('Сообщение удалено');
      }
    },
    type: 'destructive',
    shortcut: '⌫',
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
        background: 'var(--c-bg-elevated)',
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
