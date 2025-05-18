import React, { useState, useEffect } from 'react';
import { CircularProgressWithLabel, LinearProgress } from '../../Feedback';

export const ProgressDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) return 0;
        return old + 1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2 style={{ marginTop: 0 }}>Circular with label</h2>
      <div
        style={{
          background: 'var(--color-elevated)',
          borderRadius: 12,
          padding: 32,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 100,
          }}
        >
          <CircularProgressWithLabel value={progress} />
        </div>
      </div>
      <h2>Linear</h2>
      <h4>Linear indeterminate</h4>
      <div
        style={{
          background: 'var(--color-elevated)',
          borderRadius: 12,
          padding: 32,
          marginBottom: 32,
        }}
      >
        <LinearProgress />
      </div>
      <h4>Linear with value</h4>
      <div
        style={{
          background: 'var(--color-elevated)',
          borderRadius: 12,
          padding: 32,
        }}
      >
        <LinearProgress value={progress} />
      </div>
    </div>
  );
};
