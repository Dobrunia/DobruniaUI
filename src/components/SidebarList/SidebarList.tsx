import React from 'react';
import styled from 'styled-components';

const SidebarListWrapper = styled.ul<{ $width?: string; $height?: string }>`
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: var(--radius-medium);
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'max-content'};
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--color-elevated);
`;

const SidebarItem = styled.li<{ selected: boolean }>`
  position: relative;
  padding: var(--spacing-small) var(--spacing-medium);
  cursor: pointer;
  background: ${({ selected }) =>
    selected ? 'var(--color-elevated-active)' : 'transparent'};
  color: ${({ selected }) =>
    selected ? 'var(--text-heading)' : 'var(--text-secondary)'};
  border-radius: var(--radius-medium);
  margin-bottom: var(--spacing-small);
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  transition: background var(--transition-fast), color var(--transition-fast);
  &:hover {
    background: var(--color-elevated);
    color: var(--text-heading);
  }
  &:last-child {
    margin-bottom: 0;
  }
  &::before {
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 60%;
    border-radius: 2px;
    background: var(--color-primary);
  }
`;

export interface SidebarListItem {
  key: string;
  label: string;
}

interface SidebarListProps {
  items: SidebarListItem[];
  selected: string;
  onSelect: (key: string) => void;
  width?: string;
  height?: string;
}

export const SidebarList: React.FC<SidebarListProps> = ({
  items,
  selected,
  onSelect,
  width,
  height,
}) => (
  <SidebarListWrapper $width={width} $height={height}>
    {items.map((comp) => (
      <SidebarItem
        key={comp.key}
        selected={selected === comp.key}
        onClick={() => onSelect(comp.key)}
      >
        {comp.label}
      </SidebarItem>
    ))}
  </SidebarListWrapper>
);
