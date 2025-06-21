import React from 'react';
import styled from 'styled-components';
import { Tab, type TabData } from '@DobruniaUI';
import { DESIGN_TOKENS } from '../../styles/designTokens';

interface TabbarProps {
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
 * @param {TabData[]} tabs - массив объектов с данными для каждой вкладки
 * @param {string | number} selectedId - id выбранной вкладки
 * @param {(id: string | number) => void} onTabPress - функция обработки нажатия на вкладку
 * @param {string} className - дополнительный CSS класс для кастомизации
 */
export const Tabbar: React.FC<TabbarProps> = ({ tabs, selectedId, onTabPress, className }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // drag-scroll state
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);

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
  const onWheel = (e: React.WheelEvent) => {
    if (containerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaY * 0.5;
    }
  };

  return (
    <Container
      ref={containerRef}
      className={className}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onWheel={onWheel}
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} selected={tab.id === selectedId} onClick={onTabPress} />
      ))}
    </Container>
  );
};
