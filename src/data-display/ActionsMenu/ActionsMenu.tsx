import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface ActionsMenuAction {
  /** Отображаемый текст */
  label: string;
  /** Иконка действия */
  icon: React.ReactNode;
  /** Обработчик клика */
  onClick: () => void;
  /** Тип действия для стилизации */
  type?: 'default' | 'destructive' | 'primary';
  /** Отключить действие */
  disabled?: boolean;
  /** Горячая клавиша (отображается справа) */
  shortcut?: string;
}

export interface ActionsMenuGroup {
  /** Действия в группе */
  actions: ActionsMenuAction[];
  /** Заголовок группы (опционально) */
  title?: string;
}

interface ActionsMenuProps {
  /** Массив действий или групп действий */
  items: ActionsMenuAction[] | ActionsMenuGroup[];
  /** Размер меню */
  size?: 'small' | 'medium' | 'large';
  /** Направление анимации появления */
  animationOrigin?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS классы */
  className?: string;
  /** Обработчик закрытия */
  onClose?: () => void;
  /** Максимальная ширина меню */
  maxWidth?: number;
}

// Анимации для разных направлений
const animations = {
  left: keyframes`
    from {
      opacity: 0;
      transform: scale(0.95) translateX(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  `,
  right: keyframes`
    from {
      opacity: 0;
      transform: scale(0.95) translateX(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  `,
  top: keyframes`
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `,
  bottom: keyframes`
    from {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `,
  center: keyframes`
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `,
};

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return {
        minWidth: '180px',
        padding: '6px',
        fontSize: 'var(--font-size-small)',
        itemPadding: '8px 12px',
        iconSize: '16px',
        gap: '8px',
      };
    case 'large':
      return {
        minWidth: '260px',
        padding: '8px',
        fontSize: 'var(--font-size-large)',
        itemPadding: '12px 16px',
        iconSize: '20px',
        gap: '12px',
      };
    default:
      return {
        minWidth: '220px',
        padding: '6px',
        fontSize: 'var(--font-size-medium)',
        itemPadding: '10px 14px',
        iconSize: '18px',
        gap: '10px',
      };
  }
};

const Menu = styled.div<{
  $size: 'small' | 'medium' | 'large';
  $animationOrigin: 'left' | 'right' | 'top' | 'bottom' | 'center';
  $maxWidth?: number;
}>`
  min-width: ${({ $size }) => getSizeStyles($size).minWidth};
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : '320px')};
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-medium);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: ${({ $size }) => getSizeStyles($size).padding};
  font-size: ${({ $size }) => getSizeStyles($size).fontSize};
  font-family: var(--font-family);

  animation: ${({ $animationOrigin }) => animations[$animationOrigin]} var(--transition-slow)
    cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: opacity, transform;

  /* Для темной темы добавляем дополнительный border */
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 4px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--c-border);
  }
`;

const GroupTitle = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  font-size: var(--font-size-small);
  font-weight: 600;
  color: var(--c-text-secondary);
  padding: 6px 14px 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuButton = styled.button<{
  $type: 'default' | 'destructive' | 'primary';
  $size: 'small' | 'medium' | 'large';
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  padding: ${({ $size }) => getSizeStyles($size).itemPadding};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  border-radius: calc(var(--radius-medium) - 2px);
  transition: all var(--transition-fast) ease;
  position: relative;
  outline: none;

  /* Цвета в зависимости от типа */
  color: ${({ $type, $disabled }) => {
    if ($disabled) return 'var(--c-text-secondary)';
    if ($type === 'destructive') return 'var(--c-error)';
    if ($type === 'primary') return 'var(--c-accent)';
    return 'var(--c-text-primary)';
  }};

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: ${({ $type }) => {
      if ($type === 'destructive') return 'var(--c-error)20';
      if ($type === 'primary') return 'var(--c-accent)20';
      return 'var(--c-bg-elevated)';
    }};

    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: ${({ $type }) => {
      if ($type === 'destructive') return 'var(--c-error)30';
      if ($type === 'primary') return 'var(--c-accent)30';
      return 'var(--c-accent)20';
    }};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px
      ${({ $type }) => {
        if ($type === 'destructive') return 'var(--c-error)';
        if ($type === 'primary') return 'var(--c-accent)';
        return 'var(--c-border-focus)';
      }}40;
  }
`;

const ButtonContent = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => getSizeStyles($size).gap};
  flex: 1;
`;

const IconWrapper = styled.span<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => getSizeStyles($size).iconSize};
  height: ${({ $size }) => getSizeValues($size).iconSize};
  flex-shrink: 0;

  svg,
  img {
    width: 100%;
    height: 100%;
  }
`;

const Shortcut = styled.span`
  font-size: var(--font-size-small);
  color: var(--c-text-secondary);
  font-weight: 500;
  background: var(--c-bg-subtle);
  padding: 2px 6px;
  border-radius: calc(var(--radius-medium) / 2);
  margin-left: auto;
`;

const getSizeValues = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return { iconSize: '16px' };
    case 'large':
      return { iconSize: '20px' };
    default:
      return { iconSize: '18px' };
  }
};

/**
 * ActionsMenu component - компонент контекстного меню действий
 * @param {ActionsMenuAction[] | ActionsMenuGroup[]} items - действия или группы действий
 * @param {'small' | 'medium' | 'large'} [size='medium'] - размер меню
 * @param {'left' | 'right' | 'top' | 'bottom' | 'center'} [animationOrigin='left'] - направление анимации
 * @param {React.CSSProperties} [style] - дополнительные стили
 * @param {string} [className] - CSS классы
 * @param {() => void} [onClose] - обработчик закрытия
 * @param {number} [maxWidth] - максимальная ширина меню
 *
 * @example
 * // Простое меню действий
 * <ActionsMenu
 *   items={[
 *     {
 *       label: "Редактировать",
 *       icon: <EditIcon />,
 *       onClick: () => handleEdit()
 *     },
 *     {
 *       label: "Удалить",
 *       icon: <DeleteIcon />,
 *       onClick: () => handleDelete(),
 *       type: "destructive"
 *     }
 *   ]}
 * />
 *
 * // Меню с группами (как в Telegram)
 * <ActionsMenu
 *   items={[
 *     {
 *       title: "Сообщение",
 *       actions: [
 *         { label: "Ответить", icon: <ReplyIcon />, onClick: () => {} },
 *         { label: "Переслать", icon: <ForwardIcon />, onClick: () => {} },
 *         { label: "Копировать", icon: <CopyIcon />, onClick: () => {}, shortcut: "⌘C" }
 *       ]
 *     },
 *     {
 *       actions: [
 *         { label: "Удалить", icon: <DeleteIcon />, onClick: () => {}, type: "destructive" }
 *       ]
 *     }
 *   ]}
 *   animationOrigin="bottom"
 *   size="medium"
 * />
 *
 * // Компактное меню
 * <ActionsMenu
 *   items={actions}
 *   size="small"
 *   animationOrigin="right"
 *   maxWidth={200}
 * />
 */
export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  items,
  size = 'medium',
  animationOrigin = 'left',
  style,
  className,
  onClose,
  maxWidth,
}) => {
  // Определяем, это простой массив действий или группы
  const isSimpleArray = items.length > 0 && 'label' in items[0];

  const handleActionClick = (action: ActionsMenuAction) => {
    if (action.disabled) return;

    action.onClick();
    onClose?.();
  };

  const renderAction = (action: ActionsMenuAction, index: number) => (
    <MenuButton
      key={index}
      $type={action.type || 'default'}
      $size={size}
      $disabled={action.disabled || false}
      onClick={() => handleActionClick(action)}
      disabled={action.disabled}
    >
      <ButtonContent $size={size}>
        <IconWrapper $size={size}>{action.icon}</IconWrapper>
        <span>{action.label}</span>
      </ButtonContent>
      {action.shortcut && <Shortcut>{action.shortcut}</Shortcut>}
    </MenuButton>
  );

  const renderGroup = (group: ActionsMenuGroup, index: number) => (
    <MenuGroup key={index}>
      {group.title && <GroupTitle $size={size}>{group.title}</GroupTitle>}
      {group.actions.map((action, actionIndex) => renderAction(action, actionIndex))}
    </MenuGroup>
  );

  return (
    <Menu
      $size={size}
      $animationOrigin={animationOrigin}
      $maxWidth={maxWidth}
      style={style}
      className={className}
    >
      {isSimpleArray
        ? (items as ActionsMenuAction[]).map((action, index) => renderAction(action, index))
        : (items as ActionsMenuGroup[]).map((group, index) => renderGroup(group, index))}
    </Menu>
  );
};
