import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@DobruniaUI';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface ReactionProps {
  emoji: string;
  users: User[];
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  currentUserId?: string;
}

const ReactionRoot = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  background: ${(p) => (p.$active ? 'var(--color-accent)' : 'var(--color-primary)')};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  gap: 6px;
  min-height: 32px;
  transition: background 0.15s;
  position: relative;
  &:hover {
    background: var(--color-accent);
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

const AvatarWrapper = styled.div`
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:first-child {
    margin-left: 0;
  }
  z-index: 1;
`;

/**
 * Reaction component - компонент реакции на сообщение с отображением пользователей
 * @param {string} emoji - эмодзи реакции
 * @param {User[]} users - массив пользователей, поставивших реакцию:
 *   - id: string - идентификатор пользователя
 *   - name: string - имя пользователя
 *   - avatar?: string - URL аватара
 * @param {(e: React.MouseEvent) => void} [onClick] - обработчик клика по реакции
 * @param {string} [className] - дополнительные CSS классы
 * @param {string} [currentUserId] - ID текущего пользователя (для подсветки активной реакции)
 *
 * @example
 * // Базовая реакция
 * <Reaction
 *   emoji="👍"
 *   users={[
 *     { id: "1", name: "John", avatar: "/path/to/avatar1.jpg" },
 *     { id: "2", name: "Jane", avatar: "/path/to/avatar2.jpg" }
 *   ]}
 * />
 *
 * // Реакция с обработчиком
 * <Reaction
 *   emoji="❤️"
 *   users={users}
 *   onClick={(e) => handleReactionClick(e)}
 * />
 *
 * // Активная реакция текущего пользователя
 * <Reaction
 *   emoji="😂"
 *   users={users}
 *   currentUserId="1"
 * />
 *
 * // Реакция с большим количеством пользователей
 * <Reaction
 *   emoji="🔥"
 *   users={[
 *     { id: "1", name: "John" },
 *     { id: "2", name: "Jane" },
 *     { id: "3", name: "Bob" },
 *     { id: "4", name: "Alice" },
 *     { id: "5", name: "Mike" }
 *   ]}
 * />
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
          <AvatarWrapper key={user.id} style={{ zIndex: 10 - idx }}>
            <Avatar src={user.avatar} name={user.name} size='xxs' showStatus={false} />
          </AvatarWrapper>
        ))}
        {users.length > 3 && (
          <span
            style={{
              fontSize: '12px',
              marginLeft: 4,
              color: 'var(--text-heading)',
            }}
          >
            +{users.length - 3}
          </span>
        )}
      </AvatarsStack>
    </ReactionRoot>
  );
};
