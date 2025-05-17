import React from 'react';
import styled, { css } from 'styled-components';

type AvatarSize = 'xxs' | 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'offline' | 'dnd';

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
  background: ${({ $status }) => statusVarMap[$status]};
  border: 1px solid var(--color-bg);
  ${({ $size }) => {
    const dot =
      $size === 'xxs' ? 6 : $size === 'sm' ? 8 : 10;
    return css`
      width: ${dot}px;
      height: ${dot}px;
    `;
  }}
`;

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
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  showStatus = true,
  className,
}) => (
  <AvatarRoot $size={size} className={className} title={name}>
    {src ? (
      <AvatarImg src={src} alt={alt || name || 'avatar'} />
    ) : (
      getInitials(name)
    )}
    {showStatus && status && <StatusDot $size={size} $status={status} />}
  </AvatarRoot>
);
