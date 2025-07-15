import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export type AlertWithBorderType = 'success' | 'info' | 'warning' | 'error';

export interface AlertWithBorderProps {
  type: AlertWithBorderType;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const typeStyles = {
  success: {
    border: 'var(--c-success)',
    color: 'var(--c-success)',
    bg: 'color-mix(in srgb, var(--c-success) 5%, transparent 95%)',
  },
  info: {
    border: 'var(--c-info)',
    color: 'var(--c-info)',
    bg: 'color-mix(in srgb, var(--c-info) 5%, transparent 95%)',
  },
  warning: {
    border: 'var(--c-warning)',
    color: 'var(--c-warning)',
    bg: 'color-mix(in srgb, var(--c-warning) 5%, transparent 95%)',
  },
  error: {
    border: 'var(--c-error)',
    color: 'var(--c-error)',
    bg: 'color-mix(in srgb, var(--c-error) 5%, transparent 95%)',
  },
};

const AlertWrapper = styled.div<{ $type: AlertWithBorderType }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  line-height: 1.5;
  word-break: break-word;
  background: ${({ $type }) => typeStyles[$type].bg};
  border-left: 4px solid ${({ $type }) => typeStyles[$type].border};
  color: var(--c-text-primary);
`;

const IconWrapper = styled.span<{ $type: AlertWithBorderType }>`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: ${({ $type }) => typeStyles[$type].color};
  flex-shrink: 0;
  margin-top: 2px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Title = styled.h4<{ $type: AlertWithBorderType }>`
  margin: 0;
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  font-weight: 600;
  color: ${({ $type }) => typeStyles[$type].color};
  line-height: 1.4;
`;

const Description = styled.p`
  margin: 0;
  font-size: ${DESIGN_TOKENS.fontSize.smallPlus};
  color: var(--c-text-secondary);
  line-height: 1.5;
`;

const ChildrenWrapper = styled.div`
  margin-top: 4px;
  font-size: ${DESIGN_TOKENS.fontSize.smallPlus};
  color: var(--c-text-secondary);
`;

const AlertIcon = React.memo<{ type: AlertWithBorderType }>(({ type }) => {
  const icon = useMemo(() => {
    const icons: Record<AlertWithBorderType, React.ReactNode> = {
      success: (
        <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
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
        <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
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
        <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
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
        <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
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
    return icons[type];
  }, [type]);

  return <IconWrapper $type={type}>{icon}</IconWrapper>;
});

AlertIcon.displayName = 'AlertIcon';

/**
 * AlertWithBorder - уведомление с левой границей, заголовком и описанием
 *
 * Особенности:
 * - Левая граница в цвет уведомления
 * - Светлый фон с оттенком цвета уведомления
 * - Заголовок и описание для структурированного контента
 * - Иконка соответствующая типу уведомления
 *
 * @param type - тип уведомления (success, info, warning, error)
 * @param title - заголовок уведомления (опциональный)
 * @param description - описание уведомления (опциональное)
 * @param children - дополнительный контент (опциональный)
 * @param className - дополнительные CSS классы
 */
export const AlertWithBorder = React.memo<AlertWithBorderProps>(
  ({ type, title, description, children, className }) => {
    return (
      <AlertWrapper $type={type} className={className}>
        <AlertIcon type={type} />
        <ContentWrapper>
          {title && <Title $type={type}>{title}</Title>}
          {description && <Description>{description}</Description>}
          {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
        </ContentWrapper>
      </AlertWrapper>
    );
  }
);

AlertWithBorder.displayName = 'AlertWithBorder';
