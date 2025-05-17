import { useState } from 'react';
import { Input } from '../../components/Input/Input';

export const InputDemo = () => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

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
          if (message.trim()) {
            setMessages((prev) => [...prev, message]);
            setMessage('');
          }
        }}
        onFilesChange={(files) => console.log('Files:', files)}
        onEmojiSelect={(emoji) => console.log('Emoji:', emoji)}
        onAudioRecord={(audio) => console.log('Audio blob:', audio)}
      />
      <div style={{ marginTop: 16 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 8,
              marginBottom: 4,
              boxShadow: '0 1px 4px #0001',
            }}
          >
            {msg}
          </div>
        ))}
      </div>

      <h2>Search Input</h2>
      <Input
        type="search"
        placeholder="Поиск"
        value={search}
        onChange={setSearch}
        onSearch={(v) => console.log('Search:', v)}
      />

      <h2>File Input</h2>
      <Input
        type="file"
        onFilesChange={(files) => console.log('Files:', files)}
      />

      <h2>Emoji Input</h2>
      <Input type="emoji" onEmojiSelect={(emoji) => setSelectedEmoji(emoji)} />
      {selectedEmoji && (
        <div style={{ fontSize: 32, marginTop: 8, textAlign: 'center' }}>
          {selectedEmoji}
        </div>
      )}

      <h2>Audio Input</h2>
      <Input
        type="audio"
        onAudioRecord={(audio) => console.log('Audio blob:', audio)}
      />
    </div>
  );
};
