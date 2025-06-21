import React from 'react';
import { DESIGN_TOKENS } from '../../styles/designTokens';
import styled from 'styled-components';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  errorText?: string;
  clearable?: boolean;
  id?: string;
}

const Wrapper = styled.div<{ $labelLength?: number }>`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: ${({ $labelLength }) => ($labelLength ? Math.max(80, $labelLength * 8 + 60) : 80)}px;
  max-width: 320px;
  gap: 0.25em;
  overflow: hidden;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Select = styled.select<{ $disabled?: boolean; $error?: boolean; $clearable?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 10px ${({ $clearable }) => ($clearable ? '50px' : '30px')} 0px 10px;
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  color: var(--c-text-primary);
  background: var(--c-bg-subtle);
  border: 2px solid ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
  border-radius: ${DESIGN_TOKENS.radius.medium};
  transition: border-color ${DESIGN_TOKENS.transition.fast},
    box-shadow ${DESIGN_TOKENS.transition.fast};
  outline: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover:not(:disabled) {
    border-color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-accent)')};
    color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-accent)')};
  }

  &:disabled {
    background: var(--c-bg-elevated);
    color: var(--c-text-secondary);
    border-color: var(--c-border);
    cursor: not-allowed;
  }

  /* Стили для опций */
  option {
    background: var(--c-bg-subtle);
    color: var(--c-text-primary);
    padding: ${DESIGN_TOKENS.spacing.small};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
  }
`;

const FloatingLabel = styled.label<{
  $floating: boolean;
  $error?: boolean;
}>`
  position: absolute;
  left: 12px;
  top: ${({ $floating }) => ($floating ? '2px' : '50%')};
  transform: translateY(${({ $floating }) => ($floating ? '0' : '-50%')});
  font-size: ${({ $floating }) =>
    $floating ? DESIGN_TOKENS.fontSize.small : DESIGN_TOKENS.fontSize.medium};
  color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-accent)')};
  background: transparent;
  pointer-events: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 60px);
`;

const ClearButton = styled.button`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-secondary);
  height: 18px;
  width: 18px;
  border-radius: 50%;
  transition: all ${DESIGN_TOKENS.transition.fast};

  &:hover {
    background: color-mix(in srgb, var(--c-accent) 10%, transparent 90%);
    color: var(--c-text-primary);
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const DropdownArrow = styled.div<{ $disabled?: boolean; $error?: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid
    ${({ $disabled, $error }) =>
      $disabled ? 'var(--c-text-secondary)' : $error ? 'var(--c-error)' : 'var(--c-accent)'};
  pointer-events: none;
  transition: all ${DESIGN_TOKENS.transition.fast};
`;

const ErrorText = styled.div`
  color: var(--c-error);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  min-height: 1.2em;
  margin-top: 0.1em;
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClearIcon: React.FC = () => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Dropdown component - компонент выбора из списка в стиле Material UI с floating label
 * @param {DropdownOption[]} options - массив опций
 * @param {string} value - текущее значение
 * @param {(value: string) => void} onChange - функция обработки изменения значения
 * @param {string} [label] - текст подписи (также используется как tooltip)
 * @param {boolean} [disabled] - флаг, указывающий, что выпадающий список отключен
 * @param {boolean} [error] - флаг ошибки
 * @param {string} [errorText] - текст ошибки
 * @param {boolean} [clearable=false] - возможность сброса выбора
 * @param {string} [id] - уникальный идентификатор элемента
 * @param {string} [className] - дополнительные CSS классы для обертки
 *
 * @example
 * // Базовое использование
 * <Dropdown
 *   options={[
 *     { value: '1', label: 'Вариант 1' },
 *     { value: '2', label: 'Вариант 2' },
 *     { value: '3', label: 'Вариант 3' }
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   label="Выберите опцию"
 * />
 *
 * // С возможностью очистки
 * <Dropdown
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   label="Выберите опцию"
 *   clearable
 * />
 *
 * // С ошибкой
 * <Dropdown
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   label="Обязательное поле"
 *   error={hasError}
 *   errorText="Поле обязательно для заполнения"
 * />
 *
 * // Отключенный dropdown
 * <Dropdown
 *   options={options}
 *   value=""
 *   onChange={() => {}}
 *   label="Недоступно"
 *   disabled
 * />
 *
 * // С кастомными стилями
 * <Dropdown
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   label="Кастомный dropdown"
 *   className="custom-dropdown"
 * />
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  disabled,
  error = false,
  errorText,
  clearable = false,
  id,
  className,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const hasValue = value !== '' && value !== undefined && value !== null;
  const floating = isFocused || hasValue;

  const autoId = React.useId();
  const selectId = id || autoId;

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  // Обрезаем длинные лейблы для опций
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Wrapper className={className} $labelLength={label?.length}>
      <SelectWrapper>
        <Select
          id={selectId}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          $disabled={disabled}
          $error={error}
          $clearable={clearable && hasValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          title={label || undefined}
        >
          {!hasValue && <option value='' disabled hidden></option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} title={opt.label}>
              {truncateText(opt.label)}
            </option>
          ))}
        </Select>
        {clearable && hasValue && !disabled && (
          <ClearButton type='button' onClick={handleClear} title='Очистить выбор'>
            <ClearIcon />
          </ClearButton>
        )}
        <DropdownArrow $disabled={disabled} $error={error} />
        {label && (
          <FloatingLabel $floating={floating} $error={error} htmlFor={selectId}>
            {label}
          </FloatingLabel>
        )}
      </SelectWrapper>
      {error && errorText && <ErrorText>{errorText}</ErrorText>}
    </Wrapper>
  );
};
