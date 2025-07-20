import React, { useMemo, useCallback, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Reaction, Avatar, ActionsMenu, type ActionsMenuAction, DESIGN_TOKENS } from '@DobruniaUI';
import { useClickOutside, useAudioPlayer } from '../../utils/hooks';

export type MessageType = 'incoming' | 'outgoing';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'dnd' | 'invisible';
  showStatus?: boolean;
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
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 4px;
  height: 18px;
`;

const SendTime = styled.span<{ $type: MessageType; $isRead?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 100%;
  font-size: ${DESIGN_TOKENS.fontSize.small};
  color: ${(p) => (p.$type === 'outgoing' ? 'var(--c-text-inverse)' : 'var(--c-text-secondary)')};
  opacity: ${(p) => (p.$type === 'outgoing' ? 0.9 : 1)};
`;

const ReadIcon = styled.span<{ $type: MessageType; $isRead?: boolean }>`
  height: 100%;
  display: inline-flex;
  align-items: center;
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
    vertical-align: middle;
    width: 18px;
    height: 100%;
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
  white-space: pre-wrap;
`;

// Мемоизированная функция форматирования времени
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

// Мемоизированный компонент для аудио вложения
const AudioAttachmentComponent = React.memo<{
  attachment: NonNullable<MessageProps['attachments']>[0];
  audioPlayer: ReturnType<typeof useAudioPlayer>;
}>(({ attachment, audioPlayer }) => {
  const handlePlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      audioPlayer.handleAudioPlay(attachment.url);
    },
    [attachment.url, audioPlayer]
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      audioPlayer.handleAudioProgressClick(attachment.url, e);
    },
    [attachment.url, audioPlayer]
  );

  return (
    <AudioAttachment onClick={(e) => e.stopPropagation()}>
      <HiddenAudio
        ref={(el) => audioPlayer.setAudioRef(attachment.url, el)}
        src={attachment.url}
        onTimeUpdate={() => audioPlayer.handleAudioTimeUpdate(attachment.url)}
        onEnded={() => audioPlayer.handleAudioEnded(attachment.url)}
      />
      <PlayButton onClick={handlePlayClick}>
        {audioPlayer.isPlaying[attachment.url] ? '⏸️' : '▶️'}
      </PlayButton>
      <AudioControls>
        <AudioProgress onClick={handleProgressClick}>
          <AudioProgressBar $progress={audioPlayer.progress[attachment.url] || 0} />
        </AudioProgress>
        <AudioDuration>{formatTime(attachment.duration || 0)}</AudioDuration>
      </AudioControls>
    </AudioAttachment>
  );
});

AudioAttachmentComponent.displayName = 'AudioAttachmentComponent';

// Мемоизированный компонент для вложений
const AttachmentsComponent = React.memo<{
  attachments: MessageProps['attachments'];
  audioPlayer: ReturnType<typeof useAudioPlayer>;
  onImageClick: (url: string) => void;
}>(({ attachments, audioPlayer, onImageClick }) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <AttachmentContainer>
      {attachments.map((attachment, index) => {
        if (attachment.type === 'image') {
          return (
            <ImageAttachment
              key={`image-${index}-${attachment.url}`}
              src={attachment.url}
              alt={attachment.name || 'Image attachment'}
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(attachment.url);
              }}
            />
          );
        } else if (attachment.type === 'audio') {
          return (
            <AudioAttachmentComponent
              key={`audio-${index}-${attachment.url}`}
              attachment={attachment}
              audioPlayer={audioPlayer}
            />
          );
        } else {
          return (
            <FileAttachment
              key={`file-${index}-${attachment.url}`}
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
  );
});

AttachmentsComponent.displayName = 'AttachmentsComponent';

// Мемоизированный компонент для реакций
const ReactionsComponent = React.memo<{
  reactions: ReactionData[] | undefined;
  currentUserId?: string;
  onReaction?: (emoji: string) => void;
}>(({ reactions, currentUserId, onReaction }) => {
  const handleReactionClick = useCallback(
    (emoji: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onReaction?.(emoji);
    },
    [onReaction]
  );

  if (!reactions || reactions.length === 0) return null;

  return (
    <>
      {reactions.map((reaction, index) => (
        <Reaction
          key={`reaction-${index}-${reaction.emoji}`}
          emoji={reaction.emoji}
          users={reaction.users}
          currentUserId={currentUserId}
          onClick={onReaction ? handleReactionClick(reaction.emoji) : undefined}
        />
      ))}
    </>
  );
});

ReactionsComponent.displayName = 'ReactionsComponent';

// Мемоизированный компонент для меню реакций
const ReactionMenuComponent = React.memo<{
  type: MessageType;
  reactionEmojis: string[];
  onReaction: (emoji: string) => void;
  onClose: () => void;
}>(({ type, reactionEmojis, onReaction, onClose }) => {
  const handleEmojiClick = useCallback(
    (emoji: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onReaction(emoji);
      onClose();
    },
    [onReaction, onClose]
  );

  return (
    <ReactionMenu
      $type={type}
      onWheel={(e) => e.stopPropagation()}
      onScroll={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {reactionEmojis.map((emoji) => (
        <EmojiButton key={`emoji-${emoji}`} onClick={handleEmojiClick(emoji)}>
          {emoji}
        </EmojiButton>
      ))}
    </ReactionMenu>
  );
});

ReactionMenuComponent.displayName = 'ReactionMenuComponent';

/**
 * Message - сообщение в чате с реакциями, вложениями и меню действий
 * @param type 'incoming' | 'outgoing' - тип сообщения (входящее/исходящее)
 * @param text 'string' - текст сообщения
 * @param time 'string' - время отправки сообщения
 * @param reactions 'ReactionData[]' - массив реакций на сообщение
 * @param className 'string' - дополнительные CSS классы
 * @param sender 'User' - информация об отправителе (id, name, avatar, status = 'offline', showStatus = false)
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
export const Message: React.FC<MessageProps> = React.memo(
  ({
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

    const bubbleRef = useRef<HTMLDivElement>(null);
    // const reactionMenuRef = useRef<HTMLDivElement>(null);

    // Используем кастомные хуки
    const audioPlayer = useAudioPlayer();

    // Мемоизируем вычисления
    const hasInteraction = useMemo(
      () => (onReaction && reactionEmojis.length > 0) || (actions && actions.length > 0),
      [onReaction, reactionEmojis.length, actions]
    );

    const getReplyPreview = useCallback((reply?: MessageProps['replyTo']) => {
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
    }, []);

    // Стабилизируем обработчики
    const handleBubbleClick = useCallback(() => {
      if (showActionsOnClick && actions && actions.length > 0) {
        setShowActions((v) => !v);
      }
      if (onReaction && reactionEmojis.length > 0) {
        setShowReactions((v) => !v);
      }
    }, [showActionsOnClick, actions, onReaction, reactionEmojis.length]);

    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        if (onReaction && reactionEmojis.length > 0) setShowReactions((v) => !v);
        if (actions && actions.length > 0) setShowActions((v) => !v);
      },
      [onReaction, reactionEmojis.length, actions]
    );

    const handleReplyClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (replyTo?.id) {
          const element = document.getElementById(replyTo.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      },
      [replyTo?.id]
    );

    const handleForwardedClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onForwardedClick?.(forwardedFrom!.id);
      },
      [onForwardedClick, forwardedFrom]
    );

    const handleImageClick = useCallback((url: string) => {
      setPreviewImage(url);
    }, []);

    const handleCloseMenus = useCallback(() => {
      setShowReactions(false);
      setShowActions(false);
    }, []);

    const handleReaction = useCallback(
      (emoji: string) => {
        onReaction?.(emoji);
        handleCloseMenus();
      },
      [onReaction, handleCloseMenus]
    );

    // Используем кастомный хук для клика вне элемента
    useClickOutside(bubbleRef, handleCloseMenus);

    // Мемоизируем содержимое
    const replyContent = useMemo(() => {
      if (!replyTo) return null;
      return (
        <ReplyBlock onClick={handleReplyClick} title='Go to replied message'>
          {replyTo.sender?.name && <ReplySender>{replyTo.sender.name}</ReplySender>}
          {getReplyPreview(replyTo)}
        </ReplyBlock>
      );
    }, [replyTo, handleReplyClick, getReplyPreview]);

    const forwardedContent = useMemo(() => {
      if (!forwardedFrom) return null;
      return (
        <ForwardedBlock
          onClick={onForwardedClick ? handleForwardedClick : undefined}
          title={`Go to forwarded message`}
        >
          Forwarded from {forwardedFrom.name}
        </ForwardedBlock>
      );
    }, [forwardedFrom, onForwardedClick, handleForwardedClick]);

    return (
      <MessageRoot $type={type} className={className} id={id}>
        <MessageRow $type={type}>
          <MessageWrapper>
            <Bubble
              $type={type}
              $hasInteraction={hasInteraction}
              ref={bubbleRef}
              onClick={hasInteraction ? handleBubbleClick : undefined}
              onContextMenu={handleContextMenu}
            >
              {replyContent}
              {forwardedContent}
              {!sender && <BubbleTail $type={type} />}
              <MessageText>{text}</MessageText>
              <AttachmentsComponent
                attachments={attachments}
                audioPlayer={audioPlayer}
                onImageClick={handleImageClick}
              />
              {reactions && reactions.length > 0 && (
                <BottomBar>
                  <ReactionsComponent
                    reactions={reactions}
                    currentUserId={currentUserId}
                    onReaction={onReaction}
                  />
                </BottomBar>
              )}
              <BubbleMeta>
                <SendTime $type={type} $isRead={isRead}>
                  {time}
                </SendTime>
                {isRead !== undefined && (
                  <ReadIcon $type={type} $isRead={isRead}>
                    {isRead ? (
                      <svg viewBox='0 0 18 20' fill='none'>
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
                    ) : (
                      <svg viewBox='0 0 18 20' fill='none'>
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
                )}
              </BubbleMeta>
              {sender && (
                <AvatarBubbleWrapper $type={type}>
                  <OutlinedAvatar>
                    <Avatar
                      src={sender.avatar}
                      size='sm'
                      name={sender.name}
                      status={sender.status}
                      showStatus={sender.showStatus || false}
                    />
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
              <ReactionMenuComponent
                type={type}
                reactionEmojis={reactionEmojis}
                onReaction={handleReaction}
                onClose={handleCloseMenus}
              />
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
  }
);

Message.displayName = 'Message';
