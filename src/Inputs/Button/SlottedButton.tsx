import React from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled, { css } from 'styled-components';
import type { ButtonVariant, ButtonSize } from './variables';
import { buttonVariantStyles, buttonSizeStyles } from './variables';

export interface SlotProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface SlottedButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  outlined?: boolean;
  className?: string;

  // Required center slot
  centerSlot: SlotProps;

  // Optional left and right slots
  leftSlot?: SlotProps;
  rightSlot?: SlotProps;
}

interface StyledSlotProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $outlined: boolean;
  $position: 'left' | 'center' | 'right';
  $hasLeftSlot: boolean;
  $hasRightSlot: boolean;
}

const getSlotStyles = (
  variant: ButtonVariant,
  outlined: boolean,
  position: 'left' | 'center' | 'right',
  hasLeftSlot: boolean,
  hasRightSlot: boolean
) => {
  let borderRadius = '';
  let borderStyles = '';

  // Определяем border-radius для каждого слота
  if (position === 'left') {
    borderRadius = `${DESIGN_TOKENS.radius.medium} 0 0 ${DESIGN_TOKENS.radius.medium}`;
  } else if (position === 'center') {
    borderRadius = '0';
  } else if (position === 'right') {
    borderRadius = `0 ${DESIGN_TOKENS.radius.medium} ${DESIGN_TOKENS.radius.medium} 0`;
  }

  if (outlined) {
    // Для outlined - каждый слот получает полную границу, но соседние перекрываются
    const getBorderColor = () => {
      switch (variant) {
        case 'primary':
          return 'var(--c-accent)';
        case 'warning':
          return 'var(--c-error)';
        case 'secondary':
          return 'var(--c-border)';
        case 'ghost':
          return 'var(--c-text-primary)';
        default:
          return 'var(--c-border)';
      }
    };

    const borderColor = getBorderColor();
    const border = `2px solid ${borderColor}`;

    // Все слоты получают полную границу
    borderStyles = `border: ${border};`;

    // Но соседние границы перекрываются через отрицательные margin'ы
    let marginStyles = '';
    if (position === 'center') {
      if (hasLeftSlot && hasRightSlot) {
        marginStyles = 'margin-left: -2px;';
      } else if (hasLeftSlot) {
        marginStyles = 'margin-left: -2px;';
      } else if (hasRightSlot) {
        marginStyles = 'margin-right: -2px;';
      }
    } else if (position === 'right' && hasLeftSlot) {
      marginStyles = 'margin-left: -2px;';
    }

    borderStyles += marginStyles;
  } else {
    // Для solid - базовый фон + разделители только у центрального слота
    const separatorColor = 'var(--c-border)';
    let separators = '';

    // Разделители только у центрального слота, чтобы избежать дублирования
    if (position === 'center') {
      if (hasLeftSlot) {
        separators += `border-left: 1px solid ${separatorColor};`;
      }
      if (hasRightSlot) {
        separators += `border-right: 1px solid ${separatorColor};`;
      }
    }

    borderStyles = `
      border: none;
      ${separators}
    `;
  }

  // Получаем базовые стили (фон, цвет, ховеры)
  const baseStyles = buttonVariantStyles[variant](outlined);

  return css`
    ${baseStyles}
    border-radius: ${borderRadius};
    ${borderStyles}
  `;
};

const StyledSlot = styled.button<StyledSlotProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${DESIGN_TOKENS.spacing.small};
  cursor: pointer;
  transition: all ${DESIGN_TOKENS.transition.fast};
  position: relative;
  overflow: hidden;

  ${({ $size }) => buttonSizeStyles[$size]}
  ${({ $variant, $outlined, $position, $hasLeftSlot, $hasRightSlot }) =>
    getSlotStyles($variant, $outlined, $position, $hasLeftSlot, $hasRightSlot)}

  /* Боковые слоты стараются быть квадратными */
  ${({ $position, $size }) => {
    if ($position === 'left' || $position === 'right') {
      const height =
        $size === 'small'
          ? DESIGN_TOKENS.buttonHeight.small
          : $size === 'large'
          ? DESIGN_TOKENS.buttonHeight.large
          : DESIGN_TOKENS.buttonHeight.medium;

      return css`
        width: ${height};
        flex-shrink: 0;
        padding: 0;
      `;
    } else {
      return css`
        flex: 1;
        min-width: 0;
      `;
    }
  }}

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

const SlottedButtonContainer = styled.div`
  display: inline-flex;
  align-items: stretch;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  overflow: hidden;
  position: relative;
  max-width: 100%;
`;

const SlotContent = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
  min-width: 0;
`;

/**
 * SlottedButton (SlottedButtonProps) component - кнопка с тремя независимыми слотами
 *
 * @param variant - тип кнопки: 'primary' | 'secondary' | 'ghost' | 'warning'
 * @param size - размер кнопки: 'small' | 'medium' | 'large'
 * @param outlined - outline кнопка
 * @param className - дополнительные CSS классы
 * @param centerSlot - (SlotProps) центральный слот (обязательный): { children?, onClick?, onMouseEnter?, onMouseLeave?, disabled? }
 * @param leftSlot - (SlotProps) левый слот (опциональный): { children?, onClick?, onMouseEnter?, onMouseLeave?, disabled? }
 * @param rightSlot - (SlotProps) правый слот (опциональный): { children?, onClick?, onMouseEnter?, onMouseLeave?, disabled? }
 */
export const SlottedButton: React.FC<SlottedButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  outlined = false,
  className,
  centerSlot,
  leftSlot,
  rightSlot,
}) => {
  const hasLeftSlot = Boolean(leftSlot);
  const hasRightSlot = Boolean(rightSlot);

  // Функция для получения текстового содержимого для title
  const getTextContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return children.toString();
    return '';
  };

  return (
    <SlottedButtonContainer className={className}>
      {leftSlot && (
        <StyledSlot
          $variant={variant}
          $size={size}
          $outlined={outlined}
          $position='left'
          $hasLeftSlot={hasLeftSlot}
          $hasRightSlot={hasRightSlot}
          onClick={leftSlot.onClick}
          onMouseEnter={leftSlot.onMouseEnter}
          onMouseLeave={leftSlot.onMouseLeave}
          disabled={leftSlot.disabled}
          title={getTextContent(leftSlot.children)}
        >
          <SlotContent>{leftSlot.children}</SlotContent>
        </StyledSlot>
      )}

      <StyledSlot
        $variant={variant}
        $size={size}
        $outlined={outlined}
        $position='center'
        $hasLeftSlot={hasLeftSlot}
        $hasRightSlot={hasRightSlot}
        onClick={centerSlot.onClick}
        onMouseEnter={centerSlot.onMouseEnter}
        onMouseLeave={centerSlot.onMouseLeave}
        disabled={centerSlot.disabled}
        title={getTextContent(centerSlot.children)}
      >
        <SlotContent>{centerSlot.children}</SlotContent>
      </StyledSlot>

      {rightSlot && (
        <StyledSlot
          $variant={variant}
          $size={size}
          $outlined={outlined}
          $position='right'
          $hasLeftSlot={hasLeftSlot}
          $hasRightSlot={hasRightSlot}
          onClick={rightSlot.onClick}
          onMouseEnter={rightSlot.onMouseEnter}
          onMouseLeave={rightSlot.onMouseLeave}
          disabled={rightSlot.disabled}
          title={getTextContent(rightSlot.children)}
        >
          <SlotContent>{rightSlot.children}</SlotContent>
        </StyledSlot>
      )}
    </SlottedButtonContainer>
  );
};
