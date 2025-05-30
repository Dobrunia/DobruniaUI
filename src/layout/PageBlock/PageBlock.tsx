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
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  ${({ $stretched }) =>
    $stretched &&
    `
    justify-content: stretch;
  `}

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Content = styled.div<{ $stretched?: boolean }>`
  max-width: ${({ $stretched }) => ($stretched ? '100%' : '700px')};
  flex-grow: 1;
  min-width: 0;
  padding: var(--spacing-large) var(--spacing-medium);
  box-sizing: border-box;

  ${({ $stretched }) =>
    $stretched &&
    `
    flex: 2;
  `}

  @media (max-width: 600px) {
    max-width: 100%;
    padding: var(--spacing-medium) var(--spacing-small);
  }
`;

const Sidebar = styled.div`
  width: var(--layout-sidebar-width);
  min-width: var(--layout-sidebar-width);
  max-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: var(--spacing-large) var(--spacing-medium);
  position: sticky;
  top: 0;
  align-self: flex-start;

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    max-height: none;
    position: static;
    padding: var(--spacing-medium) var(--spacing-small);
    margin-bottom: var(--spacing-medium);
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
