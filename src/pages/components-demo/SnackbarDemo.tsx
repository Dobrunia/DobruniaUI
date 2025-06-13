import React, { useState } from 'react';
import { Snackbar, type SnackbarOrigin } from '@DobruniaUI';

const positions: SnackbarOrigin[] = [
  { vertical: 'top', horizontal: 'left' },
  { vertical: 'top', horizontal: 'center' },
  { vertical: 'top', horizontal: 'right' },
  { vertical: 'bottom', horizontal: 'left' },
  { vertical: 'bottom', horizontal: 'center' },
  { vertical: 'bottom', horizontal: 'right' },
];

export const SnackbarDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] = useState<SnackbarOrigin>(positions[4]);
  const [message, setMessage] = useState('');

  const handleOpen = (origin: SnackbarOrigin) => {
    setAnchorOrigin(origin);
    setMessage(`Snackbar at ${origin.vertical}-${origin.horizontal}`);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Snackbar positions</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
        {positions.map((pos) => (
          <button
            key={pos.vertical + pos.horizontal}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: '1px solid var(--color-primary)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              color: 'var(--text-body)',
            }}
            onClick={() => handleOpen(pos)}
          >
            {pos.vertical}-{pos.horizontal}
          </button>
        ))}
      </div>
      <Snackbar open={open} message={message} onClose={handleClose} anchorOrigin={anchorOrigin} />
    </div>
  );
};
