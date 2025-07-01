import React from 'react';
import styled, { keyframes } from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
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
      return DESIGN_TOKENS.radius.medium;
    case 'rectangular':
      return '0';
    case 'text':
    default:
      return DESIGN_TOKENS.radius.medium;
  }
};

const StyledSkeleton = styled.span<{
  $variant: SkeletonVariant;
  $width?: number | string;
  $height?: number | string;
}>`
  display: inline-block;
  background: color-mix(in srgb, var(--c-text-secondary) 25%, var(--c-bg-subtle) 75%);
  border-radius: ${({ $variant }) => getBorderRadius($variant)};
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
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
      color-mix(in srgb, var(--c-text-secondary) 40%, var(--c-bg-elevated) 60%),
      transparent
    );
    background-size: 200px 100%;
    animation: ${shimmer} 1.2s infinite;
    opacity: 0.8;
  }
`;

/**
 * Skeleton - анимированный плейсхолдер с эффектом shimmer для состояния загрузки
 * @param variant 'text' | 'circular' | 'rectangular' | 'rounded' = 'text' - форма плейсхолдера
 * @param width 'number | string' - ширина компонента (px или %)
 * @param height 'number | string' - высота компонента (px или %)
 * @param className 'string' - дополнительные CSS классы
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
}) => {
  return (
    <StyledSkeleton $variant={variant} $width={width} $height={height} className={className} />
  );
};
