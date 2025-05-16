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
  flex-shrink: 0;
  box-sizing: border-box;
  padding: var(--spacing-large) var(--spacing-medium);

  @media (max-width: 600px) {
    width: 100%;
    padding: var(--spacing-medium) var(--spacing-small);
    margin-bottom: var(--spacing-medium);
  }
`;

export const PageBlock: React.FC<PageBlockProps> = ({
  stretched = false,
  left,
  right,
  children,
}) => {
  return (
    <Container $stretched={stretched}>
      {left && <Sidebar>{left}</Sidebar>}
      <Content $stretched={stretched}>{children}</Content>
      {right && <Sidebar>{right}</Sidebar>}
    </Container>
  );
};
