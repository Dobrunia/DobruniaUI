import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

// --- Circular Progress ---
export interface CircularProgressWithLabelProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const CircleWrapper = styled.div<{ $size: number }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;

const CircleLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  color: var(--c-accent);
  font-weight: 500;
`;

const ProgressCircle = styled.circle`
  transition: stroke-dashoffset 0.5s;
`;

/**
 * CircularProgressWithLabel - круговой прогресс с процентами в центре
 * @param value 'number' - значение прогресса (0-100)
 * @param size 'number' = 64 - размер компонента в пикселях
 * @param strokeWidth 'number' = 5 - толщина линии прогресса
 * @param color 'string' = 'var(--c-accent)' - цвет линии прогресса
 */
export const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
  size = 64,
  strokeWidth = 5,
  color = 'var(--c-accent)',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeValue = Math.min(Math.max(value, 0), 100);
  const offset = circumference * (1 - safeValue / 100);
  return (
    <CircleWrapper $size={size}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='var(--c-border)'
          strokeWidth={strokeWidth}
          fill='none'
        />
        <ProgressCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
        />
      </svg>
      <CircleLabel>{`${Math.round(safeValue)}%`}</CircleLabel>
    </CircleWrapper>
  );
};
// --- Linear Progress ---
export interface LinearProgressProps {
  value?: number; // 0-100, если не задан — indeterminate
  color?: string;
  height?: number;
  className?: string;
}

const indeterminateAnim = keyframes`
  0% { left: -60%; width: 60%; }
  100% { left: 100%; width: 60%; }
`;

const LinearBar = styled.div<{ $height: number }>`
  width: 100%;
  background: var(--c-bg-default);
  border-radius: 999px;
  overflow: hidden;
  height: ${({ $height }) => $height}px;
  position: relative;
`;

const LinearInner = styled.div<{
  $value?: number;
  $color: string;
  $indeterminate: boolean;
}>`
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.4s;
  ${({ $value, $indeterminate }) =>
    $indeterminate
      ? css`
          position: absolute;
          left: 0;
          width: 60%;
          animation: ${indeterminateAnim} 1.2s infinite linear;
        `
      : css`
          width: ${$value ?? 0}%;
        `}
`;

const LinearProgressContainer = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * LinearProgress - линейный прогресс с определенным и неопределенным состоянием
 * @param value 'number' - значение прогресса (0-100). Если не указано - неопределенный прогресс
 * @param color 'string' = 'var(--c-accent)' - цвет полосы прогресса
 * @param height 'number' = 6 - высота полосы прогресса в пикселях
 * @param className 'string' - дополнительные CSS классы
 */
export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  color = 'var(--c-accent)',
  height = 6,
  className,
}) => {
  const indeterminate = value === undefined || value === null;
  return (
    <LinearProgressContainer className={className}>
      <LinearBar $height={height}>
        <LinearInner $value={value} $color={color} $indeterminate={indeterminate} />
      </LinearBar>
    </LinearProgressContainer>
  );
};
