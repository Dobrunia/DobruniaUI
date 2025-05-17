import { useState } from 'react';
import { Input } from '../../components/Input/Input';

export const InputDemo = () => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [messages, setMessages] = useState<{ text: string; files: File[] }[]>(
    [],
  );
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [audios, setAudios] = useState<Blob[]>([]);

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
              { text: message, files: messageFiles },
            ]);
            setMessage('');
            setMessageFiles([]);
          }
        }}
        files={messageFiles}
        onFilesChange={setMessageFiles}
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
              marginBottom: 8,
              boxShadow: '0 1px 4px #0001',
            }}
          >
            <div>{msg.text}</div>
            {msg.files && msg.files.length > 0 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {msg.files.map((file, i) =>
                  file.type.startsWith('image/') ? (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: 'cover',
                        borderRadius: 6,
                        border: '1px solid #eee',
                      }}
                    />
                  ) : (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        color: '#888',
                        border: '1px solid #eee',
                        borderRadius: 6,
                        padding: '4px 8px',
                      }}
                    >
                      {file.name}
                    </span>
                  ),
                )}
              </div>
            )}
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
        onAudioRecord={(audio) => setAudios((prev) => [...prev, audio])}
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
