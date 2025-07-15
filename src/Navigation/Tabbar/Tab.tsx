import React, { useCallback, useMemo } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

export interface TabData {
  id: string | number;
  label: string;
  leftSlot?: React.ReactNode;
  notification?: number;
  // можно добавить rightSlot, tooltip, icon и т.д.
}

export interface TabProps {
  tab: TabData;
  selected: boolean;
  onClick: (id: string | number) => void;
  className?: string;
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

// Мемоизированные подкомпоненты
const TabLeftSlot = React.memo<{ leftSlot: React.ReactNode }>(({ leftSlot }) => (
  <LeftSlotWrapper>{leftSlot}</LeftSlotWrapper>
));
TabLeftSlot.displayName = 'TabLeftSlot';

const TabTextContent = React.memo<{ label: string }>(({ label }) => <TabText>{label}</TabText>);
TabTextContent.displayName = 'TabTextContent';

const TabNotification = React.memo<{ notification: number }>(({ notification }) => (
  <RightSlotWrapper>{notification}</RightSlotWrapper>
));
TabNotification.displayName = 'TabNotification';

const TabUnderline = React.memo(() => <Underline />);
TabUnderline.displayName = 'TabUnderline';

/**
 * Tab component - отдельная вкладка для использования в Tabbar
 *
 * @param tab 'TabData' - данные вкладки
 * @param selected 'boolean' - флаг выбранной вкладки
 * @param onClick '(id: string | number) => void' - обработчик клика
 * @param className 'string' - дополнительные CSS классы
 */
export const Tab = React.memo<TabProps>(({ tab, selected, onClick, className }) => {
  // Стабилизируем обработчик клика
  const handleClick = useCallback(() => {
    onClick(tab.id);
  }, [onClick, tab.id]);

  // Мемоизируем пропсы для кнопки
  const buttonProps = useMemo(
    () => ({
      $selected: selected,
      onClick: handleClick,
    }),
    [selected, handleClick]
  );

  // Мемоизируем проверку уведомления
  const showNotification = useMemo(
    () =>
      typeof tab.notification === 'number' &&
      tab.notification !== undefined &&
      tab.notification !== null,
    [tab.notification]
  );

  return (
    <TabButton {...buttonProps} className={className}>
      <LeftBlock>
        {tab.leftSlot && <TabLeftSlot leftSlot={tab.leftSlot} />}
        <TabTextContent label={tab.label} />
        {selected && <TabUnderline />}
      </LeftBlock>
      {showNotification && <TabNotification notification={tab.notification!} />}
    </TabButton>
  );
});

Tab.displayName = 'Tab';
