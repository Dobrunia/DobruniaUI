import React, { useMemo, useCallback } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

/**
 * ActionsMenuAction - действие в меню
 * @param label 'string' - текст действия
 * @param icon 'React.ReactNode' - иконка действия
 * @param onClick '() => void' - обработчик клика
 * @param type 'default' | 'destructive' | 'primary' = 'default' - тип действия
 * @param disabled 'boolean' = false - флаг отключения действия
 * @param shortcut 'string' - горячая клавиша (отображается справа)
 */
export interface ActionsMenuAction {
  /** Отображаемый текст */
  label: string;
  /** Иконка действия */
  icon?: React.ReactNode;
  /** Обработчик клика */
  onClick: () => void;
  /** Тип действия для стилизации */
  type?: 'default' | 'destructive' | 'primary';
  /** Отключить действие */
  disabled?: boolean;
  /** Горячая клавиша (отображается справа) */
  shortcut?: string;
}

/**
 * ActionsMenuGroup - группа действий
 * @param actions 'ActionsMenuAction[]' - массив действий
 * @param title 'string' - заголовок группы
 */
export interface ActionsMenuGroup {
  /** Действия в группе */
  actions: ActionsMenuAction[];
  /** Заголовок группы (опционально) */
  title?: string;
}

export interface ActionsMenuProps {
  /** Массив действий или групп действий */
  items: ActionsMenuAction[] | ActionsMenuGroup[];
  /** CSS классы */
  className?: string;
  /** Обработчик закрытия */
  onClose?: () => void;
}

const Menu = styled.div`
  position: absolute;
  width: max-content;
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  padding: ${DESIGN_TOKENS.spacing.small};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  z-index: 1;

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

const GroupTitle = styled.div`
  font-size: ${DESIGN_TOKENS.fontSize.small};
  font-weight: 600;
  color: var(--c-text-secondary);
  padding: 6px 14px 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuButton = styled.button<{
  $type: 'default' | 'destructive' | 'primary';
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: 1px solid transparent;
  font-size: inherit;
  font-family: inherit;
  padding: ${DESIGN_TOKENS.spacing.small};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  border-radius: calc(${DESIGN_TOKENS.radius.medium} - 2px);
  transition: all ${DESIGN_TOKENS.transition.fast} ease;
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
    border-color: ${({ $type }) => {
      if ($type === 'destructive') return 'var(--c-error)';
      if ($type === 'primary') return 'var(--c-accent)';
      return 'var(--c-border)';
    }};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
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

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${DESIGN_TOKENS.spacing.small};
  flex: 1;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;

  svg,
  img {
    width: 100%;
    height: 100%;
  }
`;

const Shortcut = styled.span`
  font-size: ${DESIGN_TOKENS.fontSize.small};
  color: var(--c-text-secondary);
  font-weight: 500;
  background: var(--c-bg-subtle);
  padding: 2px 6px;
  border-radius: calc(${DESIGN_TOKENS.radius.medium} / 2);
  margin-left: auto;
`;

// Мемоизированный компонент для действия
const ActionItem = React.memo<{
  action: ActionsMenuAction;
  index: number;
  onActionClick: (action: ActionsMenuAction) => void;
}>(({ action, index, onActionClick }) => (
  <MenuButton
    key={`action-${index}-${action.label}`}
    $type={action.type || 'default'}
    $disabled={action.disabled || false}
    onClick={() => onActionClick(action)}
    disabled={action.disabled}
  >
    <ButtonContent>
      <IconWrapper>{action.icon}</IconWrapper>
      <span>{action.label}</span>
    </ButtonContent>
    {action.shortcut && <Shortcut>{action.shortcut}</Shortcut>}
  </MenuButton>
));

// Мемоизированный компонент для группы
const GroupItem = React.memo<{
  group: ActionsMenuGroup;
  index: number;
  onActionClick: (action: ActionsMenuAction) => void;
}>(({ group, index, onActionClick }) => (
  <MenuGroup key={`group-${index}-${group.title || 'untitled'}`}>
    {group.title && <GroupTitle>{group.title}</GroupTitle>}
    {group.actions.map((action, actionIndex) => (
      <ActionItem
        key={`${index}-${actionIndex}-${action.label}`}
        action={action}
        index={actionIndex}
        onActionClick={onActionClick}
      />
    ))}
  </MenuGroup>
));

/**
 * ActionsMenu - контекстное меню действий с поддержкой групп и горячих клавиш
 * @param items 'ActionsMenuAction[] | ActionsMenuGroup[]' - массив действий или групп действий
 * @param className 'string' - дополнительные CSS классы
 * @param onClose '() => void' - обработчик закрытия меню
 */
export const ActionsMenu: React.FC<ActionsMenuProps> = React.memo(
  ({ items, className, onClose }) => {
    // Мемоизируем определение типа массива
    const isSimpleArray = useMemo(() => items.length > 0 && 'label' in items[0], [items]);

    // Стабилизируем обработчик клика
    const handleActionClick = useCallback(
      async (action: ActionsMenuAction) => {
        if (action.disabled) return;

        await Promise.resolve(action.onClick());
        onClose?.();
      },
      [onClose]
    );

    // Мемоизируем рендер содержимого
    const menuContent = useMemo(() => {
      if (isSimpleArray) {
        return (items as ActionsMenuAction[]).map((action, index) => (
          <ActionItem
            key={`action-${index}-${action.label}`}
            action={action}
            index={index}
            onActionClick={handleActionClick}
          />
        ));
      } else {
        return (items as ActionsMenuGroup[]).map((group, index) => (
          <GroupItem
            key={`group-${index}-${group.title || 'untitled'}`}
            group={group}
            index={index}
            onActionClick={handleActionClick}
          />
        ));
      }
    }, [items, isSimpleArray, handleActionClick]);

    return <Menu className={className}>{menuContent}</Menu>;
  }
);

ActionsMenu.displayName = 'ActionsMenu';
