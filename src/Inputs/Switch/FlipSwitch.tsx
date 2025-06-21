import React from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '../../styles/designTokens';

interface FlipSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  className?: string;
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
}

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const FlipLabel = styled.label<{ $checked: boolean; $disabled?: boolean }>`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 22px;
  perspective: 100px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-weight: bold;
  transition: filter 0.2s;
  filter: ${({ $disabled }) => ($disabled ? 'grayscale(0.7)' : 'none')};

  &::before,
  &::after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${DESIGN_TOKENS.radius.medium};
    color: #fff;
    text-align: center;
    line-height: 40px;
    backface-visibility: hidden;
    transition: all 0.4s ${DESIGN_TOKENS.transition.slow};
    pointer-events: none;
  }
  &::before {
    content: attr(data-tg-off);
    background: var(--c-error);
    transform: ${({ $checked }) => ($checked ? 'rotateY(180deg)' : 'rotateY(0)')};
  }
  &::after {
    content: attr(data-tg-on);
    background: var(--c-accent);
    transform: ${({ $checked }) => ($checked ? 'rotateY(0)' : 'rotateY(-180deg)')};
  }
  &:active::before {
    transform: ${({ $checked }) => ($checked ? 'rotateY(180deg)' : 'rotateY(-20deg)')};
  }
`;

/**
 * FlipSwitch - компонент переключателя с анимацией переворота
 * @param {boolean} checked - состояние переключателя
 * @param {(checked: boolean) => void} onChange - функция обработки изменения состояния
 * @param {boolean} [disabled] - флаг, указывающий, что переключатель отключен
 * @param {string} [id] - id для input (если нужно связать с label)
 * @param {string} [className] - дополнительные CSS классы для обертки
 * @param {string} [onLabel='On'] - текст подписи для состояния "включено"
 * @param {string} [offLabel='Off'] - текст подписи для состояния "выключено"
 *
 * @example
 * // Базовое использование
 * <FlipSwitch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 * />
 *
 * // С кастомными лейблами
 * <FlipSwitch
 *   checked={isActive}
 *   onChange={setIsActive}
 *   onLabel="ДА"
 *   offLabel="НЕТ"
 * />
 *
 * // Отключенный переключатель
 * <FlipSwitch
 *   checked={false}
 *   onChange={() => {}}
 *   disabled
 * />
 *
 * // С кастомными стилями
 * <FlipSwitch
 *   checked={isToggled}
 *   onChange={setIsToggled}
 *   className="custom-flip-switch"
 *   id="my-flip-switch"
 * />
 */
export const FlipSwitch: React.FC<FlipSwitchProps> = ({
  checked,
  onChange,
  id = 'flip-switch',
  className,
  onLabel = 'On',
  offLabel = 'Off',
  disabled,
}) => {
  return (
    <>
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <FlipLabel
        htmlFor={id}
        $checked={checked}
        $disabled={disabled}
        data-tg-on={onLabel}
        data-tg-off={offLabel}
        className={className}
      />
    </>
  );
};
