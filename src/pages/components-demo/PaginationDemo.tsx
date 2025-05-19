import React, { useState } from 'react';
import { Pagination } from '@DobruniaUI';

export const PaginationDemo: React.FC = () => {
  const [page, setPage] = useState(1);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
      }}
    >
      <Pagination page={page} count={10} onChange={setPage} />
    </div>
  );
};
