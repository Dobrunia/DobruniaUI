import React from 'react';
import { Button } from '@DobruniaUI';

export const StartPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        background: 'var(--c-bg-default)',
        color: 'var(--c-text-primary)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          color: 'var(--c-text-primary)',
        }}
      >
        DobruniaUI
      </h1>

      <p
        style={{
          fontSize: '1.2rem',
          margin: '0 0 2rem 0',
          color: 'var(--c-text-secondary)',
        }}
      >
        Современная React UI библиотека компонентов
      </p>

      <Button
        variant='secondary'
        onClick={() => window.open('https://github.com/Dobrunia/dobruniaui#readme', '_blank')}
      >
        Документация
      </Button>
    </div>
  );
};
