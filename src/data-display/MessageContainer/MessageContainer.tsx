import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components';
import { useScrollPosition, useScrollToBottom } from '../../utils/hooks';

export interface MessageContainerProps {
  children: React.ReactNode;
  autoScrollToBottom?: boolean;
  className?: string;
  lastMessageId?: string | number;
  maxHeight?: string | number;
}

export interface MessageContainerRef {
  scrollToMessage: (id: string) => void;
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

const ScrollToBottomBtn = styled.button<{ $visible?: boolean }>`
  position: sticky;
  align-self: flex-end;
  bottom: 10px;
  margin-right: 0px;
  background: var(--c-accent);
  color: var(--c-text-inverse);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(10px)')};
  pointer-events: ${({ $visible }) => ($visible ? 'all' : 'none')};

  &:hover {
    background: color-mix(in srgb, var(--c-accent) 85%, black 15%);
    transform: translateY(-2px);
  }
`;

const ScrollIcon = styled.svg`
  width: 28px;
  height: 28px;
`;

// Мемоизированный компонент для кнопки скролла вниз
const ScrollToBottomButton = React.memo<{
  visible: boolean;
  onClick: () => void;
}>(({ visible, onClick }) => (
  <ScrollToBottomBtn onClick={onClick} title='Scroll to bottom' $visible={visible}>
    <ScrollIcon viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='14' cy='14' r='14' fill='none' />
      <path
        d='M8 12L14 18L20 12'
        stroke='white'
        strokeWidth='2.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </ScrollIcon>
  </ScrollToBottomBtn>
));

ScrollToBottomButton.displayName = 'ScrollToBottomButton';

/**
 * MessageContainer - контейнер для списка сообщений с автоскроллом и кнопкой "вниз"
 * @param children 'React.ReactNode' - сообщения (обычно Message компоненты)
 * @param autoScrollToBottom 'boolean' = true - автоматически прокручивать к новым сообщениям
 * @param lastMessageId 'string | number' - id последнего сообщения для автоскролла
 * @param maxHeight 'string | number' - максимальная высота контейнера
 * @param className 'string' - дополнительные CSS классы
 */
export const MessageContainer = forwardRef<MessageContainerRef, MessageContainerProps>(
  (
    { children, autoScrollToBottom = true, className, maxHeight, lastMessageId },
    ref
  ): React.ReactElement => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastMessageIdRef = useRef(lastMessageId);

    // Используем кастомные хуки
    const scrollState = useScrollPosition(containerRef);
    const { scrollToBottom, scrollToMessage, initializeScroll } = useScrollToBottom(containerRef);

    // Мемоизируем вычисления
    const showScrollBtn = useMemo(
      () => scrollState.hasScroll && scrollState.isScrolledUp,
      [scrollState.hasScroll, scrollState.isScrolledUp]
    );

    // Стабилизируем обработчики
    const handleScrollToBottomClick = useCallback(() => {
      scrollToBottom(true);
    }, [scrollToBottom]);

    // Инициализация скролла
    useEffect(() => {
      initializeScroll();
    }, [initializeScroll]);

    // Автоскролл при новых сообщениях
    useEffect(() => {
      if (
        autoScrollToBottom &&
        scrollState.isAtBottom &&
        lastMessageId !== lastMessageIdRef.current &&
        lastMessageId !== undefined
      ) {
        requestAnimationFrame(() => {
          scrollToBottom(true);
        });
      }
      lastMessageIdRef.current = lastMessageId;
    }, [lastMessageId, autoScrollToBottom, scrollState.isAtBottom, scrollToBottom]);

    // Экспортируем методы через ref
    useImperativeHandle(
      ref,
      () => ({
        scrollToMessage,
      }),
      [scrollToMessage]
    );

    return (
      <Container ref={containerRef} className={className} $maxHeight={maxHeight}>
        {children}
        <ScrollToBottomButton visible={showScrollBtn} onClick={handleScrollToBottomClick} />
      </Container>
    );
  }
);

MessageContainer.displayName = 'MessageContainer';
