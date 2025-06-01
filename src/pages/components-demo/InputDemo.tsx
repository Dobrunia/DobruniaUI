import { useState } from 'react';
import { Input, Message } from '@DobruniaUI';

export const InputDemo = () => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [messages, setMessages] = useState<
    {
      text: string;
      attachments?: {
        type: 'image' | 'file' | 'audio';
        url: string;
        name?: string;
        size?: number;
        duration?: number | undefined;
      }[];
      reactions: { emoji: string; users: { id: string; name: string }[] }[];
    }[]
  >([]);
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [audios, setAudios] = useState<Blob[]>([]);

  const handleReaction = (msgIdx: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg, i) => {
        if (i !== msgIdx) return msg;
        const existing = msg.reactions.find(
          (r) => r.emoji === emoji && r.users.some((u) => u.id === 'me')
        );
        if (existing) {
          return {
            ...msg,
            reactions: msg.reactions
              .map((r) =>
                r.emoji === emoji ? { ...r, users: r.users.filter((u) => u.id !== 'me') } : r
              )
              .filter((r) => r.users.length > 0),
          };
        } else {
          const found = msg.reactions.find((r) => r.emoji === emoji);
          if (found) {
            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji ? { ...r, users: [...r.users, { id: 'me', name: 'Me' }] } : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, users: [{ id: 'me', name: 'Me' }] }],
            };
          }
        }
      })
    );
  };

  const handleSend = () => {
    if (message.trim() || messageFiles.length > 0) {
      const attachments = messageFiles.map((file) => ({
        type: file.type.startsWith('image/') ? ('image' as const) : ('file' as const),
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

      setMessages((prev) => [
        ...prev,
        {
          text: message,
          attachments: attachments.length > 0 ? attachments : undefined,
          reactions: [],
        },
      ]);
      setMessage('');
      setMessageFiles([]);
    }
  };

  const handleAudioRecord = (audio: Blob) => {
    const url = URL.createObjectURL(audio);
    const name = `audio-${Date.now()}.webm`;
    setMessages((prev) => [
      ...prev,
      {
        text: '',
        attachments: [
          {
            type: 'audio',
            url,
            name,
            duration: 0,
          },
        ],
        reactions: [],
      },
    ]);
    const audioElement = new Audio(url);
    audioElement.volume = 0; // чтобы не было звука при автопроигрывании

    function updateDuration(duration: number) {
      setMessages((prev) => {
        const lastIdx = prev.length - 1;
        if (lastIdx < 0) return prev;
        const last = prev[lastIdx];
        if (!last.attachments || last.attachments[0].url !== url) return prev;
        return [
          ...prev.slice(0, lastIdx),
          {
            ...last,
            attachments: [
              {
                ...last.attachments[0],
                duration,
              },
            ],
          },
        ];
      });
    }

    audioElement.addEventListener('loadedmetadata', () => {
      if (audioElement.duration && isFinite(audioElement.duration) && audioElement.duration > 0.1) {
        updateDuration(audioElement.duration);
      } else {
        // Если duration не определился, проигрываем до конца
        const onEnded = () => {
          if (audioElement.duration && isFinite(audioElement.duration)) {
            updateDuration(audioElement.duration);
          } else {
            updateDuration(0);
          }
          audioElement.removeEventListener('ended', onEnded);
          audioElement.removeEventListener('timeupdate', onTimeUpdate);
        };
        const onTimeUpdate = () => {
          if (
            audioElement.duration &&
            isFinite(audioElement.duration) &&
            audioElement.currentTime > 0
          ) {
            // Если duration определился в процессе
            audioElement.pause();
            updateDuration(audioElement.duration);
            audioElement.removeEventListener('ended', onEnded);
            audioElement.removeEventListener('timeupdate', onTimeUpdate);
          }
        };
        audioElement.addEventListener('ended', onEnded);
        audioElement.addEventListener('timeupdate', onTimeUpdate);
        audioElement.play().catch(() => {
          updateDuration(0);
          audioElement.removeEventListener('ended', onEnded);
          audioElement.removeEventListener('timeupdate', onTimeUpdate);
        });
      }
    });
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
        type='message'
        placeholder='Сообщение...'
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        files={messageFiles}
        onFilesChange={setMessageFiles}
        onEmojiSelect={(emoji: string) => console.log('Emoji:', emoji)}
        onAudioRecord={handleAudioRecord}
      />
      <div style={{ marginTop: 16 }}>
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            type='outgoing'
            text={msg.text}
            time={new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            reactions={msg.reactions}
            onReaction={(emoji: string) => handleReaction(idx, emoji)}
            currentUserId='me'
            attachments={msg.attachments}
          />
        ))}
      </div>

      <h2>Search Input</h2>
      <Input
        type='search'
        placeholder='Поиск'
        value={search}
        onChange={setSearch}
        onSearch={(v: string) => console.log('Search:', v)}
      />

      <h2>File Input</h2>
      <Input type='file' onFilesChange={(files: File[]) => console.log('Files:', files)} />

      <h2>Emoji Input</h2>
      <Input type='emoji' onEmojiSelect={(emoji: string) => setSelectedEmoji(emoji)} />
      {selectedEmoji && (
        <div style={{ fontSize: 32, marginTop: 8, textAlign: 'center' }}>{selectedEmoji}</div>
      )}
    </div>
  );
};
