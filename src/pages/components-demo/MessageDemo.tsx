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
    text: 'Привет! Как дела? (Это сообщение с обычным набором эмодзи)',
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
    text: 'Все отлично, спасибо! 😊 (Сообщение с 2 эмодзи)',
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
    text: '🚀 ТЕСТ: Много эмодзи! Попробуй добавить реакцию - должен появиться скролл!',
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
    text: '⚡ Компактные действия - тест ActionsMenu с минимальным набором',
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
  {
    id: 'msg-12',
    type: 'incoming',
    text: '📝 Это сообщение БЕЗ меню действий и реакций - просто обычный текст',
    time: '1:05',
    reactions: [],
    sender: userOther,
    isRead: true,
  },
];

// Разные наборы действий для тестирования ActionsMenu
const fullActionsDemo: ActionsMenuAction[] = [
  {
    label: 'Ответить',
    icon: <ReplyIcon />,
    onClick: () => alert('🔄 Действие: Ответить на сообщение'),
    shortcut: '⌘R',
  },
  {
    label: 'Копировать',
    icon: <CopyIcon />,
    onClick: () => alert('📋 Действие: Копировать текст сообщения'),
    shortcut: '⌘C',
  },
  {
    label: 'Переслать',
    icon: <ForwardIcon />,
    onClick: () => alert('📤 Действие: Переслать сообщение'),
  },
  {
    label: 'Удалить',
    icon: <DeleteIcon />,
    onClick: () => alert('🗑️ Действие: Удалить сообщение'),
    type: 'destructive',
  },
];

// Компактные действия (меньше опций)
const compactActions: ActionsMenuAction[] = [
  {
    label: 'Копировать',
    icon: <CopyIcon />,
    onClick: () => alert('📋 Компактное действие: Копировать'),
    shortcut: '⌘C',
  },
  {
    label: 'Удалить',
    icon: <DeleteIcon />,
    onClick: () => alert('🗑️ Компактное действие: Удалить'),
    type: 'destructive',
  },
];

// Только основные действия
const basicActions: ActionsMenuAction[] = [
  {
    label: 'Ответить',
    icon: <ReplyIcon />,
    onClick: () => alert('🔄 Базовое действие: Ответить'),
    type: 'primary',
  },
];

// Большой набор эмодзи для тестирования горизонтального скролла
const manyEmojis = ['❤️', '😂', '👍', '🔥', '😍', '😢', '😮', '😡', '🎉', '💯', '🚀', '⭐'];
const standardEmojis = ['❤️', '😂', '👍', '🔥'];
const basicEmojis = ['❤️', '👍'];

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
    <MessageContainer maxHeight={600}
      lastMessageId={
        messages.length
          ? messages[messages.length - 1].replyTo?.id || 'msg-' + (messages.length - 1)
          : undefined
      }
    >
      <Badge variant='message-date' date={new Date()} locale='ru' />
      {messages.map((msg, idx) => {
        // Разные наборы эмодзи и действий для тестирования
        let reactionEmojis = standardEmojis;
        let actions = fullActionsDemo;

        if (msg.id === 'msg-8') {
          // Сообщение с большим количеством эмодзи для тестирования скролла
          reactionEmojis = manyEmojis;
        } else if (msg.id === 'msg-2') {
          // Сообщение с минимальными эмодзи
          reactionEmojis = basicEmojis;
          actions = basicActions;
        } else if (msg.id === 'msg-9') {
          // Сообщение с компактными действиями
          actions = compactActions;
        } else if (msg.id === 'msg-12') {
          // Сообщение БЕЗ меню действий и реакций
          reactionEmojis = [];
          actions = [];
        }

        return (
          <Message
            key={msg.id}
            {...msg}
            onReaction={
              reactionEmojis.length > 0 ? (emoji: string) => handleReaction(idx, emoji) : undefined
            }
            currentUserId={userMe.id}
            actions={actions.length > 0 ? actions : undefined}
            reactionEmojis={reactionEmojis}
            showActionsOnClick={actions.length > 0}
            onForwardedClick={msg.forwardedFrom ? handleForwardedClick : undefined}
          />
        );
      })}
    </MessageContainer>
  );
};
