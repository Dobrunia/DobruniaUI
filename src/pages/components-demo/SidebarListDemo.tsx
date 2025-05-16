import React, { useState } from 'react';
import { SidebarList } from '../../components/SidebarList/SidebarList';
import type { SidebarListItem } from '../../components/SidebarList/SidebarList';

const items: SidebarListItem[] = [
  { key: 'pageblock', label: 'PageBlock' },
  { key: 'button', label: 'Button' },
  { key: 'input', label: 'Input' },
  { key: 'card', label: 'Card' },
];

export const SidebarListDemo: React.FC = () => {
  const [selected, setSelected] = useState('pageblock');

  return (
    <div>
      <h2>SidebarList Demo</h2>
      <SidebarList
        sections={[{ items }]}
        selected={selected}
        onSelect={setSelected}
        width="320px"
      />
      <div style={{ marginTop: 16 }}>
        <strong>Selected:</strong>{' '}
        {items.find((i) => i.key === selected)?.label}
      </div>
    </div>
  );
};
