import React, { useState, useCallback } from 'react';
import { SearchInput, FileInput, EmojiInput, AudioInput, Button } from '@DobruniaUI';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

// Стили для превью файлов (как в MessageInput)
const FilePreview = styled.div`
  display: flex;
  gap: 12px;
  background: var(--c-bg-elevated);
  padding: ${DESIGN_TOKENS.spacing.small};
  border-radius: ${DESIGN_TOKENS.radius.medium};
  flex-wrap: wrap;
  margin-top: 12px;
`;

const FileThumbWrapper = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
`;

const FileThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1.5px solid var(--c-accent);
  cursor: pointer;
`;

const FileIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-default);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1.5px solid var(--c-accent);
  color: var(--c-accent);
  font-size: 12px;
  text-align: center;
`;

const FileCloseButton = styled(Button)`
  position: absolute;
  top: -8px;
  right: -8px;
`;

const FileInfo = styled.div`
  margin-top: 8px;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  color: var(--c-text-secondary);
`;

const ImageModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ImageModalImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: ${DESIGN_TOKENS.radius.large};
  box-shadow: 0 8px 32px #0008;
  background: #fff;
`;

export const InputDemo: React.FC = React.memo(() => {
  // SearchInput state
  const [searchValue, setSearchValue] = useState('');

  // FileInput state
  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Audio recordings
  const [audioRecordings, setAudioRecordings] = useState<Blob[]>([]);

  const handleEmojiSelect = useCallback((emoji: string) => {
    console.log('Selected emoji:', emoji);
    alert(`Выбран эмодзи: ${emoji}`);
  }, []);

  const handleAudioRecord = useCallback((audio: Blob) => {
    console.log('Audio recorded:', audio);
    setAudioRecordings((prev) => [...prev, audio]);
    alert(`Записано аудио ${audio.size} байт`);
  }, []);

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handlePreview = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleEmojiToSearch = useCallback((emoji: string) => {
    setSearchValue((prev) => prev + emoji);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Input Components Demo</h1>

      <div style={{ marginBottom: '32px' }}>
        <h3>SearchInput - поиск с красивым дизайном</h3>
        <div style={{ marginBottom: '16px' }}>
          <SearchInput
            value={searchValue}
            onChange={handleSearchChange}
            placeholder='Введите запрос для поиска...'
          />
        </div>
        <p>Текущее значение: "{searchValue}"</p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3>FileInput - выбор файлов с превью</h3>
        <div style={{ marginBottom: '16px' }}>
          <FileInput onFilesChange={handleFilesChange} />
        </div>
        <p>Выбрано файлов: {files.length}</p>

        {/* Превью файлов в стиле MessageInput */}
        {files.length > 0 && (
          <FilePreview>
            {files.map((file, i) => (
              <FileThumbWrapper key={`${file.name}-${file.size}-${i}`}>
                {file.type.startsWith('image/') ? (
                  <FileThumb
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    title={file.name}
                    onClick={() => handlePreview(file)}
                  />
                ) : (
                  <FileIcon title={file.name}>
                    {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                  </FileIcon>
                )}
                <FileCloseButton
                  variant='close'
                  shape='circle'
                  size='small'
                  aria-label='Удалить'
                  onClick={() => handleRemoveFile(i)}
                />
              </FileThumbWrapper>
            ))}
          </FilePreview>
        )}

        {/* Детальная информация о файлах */}
        {files.length > 0 && (
          <FileInfo>
            <strong>Детали файлов:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {files.map((file, i) => (
                <li key={`${file.name}-${file.size}-${i}`} style={{ marginBottom: '4px' }}>
                  <strong>{file.name}</strong> ({formatFileSize(file.size)}) - {file.type}
                </li>
              ))}
            </ul>
          </FileInfo>
        )}
      </div>

      {/* Lightbox для изображений */}
      {previewImage && (
        <ImageModalOverlay onClick={closePreview}>
          <ImageModalImg src={previewImage} alt='preview' />
        </ImageModalOverlay>
      )}

      <div style={{ marginBottom: '32px' }}>
        <h3>EmojiInput - выбор эмодзи с hover picker</h3>
        <div style={{ marginBottom: '16px' }}>
          <EmojiInput onEmojiSelect={handleEmojiSelect} />
        </div>
        <p>Наведите на кнопку эмодзи для отображения селектора</p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3>AudioInput - запись аудио</h3>
        <div style={{ marginBottom: '16px' }}>
          <AudioInput onAudioRecord={handleAudioRecord} />
        </div>
        <p>Нажмите и удерживайте для записи аудио</p>
        <p>Записано аудиофайлов: {audioRecordings.length}</p>
        {audioRecordings.length > 0 && (
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            {audioRecordings.map((audio, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>
                Аудио {i + 1}: {formatFileSize(audio.size)} ({audio.type})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3>Комплексный пример</h3>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          <SearchInput value={searchValue} onChange={handleSearchChange} placeholder='Поиск' />
          <FileInput onFilesChange={() => {}} />
          <EmojiInput onEmojiSelect={handleEmojiToSearch} />
          <AudioInput onAudioRecord={handleAudioRecord} />
        </div>
        <p>В комплексном примере эмодзи добавляются к поисковому запросу</p>
      </div>
    </div>
  );
});

InputDemo.displayName = 'InputDemo';
