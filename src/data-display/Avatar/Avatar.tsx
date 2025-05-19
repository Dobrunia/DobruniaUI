import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type AvatarSize = 'xxs' | 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'offline' | 'dnd' | 'invisible';

const sizeMap: Record<AvatarSize, number> = {
  xxs: 20, // супер маленький (реакции)
  sm: 32, // отправитель
  md: 44, // контакты
  lg: 72, // профиль
};

const statusVarMap: Record<AvatarStatus, string> = {
  online: 'var(--avatar-status-online)',
  offline: 'var(--avatar-status-offline)',
  dnd: 'var(--avatar-status-dnd)',
  invisible: 'var(--avatar-status-offline)',
};

const AvatarRoot = styled.div<{ $size: AvatarSize }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-elevated);
  color: var(--color-primary);
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  ${({ $size }) => css`
    width: ${sizeMap[$size]}px;
    height: ${sizeMap[$size]}px;
    font-size: ${$size === 'xxs'
      ? '0.8rem'
      : $size === 'sm'
      ? '1rem'
      : $size === 'md'
      ? '1.3rem'
      : '2rem'};
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

const StatusDot = styled.span<{ $size: AvatarSize; $status: AvatarStatus }>`
  position: absolute;
  right: 0px;
  bottom: ${({ $size }) => ($size === 'xxs' ? 0 : $size === 'sm' ? 4 : 6)}px;
  border-radius: 50%;
  border: 1px solid var(--color-bg);
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
  // transform: translateX(-50%);
  background: var(--color-elevated);
  border-radius: var(--radius-medium);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
  border: 1px solid var(--color-elevated);
  padding: 6px 0;
  z-index: 100;
  min-width: 120px;
`;
const StatusMenuItem = styled.button<{ active?: boolean }>`
  width: 100%;
  background: none;
  border: none;
  color: var(--text-body);
  font-size: var(--font-size-small);
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ active }) =>
    active &&
    css`
      background: var(--color-elevated-active);
      font-weight: 600;
    `}
  &:hover {
    background: var(--color-elevated-active);
  }
`;

const EyeSlashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M2 2l16 16" stroke="#b0b8c9" strokeWidth="2" />
    <ellipse cx="10" cy="10" rx="7" ry="4" stroke="#b0b8c9" strokeWidth="2" />
    <circle cx="10" cy="10" r="2" fill="#b0b8c9" />
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

interface AvatarProps {
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
 * Avatar component - компонент аватара пользователя с поддержкой статуса
 * @param {string} [src] - URL изображения аватара
 * @param {string} [alt] - альтернативный текст для изображения
 * @param {string} [name] - имя пользователя (используется для инициалов, если нет изображения)
 * @param {('xxs'|'sm'|'md'|'lg')} [size='md'] - размер аватара:
 *   - xxs: 20px (для реакций)
 *   - sm: 32px (для отправителя)
 *   - md: 44px (для контактов)
 *   - lg: 72px (для профиля)
 * @param {('online'|'offline'|'dnd'|'invisible')} [status] - статус пользователя
 * @param {boolean} [showStatus=true] - показывать ли индикатор статуса
 * @param {string} [className] - дополнительные CSS классы
 * @param {(status: AvatarStatus) => void} [onStatusChange] - обработчик изменения статуса
 * @param {('ru'|'en')} [language='en'] - язык интерфейса для статусов
 *
 * @example
 * // Базовое использование с изображением
 * <Avatar
 *   src="/path/to/avatar.jpg"
 *   name="John Doe"
 *   size="md"
 *   status="online"
 * />
 *
 * // Аватар с инициалами (без изображения)
 * <Avatar
 *   name="John Doe"
 *   size="lg"
 *   status="offline"
 * />
 *
 * // Маленький аватар для реакций
 * <Avatar
 *   src="/path/to/avatar.jpg"
 *   size="xxs"
 *   showStatus={false}
 * />
 *
 * // Аватар с возможностью изменения статуса
 * <Avatar
 *   src="/path/to/avatar.jpg"
 *   name="John Doe"
 *   status="online"
 *   onStatusChange={(newStatus) => handleStatusChange(newStatus)}
 *   language="ru"
 * />
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
  language = 'en', // Default to Russian
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне
  React.useEffect(() => {
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
      className={className}
      title={name}
      ref={rootRef}
      tabIndex={onStatusChange ? 0 : undefined}
      onClick={onStatusChange ? () => setMenuOpen((v) => !v) : undefined}
      style={
        onStatusChange
          ? { outline: menuOpen ? '2px solid var(--color-primary)' : undefined }
          : undefined
      }
    >
      {src ? (
        <AvatarImg src={src} alt={alt || name || 'avatar'} />
      ) : (
        getInitials(name)
      )}
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
              <StatusDot
                $size={size}
                $status={opt.value as AvatarStatus}
                style={{ position: 'static' }}
              >
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
