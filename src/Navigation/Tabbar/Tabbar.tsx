import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Tab, type TabData, DESIGN_TOKENS } from '@DobruniaUI';

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

/**
 * Tabbar component - компонент для навигации по вкладкам
 *
 * @param tabs 'TabData[]' - массив объектов с данными для каждой вкладки
 * @param selectedId 'string | number' - id выбранной вкладки
 * @param onTabPress '(id: string | number) => void' - функция обработки нажатия на вкладку
 * @param className 'string' - дополнительный CSS класс для кастомизации
 */
export const Tabbar: React.FC<TabbarProps> = ({ tabs, selectedId, onTabPress, className }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // drag-scroll state
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);

  // Фикс для preventDefault в wheel событии
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.5;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      isDragging.current = true;
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeft.current = containerRef.current.scrollLeft;
      containerRef.current.style.cursor = 'grabbing';
    }
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = '';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = '';
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Container
      ref={containerRef}
      className={className}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} selected={tab.id === selectedId} onClick={onTabPress} />
      ))}
    </Container>
  );
};
