import React, { useState } from 'react';
import styled from 'styled-components';
import { MessageInput, Message, DESIGN_TOKENS } from '@DobruniaUI';

const DemoContainer = styled.div`
  padding: ${DESIGN_TOKENS.spacing.large};
  margin: 0 auto;
  max-width: 1000px;
`;

const SectionTitle = styled.h2`
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.large};
  margin-bottom: ${DESIGN_TOKENS.spacing.medium};
  text-align: center;
`;

const ExampleCard = styled.div`
  padding: ${DESIGN_TOKENS.spacing.medium};
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  background: var(--c-bg-default);
  min-height: 200px;
`;

const ExampleTitle = styled.h4`
  font-size: ${DESIGN_TOKENS.fontSize.small};
  margin: 0 0 ${DESIGN_TOKENS.spacing.medium} 0;
  text-align: center;
  color: var(--c-text-primary);
`;

const MessageLog = styled.div`
  margin-top: ${DESIGN_TOKENS.spacing.medium};
  padding: ${DESIGN_TOKENS.spacing.small};
  background: var(--c-bg-subtle);
  border-radius: ${DESIGN_TOKENS.radius.small};
  max-height: 300px;
  overflow-y: auto;
`;

// Мемоизированный компонент сообщения с кастомной функцией сравнения
const MemoizedMessage = React.memo<{
  message: {
    id: number;
    text: string;
    files: File[];
    timestamp: Date;
  };
}>(
  ({ message }) => {
    // Преобразуем файлы в формат attachments для Message компонента
    const attachments = message.files.map((file) => {
      if (file.type.startsWith('image/')) {
        return {
          type: 'image' as const,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        };
      } else if (file.type.startsWith('audio/')) {
        return {
          type: 'audio' as const,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          duration: 0,
        };
      } else {
        return {
          type: 'file' as const,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        };
      }
    });

    return (
      <Message
        key={message.id}
        id={message.id.toString()}
        type='outgoing'
        text={message.text || ''}
        time={message.timestamp.toLocaleTimeString()}
        attachments={attachments.length > 0 ? attachments : undefined}
        isRead={true}
      />
    );
  },
  (prevProps, nextProps) => {
    // Кастомная функция сравнения - сообщение не изменилось если ID тот же
    return prevProps.message.id === nextProps.message.id;
  }
);

MemoizedMessage.displayName = 'MemoizedMessage';

export const MessageInputDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      text: string;
      files: File[];
      timestamp: Date;
    }>
  >([]);

  const handleSend = React.useCallback(() => {
    if (value.trim() || files.length > 0) {
      const newMessage = {
        id: Date.now(),
        text: value,
        files: [...files],
        timestamp: new Date(),
      };
      setMessages((prev) => [newMessage, ...prev]);
      setValue('');
      setFiles([]);
    }
  }, [value, files]);

  const handleEmojiSelect = React.useCallback(() => {}, []);

  const handleAudioRecord = React.useCallback((audio: Blob) => {
    const audioFile = new File([audio], 'audio-message.webm', { type: 'audio/webm' });
    setFiles((prev) => [...prev, audioFile]);
  }, []);

  const handleValueChange = React.useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handleFilesChange = React.useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  return (
    <DemoContainer>
      <SectionTitle>MessageInput Demo</SectionTitle>
      <ExampleCard>
        <ExampleTitle>MessageInput</ExampleTitle>
        <MessageInput
          value={value}
          onChange={handleValueChange}
          files={files}
          onFilesChange={handleFilesChange}
          onSend={handleSend}
          onEmojiSelect={handleEmojiSelect}
          onAudioRecord={handleAudioRecord}
          placeholder='Введите сообщение...'
        />

        <MessageLog>
          <div style={{ marginBottom: '12px', fontWeight: 'bold', color: 'var(--c-text-primary)' }}>
            Отправленные сообщения:
          </div>
          {messages.length === 0 ? (
            <div style={{ color: 'var(--c-text-secondary)', textAlign: 'center', padding: '20px' }}>
              Сообщений пока нет
            </div>
          ) : (
            messages.map((message) => <MemoizedMessage key={message.id} message={message} />)
          )}
        </MessageLog>
      </ExampleCard>
    </DemoContainer>
  );
};
