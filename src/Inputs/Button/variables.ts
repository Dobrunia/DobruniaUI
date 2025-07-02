import { css } from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

// Base button variant styles
export const buttonVariantStyles = {
  primary: (outlined: boolean) => css`
    background: ${outlined ? 'transparent' : 'var(--c-accent)'};
    color: ${outlined ? 'var(--c-accent)' : 'var(--c-text-inverse)'};
    border-color: var(--c-accent);
    &:hover:not(:disabled) {
      background: ${outlined
        ? 'var(--c-accent)'
        : 'color-mix(in srgb, var(--c-accent) 85%, black 15%)'};
      color: var(--c-text-inverse);
    }
    &:active:not(:disabled) {
      background: ${outlined
        ? 'color-mix(in srgb, var(--c-accent) 90%, black 10%)'
        : 'color-mix(in srgb, var(--c-accent) 75%, black 25%)'};
      color: var(--c-text-inverse);
    }
  `,
  secondary: (outlined: boolean) => css`
    background: ${outlined ? 'transparent' : 'var(--c-bg-elevated)'};
    color: ${outlined ? 'var(--c-text-primary)' : 'var(--c-text-primary)'};
    border-color: var(--c-border);
    &:hover:not(:disabled) {
      background: ${outlined
        ? 'color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-text-primary) 20%)'
        : 'color-mix(in srgb, var(--c-bg-elevated) 85%, var(--c-text-primary) 15%)'};
      color: var(--c-text-primary);
    }
    &:active:not(:disabled) {
      background: ${outlined
        ? 'color-mix(in srgb, var(--c-bg-elevated) 70%, var(--c-text-primary) 30%)'
        : 'color-mix(in srgb, var(--c-bg-elevated) 75%, var(--c-text-primary) 25%)'};
      color: var(--c-text-primary);
    }
  `,
  warning: (outlined: boolean) => css`
    background: ${outlined ? 'transparent' : 'var(--c-error)'};
    color: ${outlined ? 'var(--c-error)' : 'var(--c-text-inverse)'};
    border-color: var(--c-error);
    &:hover:not(:disabled) {
      background: ${outlined
        ? 'var(--c-error)'
        : 'color-mix(in srgb, var(--c-error) 85%, black 15%)'};
      color: var(--c-text-inverse);
    }
    &:active:not(:disabled) {
      background: ${outlined
        ? 'color-mix(in srgb, var(--c-error) 90%, black 10%)'
        : 'color-mix(in srgb, var(--c-error) 75%, black 25%)'};
      color: var(--c-text-inverse);
    }
  `,
  ghost: () => css`
    background: transparent;
    color: var(--c-text-primary);
    border: none;
    &:hover:not(:disabled) {
      background: color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-text-primary) 20%);
    }
    &:active:not(:disabled) {
      background: color-mix(in srgb, var(--c-bg-elevated) 60%, var(--c-text-primary) 40%);
    }
  `,
};

// Base button size styles
export const buttonSizeStyles = {
  small: css`
    height: ${DESIGN_TOKENS.buttonHeight.small};
    padding: 0 ${DESIGN_TOKENS.spacing.small};
    font-size: ${DESIGN_TOKENS.fontSize.small};
  `,
  medium: css`
    height: ${DESIGN_TOKENS.buttonHeight.medium};
    padding: 0 ${DESIGN_TOKENS.spacing.medium};
    font-size: ${DESIGN_TOKENS.fontSize.medium};
  `,
  large: css`
    height: ${DESIGN_TOKENS.buttonHeight.large};
    padding: 0 ${DESIGN_TOKENS.spacing.large};
    font-size: ${DESIGN_TOKENS.fontSize.large};
  `,
};

// Square button size styles (for circle and square shapes)
export const getSquareButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        width: ${DESIGN_TOKENS.buttonHeight.small};
        height: ${DESIGN_TOKENS.buttonHeight.small};
        padding: 0;
        font-size: ${DESIGN_TOKENS.fontSize.small};
      `;
    case 'large':
      return css`
        width: ${DESIGN_TOKENS.buttonHeight.large};
        height: ${DESIGN_TOKENS.buttonHeight.large};
        padding: 0;
        font-size: ${DESIGN_TOKENS.fontSize.large};
      `;
    default:
      return css`
        width: ${DESIGN_TOKENS.buttonHeight.medium};
        height: ${DESIGN_TOKENS.buttonHeight.medium};
        padding: 0;
        font-size: ${DESIGN_TOKENS.fontSize.medium};
      `;
  }
};

// Base outlined styles
export const outlinedBaseStyles = css`
  background: transparent;
  border: 2px solid;
`;

export const solidBaseStyles = css`
  border: none;
`;
