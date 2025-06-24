import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export interface AudioInputProps {
  /** Обработчик записи аудио */
  onAudioRecord: (audio: Blob) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

// SVG иконка
const MicIcon = ({ recording }: { recording?: boolean }) => (
  <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
    <rect
      x='7'
      y='2.5'
      width='6'
      height='10'
      rx='3'
      stroke={recording ? 'var(--c-error)' : 'currentColor'}
      strokeWidth='1.5'
    />
    <path
      d='M4 10.5a6 6 0 0 0 12 0'
      stroke={recording ? 'var(--c-error)' : 'currentColor'}
      strokeWidth='1.5'
      fill='none'
    />
    <line
      x1='10'
      y1='13'
      x2='10'
      y2='17'
      stroke={recording ? 'var(--c-error)' : 'currentColor'}
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <ellipse
      cx='10'
      cy='18'
      rx='3'
      ry='0.7'
      stroke={recording ? 'var(--c-error)' : 'currentColor'}
      strokeWidth='1.2'
      fill='none'
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

const MicBtn = styled(IconBtn)<{ $recording?: boolean }>`
  position: relative;
  overflow: visible;
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
    background: var(--c-accent);
    opacity: 0.25;
    animation: mic-pulse 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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

/**
 * AudioInput - компонент записи аудио с анимацией
 *
 * @param onAudioRecord - обработчик записи аудио
 * @param className - дополнительные CSS классы
 */
export const AudioInput: React.FC<AudioInputProps> = ({ onAudioRecord, className }) => {
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
        onAudioRecord(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <MicBtn
      className={className}
      type='button'
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
};
