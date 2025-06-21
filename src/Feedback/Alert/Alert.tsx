import React from 'react';
import styled, { css } from 'styled-components';
import { DESIGN_TOKENS } from '../../styles/designTokens';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  type: AlertType;
  children: React.ReactNode;
  outlined?: boolean;
  className?: string;
}

const typeStyles = {
  success: {
    bg: 'color-mix(in srgb, var(--c-success) 10%, transparent 90%)',
    border: 'var(--c-success)',
    color: 'var(--c-success)',
  },
  info: {
    bg: 'color-mix(in srgb, var(--c-info) 10%, transparent 90%)',
    border: 'var(--c-info)',
    color: 'var(--c-info)',
  },
  warning: {
    bg: 'color-mix(in srgb, var(--c-warning) 10%, transparent 90%)',
    border: 'var(--c-warning)',
    color: 'var(--c-warning)',
  },
  error: {
    bg: 'color-mix(in srgb, var(--c-error) 10%, transparent 90%)',
    border: 'var(--c-error)',
    color: 'var(--c-error)',
  },
};

const AlertWrapper = styled.div<{
  $type: AlertType;
  $outlined?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  font-weight: 400;
  margin-bottom: 16px;
  line-height: 1.5;
  word-break: break-word;
  ${({ $type, $outlined }) => {
    const t = typeStyles[$type];
    return $outlined
      ? css`
          background: transparent;
          border: 1.5px solid ${t.border};
          color: ${t.color};
        `
      : css`
          background: ${t.bg};
          border: none;
          color: ${t.color};
        `;
  }}
`;

const IconWrapper = styled.span<{ $type: AlertType }>`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: ${({ $type }) => typeStyles[$type].color};
  flex-shrink: 0;
`;

const icons: Record<AlertType, React.ReactNode> = {
  success: (
    <svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='10' fill='none' />
      <path
        d='M7 13l3 3 7-7'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  info: (
    <svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='10' fill='none' />
      <path
        d='M12 8h.01M12 12v4'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  warning: (
    <svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='10' fill='none' />
      <path
        d='M12 8v4m0 4h.01'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  error: (
    <svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='10' fill='none' />
      <path
        d='M15 9l-6 6M9 9l6 6'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
};

/**
 * Alert component - компонент для отображения уведомлений и сообщений
 * @param {('success'|'info'|'warning'|'error')} type - тип уведомления:
 *   - success: успешное выполнение операции (зеленый)
 *   - info: информационное сообщение (синий)
 *   - warning: предупреждение (желтый)
 *   - error: ошибка (красный)
 * @param {React.ReactNode} children - содержимое уведомления
 * @param {boolean} [outlined] - стиль с обводкой вместо фона
 * @param {string} [className] - дополнительные CSS классы
 *
 * @example
 * // Успешное уведомление
 * <Alert type="success">
 *   Операция успешно выполнена
 * </Alert>
 *
 * // Информационное сообщение с обводкой
 * <Alert type="info" outlined>
 *   Система будет обновлена в 3:00
 * </Alert>
 *
 * // Предупреждение
 * <Alert type="warning">
 *   Несохраненные изменения будут потеряны
 * </Alert>
 *
 * // Сообщение об ошибке
 * <Alert type="error">
 *   Произошла ошибка при загрузке данных
 * </Alert>
 *
 * // С HTML-содержимым
 * <Alert type="info">
 *   <strong>Важно:</strong> Пожалуйста, проверьте ваши данные
 * </Alert>
 */
export const Alert: React.FC<AlertProps> = ({ type, children, outlined, className }) => {
  return (
    <AlertWrapper $type={type} $outlined={outlined} className={className}>
      <IconWrapper $type={type}>{icons[type]}</IconWrapper>
      <span>{children}</span>
    </AlertWrapper>
  );
};
