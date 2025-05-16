import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarListWrapper = styled.ul<{ $width?: string; $height?: string }>`
  list-style: none;
  padding: var(--spacing-small);
  margin: 0;
  border-radius: var(--radius-medium);
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'max-content'};
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--color-elevated);
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-small) var(--spacing-medium) 0
    calc(var(--spacing-medium) - 4px);
  color: var(--text-heading);
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin-top: var(--spacing-small);
  margin-bottom: 0.25em;
  user-select: none;
  cursor: pointer;
  gap: 0.5em;
  &:first-child {
    margin-top: 0;
  }
`;

const ItemsWrapper = styled.div<{ noIndent?: boolean }>`
  padding-left: ${({ noIndent }) => (noIndent ? '0' : 'var(--spacing-medium)')};
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
    background: color-mix(in srgb, var(--color-elevated-active) 80%, white 20%);
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

export interface SidebarListSection {
  title?: string;
  items: SidebarListItem[];
}

interface SidebarListProps {
  sections: SidebarListSection[];
  selected: string;
  onSelect: (key: string) => void;
  width?: string;
  height?: string;
  allowCollapse?: boolean;
  wrapperClassName?: string;
  sectionTitleClassName?: string;
  itemClassName?: string;
}

const getSectionKey = (section: SidebarListSection, i: number) =>
  section.title || `section-${i}`;

export const SidebarList: React.FC<SidebarListProps> = ({
  sections,
  selected,
  onSelect,
  width,
  height,
  allowCollapse = true,
  wrapperClassName,
  sectionTitleClassName,
  itemClassName,
}) => {
  const [collapsed, setCollapsed] = useState<{ [title: string]: boolean }>({});

  // Проверка на пустой список (нет секций или все секции пустые)
  const isEmpty =
    !sections.length ||
    sections.every((section) => !section.items || section.items.length === 0);
  if (isEmpty) return null;

  const toggleSection = (title: string) => {
    if (!allowCollapse) return;
    setCollapsed((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarListWrapper
      $width={width}
      $height={height}
      className={wrapperClassName}
    >
      {sections.map((section, i) => {
        const sectionKey = getSectionKey(section, i);
        const hasTitle = Boolean(section.title);
        return (
          <React.Fragment key={sectionKey}>
            {hasTitle && (
              <SectionTitle
                onClick={() => toggleSection(sectionKey)}
                className={sectionTitleClassName}
                style={!allowCollapse ? { cursor: 'default' } : undefined}
              >
                {section.title}
                {allowCollapse && (
                  <span
                    style={{
                      fontSize: '0.7em',
                      width: 16,
                      display: 'inline-block',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {collapsed[sectionKey] ? '►' : '▼'}
                  </span>
                )}
              </SectionTitle>
            )}
            {!collapsed[sectionKey] && (
              <ItemsWrapper noIndent={!hasTitle}>
                {section.items.map((comp) => (
                  <SidebarItem
                    key={comp.key}
                    selected={selected === comp.key}
                    onClick={() => onSelect(comp.key)}
                    className={itemClassName}
                  >
                    {comp.label}
                  </SidebarItem>
                ))}
              </ItemsWrapper>
            )}
          </React.Fragment>
        );
      })}
    </SidebarListWrapper>
  );
};
