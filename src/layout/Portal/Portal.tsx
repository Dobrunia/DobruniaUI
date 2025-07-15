import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement | string;
  disabled?: boolean;
  className?: string;
}

/**
 * Portal component - компонент для рендеринга контента в другом DOM узле
 *
 * @param children 'ReactNode' - контент для портала
 * @param container 'HTMLElement | string' - контейнер для портала
 * @param disabled 'boolean' = false - отключить портал
 * @param className 'string' - дополнительные CSS классы
 */
export const Portal = React.memo<PortalProps>(
  ({ children, container, disabled = false, className }) => {
    // Мемоизируем вычисление целевого элемента
    const target = useMemo(() => {
      /* 1. если портал отключён – возвращаем null */
      if (disabled) {
        return null;
      }

      /* 2. SSR-гард */
      if (typeof document === 'undefined') {
        return null;
      }

      let targetElement: HTMLElement | null = null;

      if (typeof container === 'string') {
        targetElement = document.querySelector(container);
        if (!targetElement) {
          console.warn(`Portal: selector "${container}" не найден, используем <body>`);
          targetElement = document.body;
        }
      } else if (container instanceof HTMLElement) {
        targetElement = container;
      } else {
        targetElement = document.body;
      }

      return targetElement;
    }, [disabled, container]);

    // Мемоизируем контент портала
    const portalContent = useMemo(() => {
      if (className) {
        return <div className={className}>{children}</div>;
      }
      return children;
    }, [children, className]);

    /* 1. если портал отключён – выводим как есть */
    if (disabled) {
      return <div className={className}>{children}</div>;
    }

    /* 2. если нет целевого элемента – не рендерим */
    if (!target) {
      return null;
    }

    /* 3. сам портал */
    return createPortal(portalContent, target);
  }
);

Portal.displayName = 'Portal';
