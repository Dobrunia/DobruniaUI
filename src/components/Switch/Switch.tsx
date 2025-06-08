import React from 'react';
import styled from 'styled-components';
import { TRACK_WIDTH, TRACK_HEIGHT, THUMB_SIZE, TRACK_PADDING } from './variables';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const SwitchWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-small);
  cursor: pointer;
  font-size: var(--font-size-medium);
  color: var(--text-body);
  user-select: none;
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomTrack = styled.span<{ checked: boolean; disabled?: boolean }>`
  width: ${TRACK_WIDTH}px;
  height: ${TRACK_HEIGHT}px;
  border-radius: ${TRACK_HEIGHT / 2}px;
  background: ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--color-elevated)')};
  border: 2px solid
    ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--color-elevated-active)')};
  display: flex;
  align-items: center;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  box-sizing: border-box;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ checked, disabled }) =>
      !disabled && !checked ? 'var(--color-elevated-active)' : undefined};
    border-color: ${({ checked, disabled }) =>
      !disabled && !checked ? 'var(--color-primary)' : undefined};
  }
`;

const CustomThumb = styled.span<{ checked: boolean }>`
  position: absolute;
  top: ${TRACK_PADDING}px;
  left: ${({ checked }) => (checked ? `${THUMB_SIZE}px` : `${TRACK_PADDING}px`)};
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: left var(--transition-fast), background var(--transition-fast);
  border: 1.5px solid var(--color-elevated-active);
`;

const LabelText = styled.span`
  line-height: 1.2;
  display: inline-block;
`;

/**
 * Switch component - компонент для переключения состояния
 * @param {boolean} checked - состояние переключателя
 * @param {(checked: boolean) => void} onChange - функция обработки изменения состояния
 * @param {string} label - текст подписи
 * @param {boolean} disabled - флаг, указывающий, переключатель отключен
 * @param {string} id - id для input (если нужно связать с label)
 * @param {string} className - класс для обертки
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled,
  id,
  className,
}) => {
  return (
    <SwitchWrapper htmlFor={id} className={className} $disabled={disabled}>
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <CustomTrack checked={checked} disabled={disabled}>
        <CustomThumb checked={checked} />
      </CustomTrack>
      {label && <LabelText>{label}</LabelText>}
    </SwitchWrapper>
  );
};
