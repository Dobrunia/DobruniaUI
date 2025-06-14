import React from 'react';
import styled from 'styled-components';

interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const RadioWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-small);
  cursor: pointer;
  font-size: var(--font-size-medium);
  color: var(--c-text-primary);
  user-select: none;
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  &:hover .custom-radio-box {
    border-color: ${({ $disabled }) => ($disabled ? 'var(--c-accent)' : 'var(--c-accent)')};
    background: ${({ $disabled }) =>
      $disabled ? 'inherit' : 'color-mix(in srgb, var(--c-accent) 10%, transparent 90%)'};
  }
`;

const HiddenInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomCircle = styled.span<{ checked: boolean; disabled?: boolean }>`
  width: 1.1em;
  height: 1.1em;
  border: 2px solid var(--c-accent);
  border-radius: 50%;
  background: ${({ checked }) => (checked ? 'var(--c-accent)' : 'var(--c-bg-subtle)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  box-sizing: border-box;
  margin-right: 0.5em;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &.custom-radio-box {
    /* для hover через родителя */
  }
`;

/**
 * Radio component - компонент для выбора одного варианта из нескольких
 * @param {boolean} checked - состояние выбора (true - выбран, false - не выбран)
 * @param {(checked: boolean) => void} onChange - функция обработки изменения состояния
 * @param {string} label - текст подписи
 * @param {boolean} disabled - флаг, указывающий, выключен ли радиобаттон
 * @param {string} id - уникальный идентификатор
 */
export const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  label,
  disabled,
  id,
  name,
  className,
}) => {
  return (
    <RadioWrapper htmlFor={id} className={className} $disabled={disabled}>
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        name={name}
      />
      <CustomCircle checked={checked} disabled={disabled} className='custom-radio-box' />
      {label && <span>{label}</span>}
    </RadioWrapper>
  );
};
