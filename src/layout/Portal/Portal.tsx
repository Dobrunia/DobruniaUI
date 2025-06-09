import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement | string;
  disabled?: boolean;
}

/**
 * Portal
 * @param children - Контент для портала
 * @param container - Контейнер для портала
 * @param disabled - Отключить портал
 */
export const Portal: React.FC<PortalProps> = ({ children, container, disabled = false }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (disabled) {
      setPortalContainer(null);
      return;
    }

    let element: HTMLElement;

    if (typeof container === 'string') {
      // Если передан селектор, ищем элемент
      element = document.querySelector(container) as HTMLElement;
      if (!element) {
        console.warn(`Portal: Element with selector "${container}" not found`);
        element = document.body;
      }
    } else if (container instanceof HTMLElement) {
      // Если передан HTMLElement, используем его
      element = container;
    } else {
      // По умолчанию используем body
      element = document.body;
    }

    setPortalContainer(element);
  }, [container, disabled]);

  // Если portal отключен, рендерим детей как обычно
  if (disabled) {
    return <>{children}</>;
  }

  // Если контейнер не готов, не рендерим ничего
  if (!portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
};
