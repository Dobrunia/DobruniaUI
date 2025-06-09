import React, { useState } from 'react';
import { Radio } from '@DobruniaUI';

export const RadioDemo: React.FC = () => {
  const [value, setValue] = useState('option1');

  return (
    <div
      style={{
        padding: 'var(--spacing-large)',
        maxWidth: 'var(--layout-content-width)',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          color: 'var(--text-heading)',
          marginBottom: 'var(--spacing-large)',
          fontSize: 'var(--font-size-large)',
        }}
      >
        Radio Demo
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)' }}>
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
      <div style={{ marginTop: 'var(--spacing-large)', color: 'var(--text-body)' }}>
        <b>Выбрано:</b> {value}
      </div>
    </div>
  );
};
