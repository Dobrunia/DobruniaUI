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

// Emoji Picker Component
const EmojiPickerWrapper = styled.div<{ align?: 'left' | 'right' }>`
  position: absolute;
  bottom: calc(100% + 8px);
  ${(p) =>
    p.align === 'left' ? 'left: 0; right: auto;' : 'right: 0; left: auto;'}
  background: var(--color-surface);
  border-radius: var(--radius-medium);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.13);
  border: 1px solid var(--color-elevated);
  padding: 4px;
  z-index: 1000;
  min-width: 180px;
  max-width: 220px;
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-surface);

  &::-webkit-scrollbar {
    width: 6px;
    background: var(--color-surface);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 8px;
  }
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  font-size: 20px;
  border-radius: var(--radius-small);
  transition: background var(--transition-fast);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--color-elevated);
  }
`;

const EmojiButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
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

const EmojiPicker: React.FC<{
  onSelect?: (emoji: string) => void;
  visible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  align?: 'left' | 'right';
}> = ({ onSelect, visible, onMouseEnter, onMouseLeave, align = 'right' }) => {
  const emojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '🥶',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤗',
    '🤔',
    '🤭',
    '🤫',
    '🤥',
    '😶',
    '😐',
    '😑',
    '😬',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '🤐',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
  ];
  if (!visible) return null;
  return (
    <EmojiPickerWrapper
      align={align}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <EmojiGrid>
        {emojis.map((emoji, index) => (
          <EmojiButton
            key={index}
            onClick={() => onSelect?.(emoji)}
            aria-label={`Select emoji ${emoji}`}
          >
            {emoji}
          </EmojiButton>
        ))}
      </EmojiGrid>
    </EmojiPickerWrapper>
  );
};

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

  // Audio (заглушка)
  const handleAudioClick = () => {
    // Здесь можно реализовать запись аудио
    onAudioRecord?.(new Blob());
  };

  // Emoji Picker hover logic
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const emojiPickerTimeout = useRef<number | null>(null);
  const showEmojiPicker = () => {
    if (emojiPickerTimeout.current) clearTimeout(emojiPickerTimeout.current);
    setEmojiPickerVisible(true);
  };
  const hideEmojiPicker = () => {
    if (emojiPickerTimeout.current) clearTimeout(emojiPickerTimeout.current);
    emojiPickerTimeout.current = setTimeout(
      () => setEmojiPickerVisible(false),
      120,
    );
  };

  // Для message: вставка emoji в inputValue
  const handleEmojiSelect = (emoji: string) => {
    if (type === 'message') {
      const newValue = val + emoji;
      if (!controlled) setInputValue(newValue);
      onChange?.(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const len = newValue.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 0);
    }
    onEmojiSelect?.(emoji);
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
      <EmojiButtonWrapper>
        <IconBtn
          type="button"
          onMouseEnter={showEmojiPicker}
          onMouseLeave={hideEmojiPicker}
        >
          <SmileIcon />
        </IconBtn>
        {onEmojiSelect && (
          <EmojiPicker
            onSelect={onEmojiSelect}
            visible={emojiPickerVisible}
            onMouseEnter={showEmojiPicker}
            onMouseLeave={hideEmojiPicker}
            align="left"
          />
        )}
      </EmojiButtonWrapper>
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
        <EmojiButtonWrapper>
          <IconBtn
            type="button"
            onMouseEnter={showEmojiPicker}
            onMouseLeave={hideEmojiPicker}
          >
            <SmileIcon />
          </IconBtn>
          <EmojiPicker
            onSelect={handleEmojiSelect}
            visible={emojiPickerVisible}
            onMouseEnter={showEmojiPicker}
            onMouseLeave={hideEmojiPicker}
            align="right"
          />
        </EmojiButtonWrapper>
        {val.trim() || files.length > 0 ? (
          <Button variant="send" onClick={onSend} aria-label="Отправить" />
        ) : (
          <IconBtn type="button" onClick={handleAudioClick}>
            <MicIcon />
          </IconBtn>
        )}
      </InputBar>
    </>
  );
};
