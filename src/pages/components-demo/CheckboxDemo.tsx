import React, { useState } from 'react';
import { Checkbox, DESIGN_TOKENS } from '@DobruniaUI';

/**
 * CheckboxDemo - демонстрация компонента Checkbox
 * Показывает работу чекбокса с состоянием и разными вариантами
 */
export const CheckboxDemo: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div style={{ padding: DESIGN_TOKENS.spacing.large }}>
      <h2
        style={{ color: 'var(--c-text-primary)', marginBottom: DESIGN_TOKENS.spacing.large }}
      >
        Checkbox Demo
      </h2>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: DESIGN_TOKENS.spacing.large }}
      >
        <Checkbox checked={checked} onChange={setChecked} label='Я согласен с условиями' />
        <Checkbox
          checked={checked2}
          onChange={setChecked2}
          label='Второй чекбокс (отмечен по умолчанию)'
        />
        <Checkbox checked={false} onChange={() => {}} label='Отключённый чекбокс' disabled />
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние первого чекбокса:</b> {checked ? 'отмечен' : 'не отмечен'}
      </div>
    </div>
  );
};
