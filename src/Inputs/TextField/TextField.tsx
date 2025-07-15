import React, { useState, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'autoComplete'> {
  label?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  width?: string;
  autoComplete?: string | boolean;
  className?: string;
}

const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width || '100%'};
  gap: 0.25em;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label<{ $floating: boolean; $error?: boolean }>`
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
`;

const Input = styled.input<{ $error?: boolean; $type?: string }>`
  width: 100%;
  height: 40px;
  padding: 10px ${({ $type }) => ($type === 'password' ? '40px' : '16px')} 2px 10px;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 2px solid ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
  background: var(--c-bg-subtle);
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  transition: border-color ${DESIGN_TOKENS.transition.fast},
    box-shadow ${DESIGN_TOKENS.transition.fast};
  outline: none;
  box-sizing: border-box;
  &:hover {
    border-color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
    box-shadow: 0 0 0 2px
      ${({ $error }) =>
        $error
          ? 'var(--c-error)'
          : 'color-mix(in srgb, var(--c-border-focus) 20%, transparent 80%)'};
  }
  &:disabled {
    background: var(--c-bg-elevated);
    color: var(--c-text-secondary);
    border-color: var(--c-border);
    cursor: not-allowed;
  }
  &:focus {
    border-color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
    box-shadow: 0 0 0 2px
      ${({ $error }) =>
        $error
          ? 'var(--c-error)'
          : 'color-mix(in srgb, var(--c-border-focus) 40%, transparent 60%)'};
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
  color: var(--c-text-secondary);
  height: 24px;
  width: 24px;
`;

const HelperText = styled.div<{ $error?: boolean }>`
  color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-text-secondary)')};
  font-size: ${DESIGN_TOKENS.fontSize.small};
  min-height: 1.2em;
  margin-top: 0.1em;
`;

// Выносим валидацию за пределы компонента
const VALIDATORS = {
  email: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  phone: (val: string) => /^\+?\d{6,}$/.test(val.replace(/\D/g, '')),
  number: (val: string) => /^-?\d*(\.|,)?\d*$/.test(val),
} as const;

const EyeIcon = React.memo(({ open }: { open: boolean }) =>
  open ? (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <ellipse cx='11' cy='11' rx='8' ry='5' stroke='currentColor' strokeWidth='2' />
      <circle cx='11' cy='11' r='2' fill='currentColor' />
    </svg>
  ) : (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <ellipse cx='11' cy='11' rx='8' ry='5' stroke='currentColor' strokeWidth='2' />
      <circle cx='11' cy='11' r='2' fill='currentColor' />
      <line x1='4' y1='18' x2='18' y2='4' stroke='currentColor' strokeWidth='2' />
    </svg>
  )
);

EyeIcon.displayName = 'EyeIcon';

/**
 * TextField component - компонент однострочного текстового поля с плавающей меткой
 * @param label 'string' - текст метки над полем ввода
 * @param error 'boolean' = false - флаг ошибки
 * @param errorText 'string' - текст ошибки
 * @param helperText 'string' - вспомогательный текст
 * @param width 'string' - ширина компонента (например: '300px', '100%')
 * @param autoComplete 'string | boolean' = true - автозаполнение браузера
 * @param type 'string' = 'text' - тип поля ввода: 'text' | 'password' | 'email' | 'phone' | 'number'
 * @param value 'string' - значение поля (для контролируемого компонента)
 * @param defaultValue 'string' - начальное значение поля
 * @param className 'string' - дополнительные CSS классы
 */
export const TextField: React.FC<TextFieldProps> = React.memo(
  ({
    label,
    error: errorProp,
    errorText,
    helperText,
    id,
    width,
    value,
    defaultValue,
    type,
    autoComplete = true,
    onFocus,
    onBlur,
    onChange,
    className,
    ...props
  }) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState(defaultValue ?? '');
    const [showPassword, setShowPassword] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : innerValue;
    const hasValue = typeof currentValue === 'string' && currentValue.length > 0;
    const floating = focused || hasValue;

    // Мемоизируем валидацию
    const error = useMemo(() => {
      if (typeof errorProp === 'boolean') {
        return errorProp;
      }

      if (!hasValue) return false;

      const validator = VALIDATORS[type as keyof typeof VALIDATORS];
      return validator ? !validator(currentValue as string) : false;
    }, [errorProp, hasValue, type, currentValue]);

    // Мемоизируем тип input
    const inputType = useMemo(() => {
      if (type === 'password') {
        return showPassword ? 'text' : 'password';
      }
      if (type === 'phone') {
        return 'tel';
      }
      return type;
    }, [type, showPassword]);

    // Мемоизируем autoComplete
    const autoCompleteValue = useMemo(() => {
      if (autoComplete === false) {
        return 'off';
      }
      if (typeof autoComplete === 'string') {
        return autoComplete;
      }

      const autoCompleteMap: Record<string, string> = {
        email: 'email',
        password: 'current-password',
        phone: 'tel',
        number: 'off',
      };

      return autoCompleteMap[type || 'text'] || 'on';
    }, [autoComplete, type]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInnerValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const togglePassword = useCallback(() => {
      setShowPassword((v) => !v);
    }, []);

    return (
      <Wrapper $width={width} className={className}>
        <FieldWrapper>
          <Input
            id={inputId}
            ref={inputRef}
            $error={error}
            $type={type}
            value={currentValue}
            type={inputType}
            autoComplete={autoCompleteValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {type === 'password' && (
            <EyeButton
              type='button'
              tabIndex={-1}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              onClick={togglePassword}
            >
              <EyeIcon open={showPassword} />
            </EyeButton>
          )}
          {label && (
            <Label htmlFor={inputId} $floating={floating} $error={error}>
              {label}
            </Label>
          )}
        </FieldWrapper>
        <HelperText $error={error}>{error ? errorText : helperText}</HelperText>
      </Wrapper>
    );
  }
);

TextField.displayName = 'TextField';
