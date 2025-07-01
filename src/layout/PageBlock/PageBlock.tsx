import React from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

export interface PageBlockProps {
  stretched?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
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
  padding: ${DESIGN_TOKENS.spacing.large} ${DESIGN_TOKENS.spacing.medium};
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
  width: ${DESIGN_TOKENS.layout.sidebar.desktop};
  min-width: ${DESIGN_TOKENS.layout.sidebar.desktop};
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: ${DESIGN_TOKENS.spacing.large} ${DESIGN_TOKENS.spacing.medium};
  position: sticky;
  top: 0;
  align-self: flex-start;

  -ms-overflow-style: none; /* IE 10+ / старый Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    width: ${DESIGN_TOKENS.layout.sidebar.tablet};
    min-width: ${DESIGN_TOKENS.layout.sidebar.tablet};
  }

  @media (max-width: 900px) {
    width: ${DESIGN_TOKENS.layout.sidebar.mobile};
    min-width: ${DESIGN_TOKENS.layout.sidebar.mobile};
  }
`;

/**
 * PageBlock component - компонент для создания макета страницы с боковыми панелями
 *
 * @param stretched 'boolean' = false - растянуть контент на всю доступную ширину
 * @param left 'ReactNode' - содержимое левой боковой панели
 * @param right 'ReactNode' - содержимое правой боковой панели
 * @param children 'ReactNode' - основной контент страницы
 * @param className 'string' - дополнительные CSS классы
 */
export const PageBlock: React.FC<PageBlockProps> = ({
  stretched = false,
  left,
  right,
  children,
  className,
}) => {
  return (
    <Container $stretched={stretched} className={className}>
      <Sidebar>{left && left}</Sidebar>
      <Content $stretched={stretched}>{children}</Content>
      <Sidebar>{right && right}</Sidebar>
    </Container>
  );
};
