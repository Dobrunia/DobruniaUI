import React from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export interface SearchInputProps {
  /** Значение поиска */
  value: string;
  /** Обработчик изменения значения */
  onChange: (value: string) => void;
  /** Placeholder текст */
  placeholder?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: var(--c-bg-elevated);
  border-radius: 999px;
  padding: 0 ${DESIGN_TOKENS.spacing.medium};
  min-height: 32px;
  box-shadow: none;
  transition: box-shadow ${DESIGN_TOKENS.transition.fast};
  &:hover {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--c-accent) 20%, transparent 80%);
  }
`;

const SearchInputField = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  padding: ${DESIGN_TOKENS.spacing.small} 0;
  outline: none;
  border-radius: 999px;
  &::placeholder {
    color: var(--c-text-secondary);
    opacity: 1;
    transition: color ${DESIGN_TOKENS.transition.fast};
  }
  &:hover {
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
 * @param className - дополнительные CSS классы
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Поиск',
  className,
}) => {
  return (
    <SearchBar className={className}>
      <SearchInputField
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchBar>
  );
};
