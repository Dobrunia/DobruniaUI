import React, { useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Tab, type TabData, DESIGN_TOKENS } from '@DobruniaUI';
import { useDragScroll, useWheelScroll } from '../../utils/hooks';

export interface TabbarProps {
  tabs: TabData[];
  selectedId: string | number;
  onTabPress: (id: string | number) => void;
  className?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${DESIGN_TOKENS.spacing.medium};
  background: inherit;
  padding: 0 ${DESIGN_TOKENS.spacing.medium};
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  user-select: none;
  transition: all ${DESIGN_TOKENS.transition.fast} ease;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// Мемоизированный подкомпонент
const TabItem = React.memo<{
  tab: TabData;
  selected: boolean;
  onClick: (id: string | number) => void;
}>(({ tab, selected, onClick }) => (
  <Tab key={tab.id} tab={tab} selected={selected} onClick={onClick} />
));
TabItem.displayName = 'TabItem';

/**
 * Tabbar component - компонент для навигации по вкладкам
 *
 * @param tabs 'TabData[]' - массив объектов с данными для каждой вкладки
 * @param selectedId 'string | number' - id выбранной вкладки
 * @param onTabPress '(id: string | number) => void' - функция обработки нажатия на вкладку
 * @param className 'string' - дополнительный CSS класс для кастомизации
 */
export const Tabbar = React.memo<TabbarProps>(({ tabs, selectedId, onTabPress, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Используем кастомные хуки для DOM-взаимодействий
  const dragScrollHandlers = useDragScroll(containerRef);
  useWheelScroll(containerRef);

  // Стабилизируем обработчик клика по вкладке
  const handleTabClick = useCallback(
    (id: string | number) => {
      onTabPress(id);
    },
    [onTabPress]
  );

  // Мемоизируем рендер вкладок
  const tabElements = useMemo(
    () =>
      tabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} selected={tab.id === selectedId} onClick={handleTabClick} />
      )),
    [tabs, selectedId, handleTabClick]
  );

  // Мемоизируем пропсы для контейнера
  const containerProps = useMemo(
    () => ({
      ref: containerRef,
      className,
      ...dragScrollHandlers,
    }),
    [className, dragScrollHandlers]
  );

  return <Container {...containerProps}>{tabElements}</Container>;
});

Tabbar.displayName = 'Tabbar';
