import React, { useMemo, useCallback } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled, { css } from 'styled-components';

export interface CardProps {
  /** Основной контент карточки */
  children: React.ReactNode;
  /** Заголовок карточки */
  title?: string;
  /** Подзаголовок или описание */
  subtitle?: string;
  /** Контент в футере карточки */
  footer?: React.ReactNode;
  /** Вариант отображения */
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  /** Кликабельная карточка */
  clickable?: boolean;
  /** Отключенное состояние */
  disabled?: boolean;
  /** Ширина карточки */
  width?: string | number;
  /** Максимальная ширина */
  maxWidth?: string | number;
  /** Дополнительный CSS класс */
  className?: string;
  /** Обработчик клика */
  onClick?: () => void;
}

const CardContainer = styled.div<{
  $variant: string;
  $clickable: boolean;
  $disabled: boolean;
  $width?: string | number;
  $maxWidth?: string | number;
}>`
  display: flex;
  flex-direction: column;
  border-radius: ${DESIGN_TOKENS.radius.large};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  padding: 16px;
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || 'auto')};
  max-width: ${({ $maxWidth }) =>
    typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth || 'none'};

  ${({ $variant }) => {
    switch ($variant) {
      case 'outlined':
        return css`
          background: var(--c-bg-default);
          border: 2px solid var(--c-border);
        `;
      case 'elevated':
        return css`
          background: var(--c-bg-elevated);
          border: 1px solid var(--c-border);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        `;
      case 'flat':
        return css`
          background: var(--c-bg-subtle);
          border: none;
        `;
      default:
        return css`
          background: var(--c-bg-subtle);
          border: 1px solid var(--c-border);
        `;
    }
  }}

  ${({ $clickable, $disabled }) =>
    $clickable &&
    !$disabled &&
    css`
      cursor: pointer;

      &:hover {
        border-color: var(--c-border-focus);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      &:active {
        transform: scale(0.98);
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const CardHeader = styled.div<{ $hasSubtitle: boolean }>`
  margin-bottom: ${({ $hasSubtitle }) => ($hasSubtitle ? '8px' : '16px')};
`;

const CardTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: ${DESIGN_TOKENS.fontSize.large};
  font-weight: 600;
  color: var(--c-text-primary);
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  margin: 0 0 12px 0;
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  color: var(--c-text-secondary);
  line-height: 1.4;
`;

const CardContent = styled.div`
  flex: 1;
  color: var(--c-text-primary);
  line-height: 1.5;
`;

const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

// Мемоизированный компонент для заголовка карточки
const CardHeaderComponent = React.memo<{
  title?: string;
  subtitle?: string;
}>(({ title, subtitle }) => {
  const hasSubtitle = useMemo(() => !!subtitle, [subtitle]);

  if (!title && !subtitle) return null;

  return (
    <CardHeader $hasSubtitle={hasSubtitle}>
      {title && <CardTitle>{title}</CardTitle>}
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    </CardHeader>
  );
});

CardHeaderComponent.displayName = 'CardHeaderComponent';

// Мемоизированный компонент для футера карточки
const CardFooterComponent = React.memo<{
  footer?: React.ReactNode;
}>(({ footer }) => {
  if (!footer) return null;

  return <CardFooter>{footer}</CardFooter>;
});

CardFooterComponent.displayName = 'CardFooterComponent';

/**
 * Card - карточка для отображения контента с заголовком и футером
 * @param children 'React.ReactNode' - основной контент карточки
 * @param title 'string' - заголовок карточки
 * @param subtitle 'string' - подзаголовок или описание
 * @param footer 'React.ReactNode' - контент в футере карточки
 * @param variant 'default' | 'outlined' | 'elevated' | 'flat' = 'default' - вариант отображения
 * @param clickable 'boolean' = false - кликабельная карточка
 * @param disabled 'boolean' = false - отключенное состояние
 * @param width 'string | number' - ширина карточки
 * @param maxWidth 'string | number' - максимальная ширина
 * @param className 'string' - дополнительный CSS класс
 * @param onClick '() => void' - обработчик клика
 */
export const Card: React.FC<CardProps> = React.memo(
  ({
    children,
    title,
    subtitle,
    footer,
    variant = 'default',
    clickable = false,
    disabled = false,
    width,
    maxWidth,
    className,
    onClick,
  }) => {
    // Мемоизируем проверки для предотвращения лишних вычислений
    const hasHeader = useMemo(() => title || subtitle, [title, subtitle]);
    const shouldHandleClick = useMemo(() => clickable && !disabled, [clickable, disabled]);

    // Стабилизируем обработчик клика
    const handleClick = useCallback(() => {
      if (shouldHandleClick && onClick) {
        onClick();
      }
    }, [shouldHandleClick, onClick]);

    return (
      <CardContainer
        $variant={variant}
        $clickable={clickable}
        $disabled={disabled}
        $width={width}
        $maxWidth={maxWidth}
        className={className}
        onClick={shouldHandleClick ? handleClick : undefined}
      >
        {hasHeader && <CardHeaderComponent title={title} subtitle={subtitle} />}

        <CardContent>{children}</CardContent>

        <CardFooterComponent footer={footer} />
      </CardContainer>
    );
  }
);

Card.displayName = 'Card';
