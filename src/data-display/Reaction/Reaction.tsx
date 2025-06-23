import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@DobruniaUI';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface ReactionProps {
  emoji: string;
  users: User[];
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  currentUserId?: string;
}

const ReactionRoot = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  background: ${(p) =>
    p.$active
      ? 'color-mix(in srgb, var(--c-accent) 90%, white 10%)'
      : 'color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-text-primary) 20%)'};
  border: ${(p) => (p.$active ? '2px solid var(--c-accent)' : '1px solid var(--c-border)')};
  border-radius: 999px;
  cursor: pointer;
  gap: 6px;
  min-height: 32px;
  transition: all 0.15s;
  position: relative;
  color: ${(p) => (p.$active ? 'var(--c-text-inverse)' : 'var(--c-text-primary)')};
  padding: 4px 8px;
  box-shadow: ${(p) =>
    p.$active
      ? '0 0 8px color-mix(in srgb, var(--c-accent) 40%, transparent 60%), inset 0 1px 2px color-mix(in srgb, white 20%, transparent 80%)'
      : '0 1px 3px color-mix(in srgb, var(--c-text-primary) 15%, transparent 85%)'};
  filter: ${(p) => (p.$active ? 'brightness(1.1) saturate(1.2)' : 'none')};
  &:hover {
    background: ${(p) =>
      p.$active
        ? 'color-mix(in srgb, var(--c-accent) 80%, white 20%)'
        : 'color-mix(in srgb, var(--c-bg-elevated) 70%, var(--c-accent) 30%)'};
    border-color: var(--c-accent);
    transform: ${(p) => (p.$active ? 'scale(1.05)' : 'none')};
    box-shadow: ${(p) =>
      p.$active
        ? '0 0 12px color-mix(in srgb, var(--c-accent) 50%, transparent 50%), inset 0 1px 2px color-mix(in srgb, white 30%, transparent 70%)'
        : '0 2px 6px color-mix(in srgb, var(--c-text-primary) 20%, transparent 80%)'};
  }
`;

const Emoji = styled.span`
  width: 20px;
  height: 20px;
  user-select: none;
`;

const AvatarsStack = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled.div<{ $zIndex?: number }>`
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ $zIndex }) => $zIndex || 10};

  &:first-child {
    margin-left: 0;
  }
`;

const UserCount = styled.span<{ $active?: boolean }>`
  font-size: 12px;
  margin-left: 4px;
  color: ${({ $active }) => ($active ? 'var(--c-text-inverse)' : 'var(--c-text-primary)')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
`;

/**
 * Reaction - реакция на сообщение с эмодзи и стеком аватаров пользователей
 * @param emoji 'string' - эмодзи реакции
 * @param users 'User[]' - массив пользователей с реакцией (id, name, avatar)
 * @param onClick '(e: React.MouseEvent) => void' - обработчик клика по реакции
 * @param className 'string' - дополнительные CSS классы
 * @param currentUserId 'string' - ID текущего пользователя для подсветки активной реакции
 */
export const Reaction: React.FC<ReactionProps> = ({
  emoji,
  users,
  onClick,
  className,
  currentUserId,
}) => {
  const isActive = !!(currentUserId && users.some((u) => u.id === currentUserId));
  return (
    <ReactionRoot onClick={onClick} className={className} $active={isActive}>
      <Emoji>{emoji}</Emoji>
      <AvatarsStack>
        {users.slice(0, 3).map((user, idx) => (
          <AvatarWrapper key={user.id} $zIndex={10 - idx}>
            <Avatar src={user.avatar} name={user.name} size='xxs' showStatus={false} />
          </AvatarWrapper>
        ))}
        {users.length > 3 && <UserCount $active={isActive}>+{users.length - 3}</UserCount>}
      </AvatarsStack>
    </ReactionRoot>
  );
};
