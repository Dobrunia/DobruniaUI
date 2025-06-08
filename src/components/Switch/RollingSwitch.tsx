import React from 'react';
import styled from 'styled-components';
import { TRACK_WIDTH, TRACK_HEIGHT, THUMB_SIZE, TRACK_PADDING } from './variables';

interface RollingSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
}

const Wrapper = styled.label<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  width: max-content;
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const LabelText = styled.span`
  margin-left: var(--spacing-medium);
  color: var(--text-heading);
  font-size: var(--font-size-medium);
  font-weight: 600;
`;

const Track = styled.div<{ checked: boolean }>`
  width: ${TRACK_WIDTH}px;
  height: ${TRACK_HEIGHT}px;
  background: ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--color-elevated)')};
  border-radius: ${TRACK_HEIGHT / 2}px;
  position: relative;
  box-shadow: 0 0 2px
    ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--color-elevated)')};
  border: 2px solid
    ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--color-elevated-active)')};
  transition: background 0.4s cubic-bezier(0.4, 2, 0.6, 1),
    box-shadow 0.4s cubic-bezier(0.4, 2, 0.6, 1), border-color 0.4s cubic-bezier(0.4, 2, 0.6, 1);
`;

const Thumb = styled.div<{ checked: boolean }>`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: ${TRACK_PADDING}px;
  left: ${({ checked }) => (checked ? `${THUMB_SIZE}px` : `${TRACK_PADDING}px`)};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: left 0.4s cubic-bezier(0.4, 2, 0.6, 1), transform 0.4s cubic-bezier(0.4, 2, 0.6, 1);
  transform: ${({ checked }) => (checked ? 'rotate(360deg)' : 'rotate(0deg)')};
  pointer-events: none;
`;

const Icon = styled.svg<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  stroke: ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--text-heading)')};
  stroke-width: 2.5px;
  stroke-linecap: round;
  fill: none;
  display: block;
  pointer-events: none;
`;

/**
 * RollingSwitch - компонент переключателя с анимацией
 * @param {boolean} checked - состояние переключателя
 * @param {(checked: boolean) => void} onChange - функция обработки изменения состояния
 * @param {boolean} disabled - флаг, указывающий, переключатель отключен
 * @param {string} id - id для input (если нужно связать с label)
 * @param {string} className - класс для обертки
 * @param {string} label - текст подписи
 */
export const RollingSwitch: React.FC<RollingSwitchProps> = ({
  checked,
  onChange,
  disabled,
  id,
  className,
  label,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) onChange(!checked);
  };

  return (
    <Wrapper $disabled={disabled} className={className} onClick={handleClick}>
      <Track checked={checked}>
        <Thumb checked={checked}>
          {checked ? (
            <Icon checked={checked} viewBox='0 0 18 18'>
              <polyline points='3,10 8,15 15,4' />
            </Icon>
          ) : (
            <Icon checked={checked} viewBox='0 0 18 18'>
              <line x1='4' y1='4' x2='14' y2='14' />
              <line x1='14' y1='4' x2='4' y2='14' />
            </Icon>
          )}
        </Thumb>
      </Track>
      {label && <LabelText>{label}</LabelText>}
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
    </Wrapper>
  );
};
