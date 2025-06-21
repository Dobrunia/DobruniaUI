import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@DobruniaUI';
import { DESIGN_TOKENS } from '../../styles/designTokens';

const DemoContainer = styled.div`
  padding: ${DESIGN_TOKENS.spacing.large};
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${DESIGN_TOKENS.spacing.large};
`;

const SectionTitle = styled.h2`
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.large};
  margin-bottom: ${DESIGN_TOKENS.spacing.medium};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${DESIGN_TOKENS.spacing.medium};
  margin-bottom: ${DESIGN_TOKENS.spacing.medium};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${DESIGN_TOKENS.spacing.small};
`;

const ButtonLabel = styled.span`
  color: var(--c-text-secondary);
  font-size: ${DESIGN_TOKENS.fontSize.small};
`;

export const ButtonDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DemoContainer>
      <Section>
        <SectionTitle>Button Variants</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper>
            <Button variant='primary'>Primary Button</Button>
            <ButtonLabel>Primary</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='secondary'>Secondary Button</Button>
            <ButtonLabel>Secondary</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='ghost'>Ghost Button</Button>
            <ButtonLabel>Ghost</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='warning'>Warning Button</Button>
            <ButtonLabel>Warning</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Circular Buttons</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper>
            <Button variant='primary' shape='circle' size='small'>
              +
            </Button>
            <ButtonLabel>Small Circle</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='primary' shape='circle'>
              +
            </Button>
            <ButtonLabel>Medium Circle</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='primary' shape='circle' size='large'>
              +
            </Button>
            <ButtonLabel>Large Circle</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Special Buttons</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper>
            <Button variant='send' aria-label='Send' />
            <ButtonLabel>Send (icon only)</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='close' aria-label='Close' />
            <ButtonLabel>Close Outlined</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='close' shape='circle' size='small' aria-label='Close' />
            <ButtonLabel>Close Circle</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Outlined Buttons</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper>
            <Button variant='primary' outlined>
              Outlined Primary
            </Button>
            <ButtonLabel>Primary Outlined</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='secondary' outlined>
              Outlined Secondary
            </Button>
            <ButtonLabel>Secondary Outlined</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant='warning' outlined>
              Outlined Warning
            </Button>
            <ButtonLabel>Warning Outlined</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Button Sizes</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper>
            <Button size='small'>Small Button</Button>
            <ButtonLabel>Small</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button size='medium'>Medium Button</Button>
            <ButtonLabel>Medium</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button size='large'>Large Button</Button>
            <ButtonLabel>Large</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Button States</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper>
            <Button disabled>Disabled Button</Button>
            <ButtonLabel>Disabled</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button isLoading>Loading Button</Button>
            <ButtonLabel>Loading</ButtonLabel>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button onClick={handleLoadingClick} isLoading={loading}>
              Click to Load
            </Button>
            <ButtonLabel>Interactive Loading</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Full Width Button</SectionTitle>
        <ButtonGrid>
          <ButtonWrapper style={{ gridColumn: '1 / -1' }}>
            <Button fullWidth>Full Width Button</Button>
            <ButtonLabel>Full Width</ButtonLabel>
          </ButtonWrapper>
        </ButtonGrid>
      </Section>
    </DemoContainer>
  );
};
