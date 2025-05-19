import { Message } from '../../data-display';
import type { MessageType } from '../../data-display/Message/Message';
import React, { useState } from 'react';

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
}> = [
  {
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
    type: 'outgoing',
    text: 'Все отлично, спасибо! 😊',
    time: '8:10',
    reactions: [{ emoji: '❤️', users: [userMe, userOther] }],
    sender: userMe,
    isRead: false,
  },
  {
    type: 'incoming',
    text: 'Всем привет!',
    time: '8:10',
    reactions: [],
    sender: userOther,
    isRead: true,
  },
  {
    type: 'incoming',
    text: 'Это сообщение без отправителя.',
    time: '8:10',
    reactions: [],
    sender: undefined,
    isRead: false,
  },
  {
    type: 'outgoing',
    text: 'Это сообщение без отправителя.',
    time: '8:10',
    reactions: [],
    sender: undefined,
    isRead: false,
  },
  {
    type: 'outgoing',
    text: 'Все отлично, спасибо! 😊',
    time: '8:10',
    reactions: [
      { emoji: '❤️', users: [userMe, userOther] },
      { emoji: '😂', users: [userOther] },
      { emoji: '👍', users: [userMe] },
      { emoji: '🔥', users: [userMe] },
    ],
    sender: userMe,
    isRead: true,
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
          (r) => r.emoji === emoji && r.users.some((u) => u.id === userMe.id),
        );
        if (existing) {
          // Если уже есть, убираем реакцию userMe
          return {
            ...msg,
            reactions: msg.reactions
              .map((r) =>
                r.emoji === emoji
                  ? { ...r, users: r.users.filter((u) => u.id !== userMe.id) }
                  : r,
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
                r.emoji === emoji ? { ...r, users: [...r.users, userMe] } : r,
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, users: [userMe] }],
            };
          }
        }
      }),
    );
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '40px auto',
        background: 'var(--color-elevated)',
        padding: 24,
        borderRadius: 16,
        position: 'relative',
      }}
    >
      {messages.map((msg, idx) => (
        <Message
          key={idx}
          {...msg}
          onReaction={(emoji) => handleReaction(idx, emoji)}
          currentUserId={userMe.id}
        />
      ))}
    </div>
  );
};
