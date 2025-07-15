import React, { useMemo } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled, { css } from 'styled-components';

export interface BadgeProps {
  value?: number | string;
  children?: React.ReactNode;
  max?: number;
  variant?: 'default' | 'message-date';
  date?: Date | string | number;
  locale?: string;
  className?: string;
}

const BadgeWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const MessageDateWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const BadgeCircle = styled.span<{ $variant?: string }>`
  ${(p) =>
    p.$variant === 'message-date'
      ? css`
          position: static;
          min-width: 0;
          height: auto;
          padding: ${DESIGN_TOKENS.spacing.small} ${DESIGN_TOKENS.spacing.large};
          background: color-mix(in srgb, var(--c-bg-elevated) 70%, var(--c-text-primary) 30%);
          color: var(--c-text-primary);
          border-radius: ${DESIGN_TOKENS.radius.large};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${DESIGN_TOKENS.fontSize.medium};
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
          background: var(--c-accent);
          color: var(--c-text-inverse);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${DESIGN_TOKENS.fontSize.small};
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          pointer-events: none;
        `}
`;

// Мемоизированная функция форматирования даты
const formatMessageDate = (date: Date | string | number, locale: string = 'en'): string => {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  // Формат: 1 June или June 1 (en), 1 июня (ru), ...
  // Для en: { month: 'long', day: 'numeric' } => June 1
  // Для ru: { day: 'numeric', month: 'long' } => 1 июня
  const opts: Intl.DateTimeFormatOptions = locale.startsWith('en')
    ? { month: 'long', day: 'numeric' }
    : { day: 'numeric', month: 'long' };
  return d.toLocaleDateString(locale, opts);
};

// Мемоизированный компонент для бейджа с датой
const MessageDateBadge = React.memo<{
  date: Date | string | number;
  locale: string;
  className?: string;
}>(({ date, locale, className }) => {
  const formatted = useMemo(() => formatMessageDate(date, locale), [date, locale]);

  if (!formatted) return null;

  return (
    <MessageDateWrapper className={className}>
      <BadgeCircle $variant='message-date' data-variant='message-date'>
        {formatted}
      </BadgeCircle>
    </MessageDateWrapper>
  );
});

MessageDateBadge.displayName = 'MessageDateBadge';

// Мемоизированный компонент для обычного бейджа
const DefaultBadge = React.memo<{
  value: number | string;
  max: number;
  children?: React.ReactNode;
  className?: string;
}>(({ value, max, children, className }) => {
  const displayValue = useMemo(() => {
    if (typeof value === 'number' && value > max) {
      return `${max}+`;
    }
    return value;
  }, [value, max]);

  return (
    <BadgeWrapper className={className}>
      {children}
      <BadgeCircle>{displayValue}</BadgeCircle>
    </BadgeWrapper>
  );
});

DefaultBadge.displayName = 'DefaultBadge';

/**
 * Badge - бейдж для отображения чисел, текста или дат сообщений
 * @param value 'number | string' - значение бейджа (число или текст)
 * @param children 'React.ReactNode' - элемент с бейджем (кроме message-date)
 * @param max 'number' = 99 - максимальное значение для числового бейджа
 * @param variant 'default' | 'message-date' = 'default' - вариант бейджа
 * @param date 'Date | string | number' - дата для варианта message-date
 * @param locale 'string' = 'en' - локаль для форматирования даты
 * @param className 'string' - дополнительные CSS классы
 */
export const Badge: React.FC<BadgeProps> = React.memo(
  ({ value, children, max = 99, variant = 'default', date, locale = 'en', className }) => {
    // Мемоизируем проверку для message-date варианта
    const isMessageDate = useMemo(() => variant === 'message-date', [variant]);
    const shouldShowBadge = useMemo(() => {
      return value !== undefined && value !== null && value !== '';
    }, [value]);

    if (isMessageDate) {
      if (!date) return null;
      return <MessageDateBadge date={date} locale={locale} className={className} />;
    }

    if (!shouldShowBadge) {
      return <BadgeWrapper className={className}>{children}</BadgeWrapper>;
    }

    return (
      <DefaultBadge value={value!} max={max} className={className}>
        {children}
      </DefaultBadge>
    );
  }
);

Badge.displayName = 'Badge';
