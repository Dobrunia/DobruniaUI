import React, { useState } from 'react';
import { PageBlock } from '../layout';
import { SidebarList } from '../components';
import { PageBlockDemo, SidebarListDemo } from './components-demo';

const sections = [
  {
    title: 'Layouts',
    items: [{ key: 'PageBlock', label: 'PageBlock' }],
  },
  {
    title: 'Components',
    items: [{ key: 'SidebarList', label: 'SidebarList' }],
  },
];

const Playground: React.FC = () => {
  const [selected, setSelected] = useState('PageBlock');

  return (
    <PageBlock
      stretched={true}
      left={
        <SidebarList
          sections={sections}
          selected={selected}
          onSelect={setSelected}
        />
      }
    >
      {/* Пока только PageBlock */}
      {selected === 'PageBlock' && <PageBlockDemo />}
      {selected === 'SidebarList' && <SidebarListDemo />}
    </PageBlock>
  );
};

export default Playground;
