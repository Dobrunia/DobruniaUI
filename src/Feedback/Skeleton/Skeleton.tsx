import React from 'react';
import styled, { keyframes } from 'styled-components';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

/**
 * Skeleton component - компонент для отображения плейсхолдера загрузки с анимацией
 * @param {('text'|'circular'|'rectangular'|'rounded')} [variant='text'] - вариант формы:
 *   - text: для текстового контента (скругленные углы)
 *   - circular: для круглых элементов (аватары, иконки)
 *   - rectangular: для прямоугольных элементов без скругления
 *   - rounded: для прямоугольных элементов со скруглением
 * @param {number|string} [width] - ширина компонента (в пикселях или процентах)
 * @param {number|string} [height] - высота компонента (в пикселях или процентах)
 * @param {React.CSSProperties} [style] - дополнительные стили
 * @param {string} [className] - дополнительные CSS классы
 *
 * @example
 * // Текстовый плейсхолдер
 * <Skeleton variant="text" width={200} />
 *
 * // Круглый плейсхолдер (для аватара)
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Прямоугольный плейсхолдер
 * <Skeleton variant="rectangular" width={300} height={200} />
 *
 * // Скругленный плейсхолдер
 * <Skeleton variant="rounded" width="100%" height={100} />
 *
 * // Плейсхолдер с кастомными стилями
 * <Skeleton
 *   variant="text"
 *   width={150}
 *   style={{ margin: '10px 0' }}
 * />
 *
 * // Композиция плейсхолдеров
 * <div>
 *   <Skeleton variant="circular" width={50} height={50} />
 *   <Skeleton variant="text" width={200} style={{ marginLeft: 10 }} />
 *   <Skeleton variant="text" width={150} style={{ marginLeft: 10 }} />
 * </div>
 */
interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const getBorderRadius = (variant: SkeletonVariant) => {
  switch (variant) {
    case 'circular':
      return '50%';
    case 'rounded':
      return 'var(--radius-medium)';
    case 'rectangular':
      return '0';
    case 'text':
    default:
      return 'var(--radius-medium)';
  }
};

const StyledSkeleton = styled.span<{
  $variant: SkeletonVariant;
  $width?: number | string;
  $height?: number | string;
}>`
  display: inline-block;
  background: var(--color-elevated);
  border-radius: ${({ $variant }) => getBorderRadius($variant)};
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width || '100%'};
  height: ${({ $height, $variant }) =>
    $height
      ? typeof $height === 'number'
        ? `${$height}px`
        : $height
      : $variant === 'text'
      ? '1em'
      : '1.2em'};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    background-size: 200px 100%;
    animation: ${shimmer} 1.2s infinite;
  }
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  style,
  className,
}) => {
  return (
    <StyledSkeleton
      $variant={variant}
      $width={width}
      $height={height}
      style={style}
      className={className}
    />
  );
};
