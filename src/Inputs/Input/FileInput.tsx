import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export interface FileInputProps {
  /** Обработчик изменения файлов */
  onFilesChange: (files: File[]) => void;
  /** Дополнительные CSS классы */
  className?: string;
  /** Отключить компонент */
  disabled?: boolean;
  /** Разрешить множественный выбор */
  multiple?: boolean;
  /** Принимаемые типы файлов */
  accept?: string;
}

// SVG иконка
const PaperclipIcon = React.memo(() => (
  <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
    <path
      d='M7.5 9.5l5-5a2.121 2.121 0 113 3l-7 7a4 4 0 01-5.657-5.657l7.071-7.07'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
));

PaperclipIcon.displayName = 'PaperclipIcon';

// Стили
const IconBtn = styled.button<{ $disabled?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: var(--c-text-secondary);
  font-size: ${DESIGN_TOKENS.fontSize.large};
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: color ${DESIGN_TOKENS.transition.fast};

  &:hover {
    color: ${({ $disabled }) => ($disabled ? 'var(--c-text-secondary)' : 'var(--c-accent)')};
  }
`;

const HiddenFileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

/**
 * FileInput - простая кнопка для выбора файлов
 *
 * @param onFilesChange - обработчик изменения файлов
 * @param className - дополнительные CSS классы
 * @param disabled - отключить компонент
 * @param multiple = true - разрешить множественный выбор
 * @param accept = '*' - принимаемые типы файлов
 */
export const FileInput: React.FC<FileInputProps> = React.memo(
  ({ onFilesChange, className, disabled = false, multiple = true, accept = '*' }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        const fileList = e.target.files ? Array.from(e.target.files) : [];
        onFilesChange(fileList);
        e.target.value = '';
      },
      [onFilesChange, disabled]
    );

    const handleButtonClick = useCallback(() => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    }, [disabled]);

    return (
      <div className={className}>
        <IconBtn
          type='button'
          onClick={handleButtonClick}
          $disabled={disabled}
          aria-label='Выбрать файлы'
        >
          <PaperclipIcon />
        </IconBtn>
        <HiddenFileInput
          ref={fileInputRef}
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
