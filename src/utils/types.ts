// presence
export const PRESENCE = ['online', 'offline', 'dnd', 'invisible'] as const;
export type Presence = (typeof PRESENCE)[number];

// message
export const MESSAGE_STATUS = ['unread', 'read', 'error'] as const;
export type MessageStatus = (typeof MESSAGE_STATUS)[number];
