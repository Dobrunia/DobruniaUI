import React from 'react';
import styled from 'styled-components';

interface RowProps {
  /** Контент для левого слота */
  left?: React.ReactNode;
  /** Контент для центрального слота */
  center?: React.ReactNode;
  /** Контент для правого слота */
  right?: React.ReactNode;
  /** Вертикальное выравнивание */
  align?: 'start' | 'center' | 'end' | 'stretch';
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
  $align: string;
  $padding?: string;
  $minHeight?: string;
  $clickable: boolean;
}>`
  display: flex;
  align-items: ${({ $align }) => {
    switch ($align) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'stretch':
        return 'stretch';
      default:
        return 'center';
    }
  }};
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
      background-color: var(--c-bg-elevated);
    }
  `}
`;

const LeftSlot = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CenterSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0 16px;
  min-width: 0; /* Позволяет сжиматься */
`;

const RightSlot = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

/**
 * Row component - компонент строки с тремя слотами
 * @param {React.ReactNode} [left] - контент для левого слота
 * @param {React.ReactNode} [center] - контент для центрального слота
 * @param {React.ReactNode} [right] - контент для правого слота
 * @param {'start'|'center'|'end'|'stretch'} [align='center'] - вертикальное выравнивание
 * @param {string} [padding='12px 16px'] - отступы внутри строки
 * @param {string} [minHeight] - минимальная высота строки
 * @param {string} [className] - дополнительный CSS класс
 * @param {() => void} [onClick] - обработчик клика по строке
 *
 * @example
 * // Базовое использование
 * <Row
 *   left={<Avatar src="avatar.jpg" />}
 *   center={<span>Имя пользователя</span>}
 *   right={<Button>Действие</Button>}
 * />
 *
 * // Только левый и правый слоты
 * <Row
 *   left={<h3>Заголовок</h3>}
 *   right={<Switch checked={true} />}
 * />
 *
 * // Кликабельная строка
 * <Row
 *   left={<Icon name="settings" />}
 *   center={<span>Настройки</span>}
 *   right={<Icon name="arrow-right" />}
 *   onClick={() => navigate('/settings')}
 * />
 *
 * // Кастомное выравнивание и отступы
 * <Row
 *   left={<Badge value={5} />}
 *   center={<TextField placeholder="Поиск..." />}
 *   align="start"
 *   padding="20px"
 *   minHeight="60px"
 * />
 */
export const Row: React.FC<RowProps> = ({
  left,
  center,
  right,
  align = 'center',
  padding,
  minHeight,
  className,
  onClick,
}) => {
  return (
    <RowContainer
      $align={align}
      $padding={padding}
      $minHeight={minHeight}
      $clickable={!!onClick}
      className={className}
      onClick={onClick}
    >
      {left && <LeftSlot>{left}</LeftSlot>}
      {center && <CenterSlot>{center}</CenterSlot>}
      {right && <RightSlot>{right}</RightSlot>}
    </RowContainer>
  );
};
