import React from 'react';
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

const Wrapper = styled.div<{ labelLength?: number }>`
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  width: fit-content;
  min-width: ${({ labelLength }) => (labelLength ? Math.max(80, labelLength * 8 + 60) : 80)}px;
  max-width: 320px;
  gap: 0.25em;
  overflow: hidden;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Select = styled.select<{ disabled?: boolean; $error?: boolean; $clearable?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 10px ${({ $clearable }) => ($clearable ? '50px' : '30px')} 0px 10px;
  font-size: var(--font-size-medium);
  font-family: var(--font-family);
  color: var(--text-body);
  background: var(--color-surface);
  border: 2px solid ${({ $error }) => ($error ? 'var(--color-error)' : 'var(--color-primary)')};
  border-radius: var(--radius-medium);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover:not(:disabled) {
    border-color: ${({ $error }) => ($error ? 'var(--color-error)' : 'var(--color-accent)')};
    color: ${({ $error }) => ($error ? 'var(--color-error)' : 'var(--color-accent)')};
  }

  &:disabled {
    background: var(--color-elevated);
    color: var(--text-disabled);
    border-color: var(--color-primary);
    cursor: not-allowed;
  }

  /* Стили для опций */
  option {
    background: var(--color-surface);
    color: var(--text-body);
    padding: var(--spacing-small);
    font-family: var(--font-family);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
  }
`;

const FloatingLabel = styled.label<{
  floating: boolean;
  $error?: boolean;
}>`
  position: absolute;
  left: 12px;
  top: ${({ floating }) => (floating ? '2px' : '50%')};
  transform: translateY(${({ floating }) => (floating ? '0' : '-50%')});
  font-size: ${({ floating }) => (floating ? 'var(--font-size-small)' : 'var(--font-size-medium)')};
  color: ${({ $error }) => ($error ? 'var(--color-error)' : 'var(--color-primary)')};
  background: transparent;
  pointer-events: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
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
  z-index: 3;
  color: var(--text-secondary);
  height: 18px;
  width: 18px;
  border-radius: 50%;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-elevated-active);
    color: var(--text-body);
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const DropdownArrow = styled.div<{ disabled?: boolean; $error?: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid
    ${({ disabled, $error }) =>
      disabled ? 'var(--text-disabled)' : $error ? 'var(--color-error)' : 'var(--color-primary)'};
  pointer-events: none;
  transition: all var(--transition-fast);
  z-index: 3;
`;

const ErrorText = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-small);
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
 * @param {string} label - текст подписи (также используется как tooltip)
 * @param {boolean} disabled - флаг, указывающий, что выпадающий список отключен
 * @param {boolean} error - флаг ошибки
 * @param {string} errorText - текст ошибки
 * @param {boolean} clearable - возможность сброса выбора (по умолчанию false)
 * @param {string} id - уникальный идентификатор элемента
 * @param {string} className - класс для обертки
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
    <Wrapper className={className} labelLength={label?.length}>
      <SelectWrapper>
        <Select
          id={selectId}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
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
        <DropdownArrow disabled={disabled} $error={error} />
        {label && (
          <FloatingLabel floating={floating} $error={error} htmlFor={selectId}>
            {label}
          </FloatingLabel>
        )}
      </SelectWrapper>
      {error && errorText && <ErrorText>{errorText}</ErrorText>}
    </Wrapper>
  );
};
