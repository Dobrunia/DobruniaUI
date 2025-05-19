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
  BadgeDemo,
  AlertDemo,
  ProgressDemo,
  SkeletonDemo,
  SnackbarDemo,
  PaginationDemo,
  ReactionDemo,
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
    items: [
      { key: 'Avatar', label: 'Avatar' },
      { key: 'Badge', label: 'Badge' },
      { key: 'Reaction', label: 'Reaction' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { key: 'Alert', label: 'Alert' },
      { key: 'Progress', label: 'Progress' },
      { key: 'Skeleton', label: 'Skeleton' },
      { key: 'Snackbar', label: 'Snackbar' },
    ],
  },
  {
    title: 'Navigation',
    items: [{ key: 'Pagination', label: 'Pagination' }],
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
      {selected === 'PageBlock' && <PageBlockDemo />}
      {selected === 'SidebarList' && <SidebarListDemo />}
      {selected === 'Button' && <ButtonDemo />}
      {selected === 'TextField' && <TextFieldDemo />}
      {selected === 'Textarea' && <TextareaDemo />}
      {selected === 'Input' && <InputDemo />}
      {selected === 'Avatar' && <AvatarDemo />}
      {selected === 'Badge' && <BadgeDemo />}
      {selected === 'Alert' && <AlertDemo />}
      {selected === 'Progress' && <ProgressDemo />}
      {selected === 'Skeleton' && <SkeletonDemo />}
      {selected === 'Snackbar' && <SnackbarDemo />}
      {selected === 'Pagination' && <PaginationDemo />}
      {selected === 'Reaction' && <ReactionDemo />}
    </PageBlock>
  );
};

export default Playground;
