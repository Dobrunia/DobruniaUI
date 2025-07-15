import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

export type SpinnerVariant = 'classic' | 'pulse' | 'dots' | 'ring' | 'bars' | 'waves';
export type SpinnerSize = 'small' | 'medium' | 'large';

export interface LoadingSpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

// Keyframes для различных анимаций
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 60%, 100% { transform: scale(1); }
  80% { transform: scale(1.2); }
`;

const scaleUp = keyframes`
  0% { transform: translate(-50%, -50%) scale(0); }
  60%, 100% { transform: translate(-50%, -50%) scale(1); }
`;

const flash = keyframes`
  0% {
    background-color: color-mix(in srgb, var(--spinner-color) 20%, transparent 80%);
    box-shadow: 32px 0 color-mix(in srgb, var(--spinner-color) 20%, transparent 80%), -32px 0 var(--spinner-color);
  }
  50% {
    background-color: var(--spinner-color);
    box-shadow: 32px 0 color-mix(in srgb, var(--spinner-color) 20%, transparent 80%), -32px 0 color-mix(in srgb, var(--spinner-color) 20%, transparent 80%);
  }
  100% {
    background-color: color-mix(in srgb, var(--spinner-color) 20%, transparent 80%);
    box-shadow: 32px 0 var(--spinner-color), -32px 0 color-mix(in srgb, var(--spinner-color) 20%, transparent 80%);
  }
`;

const fadeInOut = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

const animWaves = keyframes`
  0% { height: var(--wave-height-max); }
  100% { height: var(--wave-height-min); }
`;

// Размеры
const getSizeValues = (size: SpinnerSize) => {
  switch (size) {
    case 'small':
      return {
        width: 24,
        borderWidth: 2,
        dotSize: 8,
        waveWidth: 4,
        waveHeight: 20,
        waveSpacing: 10,
      };
    case 'medium':
      return {
        width: 48,
        borderWidth: 4,
        dotSize: 16,
        waveWidth: 8,
        waveHeight: 40,
        waveSpacing: 20,
      };
    case 'large':
      return {
        width: 72,
        borderWidth: 6,
        dotSize: 24,
        waveWidth: 12,
        waveHeight: 60,
        waveSpacing: 30,
      };
    default:
      return {
        width: 48,
        borderWidth: 4,
        dotSize: 16,
        waveWidth: 8,
        waveHeight: 40,
        waveSpacing: 20,
      };
  }
};

const SpinnerContainer = styled.div<{ $color: string }>`
  display: inline-block;
  --spinner-color: ${({ $color }) => $color};
`;

// Classic Spinner
const ClassicSpinner = styled.div<{ $size: SpinnerSize; $color: string }>`
  width: ${({ $size }) => getSizeValues($size).width}px;
  height: ${({ $size }) => getSizeValues($size).width}px;
  border: ${({ $size }) => getSizeValues($size).borderWidth}px solid
    color-mix(in srgb, var(--spinner-color) 25%, transparent 75%);
  border-top: ${({ $size }) => getSizeValues($size).borderWidth}px solid var(--spinner-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Pulse Spinner
const PulseSpinner = styled.div<{ $size: SpinnerSize; $color: string }>`
  width: ${({ $size }) => getSizeValues($size).width}px;
  height: ${({ $size }) => getSizeValues($size).width}px;
  border: ${({ $size }) => getSizeValues($size).borderWidth}px solid var(--spinner-color);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: ${pulse} 1s linear infinite;

  &:after {
    content: '';
    position: absolute;
    width: ${({ $size }) => getSizeValues($size).width}px;
    height: ${({ $size }) => getSizeValues($size).width}px;
    border: ${({ $size }) => getSizeValues($size).borderWidth}px solid var(--spinner-color);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: ${scaleUp} 1s linear infinite;
  }
`;

// Dots Spinner
const DotsSpinner = styled.div<{ $size: SpinnerSize; $color: string }>`
  width: ${({ $size }) => getSizeValues($size).dotSize}px;
  height: ${({ $size }) => getSizeValues($size).dotSize}px;
  border-radius: 50%;
  background-color: var(--spinner-color);
  box-shadow: ${({ $size }) => getSizeValues($size).dotSize * 2}px 0 var(--spinner-color),
    ${({ $size }) => -getSizeValues($size).dotSize * 2}px 0 var(--spinner-color);
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;

// Ring Spinner
const RingSpinner = styled.div<{ $size: SpinnerSize; $color: string }>`
  width: ${({ $size }) => getSizeValues($size).width}px;
  height: ${({ $size }) => getSizeValues($size).width}px;
  border: ${({ $size }) => getSizeValues($size).borderWidth}px solid transparent;
  border-top: ${({ $size }) => getSizeValues($size).borderWidth}px solid var(--spinner-color);
  border-right: ${({ $size }) => getSizeValues($size).borderWidth}px solid var(--spinner-color);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

// Bars Spinner
const BarsContainer = styled.div<{ $size: SpinnerSize }>`
  display: flex;
  gap: ${({ $size }) => getSizeValues($size).borderWidth}px;
  align-items: center;
`;

const Bar = styled.div<{ $size: SpinnerSize; $color: string; $delay: number }>`
  width: ${({ $size }) => getSizeValues($size).borderWidth * 2}px;
  height: ${({ $size }) => getSizeValues($size).width * 0.6}px;
  background-color: var(--spinner-color);
  animation: ${fadeInOut} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

// Waves Spinner Container
const WavesContainer = styled.div<{ $size: SpinnerSize }>`
  width: ${({ $size }) => getSizeValues($size).waveSpacing * 2 + getSizeValues($size).waveWidth}px;
  height: ${({ $size }) => getSizeValues($size).waveHeight * 1.4}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const WavesSpinner = styled.div<{ $size: SpinnerSize; $color: string }>`
  width: ${({ $size }) => getSizeValues($size).waveWidth}px;
  height: ${({ $size }) => getSizeValues($size).waveHeight}px;
  border-radius: ${({ $size }) => getSizeValues($size).waveWidth / 2}px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--spinner-color);
  color: var(--spinner-color);
  box-sizing: border-box;
  --wave-height-max: ${({ $size }) => getSizeValues($size).waveHeight * 1.2}px;
  --wave-height-min: ${({ $size }) => getSizeValues($size).waveHeight * 0.1}px;
  animation: ${animWaves} 0.3s 0.3s linear infinite alternate;

  &::after,
  &::before {
    content: '';
    width: ${({ $size }) => getSizeValues($size).waveWidth}px;
    height: ${({ $size }) => getSizeValues($size).waveHeight}px;
    border-radius: ${({ $size }) => getSizeValues($size).waveWidth / 2}px;
    background: currentColor;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ $size }) => getSizeValues($size).waveSpacing}px;
    box-sizing: border-box;
    animation: ${animWaves} 0.3s 0.45s linear infinite alternate;
  }

  &::before {
    left: ${({ $size }) => -getSizeValues($size).waveSpacing}px;
    animation-delay: 0s;
  }
`;

// Мемоизированные подкомпоненты
const ClassicSpinnerComponent = React.memo<{ size: SpinnerSize; color: string }>(
  ({ size, color }) => <ClassicSpinner $size={size} $color={color} />
);
ClassicSpinnerComponent.displayName = 'ClassicSpinnerComponent';

const PulseSpinnerComponent = React.memo<{ size: SpinnerSize; color: string }>(
  ({ size, color }) => <PulseSpinner $size={size} $color={color} />
);
PulseSpinnerComponent.displayName = 'PulseSpinnerComponent';

const DotsSpinnerComponent = React.memo<{ size: SpinnerSize; color: string }>(({ size, color }) => (
  <DotsSpinner $size={size} $color={color} />
));
DotsSpinnerComponent.displayName = 'DotsSpinnerComponent';

const RingSpinnerComponent = React.memo<{ size: SpinnerSize; color: string }>(({ size, color }) => (
  <RingSpinner $size={size} $color={color} />
));
RingSpinnerComponent.displayName = 'RingSpinnerComponent';

const BarsSpinnerComponent = React.memo<{ size: SpinnerSize; color: string }>(({ size, color }) => {
  const bars = useMemo(
    () => [
      { delay: 0, key: 'bar-0' },
      { delay: 0.2, key: 'bar-1' },
      { delay: 0.4, key: 'bar-2' },
      { delay: 0.6, key: 'bar-3' },
    ],
    []
  );

  return (
    <BarsContainer $size={size}>
      {bars.map(({ delay, key }) => (
        <Bar key={key} $size={size} $color={color} $delay={delay} />
      ))}
    </BarsContainer>
  );
});
BarsSpinnerComponent.displayName = 'BarsSpinnerComponent';

const WavesSpinnerComponent = React.memo<{ size: SpinnerSize; color: string }>(
  ({ size, color }) => (
    <WavesContainer $size={size}>
      <WavesSpinner $size={size} $color={color} />
    </WavesContainer>
  )
);
WavesSpinnerComponent.displayName = 'WavesSpinnerComponent';

/**
 * LoadingSpinner - анимированный индикатор загрузки с 6 вариантами анимации
 * @param variant 'classic' | 'pulse' | 'dots' | 'ring' | 'bars' | 'waves' = 'classic' - тип анимации
 * @param size 'small' | 'medium' | 'large' = 'medium' - размер спиннера
 * @param color 'string' = 'var(--c-accent)' - цвет спиннера
 * @param className 'string' - дополнительные CSS классы
 */
export const LoadingSpinner = React.memo<LoadingSpinnerProps>(
  ({ variant = 'classic', size = 'medium', color = 'var(--c-accent)', className }) => {
    const spinnerComponent = useMemo(() => {
      switch (variant) {
        case 'pulse':
          return <PulseSpinnerComponent size={size} color={color} />;
        case 'dots':
          return <DotsSpinnerComponent size={size} color={color} />;
        case 'ring':
          return <RingSpinnerComponent size={size} color={color} />;
        case 'bars':
          return <BarsSpinnerComponent size={size} color={color} />;
        case 'waves':
          return <WavesSpinnerComponent size={size} color={color} />;
        case 'classic':
        default:
          return <ClassicSpinnerComponent size={size} color={color} />;
      }
    }, [variant, size, color]);

    return (
      <SpinnerContainer $color={color} className={className}>
        {spinnerComponent}
      </SpinnerContainer>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';
