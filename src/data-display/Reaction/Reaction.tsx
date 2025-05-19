import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../Avatar/Avatar';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface ReactionProps {
  emoji: string;
  users: User[];
  onClick?: () => void;
  className?: string;
}

const ReactionRoot = styled.button`
  display: flex;
  align-items: center;
  background: var(--color-primary);
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

export const Reaction: React.FC<ReactionProps> = ({
  emoji,
  users,
  onClick,
  className,
}) => {
  return (
    <ReactionRoot onClick={onClick} className={className}>
      <Emoji>{emoji}</Emoji>
      <AvatarsStack>
        {users.slice(0, 3).map((user, idx) => (
          <AvatarWrapper key={user.id} style={{ zIndex: 10 - idx }}>
            <Avatar
              src={user.avatar}
              name={user.name}
              size="xxs"
              showStatus={false}
            />
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
