import React, { useState } from 'react';
import { Tabbar, type TabData } from '@DobruniaUI';

export const TabbarDemo: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | number>('main');

  const tabs: TabData[] = [
    { id: 'main', label: 'Главная', notification: 5 },
    { id: 'profile', label: 'Профиль', leftSlot: <span aria-label='avatar'>🧑</span> },
    { id: 'settings', label: 'Настройки', notification: 101 },
  ];

  // Много вкладок для теста скролла
  const manyTabs: TabData[] = [
    { id: 'main', label: 'Главная', notification: 0 },
    { id: 'profile', label: 'Профиль' },
    { id: 'settings', label: 'Настройки', notification: 3 },
    { id: 'news', label: 'Новости' },
    { id: 'chats', label: 'Чаты' },
    { id: 'friends', label: 'Друзья' },
    { id: 'photos', label: 'Фото', notification: 6 },
    { id: 'videos', label: 'Видео' },
    { id: 'music', label: 'Музыка' },
    { id: 'groups', label: 'Группы', notification: 9 },
    { id: 'shop', label: 'Магазин' },
    { id: 'games', label: 'Игры' },
    { id: 'events', label: 'События' },
    { id: 'bookmarks', label: 'Закладки' },
    { id: 'gifts', label: 'Подарки' },
    { id: 'coupons', label: 'Купоны' },
  ];

  const getLabel = (id: string | number) => {
    const tab = tabs.find((t) => t.id === id) || manyTabs.find((t) => t.id === id);
    return tab ? tab.label : '';
  };

  return (
    <div
      style={{
        padding: 'var(--spacing-large)',
        maxWidth: 'var(--layout-content-width)',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          color: 'var(--text-heading)',
          marginBottom: 'var(--spacing-large)',
          fontSize: 'var(--font-size-large)',
        }}
      >
        Tabbar Demo
      </h2>
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-large)',
          padding: 'var(--spacing-large)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: 'var(--spacing-large)',
        }}
      >
        <b>Много вкладок (тест скролла):</b>
        <Tabbar tabs={manyTabs} selectedId={selectedId} onTabPress={setSelectedId} />
      </div>
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-large)',
          padding: 'var(--spacing-large)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: 'var(--spacing-large)',
        }}
      >
        <b>Слева аватар, справа уведомления:</b>
        <Tabbar tabs={tabs} selectedId={selectedId} onTabPress={setSelectedId} />
      </div>
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-large)',
          padding: 'var(--spacing-large)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: 'var(--spacing-large)',
        }}
      >
        <b>Только уведомления:</b>
        <Tabbar
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            notification: tab.notification,
          }))}
          selectedId={selectedId}
          onTabPress={setSelectedId}
        />
      </div>
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-large)',
          padding: 'var(--spacing-large)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <b>Обычный Tabbar без слотов:</b>
        <Tabbar
          tabs={tabs.map((tab) => ({ id: tab.id, label: tab.label }))}
          selectedId={selectedId}
          onTabPress={setSelectedId}
        />
      </div>
      <div
        style={{
          marginTop: 'var(--spacing-large)',
          color: 'var(--text-body)',
        }}
      >
        <p>Выбранная вкладка: {getLabel(selectedId)}</p>
      </div>
    </div>
  );
};
