import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface ActionsMenuAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface ActionsMenuProps {
  actions: ActionsMenuAction[];
  style?: React.CSSProperties;
  className?: string;
  onClose?: () => void;
}

const scaleInLeft = keyframes`
  from {
    opacity: 0;
    transform: scaleX(0.2);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const Menu = styled.div`
  min-width: 220px;
  background: var(--color-elevated);
  border-radius: var(--radius-medium);
  box-shadow: 0 2px 16px #0004;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: 1;
  animation: ${scaleInLeft} var(--transition-slow, 0.3s)
    cubic-bezier(0.4, 1, 0.4, 1);
  will-change: opacity, transform;
  transform-origin: left;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: none;
  border: none;
  color: var(--text-body);
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: var(--radius-medium);
  &:hover {
    background: var(--color-elevated-active);
  }
`;

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  actions,
  style,
  className,
  onClose,
}) => (
  <Menu style={style} className={className}>
    {actions.map((action, idx) => (
      <MenuButton
        key={idx}
        onClick={() => {
          action.onClick();
          if (onClose) onClose();
        }}
      >
        {action.icon}
        <span>{action.label}</span>
      </MenuButton>
    ))}
  </Menu>
);
