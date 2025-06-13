// Общие переменные для разных типов Switch
export const TRACK_WIDTH = 40;
export const TRACK_HEIGHT = 22;
export const THUMB_SIZE = 18;
export const TRACK_PADDING = 0;

import styled from 'styled-components';

export const SwitchWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-small);
  cursor: pointer;
  font-size: var(--font-size-medium);
  color: var(--text-body);
  user-select: none;
  position: relative;
`;

export const LabelText = styled.span`
  user-select: none;
  line-height: 1.2;
  display: inline-block;
`;
