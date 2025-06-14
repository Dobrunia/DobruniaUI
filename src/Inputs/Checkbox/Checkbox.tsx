import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  /**
   * Состояние чекбокса (отмечен или нет)
   */
  checked: boolean;
  /**
   * Callback при изменении состояния
   */
  onChange: (checked: boolean) => void;
  /**
   * Подпись к чекбоксу
   */
  label?: string;
  /**
   * Отключить чекбокс
   */
  disabled?: boolean;
  /**
   * id для input (если нужно связать с label)
   */
  id?: string;
  /**
   * Класс для обертки
   */
  className?: string;
}

const CheckboxWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-small);
  cursor: pointer;
  font-size: var(--font-size-medium);
  color: var(--c-text-primary);
  user-select: none;
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  &:hover .custom-checkbox-box {
    border-color: ${({ $disabled }) => ($disabled ? 'var(--c-accent)' : 'var(--c-accent)')};
    background: ${({ $disabled }) =>
      $disabled ? 'inherit' : 'color-mix(in srgb, var(--c-accent) 10%, transparent 90%)'};
  }
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomBox = styled.span<{ checked: boolean; disabled?: boolean }>`
  width: 1.1em;
  height: 1.1em;
  border: 2px solid var(--c-accent);
  border-radius: var(--radius-medium);
  background: ${({ checked }) => (checked ? 'var(--c-accent)' : 'var(--c-bg-subtle)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  box-sizing: border-box;
  margin-right: 0.5em;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &::after {
    content: '';
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    width: 0.5em;
    height: 0.9em;
    border: solid #fff;
    border-width: 0 0.18em 0.18em 0;
    transform: rotate(45deg);
    margin-left: 0.18em;
    margin-top: -0.1em;
  }

  /* Для hover-эффекта через родителя */
  &.custom-checkbox-box {
    /* просто для селектора */
  }
`;

/**
 * Checkbox component - компонент чекбокса
 * @param {boolean} checked - отмечен ли чекбокс
 * @param {(checked: boolean) => void} onChange - обработчик изменения
 * @param {string} [label] - подпись
 * @param {boolean} [disabled] - отключен ли чекбокс
 * @param {string} [id] - id для input
 * @param {string} [className] - класс для обертки
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
  id,
  className,
}) => {
  return (
    <CheckboxWrapper htmlFor={id} className={className} $disabled={disabled}>
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <CustomBox checked={checked} disabled={disabled} className='custom-checkbox-box' />
      {label && <span>{label}</span>}
    </CheckboxWrapper>
  );
};
