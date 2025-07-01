import React, { useState } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

const SidebarListWrapper = styled.ul<{ $width?: string; $height?: string }>`
  list-style: none;
  padding: ${DESIGN_TOKENS.spacing.small};
  margin: 0;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'max-content'};
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--c-bg-elevated);
`;

const SectionTitle = styled.div<{ $allowCollapse?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${DESIGN_TOKENS.spacing.small};
  padding-right: 0;
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  font-weight: 600;
  letter-spacing: 0.01em;
  margin-top: ${DESIGN_TOKENS.spacing.small};
  margin-bottom: 0.25em;
  user-select: none;
  cursor: ${({ $allowCollapse }) => ($allowCollapse ? 'pointer' : 'default')};
  gap: 0.5em;
  &:first-child {
    margin-top: 0;
  }
`;

const CollapseIcon = styled.span`
  font-size: 0.7em;
  width: 16px;
  display: inline-block;
  color: var(--c-text-secondary);
`;

const ItemsWrapper = styled.div<{ $noIndent?: boolean }>`
  padding-left: ${({ $noIndent }) => ($noIndent ? '0' : DESIGN_TOKENS.spacing.medium)};
`;

const SidebarItem = styled.li<{ $selected: boolean }>`
  position: relative;
  padding: ${DESIGN_TOKENS.spacing.small} ${DESIGN_TOKENS.spacing.medium};
  cursor: pointer;
  background: ${({ $selected }) =>
    $selected ? 'color-mix(in srgb, var(--c-accent) 10%, transparent 90%)' : 'transparent'};
  color: ${({ $selected }) => ($selected ? 'var(--c-text-primary)' : 'var(--c-text-secondary)')};
  border-radius: ${DESIGN_TOKENS.radius.medium};
  margin-bottom: ${DESIGN_TOKENS.spacing.small};
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  transition: background ${DESIGN_TOKENS.transition.fast}, color ${DESIGN_TOKENS.transition.fast};
  &:hover {
    background: color-mix(in srgb, var(--c-accent) 5%, transparent 95%);
    color: var(--c-text-primary);
  }
  &:last-child {
    margin-bottom: 0;
  }
  &::before {
    content: '';
    display: ${({ $selected }) => ($selected ? 'block' : 'none')};
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 60%;
    border-radius: 2px;
    background: var(--c-accent);
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

export interface SidebarListProps {
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

const getSectionKey = (section: SidebarListSection, i: number) => section.title || `section-${i}`;

/**
 * SidebarList component - компонент для отображения списка с секциями в сайдбаре
 *
 * @param sections 'SidebarListSection[]' - массив секций списка
 * @param selected 'string' - ключ выбранного элемента
 * @param onSelect '(key: string) => void' - обработчик выбора элемента
 * @param width 'string' - ширина компонента (например: '300px', '100%')
 * @param height 'string' - высота компонента (например: '100vh', '500px')
 * @param allowCollapse 'boolean' = true - разрешить сворачивание секций
 * @param wrapperClassName 'string' - класс для обертки списка
 * @param sectionTitleClassName 'string' - класс для заголовков секций
 * @param itemClassName 'string' - класс для элементов списка
 */
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
    !sections.length || sections.every((section) => !section.items || section.items.length === 0);
  if (isEmpty) return null;

  const toggleSection = (title: string) => {
    if (!allowCollapse) return;
    setCollapsed((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarListWrapper $width={width} $height={height} className={wrapperClassName}>
      {sections.map((section, i) => {
        const sectionKey = getSectionKey(section, i);
        const hasTitle = Boolean(section.title);
        return (
          <React.Fragment key={sectionKey}>
            {hasTitle && (
              <SectionTitle
                onClick={() => toggleSection(sectionKey)}
                className={sectionTitleClassName}
                $allowCollapse={allowCollapse}
              >
                {section.title}
                {allowCollapse && <CollapseIcon>{collapsed[sectionKey] ? '►' : '▼'}</CollapseIcon>}
              </SectionTitle>
            )}
            {!collapsed[sectionKey] && (
              <ItemsWrapper $noIndent={!hasTitle}>
                {section.items.map((comp) => (
                  <SidebarItem
                    key={comp.key}
                    $selected={selected === comp.key}
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
