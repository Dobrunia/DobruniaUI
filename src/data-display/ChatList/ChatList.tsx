import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import {
  Skeleton,
  Avatar as UserAvatar,
  DESIGN_TOKENS,
  type Presence,
  type MessageStatus,
} from '@DobruniaUI';

/**
 * ChatListItem - интерфейс для описания элемента списка чатов
 * @param id 'string' - уникальный идентификатор чата
 * @param avatar 'string' - URL изображения аватара
 * @param name 'string' - имя пользователя
 * @param lastMessage 'string' - последнее сообщение
 * @param time 'string' - время последнего сообщения
 * @param messageStatus 'unread' | 'read' | 'error' = 'unread' - статус сообщения
 * @param isOutgoing 'boolean' = false - флаг, указывающий на исходящее сообщение
 * @param status 'Presence' = 'offline' - статус пользователя
 * @param unreadCount 'number' - количество непрочитанных сообщений
 */
export interface ChatListItem {
  id: string;
  avatar?: string;
  name: string;
  lastMessage: string;
  time: string;
  messageStatus?: MessageStatus;
  isOutgoing?: boolean;
  status?: Presence;
  unreadCount?: number;
}

/**
 * ChatListProps - пропсы для компонента ChatList
 * @param items 'ChatListItem[]' - массив чатов
 * @param loading 'boolean' - отображать skeleton вместо чатов
 * @param skeletonCount 'number' = 6 - количество skeleton-элементов при загрузке
 * @param onSelect '(id: string) => void' - обработчик выбора чата
 * @param selectedId 'string' - id выбранного чата
 * @param className 'string' - дополнительные CSS классы
 */
export interface ChatListProps {
  items?: ChatListItem[];
  loading?: boolean;
  skeletonCount?: number;
  onSelect?: (id: string) => void;
  selectedId?: string;
  className?: string;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* Кастомный цвет для более яркого вторичного текста */
  --chat-text-secondary: color-mix(in srgb, var(--c-text-secondary) 80%, var(--c-text-primary) 20%);
`;

const Item = styled.div<{
  $selected: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--c-border);
  border-left: 4px solid transparent;
  position: relative;
  color: var(--c-text-primary);

  ${({ $selected }) =>
    $selected
      ? `
    background: var(--c-bg-default);
    border-left: 4px solid var(--c-accent);
  `
      : `&:hover {
    filter: brightness(0.85);
  }`}
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const NameRow = styled.div`
  height: ${DESIGN_TOKENS.baseHeight.tiny};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.span<{ $selected: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  margin-left: 8px;
  color: var(--chat-text-secondary);
`;

const LastMessage = styled.span<{
  $msg: MessageStatus | undefined;
  $out: boolean | undefined;
}>`
  font-size: ${DESIGN_TOKENS.fontSize.small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $msg, $out }) => {
    if (!$out && $msg === 'unread') return 'color:var(--c-accent); font-weight:500;';
    if ($msg === 'error') return 'color:var(--c-error);';
    return 'color:var(--chat-text-secondary);';
  }}
`;

const Mark = styled.span<{
  $msg: MessageStatus | undefined;
  $out: boolean | undefined;
}>`
  margin-left: 12px;
  font-size: ${DESIGN_TOKENS.fontSize.small};

  ${({ $msg, $out }) => {
    if ($msg === 'error') return 'color:var(--c-error);';
    if ($out && $msg === 'read') return 'color:var(--c-accent);';
    return 'color:var(--chat-text-secondary);';
  }}
`;

const UnreadBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: var(--c-accent);
  color: var(--c-text-inverse);
  border-radius: 8px;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  font-weight: 500;
  line-height: 1;
`;

const CustomCheckmark = styled.span<{
  $msg: MessageStatus | undefined;
  $out: boolean | undefined;
}>`
  display: inline-block;
  width: 16px;
  height: 16px;

  svg {
    width: 100%;
    height: 100%;
  }

  ${({ $msg, $out }) => {
    if ($msg === 'error') return 'color:var(--c-error);';
    if ($out && $msg === 'read') return 'color:var(--c-accent);';
    return 'color:var(--chat-text-secondary);';
  }}
`;

// Fallback иконка для аватара
const FallbackAvatar = React.memo(() => (
  <svg
    width={DESIGN_TOKENS.baseHeight.medium}
    height={DESIGN_TOKENS.baseHeight.medium}
    fill='none'
    viewBox='0 0 44 44'
  >
    <circle cx='22' cy='22' r='22' fill='var(--c-bg-elevated)' />
    <circle cx='22' cy='18' r='6' fill='var(--chat-text-secondary)' />
    <path
      d='M12 36c0-5.523 4.477-10 10-10s10 4.477 10 10'
      stroke='var(--chat-text-secondary)'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
));

FallbackAvatar.displayName = 'FallbackAvatar';

// Мемоизированный компонент для skeleton элемента
const SkeletonItem = React.memo<{ index: number }>(({ index }) => (
  <Item key={`skeleton-${index}`} $selected={false}>
    <Skeleton
      variant='circular'
      width={DESIGN_TOKENS.baseHeight.medium}
      height={DESIGN_TOKENS.baseHeight.medium}
    />
    <Info>
      <NameRow>
        <Skeleton variant='text' width={120} height={DESIGN_TOKENS.baseHeight.tiny} />
        <Skeleton variant='text' width={32} height={DESIGN_TOKENS.baseHeight.tiny} />
      </NameRow>
      <Skeleton variant='text' width={180} height={DESIGN_TOKENS.baseHeight.tiny} />
    </Info>
  </Item>
));

SkeletonItem.displayName = 'SkeletonItem';

// Мемоизированный компонент для элемента чата
const ChatItem = React.memo<{
  item: ChatListItem;
  selected: boolean;
  onSelect: (id: string) => void;
}>(({ item, selected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(item.id);
  }, [item.id, onSelect]);

  const mark = useMemo(() => {
    if (item.messageStatus === 'error') return '!';
    if (item.isOutgoing) return 'checkmark';
    return null;
  }, [item.messageStatus, item.isOutgoing]);

  return (
    <Item key={`chat-${item.id}`} $selected={selected} onClick={handleClick}>
      {item.avatar ? (
        <UserAvatar
          src={item.avatar}
          name={item.name}
          size='md'
          status={item.status}
          showStatus={Boolean(item.status)}
        />
      ) : (
        <FallbackAvatar />
      )}

      <Info>
        <NameRow>
          <Name>{item.name}</Name>
          <Time $selected={selected}>{item.time}</Time>
        </NameRow>

        <NameRow>
          <LastMessage $msg={item.messageStatus} $out={item.isOutgoing}>
            {item.lastMessage}
          </LastMessage>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {mark &&
              (mark === '!' ? (
                <Mark $msg={item.messageStatus} $out={item.isOutgoing}>
                  {mark}
                </Mark>
              ) : (
                <CustomCheckmark $msg={item.messageStatus} $out={item.isOutgoing}>
                  <svg viewBox='0 0 260 200' xmlns='http://www.w3.org/2000/svg' fill='none'>
                    <path
                      d='M20 120 L80 180 L200 40'
                      stroke='currentColor'
                      strokeWidth='28'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M130 180 L244 46'
                      stroke='currentColor'
                      strokeWidth='28'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </CustomCheckmark>
              ))}
            {item.unreadCount && (
              <UnreadBadge>{item.unreadCount > 99 ? '99+' : item.unreadCount}</UnreadBadge>
            )}
          </div>
        </NameRow>
      </Info>
    </Item>
  );
});

ChatItem.displayName = 'ChatItem';

/**
 * ChatList - список чатов с аватарами, статусами и skeleton-режимом
 * @param items 'ChatListItem[]' - массив чатов
 * @param loading 'boolean' - отображать skeleton вместо чатов
 * @param skeletonCount 'number' = 6 - количество skeleton-элементов при загрузке
 * @param onSelect '(id: string) => void' - обработчик выбора чата
 * @param selectedId 'string' - id выбранного чата
 * @param className 'string' - дополнительные CSS классы
 */
export const ChatList: React.FC<ChatListProps> = React.memo(
  ({ items = [], loading, skeletonCount = 6, onSelect, selectedId, className }) => {
    // Стабилизируем обработчик выбора
    const handleSelect = useCallback(
      (id: string) => {
        onSelect?.(id);
      },
      [onSelect]
    );

    // Мемоизируем skeleton элементы
    const skeletonItems = useMemo(() => {
      if (!loading) return null;

      return Array.from({ length: skeletonCount }).map((_, i) => (
        <SkeletonItem key={`skeleton-${i}`} index={i} />
      ));
    }, [loading, skeletonCount]);

    // Мемоизируем элементы чатов
    const chatItems = useMemo(() => {
      if (loading) return null;

      return items.map((item) => (
        <ChatItem
          key={`chat-${item.id}`}
          item={item}
          selected={item.id === selectedId}
          onSelect={handleSelect}
        />
      ));
    }, [items, selectedId, handleSelect, loading]);

    return <List className={className}>{skeletonItems || chatItems}</List>;
  }
);

ChatList.displayName = 'ChatList';
