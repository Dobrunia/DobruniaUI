import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { DESIGN_TOKENS } from '@DobruniaUI';

export interface PaginationProps {
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

// Мемоизированные подкомпоненты
const PaginationDots = React.memo<{ index: number }>(({ index }) => (
  <Dots key={`dots-${index}`}>…</Dots>
));
PaginationDots.displayName = 'PaginationDots';

const PaginationPageButton = React.memo<{
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
}>(({ pageNumber, isActive, onClick }) => (
  <PageBtn
    key={pageNumber}
    $active={isActive}
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
  >
    {pageNumber}
  </PageBtn>
));
PaginationPageButton.displayName = 'PaginationPageButton';

const PaginationIconButton = React.memo<{
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  icon: React.ReactNode;
}>(({ onClick, disabled, ariaLabel, icon }) => (
  <IconBtn onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
    {icon}
  </IconBtn>
));
PaginationIconButton.displayName = 'PaginationIconButton';

/**
 * Pagination component - компонент для навигации по страницам
 *
 * @param page 'number' - текущая страница
 * @param count 'number' - общее количество страниц
 * @param onChange '(page: number) => void' - функция обработки изменения страницы
 * @param siblingCount 'number' = 1 - количество соседних страниц, отображаемых с каждой стороны от текущей
 * @param boundaryCount 'number' = 1 - количество страниц, отображаемых на границах (в начале и конце)
 * @param className 'string' - дополнительные CSS классы
 */
export const Pagination = React.memo<PaginationProps>(
  ({ page, count, onChange, siblingCount = 1, boundaryCount = 1, className }) => {
    // Мемоизируем вычисление страниц
    const pages = useMemo(
      () => getPages(page, count, siblingCount, boundaryCount),
      [page, count, siblingCount, boundaryCount]
    );

    // Стабилизируем обработчики
    const handleFirstPage = useCallback(() => onChange(1), [onChange]);
    const handlePrevPage = useCallback(() => onChange(page - 1), [onChange, page]);
    const handleNextPage = useCallback(() => onChange(page + 1), [onChange, page]);
    const handleLastPage = useCallback(() => onChange(count), [onChange, count]);

    const handlePageClick = useCallback(
      (pageNumber: number) => {
        onChange(pageNumber);
      },
      [onChange]
    );

    // Мемоизируем рендер страниц
    const pageElements = useMemo(
      () =>
        pages.map((p, i) =>
          p === 'dots' ? (
            <PaginationDots key={`dots-${i}`} index={i} />
          ) : (
            <PaginationPageButton
              key={p}
              pageNumber={p as number}
              isActive={p === page}
              onClick={() => handlePageClick(p as number)}
            />
          )
        ),
      [pages, page, handlePageClick]
    );

    // Мемоизируем пропсы для кнопок навигации
    const navigationButtons = useMemo(
      () => ({
        firstPage: {
          onClick: handleFirstPage,
          disabled: page === 1,
          ariaLabel: 'first page',
          icon: <FirstIcon />,
        },
        prevPage: {
          onClick: handlePrevPage,
          disabled: page === 1,
          ariaLabel: 'previous page',
          icon: <PrevIcon />,
        },
        nextPage: {
          onClick: handleNextPage,
          disabled: page === count,
          ariaLabel: 'next page',
          icon: <NextIcon />,
        },
        lastPage: {
          onClick: handleLastPage,
          disabled: page === count,
          ariaLabel: 'last page',
          icon: <LastIcon />,
        },
      }),
      [handleFirstPage, handlePrevPage, handleNextPage, handleLastPage, page, count]
    );

    return (
      <PaginationRoot className={className} aria-label='pagination'>
        <PaginationIconButton {...navigationButtons.firstPage} />
        <PaginationIconButton {...navigationButtons.prevPage} />
        {pageElements}
        <PaginationIconButton {...navigationButtons.nextPage} />
        <PaginationIconButton {...navigationButtons.lastPage} />
      </PaginationRoot>
    );
  }
);

Pagination.displayName = 'Pagination';
