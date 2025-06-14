import React from 'react';
import styled, { css } from 'styled-components';

interface ToggleButtonProps {
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
  font-size: 1.2em;
  line-height: 1;

  ${(p) =>
    !p.$showIcon &&
    css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${p.$checked ? 'var(--c-accent)' : '#000000'};
      font-size: 0;
      transition: all 0.2s ease;

      ${p.$checked &&
      css`
        box-shadow: 0 0 8px var(--c-accent);
      `}
    `}
`;

const ToggleText = styled.span`
  line-height: 1.4;
`;

/**
 * ToggleButton component - компонент переключателя состояния
 * @param {React.ReactNode} children - текст кнопки
 * @param {boolean} [checked=false] - состояние кнопки
 * @param {boolean} [disabled=false] - отключена ли кнопка
 * @param {string} [name] - имя группы для радио-режима
 * @param {string} [value] - значение кнопки
 * @param {'small'|'medium'|'large'} [size='medium'] - размер кнопки
 * @param {boolean} [showIcon=false] - показывать иконку (огонек/круг) вместо цветного индикатора
 * @param {function} [onChange] - обработчик изменения состояния
 * @param {string} [className] - CSS класс
 *
 * @example
 * // Обычная toggle кнопка с цветным индикатором
 * <ToggleButton checked={isActive} onChange={(checked) => setIsActive(checked)}>
 *   Toggle me
 * </ToggleButton>
 *
 * // С иконками огонька и круга
 * <ToggleButton showIcon checked={isEnabled}>
 *   Enable feature
 * </ToggleButton>
 *
 * // Маленький размер
 * <ToggleButton size="small" checked={showDetails}>
 *   Show details
 * </ToggleButton>
 *
 * // Отключенная кнопка
 * <ToggleButton disabled checked={false}>
 *   Disabled option
 * </ToggleButton>
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
        {showIcon ? (checked ? '🔥' : '⚫') : ''}
      </ToggleIcon>
      <ToggleText>{children}</ToggleText>
    </StyledToggleButton>
  );
};
