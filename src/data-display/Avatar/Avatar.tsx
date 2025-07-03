import React, { useRef, useState, useEffect } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled, { css } from 'styled-components';

type AvatarSize = 'xxs' | 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'offline' | 'dnd' | 'invisible';

const sizeMap: Record<AvatarSize, string> = {
  xxs: DESIGN_TOKENS.baseHeight.tiny, // 20px
  sm: DESIGN_TOKENS.baseHeight.small, // 32px
  md: DESIGN_TOKENS.baseHeight.medium, // 40px
  lg: DESIGN_TOKENS.baseHeight.extraLarge, // 72px
};

const statusVarMap: Record<AvatarStatus, string> = {
  online: '#4cd964',
  offline: '#b0b8c9',
  dnd: '#d44c4a',
  invisible: '#b0b8c9',
};

const AvatarRoot = styled.div<{ $size: AvatarSize; $hasMenuFocus?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--c-bg-elevated);
  color: var(--c-accent);
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  ${({ $size }) => css`
    width: ${sizeMap[$size]};
    height: ${sizeMap[$size]};
    font-size: ${$size === 'xxs'
      ? DESIGN_TOKENS.fontSize.small
      : $size === 'sm'
      ? DESIGN_TOKENS.fontSize.medium
      : $size === 'md'
      ? DESIGN_TOKENS.fontSize.large
      : '2rem'};
  `}

  ${({ $hasMenuFocus }) =>
    $hasMenuFocus &&
    css`
      outline: 2px solid var(--c-border-focus);
    `}
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 50%;
  overflow: hidden;
`;

const StatusDot = styled.span<{ $size: AvatarSize; $status: AvatarStatus; $static?: boolean }>`
  position: ${({ $static }) => ($static ? 'static' : 'absolute')};
  right: 0px;
  bottom: ${({ $size }) => ($size === 'xxs' ? 0 : $size === 'sm' ? 0 : 2)}px;
  border-radius: 50%;
  border: 1px solid var(--c-bg-default);
  background: ${({ $status }) => statusVarMap[$status]};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $size }) => {
    const dot = $size === 'xxs' ? 6 : $size === 'sm' ? 8 : 10;
    return css`
      width: ${dot}px;
      height: ${dot}px;
    `;
  }}
`;

const StatusMenu = styled.div`
  position: absolute;
  left: 0;
  top: 110%;
  background: var(--c-bg-elevated);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
  border: 1px solid var(--c-border);
  padding: 6px 0;
  min-width: 120px;
`;
const StatusMenuItem = styled.button<{ active?: boolean }>`
  width: 100%;
  background: none;
  border: none;
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ active }) =>
    active &&
    css`
      background: var(--c-accent);
      color: var(--c-text-inverse);
      font-weight: 600;
    `}
  &:hover {
    background: var(--c-accent-hover);
    color: var(--c-text-inverse);
  }
`;

const EyeSlashIcon = () => (
  <svg width='14' height='14' viewBox='0 0 20 20' fill='none'>
    <path d='M2 2l16 16' stroke='#b0b8c9' strokeWidth='2' />
    <ellipse cx='10' cy='10' rx='7' ry='4' stroke='#b0b8c9' strokeWidth='2' />
    <circle cx='10' cy='10' r='2' fill='#b0b8c9' />
  </svg>
);

function getInitials(name?: string) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Translation utility for status labels
const statusTranslations = {
  ru: {
    online: 'В сети',
    dnd: 'Занят', // Changed to fit one line
    invisible: 'Невидимка',
  },
  en: {
    online: 'Online',
    dnd: 'Busy',
    invisible: 'Invisible',
  },
};

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  showStatus?: boolean;
  className?: string;
  onStatusChange?: (status: AvatarStatus) => void;
  language?: 'ru' | 'en'; // Add language prop
}

/**
 * Avatar - аватар пользователя с поддержкой статуса и выбора языка
 * @param src 'string' - URL изображения аватара
 * @param alt 'string' - альтернативный текст для изображения
 * @param name 'string' - имя пользователя (для инициалов без изображения)
 * @param size 'xxs' | 'sm' | 'md' | 'lg' = 'md' - размер аватара (20px/32px/40px/56px)
 * @param status 'online' | 'offline' | 'dnd' | 'invisible' - статус пользователя
 * @param showStatus 'boolean' = true - показывать индикатор статуса
 * @param className 'string' - дополнительные CSS классы
 * @param onStatusChange '(status: AvatarStatus) => void' - обработчик изменения статуса
 * @param language 'ru' | 'en' = 'en' - язык интерфейса для статусов
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  showStatus = true,
  className,
  onStatusChange,
  language = 'en',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне
  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  // Build status options with translation
  const statusOptions = [
    { value: 'online', label: statusTranslations[language].online },
    { value: 'dnd', label: statusTranslations[language].dnd },
    {
      value: 'invisible',
      label: statusTranslations[language].invisible,
      icon: <EyeSlashIcon />,
    },
  ];

  return (
    <AvatarRoot
      $size={size}
      $hasMenuFocus={onStatusChange && menuOpen}
      className={className}
      title={name}
      ref={rootRef}
      tabIndex={onStatusChange ? 0 : undefined}
      onClick={onStatusChange ? () => setMenuOpen((v) => !v) : undefined}
    >
      {src ? <AvatarImg src={src} alt={alt || name || 'avatar'} /> : getInitials(name)}
      {showStatus && status && (
        <StatusDot $size={size} $status={status}>
          {status === 'invisible' && <EyeSlashIcon />}
        </StatusDot>
      )}
      {onStatusChange && menuOpen && (
        <StatusMenu>
          {statusOptions.map((opt) => (
            <StatusMenuItem
              key={opt.value}
              active={status === opt.value}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onStatusChange(opt.value as AvatarStatus);
              }}
            >
              <StatusDot $size={size} $status={opt.value as AvatarStatus} $static>
                {opt.value === 'invisible' && <EyeSlashIcon />}
              </StatusDot>
              {opt.label}
            </StatusMenuItem>
          ))}
        </StatusMenu>
      )}
    </AvatarRoot>
  );
};
