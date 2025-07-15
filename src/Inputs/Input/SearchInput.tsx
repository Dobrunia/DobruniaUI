import React, { useCallback } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

// Выносим sizeMap за пределы компонента
const SIZE_MAP = {
  small: {
    minHeight: DESIGN_TOKENS.baseHeight.small,
    fontSize: DESIGN_TOKENS.fontSize.small,
    padding: `0 ${DESIGN_TOKENS.spacing.small}`,
  },
  medium: {
    minHeight: DESIGN_TOKENS.baseHeight.medium,
    fontSize: DESIGN_TOKENS.fontSize.medium,
    padding: `0 ${DESIGN_TOKENS.spacing.medium}`,
  },
  large: {
    minHeight: DESIGN_TOKENS.baseHeight.large,
    fontSize: DESIGN_TOKENS.fontSize.large,
    padding: `0 ${DESIGN_TOKENS.spacing.large}`,
  },
} as const;

export interface SearchInputProps {
  /** Значение поиска */
  value: string;
  /** Обработчик изменения значения */
  onChange: (value: string) => void;
  /** Placeholder текст */
  placeholder?: string;
  /** Размер поля */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительные CSS классы */
  className?: string;
}

const SearchInputField = styled.input<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  background: var(--c-bg-elevated);
  border-radius: 999px;
  min-height: ${({ $size }) => SIZE_MAP[$size].minHeight};
  font-size: ${({ $size }) => SIZE_MAP[$size].fontSize};
  padding: ${({ $size }) => SIZE_MAP[$size].padding};
  box-shadow: none;
  transition: box-shadow ${DESIGN_TOKENS.transition.fast};
  border: none;
  color: var(--c-text-primary);
  outline: none;
  width: 100%;
  &::placeholder {
    color: var(--c-text-secondary);
    opacity: 0.5;
    transition: color ${DESIGN_TOKENS.transition.fast}, opacity ${DESIGN_TOKENS.transition.fast};
  }
  &:focus::placeholder {
    opacity: 0;
  }
  &:hover {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--c-accent) 20%, transparent 80%);
    &::placeholder {
      color: var(--c-accent);
    }
  }
`;

/**
 * SearchInput - компонент поиска с красивым дизайном
 *
 * @param value - значение поиска
 * @param onChange - обработчик изменения значения
 * @param placeholder - placeholder текст
 * @param size - размер поля ('small' | 'medium' | 'large'), по умолчанию 'medium'
 * @param className - дополнительные CSS классы
 */
export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ value, onChange, placeholder = 'Поиск', size = 'medium', className }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <SearchInputField
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={className}
        $size={size}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
