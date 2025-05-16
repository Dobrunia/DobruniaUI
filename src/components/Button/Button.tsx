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

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-4px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
`;

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warning';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  outlined?: boolean;
}

const getButtonStyles = (variant: ButtonVariant, outlined?: boolean) => {
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

const getButtonSize = (size: ButtonSize) => {
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

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-small);
  border-radius: var(--radius-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
  min-width: ${({ fullWidth }) => (fullWidth ? '100%' : 'min-content')};
  min-height: 2.5em;
  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  position: relative;

  ${({ variant = 'primary', outlined }) => getButtonStyles(variant, outlined)}
  ${({ size = 'medium' }) => getButtonSize(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
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

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  outlined = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      isLoading={isLoading}
      outlined={outlined}
      {...props}
    >
      <ButtonContent $isLoading={isLoading}>
        {leftIcon}
        {children}
        {rightIcon}
      </ButtonContent>
      {isLoading && (
        <SpinnerWrapper>
          <SpinnerSvg viewBox="0 0 50 50">
            <SpinnerCircle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
          </SpinnerSvg>
        </SpinnerWrapper>
      )}
    </StyledButton>
  );
};
