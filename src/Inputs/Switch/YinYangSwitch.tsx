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

interface YinYangSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
}

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:active + label {
    transform: scale(1.05);
  }
`;

const StyledLabel = styled.label<{ $checked: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${TRACK_WIDTH}px;
  height: ${TRACK_HEIGHT}px;
  background: var(--c-bg-elevated);
  border: 2px solid ${({ $checked }) => ($checked ? 'var(--c-accent)' : 'var(--c-border)')};
  border-radius: ${TRACK_HEIGHT / 2}px;
  box-shadow: 0px 4px 16px 0px rgba(51, 51, 51, 0.08);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: ${DESIGN_TOKENS.transition.slow};
  user-select: none;
  overflow: hidden;

  .fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $checked }) => ($checked ? '100%' : '0')};
    background: var(--c-accent);
    border-radius: inherit;
    transition: ${DESIGN_TOKENS.transition.slow};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: ${TRACK_PADDING + 1}px;
    width: ${THUMB_SIZE - 2}px;
    height: ${THUMB_SIZE - 2}px;
    border-radius: 50%;
  }
  &::before {
    left: ${TRACK_PADDING}px;
    background: var(--c-accent);
  }
  &::after {
    right: ${TRACK_PADDING}px;
    background: ${({ $checked }) => ($checked ? 'var(--c-bg-elevated)' : 'var(--c-bg-elevated)')};
  }
`;

/**
 * YinYangSwitch - компонент переключателя с анимацией
 * @param {boolean} checked - состояние переключателя
 * @param {(checked: boolean) => void} onChange - функция обработки изменения состояния
 * @param {boolean} disabled - флаг, указывающий, переключатель отключен
 * @param {string} id - id для input (если нужно связать с label)
 * @param {string} className - класс для обертки
 * @param {string} label - текст подписи
 */
export const YinYangSwitch: React.FC<YinYangSwitchProps> = ({
  checked,
  onChange,
  disabled,
  id = 'yin-yang-switch',
  className,
  label,
}) => {
  return (
    <SwitchWrapper htmlFor={id} className={className} $disabled={disabled}>
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <StyledLabel htmlFor={id} $checked={checked} $disabled={disabled}>
        <span className='fill' />
      </StyledLabel>
      {label && <LabelText>{label}</LabelText>}
    </SwitchWrapper>
  );
};
