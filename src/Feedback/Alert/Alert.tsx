import React from 'react';
import styled, { css } from 'styled-components';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  type: AlertType;
  children: React.ReactNode;
  outlined?: boolean;
  className?: string;
}

const typeStyles = {
  success: {
    bg: 'var(--avatar-status-online, #4cd964)10',
    border: 'var(--avatar-status-online, #4cd964)',
    color: 'var(--avatar-status-online, #4cd964)',
  },
  info: {
    bg: 'var(--color-primary, #2196f3)10',
    border: 'var(--color-primary, #2196f3)',
    color: 'var(--color-primary, #2196f3)',
  },
  warning: {
    bg: 'var(--color-accent, #ffb300)10',
    border: 'var(--color-accent, #ffb300)',
    color: 'var(--color-accent, #ffb300)',
  },
  error: {
    bg: 'var(--color-error, #f44336)10',
    border: 'var(--color-error, #f44336)',
    color: 'var(--color-error, #f44336)',
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
  border-radius: var(--radius-medium);
  font-size: var(--font-size-medium);
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
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" />
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" />
      <path
        d="M12 8h.01M12 12v4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" />
      <path
        d="M12 8v4m0 4h.01"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" />
      <path
        d="M15 9l-6 6M9 9l6 6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export const Alert: React.FC<AlertProps> = ({
  type,
  children,
  outlined,
  className,
}) => {
  return (
    <AlertWrapper $type={type} $outlined={outlined} className={className}>
      <IconWrapper $type={type}>{icons[type]}</IconWrapper>
      <span>{children}</span>
    </AlertWrapper>
  );
};
