import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, DESIGN_TOKENS } from '@DobruniaUI';

const DemoContainer = styled.div`
  padding: ${DESIGN_TOKENS.spacing.large};
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${DESIGN_TOKENS.spacing.large};
`;

export const TextFieldDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [number, setNumber] = useState('');

  return (
    <DemoContainer>
      <TextField
        label='Standard'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        helperText='Helper text goes here'
      />
      <TextField
        label='With error'
        value={errorValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setErrorValue(e.target.value)}
        error={!!errorValue && errorValue.length < 4}
        errorText='Minimum 4 characters'
        helperText='Try typing less than 4 chars'
      />
      <TextField label='Disabled' disabled helperText='This field is disabled' />
      <TextField label='Password' type='password' helperText='Type is password' />
      <TextField
        label='Email'
        type='email'
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        helperText='Type is email'
        errorText='Некорректный email'
      />
      <TextField
        label='Phone'
        type='phone'
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
        helperText='Type is tel (phone)'
        errorText='Некорректный телефон'
      />
      <TextField
        label='Number'
        type='number'
        value={number}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
        helperText='Type is number'
        errorText='Введите число'
      />
      <TextField label='200px field' width='200px' helperText='This field is 200px wide' />
    </DemoContainer>
  );
};
