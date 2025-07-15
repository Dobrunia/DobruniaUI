import React from 'react';
import styled from 'styled-components';

export interface MessageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string | number;
}

const Container = styled.div<{ $maxHeight?: string | number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: ${({ $maxHeight }) =>
    $maxHeight ? (typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight) : '100vh'};
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--c-bg-default);
  padding: 24px 0 24px 0;
  scrollbar-width: thin;
  scrollbar-color: var(--c-accent) var(--c-bg-default);

  &::-webkit-scrollbar {
    width: 8px;
    background: var(--c-bg-default);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--c-accent);
    border-radius: 8px;
  }
`;

/**
 * MessageContainer - контейнер для сообщений
 * @param children 'React.ReactNode' - дочерние элементы
 * @param className 'string' - дополнительные CSS классы
 * @param maxHeight 'string | number' - максимальная высота контейнера
 */
export const MessageContainer: React.FC<MessageContainerProps> = ({
  children,
  className,
  maxHeight,
}) => {
  return (
    <Container className={className} $maxHeight={maxHeight}>
      {children}
    </Container>
  );
};

MessageContainer.displayName = 'MessageContainer';
