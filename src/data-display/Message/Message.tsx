import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Reaction, Avatar, ActionsMenu, type ActionsMenuAction } from '@DobruniaUI';
import { DESIGN_TOKENS } from '../../styles/designTokens';

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

// Используем ActionsMenuAction напрямую
type MessageAction = ActionsMenuAction;

export interface MessageProps {
  type: MessageType;
  text: string;
  time: string;
  reactions?: ReactionData[];
  className?: string;
  sender?: User;
  isRead?: boolean;
  onReaction?: (emoji: string) => void;
  reactionEmojis?: string[];
  currentUserId?: string;
  actions?: MessageAction[];
  attachments?: {
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
    size?: number;
    duration?: number; // Duration in seconds for audio files
  }[];
  forwardedFrom?: { id: string; name: string };
  onForwardedClick?: (id: string) => void;
  replyTo?: {
    id: string;
    text?: string;
    attachments?: { type: 'image' | 'file' | 'audio'; name?: string }[];
    sender?: { name: string };
  };
  id?: string;
  /** Открывать ActionsMenu сразу при клике на сообщение (вместе с реакциями) */
  showActionsOnClick?: boolean;
}

const MessageRoot = styled.div<{ $type: MessageType }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 12px 0;
  width: 100%;
  padding: ${(p) => (p.$type === 'outgoing' ? '0 30px 0 0' : '0 0 0 30px')};
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

const MessageWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`;

const Bubble = styled.div<{ $type: MessageType; $hasInteraction?: boolean }>`
  background: ${(p) =>
    p.$type === 'outgoing'
      ? 'var(--c-accent)'
      : 'color-mix(in srgb, var(--c-bg-elevated) 70%, var(--c-text-primary) 30%)'};
  color: ${(p) => (p.$type === 'outgoing' ? 'var(--c-text-inverse)' : 'var(--c-text-primary)')};
  border: ${(p) =>
    p.$type === 'incoming'
      ? '1px solid color-mix(in srgb, var(--c-border) 60%, var(--c-text-primary) 40%)'
      : 'none'};
  border-radius: ${DESIGN_TOKENS.radius.large};
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
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  box-shadow: ${(p) =>
    p.$type === 'incoming'
      ? '0 2px 8px color-mix(in srgb, var(--c-text-primary) 20%, transparent 80%)'
      : '0 1px 4px #0001'};
  position: relative;
  backdrop-filter: ${(p) => (p.$type === 'incoming' ? 'brightness(1.1)' : 'none')};
  cursor: ${(p) => (p.$hasInteraction ? 'pointer' : 'auto')};
`;

const AvatarBubbleWrapper = styled.div<{ $type: MessageType }>`
  position: absolute;
  bottom: -6px;
  ${(p) => (p.$type === 'outgoing' ? 'right: -30px;' : 'left: -30px;')}
  background: transparent;
`;

const OutlinedAvatar = styled.div`
  border: 3px solid var(--c-bg-default);
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
  flex-wrap: wrap;
`;

const BubbleMeta = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 4px;
  height: 18px;
`;

const SendTime = styled.span<{ $type: MessageType; $isRead?: boolean }>`
  font-size: ${DESIGN_TOKENS.fontSize.small};
  color: ${(p) => (p.$type === 'outgoing' ? 'var(--c-text-inverse)' : 'var(--c-text-secondary)')};
  opacity: ${(p) => (p.$type === 'outgoing' ? 0.9 : 1)};
`;

const ReadIcon = styled.span<{ $type: MessageType; $isRead?: boolean }>`
  display: inline-flex;
  align-items: flex-end;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  color: ${(p) =>
    p.$isRead
      ? 'var(--c-success)'
      : p.$type === 'outgoing'
      ? 'var(--c-text-inverse)'
      : 'var(--c-text-secondary)'};
  opacity: ${(p) => (p.$type === 'outgoing' && !p.$isRead ? 0.9 : 1)};

  svg {
    display: block;
    vertical-align: bottom;
  }
`;

const BubbleTail = styled.div<{ $type: MessageType }>`
  position: absolute;
  bottom: 0px;
  ${(p) => (p.$type === 'outgoing' ? 'right: -15px;' : 'left: -15px;')}
  width: 20px;
  height: 18px;
  pointer-events: none;

  /* Основной треугольник */
  &::after {
    content: '';
    position: absolute;
    ${(p) => (p.$type === 'outgoing' ? 'right: 0;' : 'left: 0;')}
    bottom: 0;
    width: 0;
    height: 0;
    border-top: 14px solid transparent;
    border-bottom: 0 solid transparent;
    ${(p) =>
      p.$type === 'outgoing'
        ? 'border-left: 16px solid var(--c-accent);'
        : 'border-right: 16px solid color-mix(in srgb, var(--c-bg-elevated) 70%, var(--c-text-primary) 30%);'}
  }

  /* Обводка для входящих сообщений */
  ${(p) =>
    p.$type === 'incoming' &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: -1px;
        bottom: -1px;
        width: 0;
        height: 0;
        border-top: 15px solid transparent;
        border-bottom: 0 solid transparent;
        border-right: 17px solid color-mix(in srgb, var(--c-border) 60%, var(--c-text-primary) 40%);
        z-index: -1;
      }
    `}
`;

const ReactionMenu = styled.div<{ $type: MessageType }>`
  position: absolute;
  top: -50px;
  ${(p) => (p.$type === 'outgoing' ? 'right: 0; left: auto;' : 'left: 0; right: auto;')}
  transform: none;
  display: flex;
  gap: ${DESIGN_TOKENS.spacing.small};
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  padding: ${DESIGN_TOKENS.spacing.small} ${DESIGN_TOKENS.spacing.medium};
  z-index: 1000;
  max-width: 280px;
  overflow-x: auto;
  overflow-y: hidden;

  /* Кастомный скроллбар */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--c-bg-subtle);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--c-border);
    border-radius: 2px;

    &:hover {
      background: var(--c-text-secondary);
    }
  }

  /* Для темной темы добавляем дополнительный border */
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const EmojiButton = styled.span`
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.15s ease;
  background: transparent;

  &:hover {
    background: var(--c-bg-subtle);
  }
`;

const AttachmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const ImageAttachment = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: ${DESIGN_TOKENS.radius.medium};
  object-fit: cover;
  cursor: pointer;
`;

const FileAttachment = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-text-primary) 20%);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  color: var(--c-text-primary);
  text-decoration: none;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  border: 1px solid var(--c-border);

  &:hover {
    background: color-mix(in srgb, var(--c-bg-elevated) 70%, var(--c-text-primary) 30%);
  }
`;

const ImageModalOverlay = styled.div`
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ImageModalImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: ${DESIGN_TOKENS.radius.large};
  box-shadow: 0 8px 32px #0008;
  background: #fff;
  cursor: default;
`;

const AudioAttachment = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: color-mix(in srgb, var(--c-bg-elevated) 80%, var(--c-text-primary) 20%);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  width: 100%;
  max-width: 300px;
  border: 1px solid var(--c-border);
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-primary);
  &:hover {
    color: var(--c-accent);
  }
`;

const AudioProgress = styled.div`
  flex: none;
  width: 180px;
  height: 8px;
  background: var(--c-bg-elevated);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`;

const AudioProgressBar = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${(props) => props.$progress}%;
  background: var(--c-accent);
  border-radius: 4px;
`;

const AudioDuration = styled.span`
  color: var(--c-text-secondary);
  font-size: 0.9em;
  white-space: nowrap;
`;

const ForwardedBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: color-mix(in srgb, var(--c-bg-elevated) 85%, var(--c-accent) 15%);
  font-size: ${DESIGN_TOKENS.fontSize.smallPlus};
  border-left: 3px solid var(--c-accent);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  padding: 4px 12px;
  margin-bottom: 4px;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
  max-width: 100%;
  color: var(--c-text-primary);
  &:hover {
    background: color-mix(in srgb, var(--c-bg-elevated) 75%, var(--c-accent) 25%);
  }
`;

const ReplyBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: color-mix(in srgb, var(--c-bg-elevated) 85%, var(--c-accent) 15%);
  font-size: ${DESIGN_TOKENS.fontSize.smallPlus};
  border-left: 3px solid var(--c-accent);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  padding: 4px 12px;
  margin-bottom: 4px;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
  max-width: 100%;
  color: var(--c-text-primary);
  &:hover {
    background: color-mix(in srgb, var(--c-bg-elevated) 75%, var(--c-accent) 25%);
  }
`;

const ReplySender = styled.span`
  font-weight: 500;
  color: var(--c-accent);
  margin-bottom: 2px;
`;

const ReplyText = styled.span`
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledActionsMenu = styled(ActionsMenu)<{ $type: MessageType }>`
  position: absolute;
  top: 34px;
  ${(p) => (p.$type === 'outgoing' ? 'right: 0; left: auto;' : 'left: 0; right: auto;')}
  z-index: 1001;
`;

const HiddenAudio = styled.audio`
  display: none;
`;

const MessageText = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;

/**
 * Message - сообщение в чате с реакциями, вложениями и меню действий
 * @param type 'incoming' | 'outgoing' - тип сообщения (входящее/исходящее)
 * @param text 'string' - текст сообщения
 * @param time 'string' - время отправки сообщения
 * @param reactions 'ReactionData[]' - массив реакций на сообщение
 * @param className 'string' - дополнительные CSS классы
 * @param sender 'User' - информация об отправителе (id, name, avatar)
 * @param isRead 'boolean' - флаг прочтения сообщения
 * @param onReaction '(emoji: string) => void' - обработчик добавления реакции
 * @param reactionEmojis 'string[]' = ['❤️', '😂', '👍', '🔥'] - доступные эмодзи
 * @param currentUserId 'string' - ID текущего пользователя
 * @param actions 'MessageAction[]' - массив действий с сообщением
 * @param attachments 'AttachmentData[]' - массив вложений (image/file/audio)
 * @param forwardedFrom 'User' - информация о пересланном сообщении
 * @param onForwardedClick '(id: string) => void' - обработчик клика по пересланному
 * @param replyTo 'ReplyData' - информация о сообщении для ответа
 * @param id 'string' - ID сообщения
 * @param showActionsOnClick 'boolean' = false - показывать ActionsMenu при клике
 */
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
  currentUserId,
  actions,
  attachments,
  forwardedFrom,
  onForwardedClick,
  replyTo,
  id,
  showActionsOnClick = false,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const bubbleRef = useRef<HTMLDivElement>(null);
  const reactionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showReactions && !showActions) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;

      // Не закрывать если клик внутри bubble или ReactionMenu
      if (
        (bubbleRef.current && bubbleRef.current.contains(target)) ||
        (reactionMenuRef.current && reactionMenuRef.current.contains(target))
      ) {
        return;
      }

      setShowReactions(false);
      setShowActions(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [showReactions, showActions]);

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return '...';
    if (seconds === 0) return '...';
    if (seconds < 10) {
      // Показываем с одной десятичной для коротких сообщений
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = (seconds % 60).toFixed(1);
      return `${minutes}:${remainingSeconds.padStart(4, '0')}`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAudioPlay = (url: string) => {
    const audio = audioRefs.current[url];
    if (!audio) return;

    if (isPlaying[url]) {
      audio.pause();
      setIsPlaying((prev) => ({ ...prev, [url]: false }));
    } else {
      // Stop all other audio
      Object.values(audioRefs.current).forEach((a) => a.pause());
      setIsPlaying((prev) =>
        Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
      );

      audio.play();
      setIsPlaying((prev) => ({ ...prev, [url]: true }));
    }
  };

  const handleAudioTimeUpdate = (url: string) => {
    const audio = audioRefs.current[url];
    if (!audio) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    setAudioProgress((prev) => ({ ...prev, [url]: progress }));
  };

  const handleAudioEnded = (url: string) => {
    setIsPlaying((prev) => ({ ...prev, [url]: false }));
    setAudioProgress((prev) => ({ ...prev, [url]: 0 }));
  };

  const handleAudioProgressClick = (url: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const audio = audioRefs.current[url];
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audio.duration;

    audio.currentTime = time;
    setAudioProgress((prev) => ({ ...prev, [url]: percentage }));
  };

  function getReplyPreview(reply?: MessageProps['replyTo']) {
    if (!reply) return null;
    if (reply.text && reply.text.trim()) {
      let text = reply.text.trim();
      if (text.length > 80) text = text.slice(0, 80) + '...';
      return <ReplyText>{text}</ReplyText>;
    }
    if (reply.attachments && reply.attachments.length > 0) {
      const att = reply.attachments[0];
      if (att.type === 'image') return <ReplyText>Photo</ReplyText>;
      if (att.type === 'audio') return <ReplyText>Audio</ReplyText>;
      if (att.type === 'file') return <ReplyText>File: {att.name}</ReplyText>;
    }
    return <ReplyText>Message</ReplyText>;
  }

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (replyTo?.id) {
      const element = document.getElementById(replyTo.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const hasInteraction =
    (onReaction && reactionEmojis.length > 0) || (actions && actions.length > 0);

  return (
    <MessageRoot $type={type} className={className} id={id}>
      <MessageRow $type={type}>
        <MessageWrapper>
          <Bubble
            $type={type}
            $hasInteraction={hasInteraction}
            ref={bubbleRef}
            onClick={
              hasInteraction
                ? () => {
                    if (showActionsOnClick && actions && actions.length > 0) {
                      setShowActions((v) => !v);
                    }
                    if (onReaction && reactionEmojis.length > 0) {
                      setShowReactions((v) => !v);
                    }
                  }
                : undefined
            }
            onContextMenu={(e) => {
              e.preventDefault();
              if (onReaction && reactionEmojis.length > 0) setShowReactions((v) => !v);
              if (actions && actions.length > 0) setShowActions((v) => !v);
            }}
          >
            {replyTo && (
              <ReplyBlock onClick={handleReplyClick} title='Go to replied message'>
                {replyTo.sender?.name && <ReplySender>{replyTo.sender.name}</ReplySender>}
                {getReplyPreview(replyTo)}
              </ReplyBlock>
            )}
            {forwardedFrom && (
              <ForwardedBlock
                onClick={
                  onForwardedClick
                    ? (e) => {
                        e.stopPropagation();
                        onForwardedClick(forwardedFrom.id);
                      }
                    : undefined
                }
                title={`Go to forwarded message`}
              >
                Forwarded from {forwardedFrom.name}
              </ForwardedBlock>
            )}
            {!sender && <BubbleTail $type={type} />}
            <MessageText>{text}</MessageText>
            {attachments && attachments.length > 0 && (
              <AttachmentContainer>
                {attachments.map((attachment, index) => {
                  if (attachment.type === 'image') {
                    return (
                      <ImageAttachment
                        key={index}
                        src={attachment.url}
                        alt={attachment.name || 'Image attachment'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(attachment.url);
                        }}
                      />
                    );
                  } else if (attachment.type === 'audio') {
                    return (
                      <AudioAttachment key={index} onClick={(e) => e.stopPropagation()}>
                        <HiddenAudio
                          ref={(el) => {
                            if (el) audioRefs.current[attachment.url] = el;
                          }}
                          src={attachment.url}
                          onTimeUpdate={() => handleAudioTimeUpdate(attachment.url)}
                          onEnded={() => handleAudioEnded(attachment.url)}
                        />
                        <PlayButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAudioPlay(attachment.url);
                          }}
                        >
                          {isPlaying[attachment.url] ? '⏸️' : '▶️'}
                        </PlayButton>
                        <AudioControls>
                          <AudioProgress
                            onClick={(e) => handleAudioProgressClick(attachment.url, e)}
                          >
                            <AudioProgressBar $progress={audioProgress[attachment.url] || 0} />
                          </AudioProgress>
                          <AudioDuration>{formatTime(attachment.duration || 0)}</AudioDuration>
                        </AudioControls>
                      </AudioAttachment>
                    );
                  } else {
                    return (
                      <FileAttachment
                        key={index}
                        href={attachment.url}
                        download={attachment.name}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>📎</span>
                        <span>{attachment.name || 'File'}</span>
                        {attachment.size && <span>({Math.round(attachment.size / 1024)} KB)</span>}
                      </FileAttachment>
                    );
                  }
                })}
              </AttachmentContainer>
            )}
            <BottomBar>
              {reactions && reactions.length > 0 && (
                <>
                  {reactions.map((r, i) => (
                    <Reaction
                      key={i}
                      emoji={r.emoji}
                      users={r.users}
                      currentUserId={currentUserId}
                      onClick={
                        onReaction
                          ? (e) => {
                              e.stopPropagation();
                              onReaction(r.emoji);
                            }
                          : undefined
                      }
                    />
                  ))}
                </>
              )}
            </BottomBar>
            <BubbleMeta>
              <SendTime $type={type} $isRead={isRead}>
                {time}
              </SendTime>
              <ReadIcon $type={type} $isRead={isRead}>
                {isRead ? (
                  <>
                    <svg width='18' height='16' viewBox='0 0 18 16' fill='none'>
                      <path
                        d='M3 8.5L7 12.5L13 6.5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M3 8.5L7 12.5L13 6.5'
                        transform='translate(4)'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </>
                ) : (
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M3 8.5L7 12.5L13 6.5'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
              </ReadIcon>
            </BubbleMeta>
            {sender && (
              <AvatarBubbleWrapper $type={type}>
                <OutlinedAvatar>
                  <Avatar src={sender.avatar} size='sm' name={sender.name} />
                </OutlinedAvatar>
              </AvatarBubbleWrapper>
            )}
          </Bubble>
        </MessageWrapper>
      </MessageRow>
      {previewImage && (
        <ImageModalOverlay onClick={() => setPreviewImage(null)}>
          <ImageModalImg src={previewImage} alt='preview' />
        </ImageModalOverlay>
      )}
      {(showReactions || showActions) && (
        <>
          {onReaction && showReactions && reactionEmojis.length > 0 && (
            <ReactionMenu
              $type={type}
              ref={reactionMenuRef}
              onWheel={(e) => e.stopPropagation()}
              onScroll={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {reactionEmojis.map((emoji) => (
                <EmojiButton
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    onReaction(emoji);
                    setShowReactions(false);
                    setShowActions(false);
                  }}
                >
                  {emoji}
                </EmojiButton>
              ))}
            </ReactionMenu>
          )}
          {Array.isArray(actions) &&
            actions.length > 0 &&
            (showActions || (showActionsOnClick && showReactions)) && (
              <StyledActionsMenu $type={type} items={actions} />
            )}
        </>
      )}
    </MessageRoot>
  );
};
