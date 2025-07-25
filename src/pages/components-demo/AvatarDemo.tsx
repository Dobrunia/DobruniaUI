import React, { useState } from 'react';
import { Avatar } from '@DobruniaUI';
import styled from 'styled-components';

const DemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-end;
  margin-bottom: 40px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const Label = styled.div`
  font-size: 0.95em;
  color: var(--c-text-secondary);
`;

export const AvatarDemo: React.FC = () => {
  const demoName = 'Иван Иванов';
  const demoSrc = 'https://randomuser.me/api/portraits/men/32.jpg';

  // Для примера выбора статуса
  const [status, setStatus] = useState<'online' | 'offline' | 'dnd' | 'invisible'>('online');

  return (
    <DemoWrapper>
      <h2>Avatar sizes (with image)</h2>
      <Row>
        <Col>
          <Avatar size='xxs' src={demoSrc} name={demoName} status='online' />
          <Label>
            xxs (20px)
            <br />
            online
          </Label>
        </Col>
        <Col>
          <Avatar size='sm' src={demoSrc} name={demoName} status='dnd' />
          <Label>
            sm (32px)
            <br />
            dnd
          </Label>
        </Col>
        <Col>
          <Avatar size='md' src={demoSrc} name={demoName} status='offline' />
          <Label>
            md (40px)
            <br />
            offline
          </Label>
        </Col>
        <Col>
          <Avatar size='lg' src={demoSrc} name={demoName} status='online' />
          <Label>
            lg (56px)
            <br />
            online
          </Label>
        </Col>
      </Row>
      <h2>Avatar sizes (initials only)</h2>
      <Row>
        <Col>
          <Avatar size='xxs' name={demoName} status='online' />
          <Label>
            xxs (20px)
            <br />
            online
          </Label>
        </Col>
        <Col>
          <Avatar size='sm' name={demoName} status='dnd' />
          <Label>
            sm (32px)
            <br />
            dnd
          </Label>
        </Col>
        <Col>
          <Avatar size='md' name={demoName} status='offline' />
          <Label>
            md (40px)
            <br />
            offline
          </Label>
        </Col>
        <Col>
          <Avatar size='lg' name={demoName} status='online' />
          <Label>
            lg (56px)
            <br />
            online
          </Label>
        </Col>
      </Row>
      <h2>Avatar without status</h2>
      <Row>
        <Col>
          <Avatar size='md' name='Без статуса' showStatus={false} />
          <Label>showStatus=false</Label>
        </Col>
        <Col>
          <Avatar size='md' src={demoSrc} name='No status' showStatus={false} />
          <Label>showStatus=false</Label>
        </Col>
      </Row>
      <h2>Avatar with status picker</h2>
      <Row>
        <Col>
          <Avatar size='md' name='Выбор статуса' status={status} onStatusChange={setStatus} />
          <Label>Текущий статус: {status}</Label>
        </Col>
      </Row>
      <h2>Avatar with onClick</h2>
      <Row>
        <Col>
          <Avatar 
            size='md' 
            name='Кликабельный' 
            onClick={() => alert('Аватар кликнут!')} 
          />
          <Label>onClick handler</Label>
        </Col>
        <Col>
          <Avatar 
            size='md' 
            name='Не кликабельный' 
          />
          <Label>Без обработчиков</Label>
        </Col>
      </Row>
    </DemoWrapper>
  );
};
