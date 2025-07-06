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
export const Portal: React.FC<PortalProps> = ({
  children,
  container,
  disabled = false,
  className,
}) => {
  /* 1. если портал отключён – выводим как есть */
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  /* 2. вычисляем целевой элемент «на лету» */
  if (typeof document === 'undefined') return null; // SSR-гард

  let target: HTMLElement | null = null;

  if (typeof container === 'string') {
    target = document.querySelector(container);
    if (!target) {
      console.warn(`Portal: selector "${container}" not найден, используем <body>`);
      target = document.body;
    }
  } else if (container instanceof HTMLElement) {
    target = container;
  } else {
    target = document.body;
  }

  if (!target) return null; // крайний случай

  /* 3. сам портал */
  const node = className ? <div className={className}>{children}</div> : children;

  return createPortal(node, target);
};
