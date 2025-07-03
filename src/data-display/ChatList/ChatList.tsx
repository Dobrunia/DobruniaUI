import React from 'react';
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

/* ------------------------------------------------------------------ */
/*                              styled                                */
/* ------------------------------------------------------------------ */
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

  background: ${({ $selected }) => ($selected ? 'var(--c-accent)' : 'transparent')};
  color: ${({ $selected }) => ($selected ? 'var(--c-text-inverse)' : 'var(--c-text-primary)')};

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
  color: ${({ $selected }) => ($selected ? 'var(--c-text-inverse)' : 'var(--c-text-secondary)')};
`;

const LastMessage = styled.span<{
  $msg: MessageStatus | undefined;
  $selected: boolean;
  $out: boolean | undefined;
}>`
  font-size: ${DESIGN_TOKENS.fontSize.small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $msg, $selected, $out }) => {
    if ($selected) return 'color:var(--c-text-inverse);';
    if (!$out && $msg === 'unread') return 'color:var(--c-accent); font-weight:500;';
    if ($msg === 'error') return 'color:var(--c-error);';
    return 'color:var(--c-text-secondary);';
  }}
`;

const Mark = styled.span<{
  $selected: boolean;
  $msg: MessageStatus | undefined;
  $out: boolean | undefined;
}>`
  margin-left: 6px;
  font-size: ${DESIGN_TOKENS.fontSize.medium};

  ${({ $selected, $msg, $out }) => {
    if ($selected) return 'color:var(--c-text-inverse);';
    if ($msg === 'error') return 'color:var(--c-error);';
    if ($out && $msg === 'read') return 'color:var(--c-accent);';
    return 'color:var(--c-text-secondary);';
  }}
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
  /* --------- skeleton state --------- */
  if (loading)
    return (
      <List className={className}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Item key={i} $selected={false}>
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
        ))}
      </List>
    );

  /* --------- normal list --------- */
  return (
    <List className={className}>
      {items.map((it) => {
        const selected = it.id === selectedId;
        const mark = it.messageStatus === 'error' ? '!' : it.isOutgoing ? '✔✔' : null;

        return (
          <Item key={it.id} $selected={selected} onClick={() => onSelect?.(it.id)}>
            {it.avatar ? (
              <UserAvatar
                src={it.avatar}
                name={it.name}
                size='md'
                status={it.status}
                showStatus={Boolean(it.status)}
              />
            ) : (
              /* fallback icon */
              <svg
                width={DESIGN_TOKENS.baseHeight.medium}
                height={DESIGN_TOKENS.baseHeight.medium}
                fill='none'
                viewBox='0 0 44 44'
              >
                <circle cx='22' cy='22' r='22' fill='var(--c-bg-elevated)' />
                <circle cx='22' cy='18' r='6' fill='var(--c-text-secondary)' />
                <path
                  d='M12 36c0-5.523 4.477-10 10-10s10 4.477 10 10'
                  stroke='var(--c-text-secondary)'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            )}

            <Info>
              <NameRow>
                <Name>{it.name}</Name>
                <Time $selected={selected}>{it.time}</Time>
              </NameRow>

              <NameRow>
                <LastMessage $msg={it.messageStatus} $selected={selected} $out={it.isOutgoing}>
                  {it.lastMessage}
                </LastMessage>

                {mark && (
                  <Mark $selected={selected} $msg={it.messageStatus} $out={it.isOutgoing}>
                    {mark}
                  </Mark>
                )}
              </NameRow>
            </Info>
          </Item>
        );
      })}
    </List>
  );
};
