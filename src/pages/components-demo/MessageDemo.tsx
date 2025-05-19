import { Message } from '../../data-display';

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

const reactions = [
  {
    emoji: '❤️',
    users: [userMe, userOther],
  },
  {
    emoji: '😂',
    users: [userOther],
  },
];

export const MessageDemo = () => {
  const time = '8:10';
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '40px auto',
        background: 'var(--color-elevated)',
        padding: 24,
        borderRadius: 16,
        position: 'relative',
      }}
    >
      <Message
        type="incoming"
        text="Привет! Как дела?"
        time={time}
        reactions={reactions}
        sender={userOther}
        isRead={false}
      />
      <Message
        type="outgoing"
        text="Все отлично, спасибо! 😊"
        time={time}
        reactions={reactions.slice(0, 1)}
        sender={userMe}
        isRead={false}
      />
      <Message
        type="incoming"
        text="Всем привет!"
        time={time}
        reactions={[]}
        sender={userOther}
        isRead={true}
      />
    </div>
  );
};
