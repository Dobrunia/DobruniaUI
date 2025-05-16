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
`;

const Content = styled.div<{ $stretched?: boolean }>`
  max-width: var(--layout-content-width);
  flex-grow: 1;
  min-width: 0;
  padding: var(--spacing-large) var(--spacing-medium);
  box-sizing: border-box;

  ${({ $stretched }) =>
    $stretched &&
    `
    max-width: 100%;
    flex: 2;
  `}
`;

const Sidebar = styled.div`
  width: var(--layout-sidebar-width);
  flex-shrink: 0;
  box-sizing: border-box;
  padding: var(--spacing-large) var(--spacing-medium);
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
