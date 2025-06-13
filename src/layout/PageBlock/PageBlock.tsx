import React from 'react';
import styled from 'styled-components';

interface PageBlockProps {
  stretched?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div<{ $stretched?: boolean }>`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  ${({ $stretched }) =>
    $stretched &&
    `
    justify-content: stretch;
  `}
`;

const Content = styled.div<{ $stretched?: boolean }>`
  max-width: ${({ $stretched }) => ($stretched ? '100%' : '700px')};
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  flex-grow: 1;
  min-width: 0;
  padding: var(--spacing-large) var(--spacing-medium);
  box-sizing: border-box;

  ${({ $stretched }) =>
    $stretched &&
    `
    flex: 2;
  `}

  -ms-overflow-style: none; /* IE 10+ / старый Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Sidebar = styled.div`
  width: var(--layout-sidebar-width);
  min-width: var(--layout-sidebar-width);
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: var(--spacing-large) var(--spacing-medium);
  position: sticky;
  top: 0;
  align-self: flex-start;

  -ms-overflow-style: none; /* IE 10+ / старый Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * PageBlock component - компонент для создания макета страницы с боковыми панелями
 * @param {boolean} [stretched=false] - растянуть контент на всю доступную ширину
 * @param {React.ReactNode} [left] - содержимое левой боковой панели
 * @param {React.ReactNode} [right] - содержимое правой боковой панели
 * @param {React.ReactNode} children - основной контент страницы
 *
 * @example
 * // Базовое использование
 * <PageBlock>
 *   <div>Основной контент</div>
 * </PageBlock>
 *
 * // С боковыми панелями
 * <PageBlock
 *   left={<div>Левая панель</div>}
 *   right={<div>Правая панель</div>}
 * >
 *   <div>Основной контент</div>
 * </PageBlock>
 *
 * // Растянутый контент
 * <PageBlock stretched>
 *   <div>Контент на всю ширину</div>
 * </PageBlock>
 *
 * // Только с левой панелью
 * <PageBlock left={<div>Левая панель</div>}>
 *   <div>Основной контент</div>
 * </PageBlock>
 */
export const PageBlock: React.FC<PageBlockProps> = ({
  stretched = false,
  left,
  right,
  children,
}) => {
  return (
    <Container $stretched={stretched}>
      <Sidebar>{left && left}</Sidebar>
      <Content $stretched={stretched}>{children}</Content>
      <Sidebar>{right && right}</Sidebar>
    </Container>
  );
};
