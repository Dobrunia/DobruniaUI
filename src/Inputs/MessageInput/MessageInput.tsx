import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, DESIGN_TOKENS, AudioInput, EmojiInput, FileInput } from '@DobruniaUI';

export interface MessageInputProps {
  /** Значение текста сообщения */
  value: string;
  /** Обработчик изменения текста */
  onChange: (value: string) => void;
  /** Placeholder для текстового поля */
  placeholder?: string;
  /** Массив прикрепленных файлов */
  files: File[];
  /** Обработчик изменения файлов */
  onFilesChange: (files: File[]) => void;
  /** Обработчик отправки сообщения */
  onSend?: () => void;
  /** Обработчик выбора эмодзи */
  onEmojiSelect?: (emoji: string) => void;
  /** Обработчик записи аудио */
  onAudioRecord?: (audio: Blob) => void;
  /** Дополнительные CSS классы */
  className?: string;
  /** Отключить компонент */
  disabled?: boolean;
}

// SVG иконка для аудио файлов
const AudioIcon = () => (
  <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
    <path
      d='M3 12a2 2 0 0 0 2 2h2l4 4V2L7 6H5a2 2 0 0 0-2 2v4z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15 8s1.5 1 1.5 4-1.5 4-1.5 4'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Стили
const InputContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${DESIGN_TOKENS.spacing.small};
  border-top: 1px solid var(--c-border);
  background: var(--c-bg-elevated);
  padding: ${DESIGN_TOKENS.spacing.small};
  max-height: 200px;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
`;

const FilePreview = styled.div`
  display: flex;
  gap: 12px;
  background: var(--c-bg-elevated);
  padding: ${DESIGN_TOKENS.spacing.small};
  border-radius: ${DESIGN_TOKENS.radius.medium};
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const FileThumbWrapper = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
`;

const FileThumb = styled.img<{ $clickable?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1.5px solid var(--c-accent);
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const AudioFileThumb = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-default);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1.5px solid var(--c-accent);
  color: var(--c-accent);
`;

const FileCloseButton = styled(Button)`
  position: absolute;
  top: -8px;
  right: -8px;
`;

const InputBar = styled.div`
  display: flex;
  align-items: flex-end;
  background: var(--c-bg-elevated);
  padding: ${DESIGN_TOKENS.spacing.small};
  min-height: 32px;
  gap: 8px;
  width: 100%;
  border-radius: ${DESIGN_TOKENS.radius.large};
  flex-shrink: 0;
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  outline: none;
  resize: none;
  min-height: 32px;
  max-height: 120px;
  line-height: 32px;
  overflow-y: auto;
  padding: 0 4px;
  display: flex;
  align-items: center;
  &::placeholder {
    color: var(--c-text-secondary);
    line-height: 32px;
    vertical-align: middle;
    opacity: 1;
    transition: color ${DESIGN_TOKENS.transition.fast};
  }
  &:hover {
    &::placeholder {
      color: var(--c-accent);
    }
  }
  scrollbar-width: thin;
  scrollbar-color: var(--c-accent) var(--c-bg-elevated);
  &::-webkit-scrollbar {
    width: 6px;
    background: var(--c-bg-elevated);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--c-accent);
    border-radius: 8px;
  }
`;

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

/**
 * MessageInput - компонент ввода сообщений с поддержкой файлов, эмодзи и аудио
 *
 * Включает в себя:
 * - Текстовый ввод с автоматическим изменением высоты
 * - Прикрепление файлов с превью
 * - Выбор эмодзи (EmojiInput)
 * - Запись аудио (AudioInput)
 * - Кнопка отправки
 *
 * @param value - текст сообщения
 * @param onChange - обработчик изменения текста
 * @param files - массив прикрепленных файлов
 * @param onFilesChange - обработчик изменения файлов
 * @param onSend - обработчик отправки сообщения
 * @param onEmojiSelect - дополнительный обработчик выбора эмодзи (опциональный)
 * @param onAudioRecord - обработчик записи аудио
 * @param placeholder - placeholder текста
 * @param disabled - отключить компонент
 * @param className - дополнительные CSS классы
 */
export const MessageInput: React.FC<MessageInputProps> = React.memo(
  ({
    value,
    onChange,
    files,
    onFilesChange,
    onSend,
    onEmojiSelect,
    onAudioRecord,
    placeholder = 'Введите сообщение...',
    disabled = false,
    className,
  }) => {
    console.log('📱 MessageInput render:', { valueLength: value.length, filesCount: files.length });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Для авто-роста textarea
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '26.38px';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [value]);

    // File handling
    const handleFileChange = (newFiles: File[]) => {
      const all = [...files, ...newFiles];
      const unique = all.filter(
        (file, idx, arr) =>
          arr.findIndex((f) => f.name === file.name && f.size === file.size) === idx
      );
      onFilesChange(unique);
    };

    const handleRemoveFile = (idx: number) => {
      const updated = files.filter((_, i) => i !== idx);
      onFilesChange(updated);
    };

    const handlePreview = (file: File) => {
      if (file.type.startsWith('image/')) {
        setPreviewImage(URL.createObjectURL(file));
      }
    };

    const closePreview = () => setPreviewImage(null);

    // Вставка emoji в value
    const handleEmojiSelect = (emoji: string) => {
      const newValue = value + emoji;
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const len = newValue.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 0);
      onEmojiSelect?.(emoji);
    };

    const handleSend = () => {
      if ((value.trim() || files.length > 0) && !disabled) {
        onSend?.();
        // Автофокус на input после отправки
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        }, 0);
      }
    };

    return (
      <InputContainer $disabled={disabled} className={className}>
        {/* Превью файлов - показываем только если есть файлы */}
        {files.length > 0 && (
          <FilePreview>
            {files.map((file, i) => (
              <FileThumbWrapper key={i}>
                {file.type.startsWith('image/') ? (
                  <FileThumb
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    $clickable
                    onClick={() => handlePreview(file)}
                  />
                ) : file.type.startsWith('audio/') ? (
                  <AudioFileThumb>
                    <AudioIcon />
                  </AudioFileThumb>
                ) : (
                  <AudioFileThumb>
                    <span style={{ fontSize: '10px', textAlign: 'center' }}>
                      {file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </AudioFileThumb>
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

        {/* Lightbox для изображений */}
        {previewImage && (
          <ImageModalOverlay onClick={closePreview}>
            <ImageModalImg src={previewImage} alt='preview' />
          </ImageModalOverlay>
        )}

        {/* Основной ввод */}
        <InputBar>
          {/* Кнопка прикрепления файлов */}
          <FileInput onFilesChange={handleFileChange} disabled={disabled} />

          {/* Основное текстовое поле */}
          <StyledTextarea
            ref={textareaRef}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            disabled={disabled}
          />

          {/* Эмодзи кнопка */}
          <EmojiInput onEmojiSelect={handleEmojiSelect} align='right' />

          {/* Кнопка отправки или микрофон */}
          {value.trim() || files.length > 0 ? (
            <SendBtn
              variant='send'
              onClick={handleSend}
              aria-label='Отправить'
              disabled={disabled}
            />
          ) : onAudioRecord ? (
            <AudioInput onAudioRecord={onAudioRecord} />
          ) : null}
        </InputBar>
      </InputContainer>
    );
  },
  (prevProps, nextProps) => {
    // Кастомная функция сравнения - сравниваем только важные пропсы
    return (
      prevProps.value === nextProps.value &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.placeholder === nextProps.placeholder &&
      prevProps.files.length === nextProps.files.length &&
      prevProps.files.every(
        (file, index) =>
          file.name === nextProps.files[index]?.name && file.size === nextProps.files[index]?.size
      )
    );
  }
);

MessageInput.displayName = 'MessageInput';
