import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  value?: number | string;
  children: React.ReactNode;
  max?: number; // если value > max, показывать max+
}

const BadgeWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const BadgeCircle = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-small);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  pointer-events: none;
`;

/**
 * Badge component - компонент для отображения числового или текстового бейджа
 * @param {number|string} [value] - значение бейджа (число или текст)
 * @param {React.ReactNode} children - элемент, к которому прикрепляется бейдж
 * @param {number} [max=99] - максимальное значение для числового бейджа
 *
 * @example
 * // Числовой бейдж
 * <Badge value={5}>
 *   <IconButton icon={<NotificationIcon />} />
 * </Badge>
 *
 * // Бейдж с превышением максимума
 * <Badge value={150} max={99}>
 *   <IconButton icon={<MessageIcon />} />
 * </Badge>
 *
 * // Текстовый бейдж
 * <Badge value="New">
 *   <Button>Features</Button>
 * </Badge>
 *
 * // Бейдж с нулевым значением (не отображается)
 * <Badge value={0}>
 *   <IconButton icon={<MailIcon />} />
 * </Badge>
 */
export const Badge: React.FC<BadgeProps> = ({ value, children, max = 99 }) => {
  let displayValue = value;
  if (typeof value === 'number' && value > max) {
    displayValue = `${max}+`;
  }
  return (
    <BadgeWrapper>
      {children}
      {value !== undefined && value !== null && value !== '' && (
        <BadgeCircle>{displayValue}</BadgeCircle>
      )}
    </BadgeWrapper>
  );
};
