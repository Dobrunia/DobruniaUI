import React from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '../../styles/designTokens';

interface PaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
  siblingCount?: number; // сколько соседей показывать
  boundaryCount?: number; // сколько крайних показывать
  className?: string;
}

const PaginationRoot = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) =>
    $active ? 'color-mix(in srgb, var(--c-accent) 10%, transparent 90%)' : 'transparent'};
  color: ${({ $active }) => ($active ? 'var(--c-accent)' : 'var(--c-text-primary)')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  outline: none;
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const Dots = styled.span`
  min-width: 32px;
  text-align: center;
  color: var(--c-text-secondary);
  font-size: ${DESIGN_TOKENS.fontSize.medium};
`;

const IconBtn = styled(PageBtn)`
  border-radius: 50%;
  font-size: 1.1em;
  padding: 0;
`;

const FirstIcon = () => <span style={{ fontSize: '1.1em' }}>{'|<'}</span>;
const PrevIcon = () => <span style={{ fontSize: '1.1em' }}>{'<'}</span>;
const NextIcon = () => <span style={{ fontSize: '1.1em' }}>{'>'}</span>;
const LastIcon = () => <span style={{ fontSize: '1.1em' }}>{'>|'}</span>;

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(page: number, count: number, siblingCount: number, boundaryCount: number) {
  const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;
  if (count <= totalNumbers) {
    return range(1, count);
  }
  const startPages = range(1, boundaryCount);
  const endPages = range(count - boundaryCount + 1, count);
  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    count - boundaryCount - 1
  );
  const pages: (number | 'dots')[] = [
    ...startPages,
    siblingsStart > boundaryCount + 2 ? 'dots' : boundaryCount + 1,
    ...range(siblingsStart, siblingsEnd),
    siblingsEnd < count - boundaryCount - 1 ? 'dots' : count - boundaryCount,
    ...endPages,
  ];
  return pages.filter((v, i, arr) => (typeof v === 'number' ? arr.indexOf(v) === i : true));
}

/**
 * Pagination component - компонент для навигации по страницам
 * @param {number} page - текущая страница
 * @param {number} count - общее количество страниц
 * @param {(page: number) => void} onChange - функция обработки изменения страницы
 * @param {number} [siblingCount=1] - количество соседних страниц, отображаемых с каждой стороны от текущей
 * @param {number} [boundaryCount=1] - количество страниц, отображаемых на границах (в начале и конце)
 * @param {string} [className] - дополнительные CSS классы
 *
 * @example
 * // Базовое использование
 * <Pagination
 *   page={1}
 *   count={10}
 *   onChange={(page) => console.log(page)}
 * />
 *
 * // С большим количеством соседних страниц
 * <Pagination
 *   page={5}
 *   count={20}
 *   onChange={(page) => console.log(page)}
 *   siblingCount={2}
 * />
 *
 * // С большим количеством граничных страниц
 * <Pagination
 *   page={10}
 *   count={30}
 *   onChange={(page) => console.log(page)}
 *   boundaryCount={2}
 * />
 *
 * // С кастомными стилями
 * <Pagination
 *   page={1}
 *   count={5}
 *   onChange={(page) => console.log(page)}
 *   className="custom-pagination"
 * />
 */
export const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  className,
}) => {
  const pages = getPages(page, count, siblingCount, boundaryCount);
  return (
    <PaginationRoot className={className} aria-label='pagination'>
      <IconBtn onClick={() => onChange(1)} disabled={page === 1} aria-label='first page'>
        <FirstIcon />
      </IconBtn>
      <IconBtn onClick={() => onChange(page - 1)} disabled={page === 1} aria-label='previous page'>
        <PrevIcon />
      </IconBtn>
      {pages.map((p, i) =>
        p === 'dots' ? (
          <Dots key={`dots-${i}`}>…</Dots>
        ) : (
          <PageBtn
            key={p}
            $active={p === page}
            onClick={() => onChange(p as number)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </PageBtn>
        )
      )}
      <IconBtn onClick={() => onChange(page + 1)} disabled={page === count} aria-label='next page'>
        <NextIcon />
      </IconBtn>
      <IconBtn onClick={() => onChange(count)} disabled={page === count} aria-label='last page'>
        <LastIcon />
      </IconBtn>
    </PaginationRoot>
  );
};
