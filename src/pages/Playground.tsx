import React, { useState } from 'react';
import { PageBlock, SidebarList } from '@DobruniaUI';
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
  MessageDemo,
  ActionsMenuDemo,
  ChatListDemo,
  TabbarDemo,
  CheckboxDemo,
  RadioDemo,
  SwitchDemo,
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
      { key: 'Checkbox', label: 'Checkbox' },
      { key: 'Radio', label: 'Radio' },
      { key: 'Switch', label: 'Switch' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { key: 'Avatar', label: 'Avatar' },
      { key: 'Badge', label: 'Badge' },
      { key: 'ChatList', label: 'ChatList' },
      { key: 'Reaction', label: 'Reaction' },
      { key: 'ActionsMenu', label: 'ActionsMenu' },
      { key: 'Message', label: 'Message' },
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
    items: [
      { key: 'Pagination', label: 'Pagination' },
      { key: 'Tabbar', label: 'Tabbar' },
    ],
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
      {selected === 'ChatList' && <ChatListDemo />}
      {selected === 'Alert' && <AlertDemo />}
      {selected === 'Progress' && <ProgressDemo />}
      {selected === 'Skeleton' && <SkeletonDemo />}
      {selected === 'Snackbar' && <SnackbarDemo />}
      {selected === 'Pagination' && <PaginationDemo />}
      {selected === 'Reaction' && <ReactionDemo />}
      {selected === 'ActionsMenu' && <ActionsMenuDemo />}
      {selected === 'Message' && <MessageDemo />}
      {selected === 'Tabbar' && <TabbarDemo />}
      {selected === 'Checkbox' && <CheckboxDemo />}
      {selected === 'Radio' && <RadioDemo />}
      {selected === 'Switch' && <SwitchDemo />}
    </PageBlock>
  );
};

export default Playground;
