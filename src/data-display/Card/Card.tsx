import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
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
  border-radius: var(--radius-large);
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
  font-size: var(--font-size-large);
  font-weight: 600;
  color: var(--c-text-primary);
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  margin: 0 0 12px 0;
  font-size: var(--font-size-medium);
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

/**
 * Card component - компонент карточки для отображения контента
 * @param {React.ReactNode} children - основной контент карточки
 * @param {string} [title] - заголовок карточки
 * @param {string} [subtitle] - подзаголовок или описание
 * @param {React.ReactNode} [footer] - контент в футере карточки
 * @param {'default'|'outlined'|'elevated'|'flat'} [variant='default'] - вариант отображения
 * @param {boolean} [clickable=false] - кликабельная карточка
 * @param {boolean} [disabled=false] - отключенное состояние
 * @param {string|number} [width] - ширина карточки
 * @param {string|number} [maxWidth] - максимальная ширина
 * @param {string} [className] - дополнительный CSS класс
 * @param {() => void} [onClick] - обработчик клика
 *
 * @example
 * // Базовая карточка
 * <Card title="Заголовок" subtitle="Описание">
 *   Основной контент карточки
 * </Card>
 *
 * // Кликабельная карточка с футером
 * <Card
 *   title="Продукт"
 *   subtitle="Описание продукта"
 *   footer={<Button>Купить</Button>}
 *   clickable
 *   onClick={() => navigate('/product')}
 * >
 *   Детальная информация о продукте
 * </Card>
 *
 * // Приподнятая карточка без отступов
 * <Card variant="elevated" padding="none">
 *   <img src="image.jpg" alt="Изображение" />
 *   <div style={{ padding: '16px' }}>
 *     Контент с кастомными отступами
 *   </div>
 * </Card>
 *
 * // Контурная карточка большого размера
 * <Card
 *   variant="outlined"
 *   size="large"
 *   width="400px"
 *   maxWidth="100%"
 * >
 *   Большая карточка с ограниченной шириной
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
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
  const hasHeader = title || subtitle;

  return (
    <CardContainer
      $variant={variant}
      $clickable={clickable}
      $disabled={disabled}
      $width={width}
      $maxWidth={maxWidth}
      className={className}
      onClick={clickable && !disabled ? onClick : undefined}
    >
      {hasHeader && (
        <CardHeader $hasSubtitle={!!subtitle}>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}

      <CardContent>{children}</CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};
