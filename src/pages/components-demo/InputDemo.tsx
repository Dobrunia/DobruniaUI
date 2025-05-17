import { useState } from 'react';
import { Input } from '../../components/Input/Input';

export const InputDemo = () => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

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
        onSend={() => console.log('Send:', message)}
        onFilesChange={(files) => console.log('Files:', files)}
        onEmojiSelect={(emoji) => console.log('Emoji:', emoji)}
        onAudioRecord={(audio) => console.log('Audio blob:', audio)}
      />

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
