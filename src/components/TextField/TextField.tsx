import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  width?: string;
}

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || '100%'};
  gap: 0.25em;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label<{ floating: boolean; $error?: boolean }>`
  position: absolute;
  left: 16px;
  top: ${({ floating }) => (floating ? '2px' : '50%')};
  transform: translateY(${({ floating }) => (floating ? '0' : '-50%')});
  font-size: ${({ floating }) =>
    floating ? 'var(--font-size-small)' : 'var(--font-size-medium)'};
  color: ${({ $error }) =>
    $error ? 'var(--color-error)' : 'var(--color-primary)'};
  background: transparent;
  padding: 0 4px;
  pointer-events: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
`;

const Input = styled.input<{ $error?: boolean; $type?: string }>`
  width: 100%;
  padding: 22px ${({ $type }) => ($type === 'password' ? '40px' : '16px')} 8px
    16px;
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
  &:disabled {
    background: var(--color-elevated);
    color: var(--text-disabled);
    border-color: var(--color-primary);
    cursor: not-allowed;
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
  /* Hide number arrows for type=number */
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 8px;
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
  height: 24px;
  width: 24px;
`;

const HelperText = styled.div<{ $error?: boolean }>`
  color: ${({ $error }) =>
    $error ? 'var(--color-error)' : 'var(--text-secondary)'};
  font-size: var(--font-size-small);
  min-height: 1.2em;
  margin-top: 0.1em;
`;

function validateEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}
function validatePhone(val: string) {
  return /^\+?\d{6,}$/.test(val.replace(/\D/g, ''));
}
function validateNumber(val: string) {
  return /^-?\d*(\.|,)?\d*$/.test(val);
}

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="11"
        cy="11"
        rx="8"
        ry="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="11" cy="11" r="2" fill="currentColor" />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="11"
        cy="11"
        rx="8"
        ry="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="11" cy="11" r="2" fill="currentColor" />
      <line
        x1="4"
        y1="18"
        x2="18"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error: errorProp,
  errorText,
  helperText,
  id,
  width,
  value,
  defaultValue,
  type,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const autoId = React.useId();
  const inputId = id || autoId;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;
  const [showPassword, setShowPassword] = useState(false);

  const hasValue = typeof currentValue === 'string' && currentValue.length > 0;
  const floating = focused || hasValue;

  // Автовалидация
  let error = false;
  if (typeof errorProp === 'boolean') {
    error = errorProp;
  } else {
    if (type === 'email' && hasValue)
      error = !validateEmail(currentValue as string);
    if (type === 'phone' && hasValue)
      error = !validatePhone(currentValue as string);
    if (type === 'number' && hasValue)
      error = !validateNumber(currentValue as string);
  }

  // Для пароля показываем/скрываем
  const inputType =
    type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type === 'phone'
      ? 'tel'
      : type;

  return (
    <Wrapper width={width}>
      <FieldWrapper>
        <Input
          id={inputId}
          ref={inputRef}
          $error={error}
          $type={type}
          value={currentValue}
          type={inputType}
          onChange={(e) => {
            if (!isControlled) setInnerValue(e.target.value);
            onChange?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {type === 'password' && (
          <EyeButton
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            onClick={() => setShowPassword((v) => !v)}
          >
            <EyeIcon open={showPassword} />
          </EyeButton>
        )}
        {label && (
          <Label htmlFor={inputId} floating={floating} $error={error}>
            {label}
          </Label>
        )}
      </FieldWrapper>
      <HelperText $error={error}>{error ? errorText : helperText}</HelperText>
    </Wrapper>
  );
};
