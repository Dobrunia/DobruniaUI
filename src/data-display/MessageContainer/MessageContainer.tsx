import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components';

interface MessageContainerProps {
  children: React.ReactNode;
  autoScrollToBottom?: boolean;
  className?: string;
  lastMessageId?: string | number;
}

export interface MessageContainerRef {
  scrollToMessage: (id: string) => void;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100vh;
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
 * MessageContainer — компонент для отображения списка сообщений с вертикальным скроллом.
 *
 * @param {React.ReactNode} children — сообщения (обычно <Message />)
 * @param {boolean} [autoScrollToBottom=true] — автоматически прокручивать вниз при появлении новых сообщений
 * @param {string|number} [lastMessageId] — id последнего сообщения (для автоскролла только при новых сообщениях)
 * @param {string} [className] — дополнительные CSS классы
 *
 * Особенности:
 * - Запрещён горизонтальный скролл
 * - Красивый скроллбар
 * - Плавная анимация скролла
 * - Кнопка "Вниз" появляется при прокрутке вверх, плавно скрывается/показывается
 * - Автоматический скролл к новым сообщениям, если пользователь был внизу
 * - Поддержка программного скролла к сообщению по id
 *
 * @example
 * <MessageContainer lastMessageId={messages[messages.length-1]?.id}>
 *   {messages.map(msg => <Message {...msg} />)}
 * </MessageContainer>
 *
 * // С кастомными стилями
 * <MessageContainer className="custom-container">
 *   {messages.map(msg => <Message {...msg} />)}
 * </MessageContainer>
 */
export const MessageContainer = forwardRef<MessageContainerRef, MessageContainerProps>(
  ({ children, autoScrollToBottom = true, className }, ref): React.ReactElement => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const prevScrollHeight = useRef<number>(0);
    const isFirstRender = useRef(true);

    useImperativeHandle(ref, () => ({
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
    }));

    const checkScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 2;
      setIsAtBottom(isBottom);
      setShowScrollBtn(!isBottom);
    };

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }, []);

    // Отдельный эффект для первого скролла
    useEffect(() => {
      if (isFirstRender.current && containerRef.current) {
        // Небольшая задержка для гарантии полного рендера контента
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTo({
              top: containerRef.current.scrollHeight,
            });
            isFirstRender.current = false;
          }
        }, 100);
      }
    }, [children]);

    // Сохраняем scrollHeight до рендера новых сообщений
    useLayoutEffect(() => {
      if (containerRef.current) {
        prevScrollHeight.current = containerRef.current.scrollHeight;
      }
    }, [children]);

    // После рендера новых сообщений скроллим вниз, если пользователь был внизу
    useLayoutEffect(() => {
      if (containerRef.current && !isFirstRender.current) {
        if (autoScrollToBottom && isAtBottom) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    }, [children, autoScrollToBottom, isAtBottom]);

    // Проверяем необходимость показа кнопки при изменении контента
    useEffect(() => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        const hasScroll = scrollHeight > clientHeight + 8;
        const isScrolledUp =
          containerRef.current.scrollHeight -
            containerRef.current.scrollTop -
            containerRef.current.clientHeight >
          200;
        setShowScrollBtn(hasScroll && isScrolledUp);
      }
    }, [children]);

    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
        setIsAtBottom(true);
        setShowScrollBtn(false);
      }
    };

    return (
      <Container ref={containerRef} className={className}>
        {children}
        <ScrollToBottomBtn
          onClick={scrollToBottom}
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
