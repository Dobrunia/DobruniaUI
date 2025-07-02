import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, DESIGN_TOKENS, ErrorButton, IconBtn, Checkbox } from '@DobruniaUI';

const DemoContainer = styled.div`
  padding: ${DESIGN_TOKENS.spacing.large};
  margin: 0 auto;
  max-width: 1000px;
`;

const PlaygroundSection = styled.section`
  margin-bottom: ${DESIGN_TOKENS.spacing.large};
  padding: ${DESIGN_TOKENS.spacing.large};
  background: var(--c-bg-elevated);
  border-radius: ${DESIGN_TOKENS.radius.large};
  border: 1px solid var(--c-border);
`;

const SectionTitle = styled.h2`
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.large};
  margin-bottom: ${DESIGN_TOKENS.spacing.medium};
  text-align: center;
`;

const PlaygroundGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${DESIGN_TOKENS.spacing.large};
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ControlsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${DESIGN_TOKENS.spacing.medium};
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${DESIGN_TOKENS.spacing.small};
`;

const ControlLabel = styled.label`
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  font-weight: 500;
`;

const Select = styled.select`
  padding: ${DESIGN_TOKENS.spacing.small};
  border: 1px solid var(--c-border);
  border-radius: ${DESIGN_TOKENS.radius.small};
  background: var(--c-bg-subtle);
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.small};

  &:focus {
    outline: none;
    border-color: var(--c-accent);
  }
`;

const Input = styled.input`
  padding: ${DESIGN_TOKENS.spacing.small};
  border: 1px solid var(--c-border);
  border-radius: ${DESIGN_TOKENS.radius.small};
  background: var(--c-bg-subtle);
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.small};

  &:focus {
    outline: none;
    border-color: var(--c-accent);
  }
`;

const PreviewPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: ${DESIGN_TOKENS.spacing.large};
  background: var(--c-bg-default);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1px solid var(--c-border);
  gap: ${DESIGN_TOKENS.spacing.medium};
`;

const PreviewLabel = styled.span`
  color: var(--c-text-secondary);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  text-align: center;
`;

const CodeBlock = styled.pre`
  background: var(--c-bg-subtle);
  color: var(--c-text-primary);
  padding: ${DESIGN_TOKENS.spacing.medium};
  border-radius: ${DESIGN_TOKENS.radius.small};
  border: 1px solid var(--c-border);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  overflow-x: auto;
  white-space: pre-wrap;
  margin-top: ${DESIGN_TOKENS.spacing.medium};
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${DESIGN_TOKENS.spacing.medium};
  margin-top: ${DESIGN_TOKENS.spacing.large};
`;

const ExampleCard = styled.div`
  padding: ${DESIGN_TOKENS.spacing.medium};
  background: var(--c-bg-elevated);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${DESIGN_TOKENS.spacing.small};
`;

const ExampleTitle = styled.h4`
  color: var(--c-text-primary);
  font-size: ${DESIGN_TOKENS.fontSize.small};
  margin: 0;
  text-align: center;
`;

export const ButtonDemo: React.FC = () => {
  // Button Playground State
  const [buttonText, setButtonText] = useState('Click Me');
  const [variant, setVariant] = useState<
    'primary' | 'secondary' | 'ghost' | 'warning' | 'send' | 'close'
  >('primary');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [shape, setShape] = useState<'default' | 'circle' | 'square'>('default');
  const [outlined, setOutlined] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // ErrorButton Playground State
  const [errorSize, setErrorSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [errorTooltip, setErrorTooltip] = useState('Tooltip text');
  const [errorDisabled, setErrorDisabled] = useState(false);

  // IconBtn Playground State
  const [iconType, setIconType] = useState<'clock' | 'exclamation' | 'question' | 'dots' | 'exit'>(
    'clock'
  );
  const [iconVariant, setIconVariant] = useState<'primary' | 'secondary' | 'ghost' | 'warning'>(
    'secondary'
  );
  const [iconSize, setIconSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [iconDisabled, setIconDisabled] = useState(false);

  const generateButtonCode = () => {
    const props = [];
    if (variant !== 'primary') props.push(`variant="${variant}"`);
    if (size !== 'medium') props.push(`size="${size}"`);
    if (shape !== 'default') props.push(`shape="${shape}"`);
    if (outlined) props.push('outlined');
    if (fullWidth) props.push('fullWidth');
    if (isLoading) props.push('isLoading');
    if (disabled) props.push('disabled');

    const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
    const children = variant === 'send' || variant === 'close' ? '' : `\n  ${buttonText}\n`;
    const selfClosing = !children;

    return `<Button${propsString}${selfClosing ? ' />' : `>${children}</Button>`}`;
  };

  const generateErrorButtonCode = () => {
    const props = [];
    if (errorTooltip) props.push(`tooltipText="${errorTooltip}"`);
    if (errorSize !== 'medium') props.push(`size="${errorSize}"`);
    if (errorDisabled) props.push('disabled');

    const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
    return `<ErrorButton${propsString} />`;
  };

  const generateIconBtnCode = () => {
    const props = [];
    props.push(`icon="${iconType}"`);
    if (iconVariant !== 'secondary') props.push(`variant="${iconVariant}"`);
    if (iconSize !== 'medium') props.push(`size="${iconSize}"`);
    if (iconDisabled) props.push('disabled');

    const propsString = props.join(' ');
    return `<IconBtn ${propsString} />`;
  };

  return (
    <DemoContainer>
      {/* Button Playground */}
      <PlaygroundSection>
        <SectionTitle>🎮 Button Playground</SectionTitle>
        <PlaygroundGrid>
          <ControlsPanel>
            <ControlGroup>
              <ControlLabel>Button Text</ControlLabel>
              <Input
                type='text'
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                disabled={variant === 'send' || variant === 'close'}
              />
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Variant</ControlLabel>
              <Select
                value={variant}
                onChange={(e) =>
                  setVariant(
                    e.target.value as
                      | 'primary'
                      | 'secondary'
                      | 'ghost'
                      | 'warning'
                      | 'send'
                      | 'close'
                  )
                }
              >
                <option value='primary'>Primary</option>
                <option value='secondary'>Secondary</option>
                <option value='ghost'>Ghost</option>
                <option value='warning'>Warning</option>
                <option value='send'>Send</option>
                <option value='close'>Close</option>
              </Select>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Size</ControlLabel>
              <Select
                value={size}
                onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large')}
              >
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </Select>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Shape</ControlLabel>
              <Select
                value={shape}
                onChange={(e) => setShape(e.target.value as 'default' | 'circle' | 'square')}
              >
                <option value='default'>Default</option>
                <option value='circle'>Circle</option>
                <option value='square'>Square</option>
              </Select>
            </ControlGroup>

            <Checkbox
              label='Outlined'
              checked={outlined}
              onChange={() => setOutlined(!outlined)}
            />

            <Checkbox
              label='Full Width'
              checked={fullWidth}
              onChange={() => setFullWidth(!fullWidth)}
            />

            <Checkbox
              label='Loading'
              checked={isLoading}
              onChange={() => setIsLoading(!isLoading)}
            />

            <Checkbox
              label='Disabled'
              checked={disabled}
              onChange={() => setDisabled(!disabled)}
            />
          </ControlsPanel>

          <PreviewPanel>
            <Button
              variant={variant}
              size={size}
              shape={shape}
              outlined={outlined}
              fullWidth={fullWidth}
              isLoading={isLoading}
              disabled={disabled}
              onClick={() => alert('Button clicked!')}
            >
              {variant !== 'send' && variant !== 'close' ? buttonText : undefined}
            </Button>
            <PreviewLabel>Live Preview</PreviewLabel>
            <CodeBlock>{generateButtonCode()}</CodeBlock>
          </PreviewPanel>
        </PlaygroundGrid>
      </PlaygroundSection>

      {/* ErrorButton Playground */}
      <PlaygroundSection>
        <SectionTitle>⚠️ ErrorButton Playground</SectionTitle>
        <PlaygroundGrid>
          <ControlsPanel>
            <ControlGroup>
              <ControlLabel>Tooltip Text</ControlLabel>
              <Input
                type='text'
                value={errorTooltip}
                onChange={(e) => setErrorTooltip(e.target.value)}
              />
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Size</ControlLabel>
              <Select
                value={errorSize}
                onChange={(e) => setErrorSize(e.target.value as 'small' | 'medium' | 'large')}
              >
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </Select>
            </ControlGroup>

            <Checkbox
              label='Disabled'
              checked={errorDisabled}
              onChange={() => setErrorDisabled(!errorDisabled)}
            />
          </ControlsPanel>

          <PreviewPanel>
            <ErrorButton
              tooltipText={errorTooltip}
              size={errorSize}
              disabled={errorDisabled}
              onClick={() => alert('Error button clicked!')}
            />
            <PreviewLabel>Hover to see tooltip</PreviewLabel>
            <CodeBlock>{generateErrorButtonCode()}</CodeBlock>
          </PreviewPanel>
        </PlaygroundGrid>
      </PlaygroundSection>

      {/* IconBtn Playground */}
      <PlaygroundSection>
        <SectionTitle>🎯 IconBtn Playground</SectionTitle>
        <PlaygroundGrid>
          <ControlsPanel>
            <ControlGroup>
              <ControlLabel>Icon Type</ControlLabel>
              <Select
                value={iconType}
                onChange={(e) =>
                  setIconType(
                    e.target.value as 'clock' | 'exclamation' | 'question' | 'dots' | 'exit'
                  )
                }
              >
                <option value='clock'>Clock</option>
                <option value='exclamation'>Exclamation</option>
                <option value='question'>Question</option>
                <option value='dots'>Dots</option>
                <option value='exit'>Exit</option>
              </Select>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Variant</ControlLabel>
              <Select
                value={iconVariant}
                onChange={(e) =>
                  setIconVariant(e.target.value as 'primary' | 'secondary' | 'ghost' | 'warning')
                }
              >
                <option value='primary'>Primary</option>
                <option value='secondary'>Secondary</option>
                <option value='ghost'>Ghost</option>
                <option value='warning'>Warning</option>
              </Select>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Size</ControlLabel>
              <Select
                value={iconSize}
                onChange={(e) => setIconSize(e.target.value as 'small' | 'medium' | 'large')}
              >
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </Select>
            </ControlGroup>

              <Checkbox
                label='Disabled'
                checked={iconDisabled}
                onChange={() => setIconDisabled(!iconDisabled)}
              />
          </ControlsPanel>

          <PreviewPanel>
            <IconBtn
              icon={iconType}
              variant={iconVariant}
              size={iconSize}
              disabled={iconDisabled}
              onClick={() => alert(`${iconType} icon clicked!`)}
            />
            <PreviewLabel>Icon Button Preview</PreviewLabel>
            <CodeBlock>{generateIconBtnCode()}</CodeBlock>
          </PreviewPanel>
        </PlaygroundGrid>
      </PlaygroundSection>

      {/* Quick Examples */}
      <PlaygroundSection>
        <SectionTitle>🚀 Common Examples</SectionTitle>
        <ExamplesGrid>
          <ExampleCard>
            <ExampleTitle>Call-to-Action</ExampleTitle>
            <Button variant='primary' size='large'>
              Get Started
            </Button>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>Secondary Action</ExampleTitle>
            <Button variant='secondary' outlined>
              Learn More
            </Button>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>Warning Action</ExampleTitle>
            <Button variant='warning'>Delete Item</Button>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>Icon Actions</ExampleTitle>
            <div style={{ display: 'flex', gap: '8px' }}>
              <IconBtn icon='clock' variant='ghost' />
              <IconBtn icon='dots' variant='ghost' />
              <IconBtn icon='exit' variant='secondary' />
            </div>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>Error State</ExampleTitle>
            <ErrorButton tooltipText='Remove item permanently' />
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>Loading State</ExampleTitle>
            <Button variant='primary' isLoading>
              Processing...
            </Button>
          </ExampleCard>
        </ExamplesGrid>
      </PlaygroundSection>
    </DemoContainer>
  );
};
