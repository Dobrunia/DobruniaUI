import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

// Кастомный хук для hover функциональности
const useHover = (delay: number = 120) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsHovered(false), delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isHovered,
    show,
    hide,
  };
};

// Выносим данные эмодзи за пределы компонента
const EMOJI_LIST = [
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
] as const;

export interface EmojiInputProps {
  /** Обработчик выбора эмодзи */
  onEmojiSelect: (emoji: string) => void;
  /** Выравнивание picker'а */
  align?: 'left' | 'right';
  /** Дополнительные CSS классы */
  className?: string;
}

// SVG иконка
const SmileIcon = React.memo(() => (
  <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
    <circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M6.5 12.5a4 4 0 0 0 7 0'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      fill='none'
    />
    <circle cx='7' cy='8.5' r='1' fill='currentColor' />
    <circle cx='13' cy='8.5' r='1' fill='currentColor' />
  </svg>
));

SmileIcon.displayName = 'SmileIcon';

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

const EmojiPickerWrapper = styled.div<{ $align?: 'left' | 'right' }>`
  position: absolute;
  bottom: calc(100% + 8px);
  ${(p) => (p.$align === 'left' ? 'left: 0; right: auto;' : 'right: 0; left: auto;')}
  background: var(--c-bg-elevated);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.13);
  border: 1px solid var(--c-border);
  padding: 4px;
  min-width: 180px;
  max-width: 220px;
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
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
  border-radius: ${DESIGN_TOKENS.radius.small};
  transition: background ${DESIGN_TOKENS.transition.fast};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--c-bg-default);
  }
`;

const EmojiButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// Emoji Picker Component
const EmojiPicker: React.FC<{
  onSelect: (emoji: string) => void;
  visible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  align?: 'left' | 'right';
}> = React.memo(({ onSelect, visible, onMouseEnter, onMouseLeave, align = 'left' }) => {
  const handleEmojiClick = useCallback(
    (emoji: string) => {
      onSelect(emoji);
    },
    [onSelect]
  );

  if (!visible) return null;

  return (
    <EmojiPickerWrapper $align={align} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <EmojiGrid>
        {EMOJI_LIST.map((emoji, index) => (
          <EmojiButton
            key={`${emoji}-${index}`}
            onClick={() => handleEmojiClick(emoji)}
            aria-label={`Select emoji ${emoji}`}
          >
            {emoji}
          </EmojiButton>
        ))}
      </EmojiGrid>
    </EmojiPickerWrapper>
  );
});

EmojiPicker.displayName = 'EmojiPicker';

/**
 * EmojiInput - компонент выбора эмодзи с hover picker'ом
 *
 * @param onEmojiSelect - обработчик выбора эмодзи
 * @param className - дополнительные CSS классы
 */
export const EmojiInput: React.FC<EmojiInputProps> = React.memo(
  ({ onEmojiSelect, align = 'left', className }) => {
    const { isHovered, show, hide } = useHover(120);

    const handleEmojiSelect = useCallback(
      (emoji: string) => {
        onEmojiSelect(emoji);
      },
      [onEmojiSelect]
    );

    return (
      <EmojiButtonWrapper className={className}>
        <IconBtn type='button' onMouseEnter={show} onMouseLeave={hide}>
          <SmileIcon />
        </IconBtn>
        <EmojiPicker
          onSelect={handleEmojiSelect}
          visible={isHovered}
          onMouseEnter={show}
          onMouseLeave={hide}
          align={align}
        />
      </EmojiButtonWrapper>
    );
  }
);

EmojiInput.displayName = 'EmojiInput';
