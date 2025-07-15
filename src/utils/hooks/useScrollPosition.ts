import { useCallback, useEffect, useState } from 'react';

interface ScrollState {
  isAtBottom: boolean;
  hasScroll: boolean;
  isScrolledUp: boolean;
}

export const useScrollPosition = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtBottom: true,
    hasScroll: false,
    isScrolledUp: false,
  });

  const checkScroll = useCallback(() => {
    if (!ref.current) return;

    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 2;
    const hasScroll = scrollHeight > clientHeight + 8;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 200;

    setScrollState({
      isAtBottom: isBottom,
      hasScroll,
      isScrolledUp,
    });
  }, [ref]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    return () => element.removeEventListener('scroll', checkScroll);
  }, [ref, checkScroll]);

  return scrollState;
};
