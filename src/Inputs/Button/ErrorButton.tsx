import React from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export interface ErrorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipText?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IconContainerProps {
  $size?: 'small' | 'medium' | 'large';
}

const StyledErrorButton = styled.button<{ $size?: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--c-error) 10%, transparent);
  color: var(--c-error);
  border: none;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: all ${DESIGN_TOKENS.transition.fast} ease;
  text-decoration: none;
  box-sizing: border-box;
  position: relative;

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          width: ${DESIGN_TOKENS.buttonHeight.small};
          height: ${DESIGN_TOKENS.buttonHeight.small};
          font-size: ${DESIGN_TOKENS.fontSize.medium};
        `;
      case 'large':
        return `
          width: ${DESIGN_TOKENS.buttonHeight.large};
          height: ${DESIGN_TOKENS.buttonHeight.large};
          font-size: ${DESIGN_TOKENS.fontSize.large};
        `;
      default:
        return `
          width: ${DESIGN_TOKENS.buttonHeight.medium};
          height: ${DESIGN_TOKENS.buttonHeight.medium};
          font-size: ${DESIGN_TOKENS.fontSize.large};
        `;
    }
  }}

  &:hover:not(:disabled) {
    background: color-mix(in srgb, var(--c-error) 15%, transparent);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: color-mix(in srgb, var(--c-error) 5%, transparent);
    color: var(--c-error);
  }

  &[title]:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--c-bg-elevated);
    color: var(--c-text-primary);
    padding: ${DESIGN_TOKENS.spacing.tiny} ${DESIGN_TOKENS.spacing.small};
    border-radius: ${DESIGN_TOKENS.radius.small};
    font-size: ${DESIGN_TOKENS.fontSize.small};
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--c-border);
    pointer-events: none;
    animation: fadeIn 0.2s ease;
  }

  &[title]:hover::before {
    content: '';
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--c-bg-elevated);
    z-index: 1000;
    pointer-events: none;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--c-error);
  color: var(--c-text-inverse);
  transition: all ${DESIGN_TOKENS.transition.fast} ease;

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          width: 20px;
          height: 20px;
        `;
      case 'large':
        return `
          width: 28px;
          height: 28px;
        `;
      default:
        return `
          width: 24px;
          height: 24px;
        `;
    }
  }}
`;

const ExclamationIcon: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({
  size = 'medium',
}) => {
  const iconSize = size === 'small' ? '12' : size === 'large' ? '16' : '14';
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 1L8 9M8 13L8 13.01'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

/**
 * ErrorButton component - квадратная кнопка ошибки с восклицательным знаком и tooltip
 *
 * @param tooltipText - текст подсказки при наведении
 * @param size - размер кнопки: 'small' | 'medium' | 'large'
 * @param disabled - заблокированное состояние кнопки
 * @param onClick - (event: React.MouseEvent<HTMLButtonElement>) => void; обработчик клика по кнопке
 * @param className - дополнительные CSS классы
 */
export const ErrorButton: React.FC<ErrorButtonProps> = ({
  tooltipText,
  size = 'medium',
  onClick,
  className,
  ...restProps
}) => {
  return (
    <StyledErrorButton
      $size={size}
      title={tooltipText}
      aria-label={tooltipText || 'Error'}
      onClick={onClick}
      className={className}
      {...restProps}
    >
      <IconContainer $size={size}>
        <ExclamationIcon size={size} />
      </IconContainer>
    </StyledErrorButton>
  );
};
