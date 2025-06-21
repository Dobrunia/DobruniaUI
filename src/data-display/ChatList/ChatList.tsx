import React from 'react';
import styled from 'styled-components';
import { Skeleton, Avatar as UserAvatar } from '@DobruniaUI';

export interface ChatListItem {
  id: string;
  avatar?: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  isRead?: boolean;
  status?: 'online' | 'offline' | 'dnd';
}

interface ChatListProps {
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

const Item = styled.div<{ $selected?: boolean; $unread?: boolean }>`
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

const Time = styled.span`
  font-size: 0.9em;
  color: var(--c-text-secondary);
  margin-left: 8px;
  white-space: nowrap;
`;

const LastMessage = styled.span<{ $unread?: boolean }>`
  font-size: 0.97em;
  color: ${({ $unread }) => ($unread ? 'var(--c-accent)' : 'var(--c-text-secondary)')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMark = styled.span`
  font-size: 1.1em;
  margin-left: 6px;
  color: var(--c-accent);
`;

/**
 * ChatList - компонент для отображения списка чатов с аватаром, именем, последним сообщением, временем, статусом пользователя и skeleton-режимом.
 *
 * @param {ChatListItem[]} [items] - массив чатов
 * @param {boolean} [loading] - отображать skeleton вместо чатов
 * @param {number} [skeletonCount=6] - количество skeleton-элементов при загрузке
 * @param {(id: string) => void} [onSelect] - обработчик выбора чата
 * @param {string} [selectedId] - id выбранного чата
 * @param {string} [className] - дополнительные CSS классы
 *
 * @example
 * // Базовое использование
 * <ChatList items={items} selectedId={selectedId} onSelect={setSelected} />
 *
 * // С кастомными стилями
 * <ChatList
 *   items={items}
 *   selectedId={selectedId}
 *   onSelect={setSelected}
 *   className="custom-chat-list"
 * />
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
          $unread={item.unread}
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
            <Skeleton variant='circular' width={44} height={44} />
          )}
          <Info>
            <NameRow>
              <Name>{item.name}</Name>
              <Time>{item.time}</Time>
            </NameRow>
            <NameRow>
              <LastMessage $unread={item.unread}>{item.lastMessage}</LastMessage>
              {item.isRead && <ReadMark>✔✔</ReadMark>}
            </NameRow>
          </Info>
        </Item>
      ))}
    </List>
  );
};
