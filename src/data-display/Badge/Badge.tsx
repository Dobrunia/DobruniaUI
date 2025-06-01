import React from 'react';
import styled, { css } from 'styled-components';

interface BadgeProps {
  value?: number | string;
  children?: React.ReactNode;
  max?: number;
  variant?: 'default' | 'message-date';
  date?: Date | string | number;
  locale?: string;
}

const BadgeWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const BadgeCircle = styled.span<{ $variant?: string }>`
  ${(p) =>
    p.$variant === 'message-date'
      ? css`
          position: static;
          min-width: 0;
          height: auto;
          padding: var(--spacing-small) var(--spacing-large);
          background: var(--color-elevated-active);
          color: var(--text-heading);
          border-radius: var(--radius-large);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-medium);
          font-weight: 500;
          box-shadow: none;
          margin: 16px auto;
          align-self: center;
        `
      : css`
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
        `}
`;

function formatMessageDate(date: Date | string | number, locale: string = 'en') {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  // Формат: 1 June или June 1 (en), 1 июня (ru), ...
  // Для en: { month: 'long', day: 'numeric' } => June 1
  // Для ru: { day: 'numeric', month: 'long' } => 1 июня
  const opts: Intl.DateTimeFormatOptions = locale.startsWith('en')
    ? { month: 'long', day: 'numeric' }
    : { day: 'numeric', month: 'long' };
  return d.toLocaleDateString(locale, opts);
}

/**
 * Badge component - компонент для отображения числового, текстового бейджа или даты
 * @param {number|string} [value] - значение бейджа (число или текст)
 * @param {React.ReactNode} children - элемент, к которому прикрепляется бейдж (кроме message-date)
 * @param {number} [max=99] - максимальное значение для числового бейджа
 * @param {'default'|'message-date'} [variant='default'] - вариант бейджа: обычный или дата
 * @param {Date|string|number} [date] - дата для варианта 'message-date'
 * @param {string} [locale='en'] - локаль для форматирования даты
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
 *
 * // Бейдж-дата между сообщениями
 * <Badge variant="message-date" date="2024-06-01" locale="en" />
 */
export const Badge: React.FC<BadgeProps> = ({
  value,
  children,
  max = 99,
  variant = 'default',
  date,
  locale = 'en',
}) => {
  if (variant === 'message-date') {
    if (!date) return null;
    const formatted = formatMessageDate(date, locale);
    if (!formatted) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <BadgeCircle $variant='message-date' data-variant='message-date'>
          {formatted}
        </BadgeCircle>
      </div>
    );
  }
  let displayValue = value;
  if (typeof value === 'number' && value > max) {
    displayValue = `${max}+`;
  }
  return (
    <BadgeWrapper>
      {children}
      {value !== undefined && value !== null && value !== '' && (
        <BadgeCircle $variant={variant}>{displayValue}</BadgeCircle>
      )}
    </BadgeWrapper>
  );
};
