// Общие переменные для разных типов Switch
export const TRACK_WIDTH = 40;
export const TRACK_HEIGHT = 22;
export const THUMB_SIZE = 18;
export const TRACK_PADDING = 0;

import { DESIGN_TOKENS } from '../../styles/designTokens';
import styled from 'styled-components';

export const SwitchWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${DESIGN_TOKENS.spacing.small};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  color: var(--c-text-primary);
  user-select: none;
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const LabelText = styled.span`
  user-select: none;
  line-height: 1.2;
  display: inline-block;
`;
