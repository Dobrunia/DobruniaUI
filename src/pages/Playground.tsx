import React, { useState } from 'react';
import styled from 'styled-components';
import { PageBlock } from '../layout';
import { PageBlockDemo } from './components-demo';

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${({ selected }) => (selected ? '#23242a' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#b0b3c0')};
  border-radius: 6px;
  margin-bottom: 4px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  transition: background 0.15s;
  &:hover {
    background: #23242a;
    color: #fff;
  }
`;

const components = [{ key: 'PageBlock', label: 'PageBlock' }];

const Playground: React.FC = () => {
  const [selected, setSelected] = useState('PageBlock');

  return (
    <PageBlock
      left={
        <SidebarList>
          {components.map((comp) => (
            <SidebarItem
              key={comp.key}
              selected={selected === comp.key}
              onClick={() => setSelected(comp.key)}
            >
              {comp.label}
            </SidebarItem>
          ))}
        </SidebarList>
      }
    >
      {/* Пока только PageBlock */}
      {selected === 'PageBlock' && <PageBlockDemo />}
    </PageBlock>
  );
};

export default Playground;
