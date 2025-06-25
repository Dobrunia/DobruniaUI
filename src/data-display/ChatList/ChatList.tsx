import React from 'react';
import styled from 'styled-components';
import { Skeleton, Avatar as UserAvatar } from '@DobruniaUI';

// SVG иконка пользователя без фото
const UserIcon = () => (
  <svg width='44' height='44' fill='none' viewBox='0 0 44 44'>
    <circle cx='22' cy='22' r='22' fill='var(--c-bg-elevated)' />
    <circle cx='22' cy='18' r='6' fill='var(--c-text-secondary)' />
    <path
      d='M12 36c0-5.523 4.477-10 10-10s10 4.477 10 10'
      stroke='var(--c-text-secondary)'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

export type MessageStatus = 'unread' | 'read' | 'error';

export interface ChatListItem {
  id: string;
  avatar?: string;
  name: string;
  lastMessage: string;
  time: string;
  messageStatus?: MessageStatus;
  isOutgoing?: boolean;
  status?: 'online' | 'offline' | 'dnd';
}

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
`;

const Item = styled.div<{ $selected?: boolean; $messageStatus?: MessageStatus }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ $selected }) => ($selected ? 'var(--c-accent)' : 'transparent')};
  color: ${({ $selected }) => ($selected ? 'var(--c-text-inverse)' : 'var(--c-text-primary)')};
  cursor: pointer;
  border-bottom: 1px solid var(--c-border);
  &:hover {
    background: ${({ $selected }) =>
      $selected ? 'var(--c-accent-hover)' : 'var(--c-bg-elevated)'};
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.span<{ $selected?: boolean }>`
  font-size: 0.9em;
  color: ${({ $selected }) => ($selected ? 'var(--c-text-inverse)' : 'var(--c-text-secondary)')};
  margin-left: 8px;
  white-space: nowrap;
`;

const LastMessage = styled.span<{
  $messageStatus?: MessageStatus;
  $selected?: boolean;
  $isOutgoing?: boolean;
}>`
  font-size: 0.97em;
  color: ${({ $messageStatus, $selected, $isOutgoing }) => {
    if ($selected) return 'var(--c-text-inverse)';
    if (!$isOutgoing && $messageStatus === 'unread') return 'var(--c-accent)';
    if ($messageStatus === 'error') return 'var(--c-error)';
    return 'var(--c-text-secondary)';
  }};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ $messageStatus, $isOutgoing }) =>
    !$isOutgoing && $messageStatus === 'unread' ? '500' : 'normal'};
`;

const StatusMark = styled.span<{
  $selected?: boolean;
  $messageStatus?: MessageStatus;
  $isOutgoing?: boolean;
}>`
  font-size: 1.1em;
  margin-left: 6px;
  color: ${({ $selected, $messageStatus, $isOutgoing }) => {
    if ($selected) return 'var(--c-text-inverse)';
    if ($messageStatus === 'error') return 'var(--c-error)';
    if ($isOutgoing && $messageStatus === 'read') return 'var(--c-accent)';
    return 'var(--c-text-secondary)';
  }};
`;

/**
 * ChatList - список чатов с аватарами, статусами и skeleton-режимом
 * @param items 'ChatListItem[]' - массив чатов
 * @param loading 'boolean' - отображать skeleton вместо чатов
 * @param skeletonCount 'number' = 6 - количество skeleton-элементов при загрузке
 * @param onSelect '(id: string) => void' - обработчик выбора чата
 * @param selectedId 'string' - id выбранного чата
 * @param className 'string' - дополнительные CSS классы
 */
export const ChatList: React.FC<ChatListProps> = ({
  items = [],
  loading,
  skeletonCount = 6,
  onSelect,
  selectedId,
  className,
}) => {
  if (loading) {
    return (
      <List className={className}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Item key={i}>
            <Skeleton variant='circular' width={44} height={44} />
            <Info>
              <NameRow>
                <Skeleton variant='text' width={120} height={18} />
                <Skeleton variant='text' width={32} height={14} />
              </NameRow>
              <Skeleton variant='text' width={180} height={16} />
            </Info>
          </Item>
        ))}
      </List>
    );
  }
  return (
    <List className={className}>
      {items.map((item) => (
        <Item
          key={item.id}
          $selected={item.id === selectedId}
          $messageStatus={item.messageStatus}
          onClick={() => onSelect?.(item.id)}
        >
          {item.avatar ? (
            <UserAvatar
              src={item.avatar}
              name={item.name}
              size='md'
              status={item.status}
              showStatus={!!item.status}
            />
          ) : (
            <UserIcon />
          )}
          <Info>
            <NameRow>
              <Name>{item.name}</Name>
              <Time $selected={item.id === selectedId}>{item.time}</Time>
            </NameRow>
            <NameRow>
              <LastMessage
                $messageStatus={item.messageStatus}
                $selected={item.id === selectedId}
                $isOutgoing={item.isOutgoing}
              >
                {item.lastMessage}
              </LastMessage>
              {item.isOutgoing && item.messageStatus === 'read' && (
                <StatusMark
                  $selected={item.id === selectedId}
                  $messageStatus={item.messageStatus}
                  $isOutgoing={item.isOutgoing}
                >
                  ✔✔
                </StatusMark>
              )}
              {item.isOutgoing && item.messageStatus === 'unread' && (
                <StatusMark
                  $selected={item.id === selectedId}
                  $messageStatus={item.messageStatus}
                  $isOutgoing={item.isOutgoing}
                >
                  ✔✔
                </StatusMark>
              )}
              {item.messageStatus === 'error' && (
                <StatusMark
                  $selected={item.id === selectedId}
                  $messageStatus={item.messageStatus}
                  $isOutgoing={item.isOutgoing}
                >
                  !
                </StatusMark>
              )}
            </NameRow>
          </Info>
        </Item>
      ))}
    </List>
  );
};
