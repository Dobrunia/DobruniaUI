import React from 'react';
import styled, { css } from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

type IconType = 'clock' | 'exclamation' | 'question' | 'dots' | 'exit';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warning';

export interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        width: ${DESIGN_TOKENS.buttonHeight.small};
        height: ${DESIGN_TOKENS.buttonHeight.small};
        font-size: ${DESIGN_TOKENS.fontSize.small};
      `;
    case 'large':
      return css`
        width: ${DESIGN_TOKENS.buttonHeight.large};
        height: ${DESIGN_TOKENS.buttonHeight.large};
        font-size: ${DESIGN_TOKENS.fontSize.large};
      `;
    default:
      return css`
        width: ${DESIGN_TOKENS.buttonHeight.medium};
        height: ${DESIGN_TOKENS.buttonHeight.medium};
        font-size: ${DESIGN_TOKENS.fontSize.medium};
      `;
  }
};

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: var(--c-accent);
        color: var(--c-text-inverse);
        border: none;
        &:hover:not(:disabled) {
          background: var(--c-accent-hover);
        }
        &:active:not(:disabled) {
          background: var(--c-accent-active);
        }
      `;
    case 'secondary':
      return css`
        background: var(--c-bg-elevated);
        color: var(--c-text-primary);
        border: 1px solid var(--c-border);
        &:hover:not(:disabled) {
          background: color-mix(in srgb, var(--c-bg-elevated) 85%, var(--c-text-primary) 15%);
        }
      `;
    case 'warning':
      return css`
        background: var(--c-error);
        color: var(--c-text-inverse);
        border: none;
        &:hover:not(:disabled) {
          background: color-mix(in srgb, var(--c-error) 85%, black 15%);
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

interface StyledIconBtnProps {
  $size: ButtonSize;
  $variant: ButtonVariant;
}

const StyledIconBtn = styled.button<StyledIconBtnProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all ${DESIGN_TOKENS.transition.fast} ease;
  text-decoration: none;
  box-sizing: border-box;
  position: relative;

  ${({ $size }) => getButtonSize($size)}
  ${({ $variant }) => getButtonStyles($variant)}

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

const ClockIcon: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const iconSize = size === 'small' ? '16' : size === 'large' ? '24' : '20';
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
      <polyline points='12,6 12,12 16,14' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
};

const ExclamationIcon: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const iconSize = size === 'small' ? '16' : size === 'large' ? '24' : '20';
  const strokeWidth = size === 'small' ? '2.5' : size === 'large' ? '3' : '2.5';
  const dotRadius = size === 'small' ? '1.2' : size === 'large' ? '1.8' : '1.5';
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1='12'
        y1='7'
        x2='12'
        y2='13'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <circle cx='12' cy='17' r={dotRadius} fill='currentColor' />
    </svg>
  );
};

const QuestionIcon: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const iconSize = size === 'small' ? '16' : size === 'large' ? '24' : '20';
  const strokeWidth = size === 'small' ? '2.2' : size === 'large' ? '2.8' : '2.5';
  const dotRadius = size === 'small' ? '1.2' : size === 'large' ? '1.8' : '1.5';
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.5 8.5a3.5 3.5 0 1 1 7 0c0 2-1.5 2.5-3.5 3.5'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='12' cy='18' r={dotRadius} fill='currentColor' />
    </svg>
  );
};

const DotsIcon: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const iconSize = size === 'small' ? '16' : size === 'large' ? '24' : '20';
  const dotRadius = size === 'small' ? '1.8' : size === 'large' ? '2.5' : '2';
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r={dotRadius} fill='currentColor' />
      <circle cx='19' cy='12' r={dotRadius} fill='currentColor' />
      <circle cx='5' cy='12' r={dotRadius} fill='currentColor' />
    </svg>
  );
};

const ExitIcon: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const iconSize = size === 'small' ? '16' : size === 'large' ? '24' : '20';
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <polyline
        points='16,17 21,12 16,7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line
        x1='21'
        y1='12'
        x2='9'
        y2='12'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const renderIcon = (icon: IconType, size: ButtonSize) => {
  switch (icon) {
    case 'clock':
      return <ClockIcon size={size} />;
    case 'exclamation':
      return <ExclamationIcon size={size} />;
    case 'question':
      return <QuestionIcon size={size} />;
    case 'dots':
      return <DotsIcon size={size} />;
    case 'exit':
      return <ExitIcon size={size} />;
  }
};

/**
 * IconBtn component - квадратная кнопка-иконка с предопределенными иконками
 *
 * @param icon - тип иконки: 'clock' | 'exclamation' | 'question' | 'dots' | 'exit'
 * @param size - размер кнопки: 'small' | 'medium' | 'large'
 * @param variant - стиль кнопки: 'primary' | 'secondary' | 'ghost' | 'warning'
 * @param title - текст для tooltip при наведении
 * @param disabled - заблокированное состояние кнопки
 * @param onClick - (event: React.MouseEvent<HTMLButtonElement>) => void; обработчик клика по кнопке
 * @param className - дополнительные CSS классы
 */
export const IconBtn: React.FC<IconBtnProps> = ({
  icon,
  size = 'medium',
  variant = 'secondary',
  title,
  onClick,
  className,
  ...restProps
}) => {
  return (
    <StyledIconBtn
      $size={size}
      $variant={variant}
      title={title}
      onClick={onClick}
      className={className}
      {...restProps}
    >
      {renderIcon(icon, size)}
    </StyledIconBtn>
  );
};
