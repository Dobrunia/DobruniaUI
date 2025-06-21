import React from 'react';
import styled, { keyframes } from 'styled-components';

interface PowerSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
}

const lineAnimation = keyframes`
  0% { transform: translateY(0); }
  10% { transform: translateY(10px); }
  40% { transform: translateY(-25px); }
  60% { transform: translateY(-25px); }
  85% { transform: translateY(10px); }
  100% { transform: translateY(0px); }
`;

const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const PowerSwitchWrapper = styled.div<{ $disabled?: boolean }>`
  --color-invert: #ffffff;
  --width: 40px;
  --height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--width);
  height: var(--height);
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })<{ $disabled?: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: 0;

  &:checked + div:after {
    opacity: 0.15;
    transform: scale(2) perspective(1px) translateZ(0);
    backface-visibility: hidden;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &:checked + div .power-on,
  &:checked + div .power-off {
    animation: ${clickAnimation} 0.3s ease forwards;
    transform: scale(1);
  }

  &:checked + div .power-on .line,
  &:checked + div .power-off .line {
    animation: ${lineAnimation} 0.8s ease-in forwards;
  }

  &:checked + div .power-on .circle,
  &:checked + div .power-off .circle {
    transform: rotate(302deg);
  }

  &:checked + div .power-on .line {
    opacity: 1;
    transition: opacity 0.05s ease-in 0.55s;
  }

  &:checked + div .power-on .circle {
    transform: rotate(302deg);
    stroke-dashoffset: 40;
    transition: transform 0.4s ease 0.2s, stroke-dashoffset 0.4s ease 0.2s;
  }
`;

const Button = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: radial-gradient(circle closest-side, var(--color-invert), transparent);
    filter: blur(20px);
    opacity: 0;
    transition: opacity 1s ease, transform 1s ease;
    transform: perspective(1px) translateZ(0);
    backface-visibility: hidden;
  }

  .power-on,
  .power-off {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    fill: none;
    stroke: var(--color-invert);
    stroke-width: 8px;
    stroke-linecap: round;
    stroke-linejoin: round;

    .line {
      opacity: 0.2;
    }

    .circle {
      opacity: 0.2;
      transform: rotate(-58deg);
      transform-origin: center 80px;
      stroke-dasharray: 220;
      stroke-dashoffset: 40;
    }
  }

  .power-on {
    filter: drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.8));

    .line {
      opacity: 0;
      transition: opacity 0.3s ease 1s;
    }

    .circle {
      opacity: 1;
      stroke-dashoffset: 220;
      transition: transform 0s ease, stroke-dashoffset 1s ease 0s;
    }
  }
`;

/**
 * PowerSwitch - компонент переключателя с анимацией кнопки питания
 * @param {boolean} checked - состояние переключателя
 * @param {(checked: boolean) => void} onChange - функция обработки изменения состояния
 * @param {boolean} [disabled] - флаг, указывающий, что переключатель отключен
 * @param {string} [id] - id для input (если нужно связать с label)
 * @param {string} [className] - дополнительные CSS классы для обертки
 *
 * @example
 * // Базовое использование
 * <PowerSwitch
 *   checked={isPowered}
 *   onChange={setIsPowered}
 * />
 *
 * // Отключенная кнопка питания
 * <PowerSwitch
 *   checked={false}
 *   onChange={() => {}}
 *   disabled
 * />
 *
 * // С кастомными стилями и ID
 * <PowerSwitch
 *   checked={systemOn}
 *   onChange={setSystemOn}
 *   className="system-power-button"
 *   id="system-power"
 * />
 */
export const PowerSwitch: React.FC<PowerSwitchProps> = ({
  checked,
  onChange,
  id = 'power-switch',
  disabled,
  className,
}) => {
  return (
    <PowerSwitchWrapper className={className} $disabled={disabled}>
      <HiddenInput
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        $disabled={disabled}
      />
      <Button>
        <svg className='power-off' viewBox='0 0 150 150'>
          <line className='line' x1='75' y1='34' x2='75' y2='58' />
          <circle className='circle' cx='75' cy='80' r='35' />
        </svg>
        <svg className='power-on' viewBox='0 0 150 150'>
          <line className='line' x1='75' y1='34' x2='75' y2='58' />
          <circle className='circle' cx='75' cy='80' r='35' />
        </svg>
      </Button>
    </PowerSwitchWrapper>
  );
};
