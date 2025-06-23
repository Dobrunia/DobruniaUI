import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { DESIGN_TOKENS } from '../../styles/designTokens';

// Global state for managing open selects
let globalOpenSelect: string | null = null;
const selectInstances = new Set<() => void>();

/**
 * Опция для Select компонента
 */
export interface SelectOption {
  /** Уникальное значение опции */
  value: string;
  /** Отображаемый текст */
  label: string;
  /** Иконка (строка или React элемент) */
  icon?: string | React.ReactNode;
  /** Описание опции */
  description?: string;
  /** Подменю для создания многоуровневых списков */
  submenu?: SelectOption[];
}

/**
 * Пропсы для Select компонента
 */
export interface SelectProps {
  /** Массив опций для выбора */
  options: SelectOption[];
  /** Текущее выбранное значение */
  value: string;
  /** Колбэк при изменении значения */
  onChange: (value: string) => void;
  /** Текст плейсхолдера */
  placeholder?: string;
  /** Ширина компонента */
  width?: string | number;
  /** Отключить компонент */
  disabled?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
  /** Режим открытия: клик или наведение */
  trigger?: 'click' | 'hover';
  /** Показать кнопку очистки */
  clearable?: boolean;
  /** Колбэк при очистке значения */
  onClear?: () => void;
}

const SelectWrapper = styled.div<{ $width?: string | number }>`
  position: relative;
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
  min-width: 200px;
  max-width: 100%;
  box-sizing: border-box;
`;

const SelectButton = styled.button<{ $isOpen: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  padding-right: 60px; /* Space for actions */
  background: var(--c-bg-subtle);
  border: 2px solid var(--c-border);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all ${DESIGN_TOKENS.transition.fast};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  text-align: left;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    border-color: var(--c-border-focus);
  }

  &:focus {
    outline: none;
    border-color: var(--c-border-focus);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-border-focus) 20%, transparent);
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    border-color: var(--c-border-focus);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-border-focus) 20%, transparent);
  `}
`;

const SelectButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SelectContent = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const DropdownArrow = styled.div<{ $isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--c-text-secondary);
  transition: transform ${DESIGN_TOKENS.transition.fast};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const OptionsList = styled.div<{ $isSubmenu?: boolean }>`
  position: ${({ $isSubmenu }) => ($isSubmenu ? 'fixed' : 'absolute')};
  top: ${({ $isSubmenu }) => ($isSubmenu ? '0' : 'calc(100% + 4px)')};
  left: ${({ $isSubmenu }) => ($isSubmenu ? '0' : '0')};
  right: ${({ $isSubmenu }) => ($isSubmenu ? 'auto' : '0')};
  min-width: ${({ $isSubmenu }) => ($isSubmenu ? '250px' : '100%')};
  background: var(--c-bg-subtle);
  border: 2px solid var(--c-border-focus);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  overflow: hidden;
  z-index: 9999;
  box-shadow: var(--shadow-large);
  max-height: 300px;
  overflow-y: auto;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Option = styled.div<{ $isSelected: boolean; $hasSubmenu?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  transition: background ${DESIGN_TOKENS.transition.fast};
  border-bottom: 1px solid color-mix(in srgb, var(--c-border-focus) 20%, transparent);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--c-bg-elevated);
  }

  ${({ $isSelected, $hasSubmenu }) =>
    $isSelected &&
    `
    background: color-mix(in srgb, var(--c-accent) 10%, transparent 90%);
    
    &::after {
      content: '✓';
      position: absolute;
      right: ${$hasSubmenu ? '32px' : '12px'};
      color: var(--c-accent);
      font-weight: bold;
    }
  `}
`;

const SubmenuArrow = styled.div`
  position: absolute;
  right: 12px;
  width: 0;
  height: 0;
  border-left: 5px solid var(--c-text-secondary);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  transition: color ${DESIGN_TOKENS.transition.fast};
`;

const OptionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  overflow: hidden;
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const OptionLabel = styled.span`
  font-weight: 500;
  color: var(--c-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${DESIGN_TOKENS.fontSize.medium};
`;

const OptionDescription = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const PlaceholderText = styled.span`
  height: 20px;
  color: var(--c-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectActions = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

interface SubmenuProps {
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  parentRect?: DOMRect;
  onClose: () => void;
  trigger: 'click' | 'hover';
}

const Submenu: React.FC<SubmenuProps> = ({
  options,
  selectedValue,
  onSelect,
  parentRect,
  onClose,
  trigger,
}) => {
  const [submenuState, setSubmenuState] = useState<{
    option: SelectOption;
    rect: DOMRect;
  } | null>(null);

  const submenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (option: SelectOption, event: React.MouseEvent) => {
    if (option.submenu) {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setSubmenuState({ option, rect });
    }
  };

  const handleClick = (option: SelectOption, event: React.MouseEvent) => {
    if (option.submenu) {
      // В click режиме клик на элемент с подменю тоже открывает его (дополнительно к hover)
      if (trigger === 'click') {
        event.stopPropagation();
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

        // Toggle submenu - close if same option, open if different
        if (submenuState?.option.value === option.value) {
          setSubmenuState(null);
        } else {
          setSubmenuState({ option, rect });
        }
      }
      // В hover режиме клик на элемент с подменю ничего не делает
    } else {
      onSelect(option.value);
    }
  };

  // Подменю всегда закрываются при уходе мыши, независимо от основного trigger
  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Don't close if mouse is moving to submenu
    if (relatedTarget && submenuRef.current?.contains(relatedTarget)) {
      return;
    }

    // Set a timeout to close submenu
    timeoutRef.current = setTimeout(() => {
      setSubmenuState(null);
    }, 150);
  };

  const handleSubmenuMouseEnter = () => {
    // Clear timeout when mouse enters submenu
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleSubmenuMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Check if mouse is moving back to parent option
    const parentElement = submenuRef.current?.parentElement;
    if (relatedTarget && parentElement?.contains(relatedTarget)) {
      return;
    }

    // Close submenu
    setSubmenuState(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (trigger === 'click') {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-submenu]')) {
          setSubmenuState(null);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [trigger]);

  const submenuStyle: React.CSSProperties = parentRect
    ? {
        top: parentRect.top - 2,
        left: parentRect.right + 0,
      }
    : {};

  return (
    <>
      <OptionsList
        ref={submenuRef}
        $isSubmenu={!!parentRect}
        style={submenuStyle}
        onMouseLeave={handleMouseLeave}
        data-submenu='true'
      >
        {options.map((option) => (
          <Option
            key={option.value}
            onClick={(e) => handleClick(option, e)}
            onMouseEnter={(e) => handleMouseEnter(option, e)}
            $isSelected={option.value === selectedValue}
            $hasSubmenu={!!option.submenu}
            title={option.description ? `${option.label} - ${option.description}` : option.label}
          >
            {option.icon && <OptionIcon>{option.icon}</OptionIcon>}
            <OptionContent>
              <OptionLabel>{option.label}</OptionLabel>
              {option.description && <OptionDescription>{option.description}</OptionDescription>}
            </OptionContent>
            {option.submenu && <SubmenuArrow />}
          </Option>
        ))}
      </OptionsList>

      {submenuState &&
        submenuState.option.submenu &&
        createPortal(
          <div
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}
            data-submenu='true'
          >
            <Submenu
              options={submenuState.option.submenu}
              selectedValue={selectedValue}
              onSelect={onSelect}
              parentRect={submenuState.rect}
              onClose={onClose}
              trigger={trigger}
            />
          </div>,
          document.body
        )}
    </>
  );
};

/**
 * Select component - компонент выбора значения из списка опций
 * @param options 'SelectOption[]' - массив опций для выбора
 * @param value 'string' - текущее выбранное значение
 * @param onChange '(value: string) => void' - обработчик изменения значения
 * @param placeholder 'string' = 'Выберите значение' - текст плейсхолдера
 * @param width 'string | number' - ширина компонента
 * @param disabled 'boolean' = false - отключен ли компонент
 * @param className 'string' - дополнительный CSS класс
 * @param trigger 'click | hover' = 'click' - режим открытия: клик или наведение
 * @param clearable 'boolean' = false - показывать кнопку очистки
 * @param onClear '() => void' - обработчик очистки значения
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите значение',
  width,
  disabled = false,
  className,
  trigger = 'click',
  clearable = false,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = useRef(Math.random().toString(36).substr(2, 9));
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeSelect = () => setIsOpen(false);

  useEffect(() => {
    // Register this select instance
    selectInstances.add(closeSelect);

    return () => {
      // Unregister this select instance
      selectInstances.delete(closeSelect);
      if (globalOpenSelect === selectId.current) {
        globalOpenSelect = null;
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.select-wrapper') && !target.closest('[data-submenu]')) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen && trigger === 'click') {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, trigger]);

  const handleToggle = () => {
    if (disabled || trigger !== 'click') return;

    if (!isOpen) {
      // Close all other selects
      if (globalOpenSelect && globalOpenSelect !== selectId.current) {
        selectInstances.forEach((closeInstance) => {
          if (closeInstance !== closeSelect) {
            closeInstance();
          }
        });
      }

      globalOpenSelect = selectId.current;
      setIsOpen(true);
    } else {
      globalOpenSelect = null;
      setIsOpen(false);
    }
  };

  const handleMouseEnter = () => {
    if (disabled || trigger !== 'hover') return;

    // Clear any pending close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (!isOpen) {
      // Close all other selects
      if (globalOpenSelect && globalOpenSelect !== selectId.current) {
        selectInstances.forEach((closeInstance) => {
          if (closeInstance !== closeSelect) {
            closeInstance();
          }
        });
      }

      globalOpenSelect = selectId.current;
      setIsOpen(true);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (disabled || trigger !== 'hover') return;

    const relatedTarget = event.relatedTarget as HTMLElement;

    // Don't close if mouse is moving to submenu
    if (relatedTarget && relatedTarget.closest('[data-submenu]')) {
      return;
    }

    // Set a timeout to close select
    hoverTimeoutRef.current = setTimeout(() => {
      globalOpenSelect = null;
      setIsOpen(false);
    }, 150);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    globalOpenSelect = null;
    setIsOpen(false);
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  // Find selected option recursively
  const findSelectedOption = (opts: SelectOption[]): SelectOption | undefined => {
    for (const option of opts) {
      if (option.value === value) return option;
      if (option.submenu) {
        const found = findSelectedOption(option.submenu);
        if (found) return found;
      }
    }
    return undefined;
  };

  const selectedOption = findSelectedOption(options);
  const hasValue = value && value.length > 0;

  return (
    <SelectWrapper
      $width={width}
      className={`select-wrapper ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SelectButtonWrapper>
        <SelectButton
          onClick={handleToggle}
          $isOpen={isOpen}
          $disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          disabled={disabled}
        >
          <SelectContent>
            {selectedOption ? (
              <>
                {selectedOption.icon && <OptionIcon>{selectedOption.icon}</OptionIcon>}
                <OptionLabel>{selectedOption.label}</OptionLabel>
              </>
            ) : (
              <PlaceholderText>{placeholder}</PlaceholderText>
            )}
          </SelectContent>
        </SelectButton>

        <SelectActions>
          {clearable && hasValue && !disabled && (
            <ClearButton onClick={handleClear} title='Очистить выбор'>
              ×
            </ClearButton>
          )}
          <DropdownArrow $isOpen={isOpen} />
        </SelectActions>
      </SelectButtonWrapper>

      {isOpen && (
        <Submenu
          options={options}
          selectedValue={value}
          onSelect={handleOptionClick}
          onClose={() => setIsOpen(false)}
          trigger={trigger}
        />
      )}
    </SelectWrapper>
  );
};
