import React from 'react';
import { PageBlock } from '../../layout';
import styled from 'styled-components';

const DemoBox = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  height: 100%;
`;

export const PageBlockDemo: React.FC = () => {
  return (
    <div>
      <h2>Обычный PageBlock</h2>
      <PageBlock
        left={
          <DemoBox>
            <h3>Left Sidebar</h3>
            <p>This is the left sidebar content.</p>
          </DemoBox>
        }
        right={
          <DemoBox>
            <h3>Right Sidebar</h3>
            <p>This is the right sidebar content.</p>
          </DemoBox>
        }
      >
        <DemoBox>
          <h2>Main Content</h2>
          <p>
            This is the main content area. It can contain any content you want.
          </p>
          <p>
            The layout component provides a flexible three-column structure with
            optional sidebars.
          </p>
        </DemoBox>
      </PageBlock>

      <h2 style={{ marginTop: '2rem' }}>PageBlock с stretched</h2>
      <PageBlock
        stretched
        left={
          <DemoBox>
            <h3>Left Sidebar</h3>
            <p>This is the left sidebar content.</p>
          </DemoBox>
        }
        right={
          <DemoBox>
            <h3>Right Sidebar</h3>
            <p>This is the right sidebar content.</p>
          </DemoBox>
        }
      >
        <DemoBox>
          <h2>Main Content</h2>
          <p>
            Это stretched-версия PageBlock. Контент занимает всю доступную
            ширину.
          </p>
        </DemoBox>
      </PageBlock>
    </div>
  );
};
