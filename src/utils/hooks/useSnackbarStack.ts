import { useEffect, useRef, useCallback } from 'react';

export type SnackbarOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

// Глобальная система управления стеками Snackbar'ов по позициям
const snackbarStacks = new Map<
  string,
  Map<string, { order: number; setStackIndex: (index: number) => void }>
>();
let nextOrder = 0;

const getPositionKey = (origin: SnackbarOrigin) => `${origin.vertical}-${origin.horizontal}`;

const recalculateStackPositions = (positionKey: string) => {
  const stack = snackbarStacks.get(positionKey);
  if (!stack) return;

  // Сортируем по порядку появления и пересчитываем индексы
  const sortedEntries = Array.from(stack.entries()).sort((a, b) => a[1].order - b[1].order);
  sortedEntries.forEach(([, data], index) => {
    data.setStackIndex(index);
  });
};

/**
 * Хук для управления стеком snackbar'ов
 * @param open - флаг открытия snackbar
 * @param anchorOrigin - позиция snackbar
 * @param enableStacking - включить стекинг
 * @param setStackIndex - функция установки индекса в стеке
 */
export const useSnackbarStack = (
  open: boolean,
  anchorOrigin: SnackbarOrigin,
  enableStacking: boolean,
  setStackIndex: (index: number) => void
) => {
  const snackbarIdRef = useRef<string>(Math.random().toString(36).substr(2, 9));

  const registerSnackbar = useCallback(() => {
    if (!enableStacking) return;

    const positionKey = getPositionKey(anchorOrigin);

    // Создаем стек для позиции если его нет
    if (!snackbarStacks.has(positionKey)) {
      snackbarStacks.set(positionKey, new Map());
    }

    // Регистрируем snackbar в стеке для данной позиции
    const stack = snackbarStacks.get(positionKey)!;
    const order = nextOrder++;
    stack.set(snackbarIdRef.current, { order, setStackIndex });

    // Пересчитываем позиции для данного стека
    recalculateStackPositions(positionKey);
  }, [enableStacking, anchorOrigin, setStackIndex]);

  const unregisterSnackbar = useCallback(() => {
    if (!enableStacking) return;

    const positionKey = getPositionKey(anchorOrigin);

    // Удаляем snackbar из стека
    const stack = snackbarStacks.get(positionKey);
    if (stack) {
      stack.delete(snackbarIdRef.current);

      // Если стек пустой, удаляем его
      if (stack.size === 0) {
        snackbarStacks.delete(positionKey);
      } else {
        // Пересчитываем позиции для оставшихся snackbar'ов
        recalculateStackPositions(positionKey);
      }
    }
  }, [enableStacking, anchorOrigin]);

  useEffect(() => {
    if (open) {
      registerSnackbar();
    } else {
      unregisterSnackbar();
    }

    return () => {
      // Очистка при размонтировании
      unregisterSnackbar();
    };
  }, [open, registerSnackbar, unregisterSnackbar]);
};
