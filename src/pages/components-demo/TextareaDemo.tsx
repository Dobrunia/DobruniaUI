import React, { useState } from 'react';
import styled from 'styled-components';
import { Textarea, DESIGN_TOKENS } from '@DobruniaUI';

const DemoContainer = styled.div`
  padding: ${DESIGN_TOKENS.spacing.large};
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${DESIGN_TOKENS.spacing.large};
`;

export const TextareaDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [autoValue, setAutoValue] = useState('');
  const [horizontalValue, setHorizontalValue] = useState('');
  const [bothValue, setBothValue] = useState('');
  const [limitedValue, setLimitedValue] = useState('');
  const maxLen = 50;

  return (
    <DemoContainer>
      <Textarea
        label='Standard'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        helperText='Helper text goes here'
      />
      <Textarea
        label='With error'
        value={errorValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setErrorValue(e.target.value)}
        error={!!errorValue && errorValue.length < 10}
        errorText='Минимум 10 символов'
        helperText='Попробуйте ввести меньше 10 символов'
      />
      <Textarea label='Disabled' disabled helperText='Это поле отключено' />
      <Textarea
        label='Auto height'
        value={autoValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAutoValue(e.target.value)}
        autoHeight
        helperText='Высота меняется автоматически'
      />
      <Textarea label='300px width' width='300px' helperText='Ширина 300px' />
      <Textarea
        label='Horizontal resize'
        value={horizontalValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHorizontalValue(e.target.value)}
        resize='horizontal'
        helperText='Можно менять ширину'
      />
      <Textarea
        label='Both resize'
        value={bothValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBothValue(e.target.value)}
        resize='both'
        helperText='Можно менять ширину и высоту'
      />
      <Textarea
        label='With max length'
        value={limitedValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setLimitedValue(e.target.value.slice(0, maxLen))
        }
        helperText={`Символов: ${limitedValue.length} / ${maxLen}`}
      />
    </DemoContainer>
  );
};
