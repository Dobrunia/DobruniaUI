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
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
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
  font-size: 1em;
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

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  showStatus?: boolean;
  className?: string;
  onStatusChange?: (status: AvatarStatus) => void;
}

const statusOptions: {
  value: AvatarStatus;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: 'online', label: 'В сети' },
  { value: 'dnd', label: 'Не беспокоить' },
  { value: 'offline', label: 'Оффлайн' },
  { value: 'invisible', label: 'Невидимка', icon: <EyeSlashIcon /> },
];

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  showStatus = true,
  className,
  onStatusChange,
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
                onStatusChange(opt.value);
              }}
            >
              <StatusDot
                $size={size}
                $status={opt.value}
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
