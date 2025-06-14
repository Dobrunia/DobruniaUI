import React, { useState } from 'react';
import { PageBlock, SidebarList, ToggleButton } from '@DobruniaUI';
import { getAllThemes, getTheme, setTheme, type Theme } from '../utils/theme';
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
  DropdownDemo,
  SelectDemo,
  UndoSnackbarDemo,
  LoadingSpinnerDemo,
  BreadcrumbsDemo,
  ModalDemo,
  ModalSubmitDemo,
  StartPage,
  ToggleButtonDemo,
} from './components-demo';

const sections = [
  {
    title: 'StartPage',
    items: [{ key: 'StartPage', label: 'StartPage' }],
  },
  {
    title: 'Layouts',
    items: [{ key: 'PageBlock', label: 'PageBlock' }],
  },
  {
    title: 'Inputs',
    items: [
      { key: 'SidebarList', label: 'SidebarList' },
      { key: 'Button', label: 'Button' },
      { key: 'TextField', label: 'TextField' },
      { key: 'Textarea', label: 'Textarea' },
      { key: 'Input', label: 'Input' },
      { key: 'Checkbox', label: 'Checkbox' },
      { key: 'Radio', label: 'Radio' },
      { key: 'Switch', label: 'Switch' },
      { key: 'Dropdown', label: 'Dropdown' },
      { key: 'Select', label: 'Select' },
      { key: 'ToggleButton', label: 'ToggleButton' },
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
      { key: 'LoadingSpinner', label: 'LoadingSpinner' },
      { key: 'Skeleton', label: 'Skeleton' },
      { key: 'Snackbar', label: 'Snackbar' },
      { key: 'UndoSnackbar', label: 'UndoSnackbar' },
      { key: 'Modal', label: 'Modal' },
      { key: 'ModalSubmit', label: 'ModalSubmit' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { key: 'Pagination', label: 'Pagination' },
      { key: 'Tabbar', label: 'Tabbar' },
      { key: 'Breadcrumbs', label: 'Breadcrumbs' },
    ],
  },
];

const ThemeToggler: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(getTheme() || 'light');
  const themes = getAllThemes();

  const handleThemeChange = (checked: boolean, value?: string) => {
    if (checked && value) {
      setTheme(value as Theme);
      setCurrentTheme(value as Theme);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {themes.map((theme) => (
        <ToggleButton
          key={theme.name}
          name='theme'
          value={theme.name}
          checked={currentTheme === theme.name}
          onChange={handleThemeChange}
          size='medium'
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {theme.icon} {theme.label}
          </span>
        </ToggleButton>
      ))}
    </div>
  );
};

const Playground: React.FC = () => {
  const [selected, setSelected] = useState('StartPage');

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
      right={<ThemeToggler />}
    >
      {selected === 'StartPage' && <StartPage />}
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
      {selected === 'Dropdown' && <DropdownDemo />}
      {selected === 'Select' && <SelectDemo />}
      {selected === 'UndoSnackbar' && <UndoSnackbarDemo />}
      {selected === 'LoadingSpinner' && <LoadingSpinnerDemo />}
      {selected === 'Breadcrumbs' && <BreadcrumbsDemo />}
      {selected === 'Modal' && <ModalDemo />}
      {selected === 'ModalSubmit' && <ModalSubmitDemo />}
      {selected === 'ToggleButton' && <ToggleButtonDemo />}
    </PageBlock>
  );
};

export default Playground;
