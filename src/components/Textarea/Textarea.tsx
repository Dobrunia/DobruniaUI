import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  width?: string;
  autoHeight?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || '100%'};
  gap: 0.25em;
`;

const Label = styled.label<{ $error?: boolean }>`
  color: ${({ $error }) =>
    $error ? 'var(--color-error)' : 'var(--color-primary)'};
  font-size: var(--font-size-small);
  margin-bottom: 0.15em;
`;

const StyledTextarea = styled.textarea<{ $error?: boolean; $resize: string }>`
  width: 100%;
  min-height: 80px;
  resize: ${({ $resize }) => $resize};
  padding: 16px;
  border-radius: var(--radius-medium);
  border: 2px solid
    ${({ $error }) => ($error ? 'var(--color-error)' : 'var(--color-primary)')};
  background: var(--color-surface);
  color: var(--text-body);
  font-size: var(--font-size-medium);
  transition: border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
  box-sizing: border-box;
  &:hover {
    border-color: ${({ $error }) =>
      $error ? 'var(--color-error)' : 'var(--color-primary)'};
    box-shadow: 0 0 0 2px
      ${({ $error }) =>
        $error
          ? 'var(--color-error)'
          : 'color-mix(in srgb, var(--color-primary) 20%, transparent 80%)'};
  }
  &:focus {
    border-color: ${({ $error }) =>
      $error ? 'var(--color-error)' : 'var(--color-primary)'};
    box-shadow: 0 0 0 2px
      ${({ $error }) =>
        $error
          ? 'var(--color-error)'
          : 'color-mix(in srgb, var(--color-primary) 40%, transparent 60%)'};
  }
  &:disabled {
    background: var(--color-elevated);
    color: var(--text-disabled);
    border-color: var(--color-primary);
    cursor: not-allowed;
  }
`;

const HelperText = styled.div<{ $error?: boolean }>`
  color: ${({ $error }) =>
    $error ? 'var(--color-error)' : 'var(--text-secondary)'};
  font-size: var(--font-size-small);
  min-height: 1.2em;
  margin-top: 0.1em;
`;

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  errorText,
  helperText,
  id,
  width,
  value,
  defaultValue,
  autoHeight,
  resize = 'none',
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const autoId = React.useId();
  const textareaId = id || autoId;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Авто-высота
  useLayoutEffect(() => {
    if (autoHeight && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [currentValue, autoHeight]);

  return (
    <Wrapper width={width}>
      {label && (
        <Label htmlFor={textareaId} $error={error}>
          {label}
        </Label>
      )}
      <StyledTextarea
        id={textareaId}
        ref={textareaRef}
        $error={error}
        $resize={autoHeight ? 'none' : resize}
        style={autoHeight ? { overflow: 'hidden' } : undefined}
        value={currentValue}
        onChange={(e) => {
          if (!isControlled) setInnerValue(e.target.value);
          onChange?.(e);
        }}
        onFocus={(e) => {
          onFocus?.(e);
        }}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        {...props}
      />
      <HelperText $error={error}>{error ? errorText : helperText}</HelperText>
    </Wrapper>
  );
};
