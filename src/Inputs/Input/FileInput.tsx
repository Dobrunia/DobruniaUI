import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, DESIGN_TOKENS } from '@DobruniaUI';

export interface FileInputProps {
  /** Массив выбранных файлов */
  files: File[];
  /** Обработчик изменения файлов */
  onFilesChange: (files: File[]) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

// SVG иконка
const PaperclipIcon = () => (
  <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
    <path
      d='M7.5 9.5l5-5a2.121 2.121 0 113 3l-7 7a4 4 0 01-5.657-5.657l7.071-7.07'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Стили
const IconBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-text-secondary);
  font-size: ${DESIGN_TOKENS.fontSize.large};
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  &:hover {
    color: var(--c-accent);
  }
`;

const FilePreview = styled.div`
  display: flex;
  gap: 12px;
  background: var(--c-bg-elevated);
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

const HiddenFileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const FileCloseButton = styled(Button)`
  position: absolute;
  top: -8px;
  right: -8px;
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
 * FileInput - компонент выбора файлов с превью
 *
 * @param files - массив выбранных файлов
 * @param onFilesChange - обработчик изменения файлов
 * @param className - дополнительные CSS классы
 */
export const FileInput: React.FC<FileInputProps> = ({ files, onFilesChange, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    const all = [...files, ...fileList];
    const unique = all.filter(
      (file, idx, arr) => arr.findIndex((f) => f.name === file.name && f.size === file.size) === idx
    );
    onFilesChange(unique);
    e.target.value = '';
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

  return (
    <div className={className}>
      <IconBtn type='button' onClick={() => fileInputRef.current?.click()}>
        <PaperclipIcon />
      </IconBtn>
      <HiddenFileInput ref={fileInputRef} multiple onChange={handleFileChange} />

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
              ) : (
                <span>{file.name}</span>
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

      {previewImage && (
        <ImageModalOverlay onClick={closePreview}>
          <ImageModalImg src={previewImage} alt='preview' onClick={(e) => e.stopPropagation()} />
        </ImageModalOverlay>
      )}
    </div>
  );
};
