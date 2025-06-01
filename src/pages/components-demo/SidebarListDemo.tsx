import React, { useState } from 'react';
import { SidebarList, type SidebarListSection } from '@DobruniaUI';

const sections1: SidebarListSection[] = [
  {
    items: [
      { key: 'alpha', label: 'Alpha' },
      { key: 'beta', label: 'Beta' },
      { key: 'gamma', label: 'Gamma' },
    ],
  },
];

const sections2: SidebarListSection[] = [
  {
    title: 'Fruits',
    items: [
      { key: 'apple', label: 'Apple' },
      { key: 'banana', label: 'Banana' },
    ],
  },
  {
    title: 'Vegetables',
    items: [
      { key: 'carrot', label: 'Carrot' },
      { key: 'potato', label: 'Potato' },
    ],
  },
];

const sections3: SidebarListSection[] = [
  {
    title: 'Languages',
    items: [
      { key: 'js', label: 'JavaScript' },
      { key: 'ts', label: 'TypeScript' },
      { key: 'py', label: 'Python' },
    ],
  },
  {
    items: [
      { key: 'go', label: 'Go' },
      { key: 'rs', label: 'Rust' },
    ],
  },
];

const sections4: SidebarListSection[] = [
  {
    title: 'No Collapse',
    items: [
      { key: 'one', label: 'One' },
      { key: 'two', label: 'Two' },
      { key: 'three', label: 'Three' },
    ],
  },
  {
    items: [
      { key: 'four', label: 'Four' },
      { key: 'five', label: 'Five' },
    ],
  },
];

export const SidebarListDemo: React.FC = () => {
  const [selected1, setSelected1] = useState('alpha');
  const [selected2, setSelected2] = useState('apple');
  const [selected3, setSelected3] = useState('js');
  const [selected4, setSelected4] = useState('one');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3>Без заголовка секции</h3>
        <SidebarList
          sections={sections1}
          selected={selected1}
          onSelect={setSelected1}
          width='220px'
        />
        <div style={{ marginTop: 8, fontSize: 14 }}>
          <strong>Selected:</strong>{' '}
          {
            sections1[0].items.find((i: { key: string; label: string }) => i.key === selected1)
              ?.label
          }
        </div>
      </div>
      <div>
        <h3>С секциями и заголовками</h3>
        <SidebarList
          sections={sections2}
          selected={selected2}
          onSelect={setSelected2}
          width='220px'
        />
        <div style={{ marginTop: 8, fontSize: 14 }}>
          <strong>Selected:</strong>{' '}
          {sections2.flatMap((s) => s.items).find((i) => i.key === selected2)?.label}
        </div>
      </div>
      <div>
        <h3>Смешанные секции</h3>
        <SidebarList
          sections={sections3}
          selected={selected3}
          onSelect={setSelected3}
          width='220px'
        />
        <div style={{ marginTop: 8, fontSize: 14 }}>
          <strong>Selected:</strong>{' '}
          {sections3.flatMap((s) => s.items).find((i) => i.key === selected3)?.label}
        </div>
      </div>
      <div>
        <h3>Без возможности сворачивать</h3>
        <SidebarList
          sections={sections4}
          selected={selected4}
          onSelect={setSelected4}
          width='220px'
          allowCollapse={false}
        />
        <div style={{ marginTop: 8, fontSize: 14 }}>
          <strong>Selected:</strong>{' '}
          {sections4.flatMap((s) => s.items).find((i) => i.key === selected4)?.label}
        </div>
      </div>
      <div>
        <h3>Пустой список</h3>
        <SidebarList sections={[]} selected={''} onSelect={() => {}} width='220px' />
      </div>
    </div>
  );
};
