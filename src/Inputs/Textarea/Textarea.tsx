import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';
import { useAutoHeight } from '../../utils/hooks';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  width?: string;
  autoHeight?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  className?: string;
}

const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width || '100%'};
  gap: 0.25em;
`;

const Label = styled.label<{ $error?: boolean }>`
  color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-accent)')};
  font-size: ${DESIGN_TOKENS.fontSize.small};
  margin-bottom: 0.15em;
`;

const StyledTextarea = styled.textarea<{
  $error?: boolean;
  $resize: string;
  $autoHeight?: boolean;
}>`
  width: 100%;
  min-height: 80px;
  resize: ${({ $resize, $autoHeight }) => ($autoHeight ? 'none' : $resize)};
  padding: 16px;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 2px solid ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
  background: var(--c-bg-subtle);
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  transition: border-color ${DESIGN_TOKENS.transition.fast},
    box-shadow ${DESIGN_TOKENS.transition.fast};
  outline: none;
  box-sizing: border-box;
  overflow: ${({ $autoHeight }) => ($autoHeight ? 'hidden' : 'auto')};

  &:hover {
    border-color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
    box-shadow: 0 0 0 2px
      ${({ $error }) =>
        $error
          ? 'var(--c-error)'
          : 'color-mix(in srgb, var(--c-border-focus) 20%, transparent 80%)'};
  }
  &:focus {
    border-color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-border-focus)')};
    box-shadow: 0 0 0 2px
      ${({ $error }) =>
        $error
          ? 'var(--c-error)'
          : 'color-mix(in srgb, var(--c-border-focus) 40%, transparent 60%)'};
  }
  &:disabled {
    background: var(--c-bg-elevated);
    color: var(--c-text-secondary);
    border-color: var(--c-border);
    cursor: not-allowed;
  }
`;

const HelperText = styled.div<{ $error?: boolean }>`
  color: ${({ $error }) => ($error ? 'var(--c-error)' : 'var(--c-text-secondary)')};
  font-size: ${DESIGN_TOKENS.fontSize.small};
  min-height: 1.2em;
  margin-top: 0.1em;
`;

/**
 * Textarea component - компонент многострочного текстового поля
 * @param label 'string' - текст метки над полем ввода
 * @param error 'boolean' = false - флаг ошибки
 * @param errorText 'string' - текст ошибки
 * @param helperText 'string' - вспомогательный текст
 * @param width 'string' - ширина компонента (например: '300px', '100%')
 * @param autoHeight 'boolean' = false - автоматическая высота по содержимому
 * @param resize 'none | vertical | horizontal | both' = 'none' - возможность изменения размера
 * @param id 'string' - уникальный идентификатор поля
 * @param value 'string' - значение поля (для контролируемого компонента)
 * @param defaultValue 'string' - начальное значение поля
 * @param className 'string' - дополнительные CSS классы
 */
export const Textarea: React.FC<TextareaProps> = React.memo(
  ({
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
    className,
    ...props
  }) => {
    const autoId = React.useId();
    const textareaId = id || autoId;
    const [innerValue, setInnerValue] = useState(defaultValue ?? '');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : innerValue;

    // Используем кастомный хук для авто-высоты
    const textareaRef = useAutoHeight(autoHeight || false, String(currentValue));

    // Создаем стабильные ссылки на колбэки
    const onChangeRef = useRef(onChange);
    const onFocusRef = useRef(onFocus);
    const onBlurRef = useRef(onBlur);

    // Обновляем refs при изменении пропсов
    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
      onFocusRef.current = onFocus;
    }, [onFocus]);

    useEffect(() => {
      onBlurRef.current = onBlur;
    }, [onBlur]);

    // Стабильные обработчики событий
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          setInnerValue(e.target.value);
        }
        onChangeRef.current?.(e);
      },
      [isControlled]
    );

    const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocusRef.current?.(e);
    }, []);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlurRef.current?.(e);
    }, []);

    return (
      <Wrapper $width={width} className={className}>
        {label && (
          <Label htmlFor={textareaId} $error={error}>
            {label}
          </Label>
        )}
        <StyledTextarea
          id={textareaId}
          ref={textareaRef}
          $error={error}
          $resize={resize}
          $autoHeight={autoHeight}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <HelperText $error={error}>{error ? errorText : helperText}</HelperText>
      </Wrapper>
    );
  }
);

Textarea.displayName = 'Textarea';
