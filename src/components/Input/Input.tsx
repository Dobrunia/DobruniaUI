import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';

// SVG-иконки (заглушки)
const PaperclipIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path
      d="M7.5 9.5l5-5a2.121 2.121 0 113 3l-7 7a4 4 0 01-5.657-5.657l7.071-7.07"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const SmileIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.5 12.5a4 4 0 0 0 7 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="7" cy="8.5" r="1" fill="currentColor" />
    <circle cx="13" cy="8.5" r="1" fill="currentColor" />
  </svg>
);
const MicIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    {/* Корпус микрофона */}
    <rect
      x="7"
      y="2.5"
      width="6"
      height="10"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Основание-подставка */}
    <path
      d="M4 10.5a6 6 0 0 0 12 0"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Ножка */}
    <line
      x1="10"
      y1="13"
      x2="10"
      y2="17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Подставка-кружок */}
    <ellipse
      cx="10"
      cy="18"
      rx="3"
      ry="0.7"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M15 15l-2-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Стили
const InputBar = styled.div`
  display: flex;
  align-items: flex-end;
  background: var(--color-surface);
  padding: var(--spacing-small) var(--spacing-medium);
  gap: var(--spacing-small);
  width: 100%;
`;
const IconBtn = styled.button`
  background: none;
  border: none;
  padding: var(--spacing-tiny);
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: var(--font-size-large);
  &:hover {
    color: var(--color-primary);
  }
`;
const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-body);
  font-size: var(--font-size-medium);
  padding: var(--spacing-small) 0;
  outline: none;
`;
const StyledTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-body);
  font-size: var(--font-size-medium);
  outline: none;
  resize: none;
  min-height: 26px;
  max-height: 144px; /* ~6 строк */
  line-height: 1.4;
  overflow-y: auto;
`;
const FilePreview = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;
const FileThumbWrapper = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
`;
const FileThumb = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--radius-medium);
  border: 1.5px solid var(--color-primary);
`;

// Типы
export type InputType = 'message' | 'search' | 'file' | 'emoji' | 'audio';

interface InputProps {
  type: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  onSend?: () => void;
  onSearch?: (v: string) => void;
  onFilesChange?: (files: File[]) => void;
  onEmojiSelect?: (emoji: string) => void;
  onAudioRecord?: (audio: Blob) => void;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onSend,
  onSearch,
  onFilesChange,
  onEmojiSelect,
  onAudioRecord,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // message/search: controlled/uncontrolled
  const controlled = value !== undefined;
  const val = controlled ? value : inputValue;

  // Для авто-роста textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    if (type === 'message' && textareaRef.current) {
      textareaRef.current.style.height = '26.38px';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [val, type]);

  // File preview logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    // Добавляем новые файлы к уже выбранным, избегая дубликатов по имени и размеру
    setFiles((prev) => {
      const all = [...prev, ...fileList];
      const unique = all.filter(
        (file, idx, arr) =>
          arr.findIndex((f) => f.name === file.name && f.size === file.size) ===
          idx,
      );
      onFilesChange?.(unique);
      return unique;
    });
    // Сброс input чтобы можно было выбрать тот же файл повторно
    e.target.value = '';
  };
  const handleRemoveFile = (idx: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      onFilesChange?.(updated);
      return updated;
    });
  };

  // Emoji (заглушка)
  const handleEmojiClick = () => {
    onEmojiSelect?.('😀'); // пример
  };

  // Audio (заглушка)
  const handleAudioClick = () => {
    // Здесь можно реализовать запись аудио
    onAudioRecord?.(new Blob());
  };

  // Render
  if (type === 'search') {
    return (
      <InputBar>
        <StyledInput
          type="text"
          placeholder={placeholder || 'Поиск'}
          value={val}
          onChange={(e) => {
            if (!controlled) setInputValue(e.target.value);
            onChange?.(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
        <IconBtn type="button" tabIndex={-1}>
          <SearchIcon />
        </IconBtn>
      </InputBar>
    );
  }
  if (type === 'file') {
    return (
      <div>
        <IconBtn type="button" onClick={() => fileInputRef.current?.click()}>
          <PaperclipIcon />
        </IconBtn>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <FilePreview>
            {files.map((file, i) => (
              <FileThumbWrapper key={i}>
                {file.type.startsWith('image/') ? (
                  <FileThumb src={URL.createObjectURL(file)} alt={file.name} />
                ) : (
                  <span>{file.name}</span>
                )}
                <Button
                  variant="close"
                  shape="circle"
                  size="small"
                  aria-label="Удалить"
                  onClick={() => handleRemoveFile(i)}
                  style={{ position: 'absolute', top: -8, right: -8 }}
                />
              </FileThumbWrapper>
            ))}
          </FilePreview>
        )}
      </div>
    );
  }
  if (type === 'emoji') {
    return (
      <IconBtn type="button" onClick={handleEmojiClick}>
        <SmileIcon />
      </IconBtn>
    );
  }
  if (type === 'audio') {
    return (
      <IconBtn type="button" onClick={handleAudioClick}>
        <MicIcon />
      </IconBtn>
    );
  }
  // message (default)
  return (
    <>
      {files.length > 0 && (
        <FilePreview style={{ marginBottom: 10 }}>
          {files.map((file, i) => (
            <FileThumbWrapper key={i}>
              {file.type.startsWith('image/') ? (
                <FileThumb src={URL.createObjectURL(file)} alt={file.name} />
              ) : (
                <span>{file.name}</span>
              )}
              <Button
                variant="close"
                shape="circle"
                size="small"
                aria-label="Удалить"
                onClick={() => handleRemoveFile(i)}
                style={{ position: 'absolute', top: -8, right: -8 }}
              />
            </FileThumbWrapper>
          ))}
        </FilePreview>
      )}
      <InputBar>
        <IconBtn type="button" onClick={() => fileInputRef.current?.click()}>
          <PaperclipIcon />
        </IconBtn>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <StyledTextarea
          ref={textareaRef}
          placeholder={placeholder || 'Сообщение...'}
          value={val}
          onChange={(e) => {
            if (!controlled) setInputValue(e.target.value);
            onChange?.(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend?.();
            }
          }}
          rows={1}
        />
        <IconBtn type="button" onClick={handleEmojiClick}>
          <SmileIcon />
        </IconBtn>
        <IconBtn type="button" onClick={handleAudioClick}>
          <MicIcon />
        </IconBtn>
      </InputBar>
    </>
  );
};
