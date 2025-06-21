import React from 'react';
import { DESIGN_TOKENS } from '../../styles/designTokens';
import styled from 'styled-components';

export interface TabData {
  id: string | number;
  label: string;
  leftSlot?: React.ReactNode;
  notification?: number;
  // можно добавить rightSlot, tooltip, icon и т.д.
}

interface TabProps {
  tab: TabData;
  selected: boolean;
  onClick: (id: string | number) => void;
}

const TabButton = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${DESIGN_TOKENS.spacing.small} 0;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.$selected ? 'var(--c-text-primary)' : 'var(--c-text-secondary)')};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  font-weight: 500;
  transition: color ${DESIGN_TOKENS.transition.fast};
  outline: none;
  gap: ${DESIGN_TOKENS.spacing.tiny};
  line-height: 1;

  &:hover,
  &:focus {
    color: var(--c-text-primary);
  }
`;

const LeftBlock = styled.span`
  display: flex;
  align-items: center;
  position: relative;
`;

const LeftSlotWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: inherit;
  line-height: inherit;
`;

const RightSlotWrapper = styled.span`
  height: 100%;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  color: var(--c-text-secondary);
`;

const TabText = styled.span`
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
`;

const Underline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background-color: var(--c-accent);
  border-radius: ${DESIGN_TOKENS.radius.medium};
`;

export const Tab: React.FC<TabProps> = ({ tab, selected, onClick }) => {
  return (
    <TabButton $selected={selected} onClick={() => onClick(tab.id)}>
      <LeftBlock>
        {tab.leftSlot && <LeftSlotWrapper>{tab.leftSlot}</LeftSlotWrapper>}
        <TabText>{tab.label}</TabText>
        {selected && <Underline />}
      </LeftBlock>
      {typeof tab.notification === 'number' &&
        tab.notification !== undefined &&
        tab.notification !== null && <RightSlotWrapper>{tab.notification}</RightSlotWrapper>}
    </TabButton>
  );
};
