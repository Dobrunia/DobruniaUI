import React from 'react';
import { Badge, Avatar } from '@DobruniaUI';

// Пример простой иконки
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z"
      fill="#26418f"
    />
  </svg>
);

export const BadgeDemo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 32,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* С иконкой */}
      <Badge value={3}>
        <BellIcon />
      </Badge>

      {/* С кнопкой */}
      <Badge value={12}>
        <button style={{ fontSize: 18, padding: 8, borderRadius: 8 }}>
          Inbox
        </button>
      </Badge>

      {/* Большое число */}
      <Badge value={150} max={99}>
        <BellIcon />
      </Badge>

      {/* Без value */}
      <Badge>
        <BellIcon />
      </Badge>

      <Badge value={150} max={99}>
        <Avatar name="John Doe" />
      </Badge>
    </div>
  );
};
