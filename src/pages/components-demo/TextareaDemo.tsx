import React, { useState } from 'react';
import styled from 'styled-components';
import { Textarea } from '@DobruniaUI';

const DemoContainer = styled.div`
  padding: var(--spacing-large);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
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
        label="Standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Helper text goes here"
      />
      <Textarea
        label="With error"
        value={errorValue}
        onChange={(e) => setErrorValue(e.target.value)}
        error={!!errorValue && errorValue.length < 10}
        errorText="Минимум 10 символов"
        helperText="Попробуйте ввести меньше 10 символов"
      />
      <Textarea label="Disabled" disabled helperText="Это поле отключено" />
      <Textarea
        label="Auto height"
        value={autoValue}
        onChange={(e) => setAutoValue(e.target.value)}
        autoHeight
        helperText="Высота меняется автоматически"
      />
      <Textarea label="300px width" width="300px" helperText="Ширина 300px" />
      <Textarea
        label="Horizontal resize"
        value={horizontalValue}
        onChange={(e) => setHorizontalValue(e.target.value)}
        resize="horizontal"
        helperText="Можно менять ширину"
      />
      <Textarea
        label="Both resize"
        value={bothValue}
        onChange={(e) => setBothValue(e.target.value)}
        resize="both"
        helperText="Можно менять ширину и высоту"
      />
      <Textarea
        label="With max length"
        value={limitedValue}
        onChange={(e) => setLimitedValue(e.target.value.slice(0, maxLen))}
        helperText={`Символов: ${limitedValue.length} / ${maxLen}`}
      />
    </DemoContainer>
  );
};
