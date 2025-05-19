import React from 'react';
import styled, { css } from 'styled-components';
import { Reaction } from '../Reaction/Reaction';
import { Avatar } from '../Avatar/Avatar';

export type MessageType = 'incoming' | 'outgoing';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface ReactionData {
  emoji: string;
  users: User[];
}

interface MessageProps {
  type: MessageType;
  text: string;
  time: string;
  reactions?: ReactionData[];
  className?: string;
  sender?: User;
  isRead?: boolean;
  onReaction?: (emoji: string) => void;
  reactionEmojis?: string[];
}

const MessageRoot = styled.div<{ $type: MessageType }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 12px 0;
  width: 100%;
  ${(p) =>
    p.$type === 'outgoing' &&
    css`
      align-items: flex-end;
    `}
`;

const MessageRow = styled.div<{ $type: MessageType }>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  ${(p) => (p.$type === 'outgoing' ? 'flex-direction: row-reverse;' : '')}
`;

const Bubble = styled.div<{ $type: MessageType }>`
  background: ${(p) =>
    p.$type === 'outgoing'
      ? 'var(--color-secondary)'
      : 'var(--color-elevated-active)'};
  color: ${(p) =>
    p.$type === 'outgoing' ? 'var(--text-body)' : 'var(--text-body)'};
  border-radius: var(--radius-large);
  ${(p) =>
    p.$type === 'outgoing'
      ? css`
          border-bottom-right-radius: 0;
        `
      : css`
          border-bottom-left-radius: 0;
        `}
  padding: 12px 16px 8px 16px;
  max-width: 340px;
  min-width: 48px;
  font-size: var(--font-size-medium);
  box-shadow: 0 1px 4px #0001;
  position: relative;
`;

const AvatarBubbleWrapper = styled.div<{ $type: MessageType }>`
  position: absolute;
  bottom: -6px;
  ${(p) => (p.$type === 'outgoing' ? 'right: -24px;' : 'left: -24px;')}
  z-index: 2;
  background: transparent;
`;

const OutlinedAvatar = styled.div`
  border: 3px solid var(--color-elevated);
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`;

const BubbleMeta = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 4px;
  height: 18px;
`;

const SendTime = styled.span`
  font-size: var(--font-size-small);
  color: var(--text-secondary);
`;

const ReadIcon = styled.span<{ $read?: boolean }>`
  display: inline-flex;
  align-items: flex-end;
  font-size: var(--font-size-small);
  color: ${({ $read }) =>
    $read ? 'var(--color-accent)' : 'var(--text-secondary)'};
  svg {
    display: block;
    vertical-align: bottom;
  }
`;

const BubbleTail = styled.div<{ $type: MessageType }>`
  position: absolute;
  bottom: 0;
  ${(p) => (p.$type === 'outgoing' ? 'right: -10px;' : 'left: -10px;')}
  width: 16px;
  height: 16px;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    ${(p) => (p.$type === 'outgoing' ? 'right: 0;' : 'left: 0;')}
    bottom: 0;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 0 solid transparent;
    ${(p) =>
      p.$type === 'outgoing'
        ? 'border-left: 12px solid var(--color-secondary);'
        : 'border-right: 12px solid var(--color-elevated-active);'}
  }
`;

const ReactionMenu = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  background: var(--color-primary);
  border-radius: var(--radius-large);
  box-shadow: 0 2px 8px #0002;
  padding: 6px 12px;
  z-index: 10;
`;

export const Message: React.FC<MessageProps> = ({
  type,
  text,
  time,
  reactions,
  className,
  sender,
  isRead,
  onReaction,
  reactionEmojis = ['❤️', '😂', '👍', '🔥'],
}) => {
  const [showReactions, setShowReactions] = React.useState(false);
  const bubbleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showReactions) return;
    const handle = (e: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
        setShowReactions(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [showReactions]);

  return (
    <MessageRoot $type={type} className={className}>
      <MessageRow $type={type}>
        <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
          <Bubble
            $type={type}
            ref={bubbleRef}
            onClick={onReaction ? () => setShowReactions((v) => !v) : undefined}
            style={onReaction ? { cursor: 'pointer' } : undefined}
          >
            {!sender && <BubbleTail $type={type} />}
            {onReaction && showReactions && (
              <ReactionMenu>
                {reactionEmojis.map((emoji) => (
                  <span
                    key={emoji}
                    style={{
                      fontSize: 24,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReaction(emoji);
                      setShowReactions(false);
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </ReactionMenu>
            )}
            <div>{text}</div>
            <BottomBar>
              {reactions && reactions.length > 0 && (
                <>
                  {reactions.map((r, i) => (
                    <Reaction key={i} emoji={r.emoji} users={r.users} />
                  ))}
                </>
              )}
            </BottomBar>
            <BubbleMeta>
              <SendTime>{time}</SendTime>
              <ReadIcon $read={isRead}>
                {isRead ? (
                  <>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                      <path
                        d="M3 8.5L7 12.5L13 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 8.5L7 12.5L13 6.5"
                        transform="translate(4)"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5L7 12.5L13 6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </ReadIcon>
            </BubbleMeta>
            {sender && (
              <AvatarBubbleWrapper $type={type}>
                <OutlinedAvatar>
                  <Avatar src={sender.avatar} size="sm" name={sender.name} />
                </OutlinedAvatar>
              </AvatarBubbleWrapper>
            )}
          </Bubble>
        </div>
      </MessageRow>
    </MessageRoot>
  );
};
