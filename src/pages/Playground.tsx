import React, { useState } from 'react';
import { PageBlock } from '../layout';
import { SidebarList } from '../components';
import { PageBlockDemo, SidebarListDemo } from './components-demo';

const components = [
  { key: 'PageBlock', label: 'PageBlock' },
  { key: 'SidebarList', label: 'SidebarList' },
];

const Playground: React.FC = () => {
  const [selected, setSelected] = useState('PageBlock');

  return (
    <PageBlock
      stretched={true}
      left={
        <SidebarList
          items={components}
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
