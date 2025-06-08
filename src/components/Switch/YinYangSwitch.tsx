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
  z-index: 2;

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
  background: var(--color-elevated);
  border: 2px solid
    ${({ $checked }) => ($checked ? 'var(--color-primary)' : 'var(--color-elevated-active)')};
  border-radius: ${TRACK_HEIGHT / 2}px;
  box-shadow: 0px 4px 16px 0px rgba(51, 51, 51, 0.08);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: var(--transition-slow);
  user-select: none;
  overflow: hidden;

  .fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $checked }) => ($checked ? '100%' : '0')};
    background: var(--color-primary);
    border-radius: inherit;
    z-index: 1;
    transition: var(--transition-slow);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: ${TRACK_PADDING + 1}px;
    width: ${THUMB_SIZE - 2}px;
    height: ${THUMB_SIZE - 2}px;
    border-radius: 50%;
    z-index: 2;
  }
  &::before {
    left: ${TRACK_PADDING}px;
    background: var(--color-primary);
  }
  &::after {
    right: ${TRACK_PADDING}px;
    background: ${({ $checked }) => ($checked ? 'var(--color-elevated)' : 'var(--color-elevated)')};
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
