import { useState } from 'react';
import { Message, MessageContainer, MessageInput } from '@DobruniaUI';

export const MessageInputDemo = () => {
  const [messageText, setMessageText] = useState('');
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      time: string;
      type: 'incoming' | 'outgoing';
      attachments?: Array<{
        type: 'image' | 'file' | 'audio';
        url: string;
        name?: string;
        size?: number;
        duration?: number;
      }>;
      reactions: Array<{
        emoji: string;
        users: Array<{ id: string; name: string }>;
      }>;
    }>
  >([
    {
      id: '1',
      text: 'Привет! Как дела?',
      time: '14:30',
      type: 'incoming',
      reactions: [],
    },
    {
      id: '2',
      text: 'Отлично! А у тебя как?',
      time: '14:32',
      type: 'outgoing',
      reactions: [
        {
          emoji: '👍',
          users: [{ id: 'user1', name: 'Собеседник' }],
        },
      ],
    },
  ]);

  const handleSend = () => {
    if (messageText.trim() || messageFiles.length > 0) {
      const attachments = messageFiles.map((file) => ({
        type: file.type.startsWith('image/')
          ? ('image' as const)
          : file.type.startsWith('audio/')
          ? ('audio' as const)
          : ('file' as const),
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        duration: file.type.startsWith('audio/') ? 0 : undefined,
      }));

      const newMessage = {
        id: Date.now().toString(),
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'outgoing' as const,
        attachments: attachments.length > 0 ? attachments : undefined,
        reactions: [],
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageText('');
      setMessageFiles([]);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    console.log('Selected emoji:', emoji);
  };

  const handleAudioRecord = (audio: Blob) => {
    const audioFile = new File([audio], `audio-${Date.now()}.webm`, {
      type: 'audio/webm',
    });

    setMessageFiles((prev) => [...prev, audioFile]);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;

        const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
        const currentUserInReaction = existingReaction?.users.some((u) => u.id === 'me');

        if (existingReaction) {
          if (currentUserInReaction) {
            // Убираем реакцию
            return {
              ...msg,
              reactions: msg.reactions
                .map((r) =>
                  r.emoji === emoji ? { ...r, users: r.users.filter((u) => u.id !== 'me') } : r
                )
                .filter((r) => r.users.length > 0),
            };
          } else {
            // Добавляем пользователя к существующей реакции
            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji ? { ...r, users: [...r.users, { id: 'me', name: 'Я' }] } : r
              ),
            };
          }
        } else {
          // Создаем новую реакцию
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, users: [{ id: 'me', name: 'Я' }] }],
          };
        }
      })
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        height: 600,
        margin: '40px auto',
        border: '1px solid var(--c-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--c-bg-default)',
      }}
    >
      {/* Заголовок чата */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--c-border)',
          background: 'var(--c-bg-elevated)',
          fontWeight: 500,
          fontSize: '1.1rem',
        }}
      >
        MessageInput Demo Chat
      </div>

      {/* Сообщения */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <MessageContainer maxHeight='100%' autoScrollToBottom>
          {messages.map((msg) => (
            <Message
              key={msg.id}
              id={msg.id}
              type={msg.type}
              text={msg.text}
              time={msg.time}
              attachments={msg.attachments}
              reactions={msg.reactions}
              currentUserId='me'
              reactionEmojis={['❤️', '😂', '👍', '🔥', '😮', '😢']}
              onReaction={(emoji) => handleReaction(msg.id, emoji)}
            />
          ))}
        </MessageContainer>
      </div>

      {/* Ввод сообщения */}
      <div
        style={{
          padding: '8px',
          borderTop: '1px solid var(--c-border)',
          background: 'var(--c-bg-elevated)',
        }}
      >
        <MessageInput
          value={messageText}
          onChange={setMessageText}
          files={messageFiles}
          onFilesChange={setMessageFiles}
          onSend={handleSend}
          onEmojiSelect={handleEmojiSelect}
          onAudioRecord={handleAudioRecord}
          placeholder='Введите сообщение...'
        />
      </div>

      {/* Информация о компоненте */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--c-bg-subtle)',
          fontSize: '0.85rem',
          color: 'var(--c-text-secondary)',
          borderTop: '1px solid var(--c-border)',
        }}
      >
        <strong>MessageInput features:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Автоматическое изменение высоты текстового поля</li>
          <li>Прикрепление файлов с превью (изображения, файлы, аудио)</li>
          <li>Выбор эмодзи с всплывающим меню</li>
          <li>Запись аудио сообщений</li>
          <li>Отправка по Enter (Shift+Enter для новой строки)</li>
          <li>Поддержка отключенного состояния</li>
        </ul>
      </div>
    </div>
  );
};
