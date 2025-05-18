import React from 'react';
import styled, { keyframes } from 'styled-components';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

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
