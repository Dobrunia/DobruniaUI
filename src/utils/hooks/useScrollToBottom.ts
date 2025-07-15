import { useCallback, useRef } from 'react';

export const useScrollToBottom = (ref: React.RefObject<HTMLElement | null>) => {
  const isFirstRender = useRef(true);

  const scrollToBottom = useCallback(
    (smooth = true) => {
      if (ref.current) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    },
    [ref]
  );

  const scrollToMessage = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element && ref.current) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    },
    [ref]
  );

  const initializeScroll = useCallback(() => {
    if (isFirstRender.current) {
      requestAnimationFrame(() => {
        scrollToBottom(false);
        isFirstRender.current = false;
      });
    }
  }, [scrollToBottom]);

  return {
    scrollToBottom,
    scrollToMessage,
    initializeScroll,
    isFirstRender: isFirstRender.current,
  };
};
