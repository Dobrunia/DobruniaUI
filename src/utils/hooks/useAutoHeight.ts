import React, { useRef, useCallback } from 'react';

/**
 * Хук для автоматической настройки высоты textarea по содержимому
 * @param enabled - включена ли авто-высота
 * @param value - текущее значение textarea
 * @returns ref для textarea элемента
 */
export const useAutoHeight = (enabled: boolean, value: string) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    if (enabled && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [enabled]);

  // Вызываем adjustHeight при изменении значения
  React.useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  return textareaRef;
};
