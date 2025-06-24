import React, { useState } from 'react';
import { SearchInput, FileInput, EmojiInput, AudioInput } from '@DobruniaUI';

export const InputDemo: React.FC = () => {
  // SearchInput state
  const [searchValue, setSearchValue] = useState('');

  // FileInput state
  const [files, setFiles] = useState<File[]>([]);

  // Audio recordings
  const [audioRecordings, setAudioRecordings] = useState<Blob[]>([]);

  const handleEmojiSelect = (emoji: string) => {
    console.log('Selected emoji:', emoji);
    alert(`Выбран эмодзи: ${emoji}`);
  };

  const handleAudioRecord = (audio: Blob) => {
    console.log('Audio recorded:', audio);
    setAudioRecordings((prev) => [...prev, audio]);
    alert(`Записано аудио ${audio.size} байт`);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Input Components Demo</h1>

      <div style={{ marginBottom: '32px' }}>
        <h3>SearchInput - поиск с красивым дизайном</h3>
        <div style={{ marginBottom: '16px' }}>
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder='Введите запрос для поиска...'
          />
        </div>
        <p>Текущее значение: "{searchValue}"</p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3>FileInput - выбор файлов с превью</h3>
        <div style={{ marginBottom: '16px' }}>
          <FileInput files={files} onFilesChange={setFiles} />
        </div>
        <p>Выбрано файлов: {files.length}</p>
        {files.length > 0 && (
          <ul>
            {files.map((file, i) => (
              <li key={i}>
                {file.name} ({Math.round(file.size / 1024)} KB)
              </li>
            ))}
          </ul>
        )}
      </div>

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
          <SearchInput value={searchValue} onChange={setSearchValue} placeholder='Поиск' />
          <FileInput files={[]} onFilesChange={() => {}} />
          <EmojiInput onEmojiSelect={(emoji) => setSearchValue((prev) => prev + emoji)} />
          <AudioInput onAudioRecord={handleAudioRecord} />
        </div>
      </div>
    </div>
  );
};
