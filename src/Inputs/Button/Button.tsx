import React from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  outlined?: boolean;
  shape?: ButtonShape;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
          width: ${DESIGN_TOKENS.buttonHeight.small};
          height: ${DESIGN_TOKENS.buttonHeight.small};
          padding: 0;
          font-size: ${DESIGN_TOKENS.fontSize.small};
        `;
      case 'large':
        return css`
          width: ${DESIGN_TOKENS.buttonHeight.large};
          height: ${DESIGN_TOKENS.buttonHeight.large};
          padding: 0;
          font-size: ${DESIGN_TOKENS.fontSize.large};
        `;
      default:
        return css`
          width: ${DESIGN_TOKENS.buttonHeight.medium};
          height: ${DESIGN_TOKENS.buttonHeight.medium};
          padding: 0;
          font-size: ${DESIGN_TOKENS.fontSize.medium};
        `;
    }
  }
  if (shape === 'square') {
    switch (size) {
      case 'small':
        return css`
          width: ${DESIGN_TOKENS.buttonHeight.small};
          height: ${DESIGN_TOKENS.buttonHeight.small};
          padding: 0;
          font-size: ${DESIGN_TOKENS.fontSize.small};
        `;
      case 'large':
        return css`
          width: ${DESIGN_TOKENS.buttonHeight.large};
          height: ${DESIGN_TOKENS.buttonHeight.large};
          padding: 0;
          font-size: ${DESIGN_TOKENS.fontSize.large};
        `;
      default:
        return css`
          width: ${DESIGN_TOKENS.buttonHeight.medium};
          height: ${DESIGN_TOKENS.buttonHeight.medium};
          padding: 0;
          font-size: ${DESIGN_TOKENS.fontSize.medium};
        `;
    }
  }
  switch (size) {
    case 'small':
      return css`
        height: ${DESIGN_TOKENS.buttonHeight.small};
        padding: 0 ${DESIGN_TOKENS.spacing.small};
        font-size: ${DESIGN_TOKENS.fontSize.small};
      `;
    case 'large':
      return css`
        height: ${DESIGN_TOKENS.buttonHeight.large};
        padding: 0 ${DESIGN_TOKENS.spacing.large};
        font-size: ${DESIGN_TOKENS.fontSize.large};
      `;
    default:
      return css`
        height: ${DESIGN_TOKENS.buttonHeight.medium};
        padding: 0 ${DESIGN_TOKENS.spacing.medium};
        font-size: ${DESIGN_TOKENS.fontSize.medium};
      `;
  }
};

const getButtonStyles = (variant: ButtonVariant, outlined?: boolean, shape?: ButtonShape) => {
  if (variant === 'close' && shape === 'circle') {
    return css`
      background: var(--c-bg-elevated);
      color: var(--c-error);
      border: 1px solid var(--c-error);
      &:hover:not(:disabled) {
        background: var(--c-error);
        color: var(--c-text-inverse);
        svg line {
          stroke: var(--c-text-inverse);
        }
      }
    `;
  }
  if (variant === 'send') {
    // icon-only send button (no bg, no border)
    return css`
      background: none;
      color: var(--c-accent);
      border: none;
      box-shadow: none;
      padding: 0;
      min-width: 0;
      min-height: 0;
      &:hover:not(:disabled) {
        color: color-mix(in srgb, var(--c-accent) 80%, black 20%);
        background: none;
      }
    `;
  }
  if (variant === 'close') {
    return css`
      background: transparent;
      color: var(--c-error);
      border: 2px solid var(--c-error);
      &:hover:not(:disabled) {
        background: var(--c-error);
        color: var(--c-text-inverse);
        svg line {
          stroke: var(--c-text-inverse);
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
            ? 'var(--c-error)'
            : variant === 'primary'
            ? 'var(--c-accent)'
            : 'var(--c-bg-elevated)'};
          color: var(--c-text-inverse);
        }
      `
    : css`
        border: none;
      `;

  switch (variant) {
    case 'primary':
      return css`
        ${baseStyles}
        background: ${outlined ? 'transparent' : 'var(--c-accent)'};
        color: ${outlined ? 'var(--c-accent)' : 'var(--c-text-inverse)'};
        border-color: var(--c-accent);
        &:hover:not(:disabled) {
          background: ${outlined
            ? 'var(--c-accent)'
            : 'color-mix(in srgb, var(--c-accent) 85%, black 15%)'};
          color: var(--c-text-inverse);
        }
      `;
    case 'secondary':
      return css`
        ${baseStyles}
        background: ${outlined ? 'transparent' : 'var(--c-bg-elevated)'};
        color: ${outlined ? 'var(--c-text-primary)' : 'var(--c-text-primary)'};
        border-color: var(--c-border);
        &:hover:not(:disabled) {
          background: ${outlined
            ? 'var(--c-bg-elevated)'
            : 'color-mix(in srgb, var(--c-bg-elevated) 85%, var(--c-text-primary) 15%)'};
          color: var(--c-text-primary);
        }
      `;
    case 'warning':
      return css`
        ${baseStyles}
        background: ${outlined ? 'transparent' : 'var(--c-error)'};
        color: ${outlined ? 'var(--c-error)' : 'var(--c-text-inverse)'};
        border-color: var(--c-error);
        &:hover:not(:disabled) {
          background: ${outlined
            ? 'var(--c-error)'
            : 'color-mix(in srgb, var(--c-error) 85%, black 15%)'};
          color: var(--c-text-inverse);
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: var(--c-text-primary);
        border: none;
        &:hover:not(:disabled) {
          background: var(--c-bg-elevated);
        }
      `;
  }
};

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $isLoading?: boolean;
  $outlined?: boolean;
  $shape?: ButtonShape;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${DESIGN_TOKENS.spacing.small};
  border-radius: ${({ $shape, $variant }) =>
    ($shape as ButtonShape) === 'circle' ||
    ($variant === 'close' && ($shape as ButtonShape) === 'circle')
      ? '50%'
      : $shape === 'square'
      ? DESIGN_TOKENS.radius.medium
      : DESIGN_TOKENS.radius.medium};
  cursor: pointer;
  transition: all ${DESIGN_TOKENS.transition.fast};
  width: ${({ $fullWidth, $variant, $shape }) =>
    $variant === 'send'
      ? '24px'
      : $fullWidth
      ? '100%'
      : $shape === 'circle' || $shape === 'square'
      ? undefined
      : 'max-content'};
  min-width: ${({ $fullWidth, $variant }) =>
    $variant === 'send' ? '0' : $fullWidth ? '100%' : 'min-content'};

  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
  pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')};
  position: relative;
  font-size: 1rem;

  ${({ $variant = 'primary', $outlined, $shape }) => getButtonStyles($variant, $outlined, $shape)}
  ${({ $size = 'medium', $shape = 'default', $variant }) => getButtonSize($size, $shape, $variant)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--c-accent);
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
      stroke={color || 'var(--c-error)'}
      strokeWidth='2'
      strokeLinecap='round'
    />
    <line
      x1='12'
      y1='4'
      x2='4'
      y2='12'
      stroke={color || 'var(--c-error)'}
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

/**
 * Button component - универсальная кнопка с различными вариантами оформления
 *
 * @param children - текст кнопки
 * @param variant - тип кнопки: 'primary' | 'secondary' | 'ghost' | 'warning' | 'send' | 'close'
 * @param size - размер кнопки: 'small' | 'medium' | 'large'
 * @param fullWidth - растянуть кнопку на всю ширину
 * @param isLoading - показать загрузку
 * @param leftIcon - иконка слева
 * @param rightIcon - иконка справа
 * @param outlined - outline кнопка
 * @param shape - форма кнопки: 'default' | 'circle' | 'square'
 * @param className - дополнительные CSS классы
 * @param onClick - (event: React.MouseEvent<HTMLButtonElement>) => void; обработчик клика по кнопке
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
  className,
  ...restProps
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
    icon = <CloseIcon color={shape === 'circle' ? undefined : 'var(--c-error)'} />;
  const isIconOnly = variant === 'send' || variant === 'close';

  return (
    <StyledButton
      $variant={variant}
      $size={finalSize}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      $outlined={outlined}
      $shape={shape}
      className={className}
      {...restProps}
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
