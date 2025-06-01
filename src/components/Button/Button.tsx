import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warning' | 'send' | 'close';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonShape = 'default' | 'circle' | 'square';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  outlined?: boolean;
  shape?: ButtonShape;
}

const getButtonSize = (size: ButtonSize, shape: ButtonShape, variant?: ButtonVariant) => {
  if (variant === 'send') {
    return css`
      width: 24px;
      height: 24px;
      min-width: 0;
      min-height: 0;
      padding: 0;
      font-size: 20px;
    `;
  }
  if (variant === 'close' && shape === 'circle') {
    return css`
      width: 22px;
      height: 22px;
      min-width: 0;
      min-height: 0;
      padding: 0;
      font-size: 16px;
    `;
  }
  if (shape === 'circle') {
    switch (size) {
      case 'small':
        return css`
          width: 32px;
          height: 32px;
          padding: 0;
          font-size: var(--font-size-small);
        `;
      case 'large':
        return css`
          width: 48px;
          height: 48px;
          padding: 0;
          font-size: var(--font-size-large);
        `;
      default:
        return css`
          width: 40px;
          height: 40px;
          padding: 0;
          font-size: var(--font-size-medium);
        `;
    }
  }
  if (shape === 'square') {
    switch (size) {
      case 'small':
        return css`
          width: 32px;
          height: 32px;
          padding: 0;
          font-size: var(--font-size-small);
        `;
      case 'large':
        return css`
          width: 48px;
          height: 48px;
          padding: 0;
          font-size: var(--font-size-large);
        `;
      default:
        return css`
          width: 40px;
          height: 40px;
          padding: 0;
          font-size: var(--font-size-medium);
        `;
    }
  }
  switch (size) {
    case 'small':
      return css`
        padding: var(--spacing-tiny) var(--spacing-small);
        font-size: var(--font-size-small);
      `;
    case 'large':
      return css`
        padding: var(--spacing-medium) var(--spacing-large);
        font-size: var(--font-size-large);
      `;
    default:
      return css`
        padding: var(--spacing-small) var(--spacing-medium);
        font-size: var(--font-size-medium);
      `;
  }
};

const getButtonStyles = (variant: ButtonVariant, outlined?: boolean, shape?: ButtonShape) => {
  if (variant === 'close' && shape === 'circle') {
    return css`
      background: var(--color-surface);
      color: var(--color-error);
      border: 1px solid var(--color-error);
      &:hover:not(:disabled) {
        background: var(--color-error);
        svg line {
          stroke: #fff;
        }
      }
    `;
  }
  if (variant === 'send') {
    // icon-only send button (no bg, no border)
    return css`
      background: none;
      color: var(--color-primary);
      border: none;
      box-shadow: none;
      padding: 0;
      min-width: 0;
      min-height: 0;
      &:hover:not(:disabled) {
        color: color-mix(in srgb, var(--color-primary) 80%, black 20%);
        background: none;
      }
    `;
  }
  if (variant === 'close') {
    return css`
      background: transparent;

      color: var(--color-error);
      border: 2px solid var(--color-error);
      &:hover:not(:disabled) {
        background: var(--color-error);
        svg line {
          stroke: #fff;
        }
      }
    `;
  }
  const baseStyles = outlined
    ? css`
        background: transparent;
        border: 2px solid;
        &:hover:not(:disabled) {
          background: ${variant === 'warning'
            ? 'var(--color-error)'
            : variant === 'primary'
            ? 'var(--color-primary)'
            : 'var(--color-secondary)'};
          color: white;
        }
      `
    : css`
        border: none;
      `;

  switch (variant) {
    case 'primary':
      return css`
        ${baseStyles}
        background: ${outlined ? 'transparent' : 'var(--color-primary)'};
        color: ${outlined ? 'var(--color-primary)' : 'white'};
        border-color: var(--color-primary);
        &:hover:not(:disabled) {
          background: ${outlined
            ? 'var(--color-primary)'
            : 'color-mix(in srgb, var(--color-primary) 90%, black 10%)'};
          color: white;
        }
      `;
    case 'secondary':
      return css`
        ${baseStyles}
        background: ${outlined ? 'transparent' : 'var(--color-secondary)'};
        color: ${outlined ? 'var(--color-secondary)' : 'var(--text-heading)'};
        border-color: var(--color-secondary);
        &:hover:not(:disabled) {
          background: ${outlined
            ? 'var(--color-secondary)'
            : 'color-mix(in srgb, var(--color-secondary) 90%, black 10%)'};
          color: ${outlined ? 'var(--text-heading)' : 'var(--text-heading)'};
        }
      `;
    case 'warning':
      return css`
        ${baseStyles}
        background: ${outlined ? 'transparent' : 'var(--color-error)'};
        color: ${outlined ? 'var(--color-error)' : 'white'};
        border-color: var(--color-error);
        &:hover:not(:disabled) {
          background: ${outlined
            ? 'var(--color-error)'
            : 'color-mix(in srgb, var(--color-error) 90%, black 10%)'};
          color: white;
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: var(--text-heading);
        border: none;
        &:hover:not(:disabled) {
          background: var(--color-elevated);
        }
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-small);
  border-radius: ${({ shape, variant }) =>
    (shape as ButtonShape) === 'circle' ||
    (variant === 'close' && (shape as ButtonShape) === 'circle')
      ? '50%'
      : shape === 'square'
      ? 'var(--radius-medium)'
      : 'var(--radius-medium)'};
  cursor: pointer;
  transition: all var(--transition-fast);
  width: ${({ fullWidth, variant, shape }) =>
    variant === 'send'
      ? '24px'
      : fullWidth
      ? '100%'
      : shape === 'circle' || shape === 'square'
      ? undefined
      : 'max-content'};
  min-width: ${({ fullWidth, variant }) =>
    variant === 'send' ? '0' : fullWidth ? '100%' : 'min-content'};
  min-height: ${({ variant }) => (variant === 'send' ? '0' : '2.5em')};
  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  position: relative;
  font-size: 1rem;

  ${({ variant = 'primary', outlined, shape }) => getButtonStyles(variant, outlined, shape)}
  ${({ size = 'medium', shape = 'default', variant }) => getButtonSize(size, shape, variant)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  svg {
    display: block;
    margin: auto;
    pointer-events: none;
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.2em;
  height: 1.2em;
`;

const SpinnerSvg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 100%;
  height: 100%;
`;

const SpinnerCircle = styled.circle`
  stroke: currentColor;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`;

const ButtonContent = styled.span<{ $isLoading: boolean }>`
  visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
`;

const SendIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' fill='currentColor' />
  </svg>
);

const CloseIcon = ({ color }: { color?: string }) => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <line
      x1='4'
      y1='4'
      x2='12'
      y2='12'
      stroke={color || 'var(--color-error)'}
      strokeWidth='2'
      strokeLinecap='round'
    />
    <line
      x1='12'
      y1='4'
      x2='4'
      y2='12'
      stroke={color || 'var(--color-error)'}
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

/**
 * Button component
 * @param {ReactNode} children - текст кнопки
 * @param {('primary'|'secondary'|'ghost'|'warning'|'send'|'close')} [variant='primary'] - тип кнопки
 * @param {('small'|'medium'|'large')} [size='medium'] - размер кнопки
 * @param {boolean} [fullWidth=false] - растянуть кнопку на всю ширину
 * @param {boolean} [isLoading=false] - показать загрузку
 * @param {ReactNode} [leftIcon] - иконка слева
 * @param {ReactNode} [rightIcon] - иконка справа
 * @param {boolean} [outlined] - outline кнопка
 * @param {('default'|'circle'|'square')} [shape='default'] - форма кнопки
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - остальные пропсы кнопки
 * @example
 * // Primary button
 * <Button>Click me</Button>
 *
 * // Secondary outlined button with icon
 * <Button variant="secondary" outlined leftIcon={<Icon />}>
 *   With Icon
 * </Button>
 *
 * // Small loading button
 * <Button size="small" isLoading>
 *   Loading
 * </Button>
 *
 * // Circle close button
 * <Button variant="close" shape="circle" />
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size: sizeProp,
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  outlined: outlinedProp,
  shape: shapeProp,
  ...props
}) => {
  let outlined = outlinedProp;
  let shape = shapeProp;
  let size = sizeProp;

  if (variant === 'close') {
    if (size === undefined) size = 'small';
    outlined = true;
    if (!shape) shape = 'square';
  }
  if (variant === 'close' && shape === 'circle') {
    outlined = false;
    size = 'small';
  }
  if (variant === 'send') {
    outlined = false;
    shape = 'square';
  }
  // Если size не определён, по умолчанию medium
  const finalSize = size ?? 'medium';

  let icon = leftIcon;
  if (variant === 'send') icon = <SendIcon />;
  if (variant === 'close')
    icon = <CloseIcon color={shape === 'circle' ? undefined : 'var(--color-error)'} />;
  const isIconOnly = variant === 'send' || variant === 'close';

  return (
    <StyledButton
      variant={variant}
      size={finalSize}
      fullWidth={fullWidth}
      isLoading={isLoading}
      outlined={outlined}
      shape={shape}
      {...props}
    >
      <ButtonContent $isLoading={isLoading}>
        {icon}
        {!isIconOnly && children}
        {!isIconOnly && rightIcon}
      </ButtonContent>
      {isLoading && (
        <SpinnerWrapper>
          <SpinnerSvg viewBox='0 0 50 50'>
            <SpinnerCircle cx='25' cy='25' r='20' fill='none' strokeWidth='4' />
          </SpinnerSvg>
        </SpinnerWrapper>
      )}
    </StyledButton>
  );
};
