import { Message, type ActionsMenuAction } from '@DobruniaUI';

// SVG иконки для действий с сообщениями
const ReplyIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z' />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
  </svg>
);

const ForwardIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14 15v4l7-7-7-7v4.1c-5 0-8.5-1.6-11-5.1 1 5 4 10 11 11z' />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>
);

const userMe = {
  id: 'me',
  name: 'Я',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const userOther = {
  id: 'other',
  name: 'Аня',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

// Разные наборы действий для тестирования ActionsMenu
const fullActions: ActionsMenuAction[] = [
  {
    label: 'Ответить',
    icon: <ReplyIcon />,
    onClick: () => alert('🔄 Действие: Ответить на сообщение'),
    shortcut: '⌘R',
  },
  {
    label: 'Копировать',
    icon: <CopyIcon />,
    onClick: () => alert('📋 Действие: Копировать текст сообщения'),
    shortcut: '⌘C',
  },
  {
    label: 'Переслать',
    icon: <ForwardIcon />,
    onClick: () => alert('📤 Действие: Переслать сообщение'),
  },
  {
    label: 'Удалить',
    icon: <DeleteIcon />,
    onClick: () => alert('🗑️ Действие: Удалить сообщение'),
    type: 'destructive',
  },
];

const basicActions: ActionsMenuAction[] = [
  {
    label: 'Ответить',
    icon: <ReplyIcon />,
    onClick: () => alert('🔄 Базовое действие: Ответить'),
    type: 'primary',
  },
];

// Наборы эмодзи
const standardEmojis = ['❤️', '😂', '👍', '🔥'];
const manyEmojis = ['❤️', '😂', '👍', '🔥', '😍', '😢', '😮', '😡', '🎉', '💯', '🚀', '⭐'];

export const MessageDemo = () => {
  const handleReaction = () => {};

  return (
    <div className='message-demo'>
      <h1>💬 Message Component</h1>
      <p>Компонент сообщения для чатов с поддержкой реакций, вложений и действий</p>

      {/* Основные типы сообщений */}
      <section className='section'>
        <h2>🎨 Основные типы сообщений</h2>

        <div className='messages-grid'>
          <div className='message-example'>
            <h3>Входящее сообщение</h3>
            <Message
              type='incoming'
              text='Привет! Как дела? Это входящее сообщение от другого пользователя.'
              time='30:14'
              sender={userOther}
              isRead={true}
            />
          </div>

          <div className='message-example'>
            <h3>Исходящее сообщение</h3>
            <Message
              type='outgoing'
              text='Привет! Все отлично, спасибо! Это исходящее сообщение от меня.'
              time='32:14'
              sender={userMe}
              isRead={false}
            />
          </div>

          <div className='message-example'>
            <h3>Без отправителя</h3>
            <Message
              type='incoming'
              text='Это сообщение без указания отправителя - просто текст.'
              time='35:14'
              isRead={true}
            />
          </div>
        </div>
      </section>

      {/* Сообщения с реакциями */}
      <section className='section'>
        <h2>😊 Сообщения с реакциями</h2>

        <div className='messages-grid'>
          <div className='message-example'>
            <h3>С реакциями</h3>
            <Message
              type='incoming'
              text='Посмотри на эту картинку!'
              time='00:15'
              sender={userOther}
              reactions={[
                { emoji: '❤️', users: [userMe, userOther] },
                { emoji: '😂', users: [userOther] },
                { emoji: '👍', users: [userMe] },
              ]}
              currentUserId={userMe.id}
              reactionEmojis={standardEmojis}
              onReaction={handleReaction}
            />
          </div>

          <div className='message-example'>
            <h3>Много эмодзи</h3>
            <Message
              type='outgoing'
              text='Сообщение с большим набором эмодзи для тестирования скролла!'
              time='05:15'
              sender={userMe}
              reactions={[
                { emoji: '❤️', users: [userMe] },
                { emoji: '🚀', users: [userOther] },
                { emoji: '💯', users: [userMe] },
              ]}
              currentUserId={userMe.id}
              reactionEmojis={manyEmojis}
              onReaction={handleReaction}
            />
          </div>

          <div className='message-example'>
            <h3>Без реакций</h3>
            <Message
              type='incoming'
              text='Это сообщение без реакций - просто обычный текст.'
              time='10:15'
              sender={userOther}
              reactionEmojis={[]}
            />
          </div>
        </div>
      </section>

      {/* Сообщения с вложениями */}
      <section className='section'>
        <h2>📎 Сообщения с вложениями</h2>

        <div className='messages-grid'>
          <div className='message-example'>
            <h3>С изображением</h3>
            <Message
              type='incoming'
              text='Красивый пейзаж!'
              time='00:16'
              sender={userOther}
              attachments={[
                {
                  type: 'image',
                  url: 'https://cdn.fishki.net/upload/post/2021/02/16/3613245/tn/alberta-2297204-1280.jpg',
                  name: 'landscape.jpg',
                },
              ]}
            />
          </div>

          <div className='message-example'>
            <h3>С аудио</h3>
            <Message
              type='outgoing'
              text='Голосовое сообщение'
              time='05:16'
              sender={userMe}
              attachments={[
                {
                  type: 'audio',
                  url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                  name: 'voice-message.mp3',
                  duration: 15,
                },
              ]}
            />
          </div>

          <div className='message-example'>
            <h3>С файлом</h3>
            <Message
              type='incoming'
              text='Документ для тебя'
              time='10:16'
              sender={userOther}
              attachments={[
                {
                  type: 'file',
                  url: '#',
                  name: 'document.pdf',
                  size: 1024 * 1024, // 1MB
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Сообщения с действиями */}
      <section className='section'>
        <h2>⚡ Сообщения с действиями</h2>

        <div className='messages-grid'>
          <div className='message-example'>
            <h3>Полное меню действий</h3>
            <Message
              type='outgoing'
              text='Сообщение с полным набором действий в контекстном меню'
              time='00:17'
              sender={userMe}
              actions={fullActions}
              showActionsOnClick={true}
            />
          </div>

          <div className='message-example'>
            <h3>Базовые действия</h3>
            <Message
              type='incoming'
              text='Сообщение с базовыми действиями'
              time='05:17'
              sender={userOther}
              actions={basicActions}
              showActionsOnClick={true}
            />
          </div>

          <div className='message-example'>
            <h3>Без действий</h3>
            <Message
              type='outgoing'
              text='Обычное сообщение без дополнительных действий'
              time='10:17'
              sender={userMe}
            />
          </div>
        </div>
      </section>

      {/* Специальные типы сообщений */}
      <section className='section'>
        <h2>🔄 Специальные типы сообщений</h2>

        <div className='messages-grid'>
          <div className='message-example'>
            <h3>Пересланное сообщение</h3>
            <Message
              type='incoming'
              text='Это пересланное сообщение от другого пользователя'
              time='00:18'
              sender={userOther}
              forwardedFrom={{ id: 'vasya', name: 'Vasya' }}
              onForwardedClick={(id) => alert(`Переход к сообщению от ${id}`)}
            />
          </div>

          <div className='message-example'>
            <h3>Ответное сообщение</h3>
            <Message
              type='outgoing'
              text='Это ответ на предыдущее сообщение'
              time='05:18'
              sender={userMe}
              replyTo={{
                id: 'msg-1',
                text: 'Привет! Как дела?',
                sender: { name: 'Аня' },
              }}
            />
          </div>

          <div className='message-example'>
            <h3>Длинное сообщение</h3>
            <Message
              type='incoming'
              text='Это очень длинное сообщение для демонстрации того, как компонент обрабатывает текст, который не помещается в одну строку. Такие сообщения должны корректно переноситься и отображаться с правильными отступами и форматированием.'
              time='10:18'
              sender={userOther}
            />
          </div>
        </div>
      </section>

      {/* Статусы прочтения */}
      <section className='section'>
        <h2>👁️ Статусы прочтения</h2>

        <div className='messages-grid'>
          <div className='message-example'>
            <h3>Прочитано</h3>
            <Message
              type='outgoing'
              text='Это сообщение прочитано получателем'
              time='00:19'
              sender={userMe}
              isRead={true}
            />
          </div>

          <div className='message-example'>
            <h3>Не прочитано</h3>
            <Message
              type='outgoing'
              text='Это сообщение еще не прочитано'
              time='05:19'
              sender={userMe}
              isRead={false}
            />
          </div>

          <div className='message-example'>
            <h3>Без статуса</h3>
            <Message
              type='incoming'
              text='Входящие сообщения не показывают статус прочтения'
              time='10:19'
              sender={userOther}
            />
          </div>
        </div>
      </section>

      <style>{`
        .message-demo {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section {
          margin-bottom: 40px;
        }

        .section h2 {
          margin-bottom: 20px;
          color: var(--c-text-primary);
        }

        .messages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 20px;
        }

        .message-example {
          border: 1px solid var(--c-border);
          border-radius: 12px;
          padding: 20px;
          background: var(--c-bg-elevated);
        }

        .message-example h3 {
          margin: 0 0 15px 0;
          font-size: 16px;
          color: var(--c-text-primary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .messages-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
