import React, { useState } from 'react';
import { PageBlock } from '../layout';
import { SidebarList } from '../components';
import {
  PageBlockDemo,
  SidebarListDemo,
  ButtonDemo,
  TextFieldDemo,
  TextareaDemo,
  InputDemo,
  AvatarDemo,
} from './components-demo';

const sections = [
  {
    title: 'Layouts',
    items: [{ key: 'PageBlock', label: 'PageBlock' }],
  },
  {
    title: 'Components',
    items: [
      { key: 'SidebarList', label: 'SidebarList' },
      { key: 'Button', label: 'Button' },
      { key: 'TextField', label: 'TextField' },
      { key: 'Textarea', label: 'Textarea' },
      { key: 'Input', label: 'Input' },
      
    ],
  },
  {
    title: 'Data Display',
    items: [{ key: 'Avatar', label: 'Avatar' }],
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
          allowCollapse={false}
        />
      }
    >
      {/* Пока только PageBlock */}
      {selected === 'PageBlock' && <PageBlockDemo />}
      {selected === 'SidebarList' && <SidebarListDemo />}
      {selected === 'Button' && <ButtonDemo />}
      {selected === 'TextField' && <TextFieldDemo />}
      {selected === 'Textarea' && <TextareaDemo />}
      {selected === 'Input' && <InputDemo />}
      {selected === 'Avatar' && <AvatarDemo />}
    </PageBlock>
  );
};

export default Playground;
