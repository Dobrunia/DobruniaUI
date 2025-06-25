import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import styled from 'styled-components';

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
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const isFirstRender = useRef(true);
    const lastMessageIdRef = useRef(lastMessageId);

    const scrollToBottom = useCallback((smooth = true) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        });
        setIsAtBottom(true);
      }
    }, []);

    const checkScroll = useCallback(() => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 2;
      setIsAtBottom(isBottom);

      const hasScroll = scrollHeight > clientHeight + 8;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 200;
      setShowScrollBtn(hasScroll && isScrolledUp);
    }, []);

    const handleScrollToBottomClick = useCallback(() => {
      scrollToBottom(true);
      setShowScrollBtn(false);
    }, [scrollToBottom]);

    useImperativeHandle(
      ref,
      () => ({
        scrollToMessage: (id: string) => {
          const element = document.getElementById(id);
          if (element && containerRef.current) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          }
        },
      }),
      []
    );

    // Инициализация скролла
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      el.addEventListener('scroll', checkScroll);
      checkScroll();

      // Начальный скролл вниз без анимации
      if (isFirstRender.current) {
        requestAnimationFrame(() => {
          scrollToBottom(false);
          isFirstRender.current = false;
        });
      }

      return () => el.removeEventListener('scroll', checkScroll);
    }, [checkScroll, scrollToBottom]);

    // Автоскролл при новых сообщениях (отслеживаем по lastMessageId)
    useEffect(() => {
      if (
        !isFirstRender.current &&
        autoScrollToBottom &&
        isAtBottom &&
        lastMessageId !== lastMessageIdRef.current &&
        lastMessageId !== undefined
      ) {
        // Небольшая задержка для завершения рендера
        requestAnimationFrame(() => {
          scrollToBottom(true);
        });
      }
      lastMessageIdRef.current = lastMessageId;
    }, [lastMessageId, autoScrollToBottom, isAtBottom, scrollToBottom]);

    return (
      <Container ref={containerRef} className={className} $maxHeight={maxHeight}>
        {children}
        <ScrollToBottomBtn
          onClick={handleScrollToBottomClick}
          title='Scroll to bottom'
          $visible={showScrollBtn}
        >
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
      </Container>
    );
  }
);
