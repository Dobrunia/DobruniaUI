import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

export interface RowProps {
  /** Контент для левого слота */
  left?: React.ReactNode;
  /** Контент для центрального слота */
  center?: React.ReactNode;
  /** Контент для правого слота */
  right?: React.ReactNode;
  /** Горизонтальное выравнивание центрального слота */
  centerJustify?: 'left' | 'center' | 'right';
  /** Отступы внутри строки */
  padding?: string;
  /** Минимальная высота строки */
  minHeight?: string;
  /** Дополнительный CSS класс */
  className?: string;
  /** Обработчик клика по строке */
  onClick?: () => void;
}

const RowContainer = styled.div<{
  $padding?: string;
  $minHeight?: string;
  $clickable: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ $padding }) => $padding || '12px 16px'};
  min-height: ${({ $minHeight }) => $minHeight || 'auto'};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background-color 0.2s ease;

  ${({ $clickable }) =>
    $clickable &&
    `
    &:hover {
      background-color: color-mix(in srgb, var(--c-bg-elevated) 80%, black 20%);
    }
  `}
`;

const LeftSlot = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CenterSlot = styled.div<{ $centerJustify: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $centerJustify }) => {
    switch ($centerJustify) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  }};
  flex: 1;
  margin: 0 16px;
  min-width: 0;
`;

const RightSlot = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

// Мемоизированные подкомпоненты
const RowLeftSlot = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <LeftSlot>{children}</LeftSlot>
));
RowLeftSlot.displayName = 'RowLeftSlot';

const RowCenterSlot = React.memo<{
  children: React.ReactNode;
  centerJustify: string;
}>(({ children, centerJustify }) => (
  <CenterSlot $centerJustify={centerJustify}>{children}</CenterSlot>
));
RowCenterSlot.displayName = 'RowCenterSlot';

const RowRightSlot = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <RightSlot>{children}</RightSlot>
));
RowRightSlot.displayName = 'RowRightSlot';

/**
 * Row component - компонент строки с тремя слотами
 *
 * @param left 'ReactNode' - контент для левого слота
 * @param center 'ReactNode' - контент для центрального слота
 * @param right 'ReactNode' - контент для правого слота
 * @param centerJustify 'left | center | right' = 'center' - горизонтальное выравнивание центрального слота
 * @param padding 'string' = '12px 16px' - отступы внутри строки
 * @param minHeight 'string' - минимальная высота строки
 * @param className 'string' - дополнительный CSS класс
 * @param onClick '() => void' - обработчик клика по строке
 */
export const Row = React.memo<RowProps>(
  ({ left, center, right, centerJustify = 'center', padding, minHeight, className, onClick }) => {
    // Стабилизируем обработчик клика
    const handleClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

    // Мемоизируем пропсы для контейнера
    const containerProps = useMemo(
      () => ({
        $padding: padding,
        $minHeight: minHeight,
        $clickable: !!onClick,
      }),
      [padding, minHeight, onClick]
    );

    // Мемоизируем пропсы для центрального слота
    const centerSlotProps = useMemo(
      () => ({
        centerJustify,
      }),
      [centerJustify]
    );

    return (
      <RowContainer {...containerProps} className={className} onClick={handleClick}>
        {left && <RowLeftSlot>{left}</RowLeftSlot>}
        {center && <RowCenterSlot {...centerSlotProps}>{center}</RowCenterSlot>}
        {right && <RowRightSlot>{right}</RowRightSlot>}
      </RowContainer>
    );
  }
);

Row.displayName = 'Row';
