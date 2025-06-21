import React, { useState } from 'react';
import { Radio } from '@DobruniaUI';
import { DESIGN_TOKENS } from '../../styles/designTokens';

export const RadioDemo: React.FC = () => {
  const [value, setValue] = useState('option1');

  return (
    <div
      style={{
        padding: `${DESIGN_TOKENS.spacing.large}`,
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          color: 'var(--c-text-primary)',
          marginBottom: `${DESIGN_TOKENS.spacing.large}`,
          fontSize: `${DESIGN_TOKENS.fontSize.large}`,
        }}
      >
        Radio Demo
      </h2>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: `${DESIGN_TOKENS.spacing.large}` }}
      >
        <Radio
          checked={value === 'option1'}
          onChange={() => setValue('option1')}
          label='Вариант 1'
          name='demo-radio'
          id='radio1'
        />
        <Radio
          checked={value === 'option2'}
          onChange={() => setValue('option2')}
          label='Вариант 2'
          name='demo-radio'
          id='radio2'
        />
        <Radio
          checked={value === 'option3'}
          onChange={() => setValue('option3')}
          label='Отключённый вариант'
          name='demo-radio'
          id='radio3'
          disabled
        />
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Выбрано:</b> {value}
      </div>
    </div>
  );
};
