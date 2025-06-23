import React from 'react';
import styled, { css } from 'styled-components';

export interface ToggleButtonProps {
  /** Текст кнопки */
  children: React.ReactNode;
  /** Активна ли кнопка */
  checked?: boolean;
  /** Отключена ли кнопка */
  disabled?: boolean;
  /** Имя группы для радио-режима */
  name?: string;
  /** Значение кнопки */
  value?: string;
  /** Размер кнопки */
  size?: 'small' | 'medium' | 'large';
  /** Показывать иконку (огонек/круг) или просто цветной индикатор */
  showIcon?: boolean;
  /** Обработчик изменения состояния */
  onChange?: (checked: boolean, value?: string) => void;
  /** CSS класс */
  className?: string;
}

const StyledToggleButton = styled.button<{
  $checked: boolean;
  $disabled: boolean;
  $size: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background: var(--c-bg-subtle);
  color: var(--c-text-primary);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  ${(p) =>
    p.$size === 'small' &&
    css`
      padding: 6px 10px;
      font-size: 12px;
      gap: 6px;
    `}

  ${(p) =>
    p.$size === 'medium' &&
    css`
      padding: 8px 12px;
      font-size: 14px;
      gap: 8px;
    `}

  ${(p) =>
    p.$size === 'large' &&
    css`
      padding: 10px 16px;
      font-size: 16px;
      gap: 10px;
    `}

  ${(p) =>
    p.$disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  &:hover:not(:disabled) {
    background: color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-accent) 20%);
    border-color: var(--c-border-focus);
  }
`;

const ToggleIcon = styled.span<{ $showIcon: boolean; $checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.2s ease;
  width: 20px;
  height: 20px;

  ${(p) =>
    p.$showIcon && p.$checked
      ? css`
          font-size: 1.2em;
          filter: drop-shadow(0 0 4px rgba(255, 107, 53, 0.6));
        `
      : css`
          font-size: 0;

          &::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${p.$checked ? 'var(--c-accent)' : '#000000'};
            display: block;
            transition: all 0.2s ease;
            ${p.$checked &&
            css`
              box-shadow: 0 0 8px var(--c-accent);
            `}
          }
        `}
`;

const ToggleText = styled.span`
  line-height: 1.4;
`;

/**
 * ToggleButton component - компонент переключателя состояния
 * @param children 'ReactNode' - текст кнопки
 * @param checked 'boolean' = false - состояние кнопки
 * @param disabled 'boolean' = false - отключена ли кнопка
 * @param name 'string' - имя группы для радио-режима
 * @param value 'string' - значение кнопки
 * @param size 'small | medium | large' = 'medium' - размер кнопки
 * @param showIcon 'boolean' = false - показывать иконку (огонек/круг) вместо цветного индикатора
 * @param onChange '(checked: boolean, value?: string) => void' - обработчик изменения состояния
 * @param className 'string' - дополнительные CSS классы
 */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  checked = false,
  disabled = false,
  name,
  value,
  size = 'medium',
  showIcon = false,
  onChange,
  className,
  ...props
}) => {
  const handleClick = () => {
    if (disabled) return;

    const newChecked = !checked;
    onChange?.(newChecked, value);
  };

  return (
    <StyledToggleButton
      type='button'
      $checked={checked}
      $disabled={disabled}
      $size={size}
      onClick={handleClick}
      disabled={disabled}
      data-name={name}
      data-value={value}
      className={className}
      {...props}
    >
      <ToggleIcon $showIcon={showIcon} $checked={checked}>
        {showIcon && checked ? '🔥' : null}
      </ToggleIcon>
      <ToggleText>{children}</ToggleText>
    </StyledToggleButton>
  );
};
