import React, { useState } from 'react';
import { Switch } from '../../components/Switch/Switch';
import { RollingSwitch } from '../../components/Switch/RollingSwitch';

export const SwitchDemo: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [rolling, setRolling] = useState(false);

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
        Switch Demo
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)' }}>
        <Switch checked={checked} onChange={setChecked} label='Включить уведомления' id='switch1' />
        <Switch
          checked={checked2}
          onChange={setChecked2}
          label='Включено по умолчанию'
          id='switch2'
        />
        <Switch
          checked={false}
          onChange={() => {}}
          label='Отключённый переключатель'
          id='switch3'
          disabled
        />
        <RollingSwitch checked={rolling} onChange={setRolling} label='Rolling toggle (demo)' />
      </div>
      <div style={{ marginTop: 'var(--spacing-large)', color: 'var(--text-body)' }}>
        <b>Состояние первого переключателя:</b> {checked ? 'включен' : 'выключен'}
      </div>
      <div style={{ marginTop: 'var(--spacing-large)', color: 'var(--text-body)' }}>
        <b>Состояние rolling toggle:</b> {rolling ? 'включен' : 'выключен'}
      </div>
    </div>
  );
};
