import React from 'react';
import styled from 'styled-components';
import {
  TRACK_WIDTH,
  TRACK_HEIGHT,
  THUMB_SIZE,
  TRACK_PADDING,
  SwitchWrapper,
  LabelText,
} from './variables';
import { DESIGN_TOKENS } from '../../styles/designTokens';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomTrack = styled.span<{ $checked: boolean; $disabled?: boolean }>`
  width: ${TRACK_WIDTH}px;
  height: ${TRACK_HEIGHT}px;
  border-radius: ${TRACK_HEIGHT / 2}px;
  background: ${({ $checked }) => ($checked ? 'var(--c-accent)' : 'var(--c-bg-elevated)')};
  border: 2px solid ${({ $checked }) => ($checked ? 'var(--c-accent)' : 'var(--c-border)')};
  display: flex;
  align-items: center;
  transition: background ${DESIGN_TOKENS.transition.fast},
    border-color ${DESIGN_TOKENS.transition.fast};
  box-sizing: border-box;
  position: relative;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ $checked, $disabled }) =>
      !$disabled && !$checked
        ? 'color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-accent) 20%)'
        : undefined};
    border-color: ${({ $checked, $disabled }) =>
      !$disabled && !$checked ? 'var(--c-accent)' : undefined};
  }
`;

const CustomThumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: ${TRACK_PADDING}px;
  left: ${({ $checked }) => ($checked ? `${THUMB_SIZE}px` : `${TRACK_PADDING}px`)};
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: left ${DESIGN_TOKENS.transition.fast}, background ${DESIGN_TOKENS.transition.fast};
  border: 1.5px solid var(--c-border);
`;

/**
 * Switch component - компонент для переключения состояния
 *
 * @param checked 'boolean' - состояние переключателя
 * @param onChange '(checked: boolean) => void' - функция обработки изменения состояния
 * @param label 'string' - текст подписи
 * @param disabled 'boolean' = false - флаг, указывающий, что переключатель отключен
 * @param id 'string' - id для input (если нужно связать с label)
 * @param className 'string' - дополнительные CSS классы для обертки
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
      <CustomTrack $checked={checked} $disabled={disabled}>
        <CustomThumb $checked={checked} />
      </CustomTrack>
      {label && <LabelText>{label}</LabelText>}
    </SwitchWrapper>
  );
};
