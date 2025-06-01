import React from 'react';
import { Alert } from '@DobruniaUI';

export const AlertDemo: React.FC = () => {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <div>
        <Alert type='success'>This is a success Alert.</Alert>
        <Alert type='info'>This is an info Alert.</Alert>
        <Alert type='warning'>This is a warning Alert.</Alert>
        <Alert type='error'>This is an error Alert.</Alert>
      </div>
      <h3 style={{ margin: '32px 0 16px 0' }}>Outlined</h3>
      <div>
        <Alert type='success' outlined>
          This is an outlined success Alert.
        </Alert>
        <Alert type='info' outlined>
          This is an outlined info Alert.
        </Alert>
        <Alert type='warning' outlined>
          This is an outlined warning Alert.
        </Alert>
        <Alert type='error' outlined>
          This is an outlined error Alert.
        </Alert>
      </div>
    </div>
  );
};
