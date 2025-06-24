import React from 'react';
import { Skeleton } from '@DobruniaUI';

export const SkeletonDemo: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>Variants</h2>
      <p>The component supports 4 shape variants:</p>
      <ul>
        <li>
          <b>text</b> (default): represents a single line of text (you can adjust the height via
          font size).
        </li>
        <li>
          <b>circular</b>, <b>rectangular</b>, and <b>rounded</b>: come with different border radius
          to let you take control of the size.
        </li>
      </ul>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          margin: '32px 0',
        }}
      >
        <Skeleton variant='text' height={24} width='80%' />
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='rectangular' width={210} height={60} />
        <Skeleton variant='rounded' width={210} height={60} />
      </div>
    </div>
  );
};
