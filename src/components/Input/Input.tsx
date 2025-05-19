import React, { useRef, useState, useEffect } from 'react';
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
const MicIcon = ({ recording }: { recording?: boolean }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    {/* Корпус микрофона */}
    <rect
      x="7"
      y="2.5"
      width="6"
      height="10"
      rx="3"
      stroke={recording ? 'var(--color-error)' : 'currentColor'}
      strokeWidth="1.5"
    />
    {/* Основание-подставка */}
    <path
      d="M4 10.5a6 6 0 0 0 12 0"
      stroke={recording ? 'var(--color-error)' : 'currentColor'}
      strokeWidth="1.5"
      fill="none"
    />
    {/* Ножка */}
    <line
      x1="10"
      y1="13"
      x2="10"
      y2="17"
      stroke={recording ? 'var(--color-error)' : 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Подставка-кружок */}
    <ellipse
      cx="10"
      cy="18"
      rx="3"
      ry="0.7"
      stroke={recording ? 'var(--color-error)' : 'currentColor'}
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

// Стили
const InputBar = styled.div`
  display: flex;
  align-items: flex-end;
  background: var(--color-elevated);
  padding: var(--spacing-small);
  min-height: 32px;
  gap: 8px;
  width: 100%;
`;
const IconBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: var(--font-size-large);
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
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
  &:hover {
    &::placeholder {
      color: var(--color-primary);
    }
  }
`;
const StyledTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-body);
  font-size: var(--font-size-medium);
  outline: none;
  resize: none;
  min-height: 32px;
  max-height: 144px; /* ~6 строк */
  line-height: 32px;
  overflow-y: auto;
  padding: 0 4px;
  display: flex;
  align-items: center;
  &::placeholder {
    color: var(--text-secondary);
    line-height: 32px;
    vertical-align: middle;
    opacity: 1;
    transition: color var(--transition-fast);
  }
  &:hover {
    &::placeholder {
      color: var(--color-primary);
    }
  }
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-elevated);
  &::-webkit-scrollbar {
    width: 6px;
    background: var(--color-elevated);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 8px;
  }
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
  width: 32px;
  height: 32px;
  width: 100%;
  height: 100%;
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
  background: var(--color-elevated);
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
  scrollbar-color: var(--color-primary) var(--color-elevated);

  &::-webkit-scrollbar {
    width: 6px;
    background: var(--color-elevated);
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

// Lightbox для предпросмотра изображений
const ImageModalOverlay = styled.div`
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageModalImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: var(--radius-large);
  box-shadow: 0 8px 32px #0008;
  background: #fff;
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
  files?: File[];
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

const SearchBar = styled(InputBar)`
  background: var(--color-elevated);
  border-radius: 999px;
  padding: 0 var(--spacing-medium);
  min-height: 32px;
  box-shadow: none;
  transition: box-shadow var(--transition-fast);
  &:hover {
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--color-primary) 20%, transparent 80%);
  }
`;
const SearchInputField = styled(StyledInput)`
  background: transparent;
  border: none;
  font-size: var(--font-size-medium);
  padding: var(--spacing-small) 0;
  border-radius: 999px;
  &::placeholder {
    color: var(--text-secondary);
    opacity: 1;
    transition: color var(--transition-fast);
  }
  &:hover {
    &::placeholder {
      color: var(--color-primary);
    }
  }
`;

const MicBtn = styled(IconBtn)<{ $recording?: boolean }>`
  position: relative;
  z-index: 1;
  overflow: visible;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  &::before {
    content: '';
    display: ${({ $recording }) => ($recording ? 'block' : 'none')};
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--color-accent);
    opacity: 0.25;
    animation: mic-pulse 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    z-index: 0;
  }
  @keyframes mic-pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.25;
    }
    70% {
      transform: translate(-50%, -50%) scale(1.8);
      opacity: 0.12;
    }
    100% {
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
`;

const SmileBtn = styled(IconBtn)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

// Для кнопки отправки
const SendBtn = styled(Button)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Input component - универсальный компонент ввода с различными типами
 * @param {('message'|'search'|'file'|'emoji'|'audio')} type - тип инпута
 * @param {string} [placeholder] - placeholder текст
 * @param {string} [value] - значение инпута (для контролируемого компонента)
 * @param {(value: string) => void} [onChange] - обработчик изменения значения
 * @param {() => void} [onSend] - обработчик отправки сообщения (для type="message")
 * @param {(value: string) => void} [onSearch] - обработчик поиска (для type="search")
 * @param {(files: File[]) => void} [onFilesChange] - обработчик изменения файлов (для type="file")
 * @param {(emoji: string) => void} [onEmojiSelect] - обработчик выбора эмодзи (для type="emoji")
 * @param {(audio: Blob) => void} [onAudioRecord] - обработчик записи аудио (для type="audio")
 * @param {File[]} [files] - массив файлов (для контролируемого компонента с type="file")
 *
 * @example
 * // Поиск
 * <Input
 *   type="search"
 *   placeholder="Поиск..."
 *   onSearch={(value) => console.log(value)}
 * />
 *
 * // Сообщение с файлами и эмодзи
 * <Input
 *   type="message"
 *   placeholder="Введите сообщение..."
 *   onSend={() => console.log('Отправлено')}
 *   onFilesChange={(files) => console.log(files)}
 *   onEmojiSelect={(emoji) => console.log(emoji)}
 * />
 *
 * // Загрузка файлов
 * <Input
 *   type="file"
 *   onFilesChange={(files) => console.log(files)}
 * />
 *
 * // Выбор эмодзи
 * <Input
 *   type="emoji"
 *   onEmojiSelect={(emoji) => console.log(emoji)}
 * />
 *
 * // Запись аудио
 * <Input
 *   type="audio"
 *   onAudioRecord={(audio) => console.log(audio)}
 * />
 */
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
  files: filesProp,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // message/search: controlled/uncontrolled
  const controlled = value !== undefined;
  const val = controlled ? value : inputValue;

  // files controlled/uncontrolled
  const filesControlled = filesProp !== undefined;
  const filesToShow = filesControlled ? filesProp! : files;

  // Для авто-роста textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    if (type === 'message' && textareaRef.current) {
      textareaRef.current.style.height = '26.38px';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [val, type]);

  // Сброс файлов при очистке через onFilesChange([])
  useEffect(() => {
    if (files.length > 0 && onFilesChange && files.every((f) => !f)) {
      setFiles([]);
    }
  }, [onFilesChange, files]);

  // File preview logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    // Добавляем новые файлы к уже выбранным, избегая дубликатов по имени и размеру
    if (filesControlled) {
      const all = [...(filesProp || []), ...fileList];
      const unique = all.filter(
        (file, idx, arr) =>
          arr.findIndex((f) => f.name === file.name && f.size === file.size) ===
          idx,
      );
      onFilesChange?.(unique);
    } else {
      setFiles((prev) => {
        const all = [...prev, ...fileList];
        const unique = all.filter(
          (file, idx, arr) =>
            arr.findIndex(
              (f) => f.name === file.name && f.size === file.size,
            ) === idx,
        );
        onFilesChange?.(unique);
        return unique;
      });
    }
    // Сброс input чтобы можно было выбрать тот же файл повторно
    e.target.value = '';
  };
  const handleRemoveFile = (idx: number) => {
    if (filesControlled) {
      const updated = (filesProp || []).filter((_, i) => i !== idx);
      onFilesChange?.(updated);
    } else {
      setFiles((prev) => {
        const updated = prev.filter((_, i) => i !== idx);
        onFilesChange?.(updated);
        return updated;
      });
    }
  };

  // Audio recording state
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        onAudioRecord?.(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch {
      setRecording(false);
      // Можно добавить обработку ошибок
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
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

  // Lightbox state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handlePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const closePreview = () => setPreviewImage(null);

  // Render
  if (type === 'search') {
    return (
      <SearchBar>
        <SearchInputField
          type="text"
          placeholder={placeholder || 'Поиск'}
          value={val}
          onChange={(e) => {
            if (!controlled) setInputValue(e.target.value);
            onChange?.(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
      </SearchBar>
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
        {filesToShow.length > 0 && (
          <FilePreview>
            {filesToShow.map((file, i) => (
              <FileThumbWrapper key={i}>
                {file.type.startsWith('image/') ? (
                  <FileThumb
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePreview(file)}
                  />
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
        {previewImage && (
          <ImageModalOverlay onClick={closePreview}>
            <ImageModalImg
              src={previewImage}
              alt="preview"
              onClick={(e) => e.stopPropagation()}
            />
          </ImageModalOverlay>
        )}
      </div>
    );
  }
  if (type === 'emoji') {
    return (
      <EmojiButtonWrapper>
        <SmileBtn
          type="button"
          onMouseEnter={showEmojiPicker}
          onMouseLeave={hideEmojiPicker}
        >
          <SmileIcon />
        </SmileBtn>
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
      <MicBtn
        type="button"
        $recording={recording}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        aria-label={recording ? 'Идёт запись...' : 'Записать аудио'}
      >
        <MicIcon recording={recording} />
      </MicBtn>
    );
  }
  // message (default)
  return (
    <>
      {filesToShow.length > 0 && (
        <FilePreview style={{ marginBottom: 10 }}>
          {filesToShow.map((file, i) => (
            <FileThumbWrapper key={i}>
              {file.type.startsWith('image/') ? (
                <FileThumb
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePreview(file)}
                />
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
          placeholder={placeholder}
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
          <SmileBtn
            type="button"
            onMouseEnter={showEmojiPicker}
            onMouseLeave={hideEmojiPicker}
          >
            <SmileIcon />
          </SmileBtn>
          <EmojiPicker
            onSelect={handleEmojiSelect}
            visible={emojiPickerVisible}
            onMouseEnter={showEmojiPicker}
            onMouseLeave={hideEmojiPicker}
            align="right"
          />
        </EmojiButtonWrapper>
        {val.trim() || filesToShow.length > 0 ? (
          <SendBtn variant="send" onClick={onSend} aria-label="Отправить" />
        ) : (
          <MicBtn
            $recording={recording}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            aria-label={recording ? 'Идёт запись...' : 'Записать аудио'}
          >
            <MicIcon recording={recording} />
          </MicBtn>
        )}
      </InputBar>
    </>
  );
};
