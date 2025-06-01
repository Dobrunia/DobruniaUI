import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

interface MessageContainerProps {
  children: React.ReactNode;
  autoScrollToBottom?: boolean;
  style?: React.CSSProperties;
  className?: string;
  lastMessageId?: string | number;
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
  background: var(--color-elevated);
  padding: 24px 0 24px 0;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-elevated);
  &::-webkit-scrollbar {
    width: 8px;
    background: var(--color-elevated);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 8px;
  }
`;

const ScrollToBottomBtn = styled.button`
  position: sticky;
  align-self: flex-end;
  bottom: 10px;
  margin-right: 0px;
  background: var(--color-primary);
  color: #fff;
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
  transition: opacity 0.15s;
  z-index: 10;
  &:hover {
    background: var(--color-accent);
  }
`;

/**
 * MessageContainer — компонент для отображения списка сообщений с вертикальным скроллом.
 *
 * @param {React.ReactNode} children — сообщения (обычно <Message />)
 * @param {boolean} [autoScrollToBottom=true] — автоматически прокручивать вниз при появлении новых сообщений
 * @param {string|number} [lastMessageId] — id последнего сообщения (для автоскролла только при новых сообщениях)
 * @param {React.CSSProperties} [style] — стили контейнера
 * @param {string} [className] — CSS-класс
 *
 * Особенности:
 * - Запрещён горизонтальный скролл
 * - Красивый скроллбар
 * - Кнопка "Вниз" появляется при прокрутке вверх, скроллит в самый низ (стрелка SVG)
 *
 * @example
 * <MessageContainer lastMessageId={messages[messages.length-1]?.id}>
 *   {messages.map(msg => <Message {...msg} />)}
 * </MessageContainer>
 */
export const MessageContainer: React.FC<MessageContainerProps> = ({
  children,
  autoScrollToBottom = true,
  style,
  className,
  lastMessageId,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    if (autoScrollToBottom && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [lastMessageId, autoScrollToBottom]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const hasScroll = el.scrollHeight > el.clientHeight + 8;
      setShowScrollBtn(hasScroll && el.scrollHeight - el.scrollTop - el.clientHeight > 200);
    };
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <Container ref={ref} style={style} className={className}>
      {children}
      {showScrollBtn && (
        <ScrollToBottomBtn onClick={scrollToBottom} title='Scroll to bottom'>
          <svg
            width='28'
            height='28'
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='14' cy='14' r='14' fill='none' />
            <path
              d='M8 12L14 18L20 12'
              stroke='white'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </ScrollToBottomBtn>
      )}
    </Container>
  );
};
