import React, { useMemo, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DESIGN_TOKENS, type Presence } from '@DobruniaUI';
import { useClickOutside, useKeyPress } from '../../utils/hooks';

type AvatarSize = 'xxs' | 'sm' | 'md' | 'lg';

const sizeMap: Record<AvatarSize, string> = {
  xxs: DESIGN_TOKENS.baseHeight.tiny, // 20
  sm: DESIGN_TOKENS.baseHeight.small, // 32
  md: DESIGN_TOKENS.baseHeight.medium, // 40
  lg: DESIGN_TOKENS.baseHeight.extraLarge, // 72
};

const statusColor: Record<Presence, string> = {
  online: '#4cd964',
  offline: '#b0b8c9',
  dnd: '#d44c4a',
  invisible: '#b0b8c9',
};

const statusLabels = {
  ru: { online: 'В сети', dnd: 'Занят', invisible: 'Невидимка' },
  en: { online: 'Online', dnd: 'Busy', invisible: 'Invisible' },
} as const;

/* ——— styled ——— */
const Root = styled.div<{ $size: AvatarSize; $focused: boolean; $clickable: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--c-bg-elevated);
  color: var(--c-accent);
  font-weight: 600;
  user-select: none;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
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
  ${({ $focused }) => $focused && 'outline:2px solid var(--c-border-focus);'}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Dot = styled.span<{ $size: AvatarSize; $presence: Presence; $static?: boolean }>`
  position: ${({ $static }) => ($static ? 'static' : 'absolute')};
  right: 0;
  bottom: ${({ $size }) => ($size === 'xxs' ? 0 : $size === 'sm' ? 0 : 2)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--c-bg-default);
  background: ${({ $presence }) => statusColor[$presence]};
  ${({ $size }) => {
    const d = $size === 'xxs' ? 6 : $size === 'sm' ? 8 : 10;
    return css`
      width: ${d}px;
      height: ${d}px;
    `;
  }}
`;

const Menu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  padding: 6px 0;
  min-width: 120px;
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.13);
  z-index: 2;
`;

const MenuItem = styled.button<{ $active: boolean }>`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  cursor: pointer;
  ${({ $active }) =>
    $active &&
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

const EyeSlash = React.memo(() => (
  <svg width='14' height='14' viewBox='0 0 20 20' fill='none'>
    <path d='M2 2l16 16' stroke='#b0b8c9' strokeWidth='2' />
    <ellipse cx='10' cy='10' rx='7' ry='4' stroke='#b0b8c9' strokeWidth='2' />
    <circle cx='10' cy='10' r='2' fill='#b0b8c9' />
  </svg>
));

EyeSlash.displayName = 'EyeSlash';

/* ——— helpers ——— */
const initials = (name?: string) => {
  if (!name) return '';
  const p = name.trim().split(/\s+/);
  return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
};

// Мемоизированный компонент для элемента меню
const MenuItemComponent = React.memo<{
  option: { val: string; label: string; icon?: React.ReactNode };
  status: Presence;
  size: AvatarSize;
  onStatusChange: (status: Presence) => void;
  onClose: () => void;
}>(({ option, status, size, onStatusChange, onClose }) => {
  const handleClick = useCallback(() => {
    onStatusChange(option.val as Presence);
    onClose();
  }, [option.val, onStatusChange, onClose]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // сохраняем focus
  }, []);

  return (
    <MenuItem
      key={`menu-item-${option.val}`}
      $active={status === option.val}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <Dot $size={size} $presence={option.val as Presence} $static>
        {option.icon}
      </Dot>
      {option.label}
    </MenuItem>
  );
});

MenuItemComponent.displayName = 'MenuItemComponent';

/* ——— component ——— */
export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: Presence;
  showStatus?: boolean;
  className?: string;
  onStatusChange?: (p: Presence) => void;
  onClick?: () => void;
  language?: 'ru' | 'en';
}

/**
 * Avatar - аватар пользователя с поддержкой статуса и выбора языка
 * @param src 'string' - URL изображения аватара
 * @param alt 'string' - альтернативный текст для изображения
 * @param name 'string' - имя пользователя (для инициалов без изображения)
 * @param size 'xxs' | 'sm' | 'md' | 'lg' = 'md' - размер аватара (20px/32px/40px/56px)
 * @param status 'online' | 'offline' | 'dnd' | 'invisible' = 'offline' - статус пользователя
 * @param showStatus 'boolean' = true - показывать индикатор статуса
 * @param className 'string' - дополнительные CSS классы
 * @param onStatusChange '(status: Presence) => void' - обработчик изменения статуса
 * @param onClick '() => void' - обработчик клика по аватару
 * @param language 'ru' | 'en' = 'en' - язык интерфейса для статусов
 */
export const Avatar: React.FC<AvatarProps> = React.memo(
  ({
    src,
    alt,
    name,
    size = 'md',
    status = 'offline',
    showStatus = true,
    className,
    onStatusChange,
    onClick,
    language = 'en',
  }) => {
    const [open, setOpen] = React.useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    // Определяем, кликабельный ли аватар
    const isClickable = Boolean(onClick || onStatusChange);

    // Мемоизируем опции меню
    const options = useMemo(
      () => [
        { val: 'online', label: statusLabels[language].online },
        { val: 'dnd', label: statusLabels[language].dnd },
        { val: 'invisible', label: statusLabels[language].invisible, icon: <EyeSlash /> },
      ],
      [language]
    );

    // Стабилизируем обработчики
    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
      } else if (onStatusChange) {
        setOpen((v) => !v);
      }
    }, [onClick, onStatusChange]);

    const closeMenu = useCallback(() => {
      setOpen(false);
    }, []);

    const handleStatusChange = useCallback(
      (newStatus: Presence) => {
        onStatusChange?.(newStatus);
      },
      [onStatusChange]
    );

    // Используем кастомные хуки для DOM-взаимодействий
    useClickOutside(rootRef, closeMenu);
    useKeyPress('Escape', closeMenu);

    // Мемоизируем содержимое меню
    const menuContent = useMemo(() => {
      if (!open || !onStatusChange) return null;

      return (
        <Menu>
          {options.map((option) => (
            <MenuItemComponent
              key={`menu-option-${option.val}`}
              option={option}
              status={status}
              size={size}
              onStatusChange={handleStatusChange}
              onClose={closeMenu}
            />
          ))}
        </Menu>
      );
    }, [open, onStatusChange, options, status, size, handleStatusChange, closeMenu]);

    return (
      <Root
        ref={rootRef}
        $size={size}
        $focused={open}
        $clickable={isClickable}
        className={className}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? handleClick : undefined}
      >
        {src ? <Img src={src} alt={alt ?? name ?? 'avatar'} /> : initials(name)}
        {showStatus && (
          <Dot $size={size} $presence={status}>
            {status === 'invisible' && <EyeSlash />}
          </Dot>
        )}
        {menuContent}
      </Root>
    );
  }
);

Avatar.displayName = 'Avatar';
