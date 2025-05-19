import { useState } from 'react';
import { Input, Message } from '@DobruniaUI';

export const InputDemo = () => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [messages, setMessages] = useState<
    {
      text: string;
      files: File[];
      reactions: { emoji: string; users: { id: string }[] }[];
    }[]
  >([]);
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [audios, setAudios] = useState<Blob[]>([]);

  const handleReaction = (msgIdx: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg, i) => {
        if (i !== msgIdx) return msg;
        const existing = msg.reactions.find(
          (r) => r.emoji === emoji && r.users.some((u) => u.id === 'me'),
        );
        if (existing) {
          return {
            ...msg,
            reactions: msg.reactions
              .map((r) =>
                r.emoji === emoji
                  ? { ...r, users: r.users.filter((u) => u.id !== 'me') }
                  : r,
              )
              .filter((r) => r.users.length > 0),
          };
        } else {
          const found = msg.reactions.find((r) => r.emoji === emoji);
          if (found) {
            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, users: [...r.users, { id: 'me' }] }
                  : r,
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, users: [{ id: 'me' }] }],
            };
          }
        }
      }),
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        maxWidth: 400,
        margin: '40px auto',
      }}
    >
      <h2>Message Input</h2>
      <Input
        type="message"
        placeholder="Сообщение..."
        value={message}
        onChange={setMessage}
        onSend={() => {
          if (message.trim() || messageFiles.length > 0) {
            setMessages((prev) => [
              ...prev,
              { text: message, files: messageFiles, reactions: [] },
            ]);
            setMessage('');
            setMessageFiles([]);
          }
        }}
        files={messageFiles}
        onFilesChange={setMessageFiles}
        onEmojiSelect={(emoji: string) => console.log('Emoji:', emoji)}
        onAudioRecord={(audio: Blob) => console.log('Audio blob:', audio)}
      />
      <div style={{ marginTop: 16 }}>
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            type="outgoing"
            text={msg.text}
            time={new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            reactions={msg.reactions}
            onReaction={(emoji: string) => handleReaction(idx, emoji)}
            currentUserId="me"
          />
        ))}
      </div>

      <h2>Search Input</h2>
      <Input
        type="search"
        placeholder="Поиск"
        value={search}
        onChange={setSearch}
        onSearch={(v: string) => console.log('Search:', v)}
      />

      <h2>File Input</h2>
      <Input
        type="file"
        onFilesChange={(files: File[]) => console.log('Files:', files)}
      />

      <h2>Emoji Input</h2>
      <Input
        type="emoji"
        onEmojiSelect={(emoji: string) => setSelectedEmoji(emoji)}
      />
      {selectedEmoji && (
        <div style={{ fontSize: 32, marginTop: 8, textAlign: 'center' }}>
          {selectedEmoji}
        </div>
      )}

      <h2>Audio Input</h2>
      <Input
        type="audio"
        onAudioRecord={(audio: Blob) => setAudios((prev) => [...prev, audio])}
      />
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {audios.map((audio, idx) => (
          <audio
            key={idx}
            controls
            src={URL.createObjectURL(audio)}
            style={{ width: '100%' }}
          />
        ))}
      </div>
    </div>
  );
};
