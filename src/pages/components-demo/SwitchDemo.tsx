import React, { useState } from 'react';
import { Switch, RollingSwitch, YinYangSwitch, FlipSwitch, PowerSwitch, DESIGN_TOKENS } from '@DobruniaUI';

export const SwitchDemo: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [rolling, setRolling] = useState(false);
  const [yinYang, setYinYang] = useState(false);
  const [flip, setFlip] = useState(false);
  const [power, setPower] = useState(false);

  return (
    <div
      style={{
        padding: DESIGN_TOKENS.spacing.large,
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          color: 'var(--c-text-primary)',
          marginBottom: DESIGN_TOKENS.spacing.large,
          fontSize: DESIGN_TOKENS.fontSize.large,
        }}
      >
        Switch Demo
      </h2>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: `${DESIGN_TOKENS.spacing.large}` }}
      >
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
        <YinYangSwitch checked={yinYang} onChange={setYinYang} label='Yin Yang Switch (demo)' />
        <FlipSwitch checked={flip} onChange={setFlip} />
        <div
          style={{
            background: '#000',
          }}
        >
          <PowerSwitch checked={power} onChange={setPower} />
        </div>
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние первого переключателя:</b> {checked ? 'включен' : 'выключен'}
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние rolling toggle:</b> {rolling ? 'включен' : 'выключен'}
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние Yin Yang Switch:</b> {yinYang ? 'включен' : 'выключен'}
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние Flip Switch:</b> {flip ? 'Yeah!' : 'Nope'}
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние Flip Switch:</b> {flip ? 'On' : 'Off'}
      </div>
      <div style={{ marginTop: DESIGN_TOKENS.spacing.large, color: 'var(--c-text-primary)' }}>
        <b>Состояние Power Switch:</b> {power ? 'On' : 'Off'}
      </div>
    </div>
  );
};
