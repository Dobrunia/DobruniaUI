import React, { useState, useCallback, useMemo } from 'react';
import { DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

export interface BreadcrumbItem {
  /** Отображаемый текст */
  label: string;
  /** URL для навигации (если не указан, элемент не кликабельный) */
  href?: string;
  /** Обработчик клика (альтернатива href для SPA) */
  onClick?: () => void;
  /** Иконка перед текстом */
  icon?: React.ReactNode;
}

// Расширенный тип для внутреннего использования
type InternalBreadcrumbItem = BreadcrumbItem & {
  /** Флаг для обозначения сколлапсированного элемента */
  isCollapsed?: boolean;
};

export interface BreadcrumbsProps {
  /** Массив элементов навигации */
  items: BreadcrumbItem[];
  /** Разделитель между элементами */
  separator?: React.ReactNode;
  /** Максимальное количество видимых элементов */
  maxItems?: number;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Вариант отображения */
  variant?: 'default' | 'underlined' | 'pills';
  /** Показывать ли иконки */
  showIcons?: boolean;
  /** CSS классы */
  className?: string;
  /** Обработчик клика по элементу */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return {
        fontSize: DESIGN_TOKENS.fontSize.small,
        padding: '4px 8px',
        gap: '4px',
        iconSize: '14px',
      };
    case 'large':
      return {
        fontSize: DESIGN_TOKENS.fontSize.large,
        padding: '8px 12px',
        gap: '8px',
        iconSize: '20px',
      };
    default:
      return {
        fontSize: DESIGN_TOKENS.fontSize.medium,
        padding: '6px 10px',
        gap: '6px',
        iconSize: '16px',
      };
  }
};

const BreadcrumbsContainer = styled.nav<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => getSizeStyles($size).gap};
  font-size: ${({ $size }) => getSizeStyles($size).fontSize};
  color: var(--c-text-primary);
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.div<{
  $isClickable: boolean;
  $isLast: boolean;
  $variant: 'default' | 'underlined' | 'pills';
  $size: 'small' | 'medium' | 'large';
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${({ $variant, $size }) =>
    $variant === 'pills' ? getSizeStyles($size).padding : '2px 4px'};
  border-radius: ${({ $variant }) => ($variant === 'pills' ? DESIGN_TOKENS.radius.small : '0')};
  transition: all 0.2s ease;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  text-decoration: none;
  color: ${({ $isLast, $isClickable }) => {
    if ($isLast) return 'var(--c-text-primary)';
    if ($isClickable) return 'var(--c-accent)';
    return 'var(--c-text-secondary)';
  }};
  font-weight: ${({ $isLast }) => ($isLast ? '600' : '400')};

  ${({ $variant, $isClickable, $isLast }) => {
    if (!$isClickable || $isLast) return '';

    switch ($variant) {
      case 'underlined':
        return `
          &:hover {
            text-decoration: underline;
            color: color-mix(in srgb, var(--c-accent) 80%, black 20%);
          }
        `;
      case 'pills':
        return `
          &:hover {
            background-color: var(--c-bg-elevated);
            color: color-mix(in srgb, var(--c-accent) 80%, black 20%);
          }
        `;
      default:
        return `
          &:hover {
            color: color-mix(in srgb, var(--c-accent) 80%, black 20%);
          }
        `;
    }
  }}

  ${({ $isLast, $variant }) =>
    $isLast && $variant === 'pills'
      ? `
      background-color: var(--c-accent);
      color: white;
      &:hover {
        background-color: var(--c-accent);
        color: white;
      }
    `
      : ''}
`;

const IconWrapper = styled.span<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  width: ${({ $size }) => getSizeStyles($size).iconSize};
  height: ${({ $size }) => getSizeStyles($size).iconSize};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Separator = styled.span<{ $size: 'small' | 'medium' | 'large' }>`
  color: var(--c-text-secondary);
  display: flex;
  align-items: center;
  font-size: ${({ $size }) => getSizeStyles($size).fontSize};
  user-select: none;
`;

const CollapsedIndicator = styled.span`
  color: var(--c-text-secondary);
  cursor: pointer;
  padding: 2px 8px;
  border-radius: ${DESIGN_TOKENS.radius.small};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--c-bg-elevated);
  }
`;

// Мемоизированные подкомпоненты
const BreadcrumbIcon = React.memo<{
  icon: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}>(({ icon, size }) => <IconWrapper $size={size}>{icon}</IconWrapper>);
BreadcrumbIcon.displayName = 'BreadcrumbIcon';

const BreadcrumbSeparator = React.memo<{
  separator: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  index: number;
}>(({ separator, size, index }) => (
  <Separator key={`separator-${index}`} $size={size} aria-hidden='true'>
    {separator}
  </Separator>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const CollapsedBreadcrumb = React.memo<{
  onExpand: (e: React.MouseEvent) => void;
}>(({ onExpand }) => (
  <CollapsedIndicator key='collapsed' onClick={onExpand} title='Показать все элементы'>
    ...
  </CollapsedIndicator>
));
CollapsedBreadcrumb.displayName = 'CollapsedBreadcrumb';

const BreadcrumbLink = React.memo<{
  item: InternalBreadcrumbItem;
  index: number;
  isClickable: boolean;
  isLast: boolean;
  variant: 'default' | 'underlined' | 'pills';
  size: 'small' | 'medium' | 'large';
  showIcons: boolean;
  onClick: (e: React.MouseEvent) => void;
}>(({ item, index, isClickable, isLast, variant, size, showIcons, onClick }) => {
  const content = (
    <>
      {showIcons && item.icon && <BreadcrumbIcon icon={item.icon} size={size} />}
      {item.label}
    </>
  );

  if (item.href && !isLast) {
    return (
      <BreadcrumbItem
        key={index}
        as='a'
        href={item.href}
        $isClickable={isClickable}
        $isLast={isLast}
        $variant={variant}
        $size={size}
        onClick={onClick}
      >
        {content}
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem
      key={index}
      $isClickable={isClickable}
      $isLast={isLast}
      $variant={variant}
      $size={size}
      onClick={isClickable ? onClick : undefined}
    >
      {content}
    </BreadcrumbItem>
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

/**
 * Breadcrumbs component - компонент навигационных хлебных крошек
 *
 * @param items 'BreadcrumbItem[]' - массив элементов навигации
 * @param separator 'ReactNode' = '/' - разделитель между элементами
 * @param maxItems 'number' - максимальное количество видимых элементов
 * @param size 'small | medium | large' = 'medium' - размер компонента
 * @param variant 'default | underlined | pills' = 'default' - вариант отображения
 * @param showIcons 'boolean' = true - показывать ли иконки
 * @param className 'string' - CSS классы
 * @param onItemClick '(item: BreadcrumbItem, index: number) => void' - обработчик клика по элементу
 */
export const Breadcrumbs = React.memo<BreadcrumbsProps>(
  ({
    items,
    separator = '/',
    maxItems,
    size = 'medium',
    variant = 'default',
    showIcons = true,
    className,
    onItemClick,
  }) => {
    const [showAllItems, setShowAllItems] = useState(false);

    // Мемоизируем логику сворачивания элементов
    const displayItems = useMemo((): InternalBreadcrumbItem[] => {
      if (!maxItems || items.length <= maxItems || showAllItems) {
        return items;
      }

      if (maxItems <= 2) {
        return [items[0], items[items.length - 1]];
      }

      const startItems = items.slice(0, 1);
      const endItems = items.slice(-(maxItems - 2));

      return [
        ...startItems,
        { label: '...', isCollapsed: true } as InternalBreadcrumbItem,
        ...endItems,
      ];
    }, [items, maxItems, showAllItems]);

    // Стабилизируем обработчики
    const handleItemClick = useCallback(
      (item: InternalBreadcrumbItem, index: number, event: React.MouseEvent) => {
        if (item.isCollapsed) {
          event.preventDefault();
          setShowAllItems(true);
          return;
        }

        if (item.onClick) {
          event.preventDefault();
          item.onClick();
        }

        onItemClick?.(item, index);
      },
      [onItemClick]
    );

    const handleExpand = useCallback((event: React.MouseEvent) => {
      event.preventDefault();
      setShowAllItems(true);
    }, []);

    // Мемоизируем рендер элементов
    const breadcrumbElements = useMemo(() => {
      return displayItems
        .map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const elements = [];

          if (item.isCollapsed) {
            elements.push(<CollapsedBreadcrumb key='collapsed' onExpand={handleExpand} />);
          } else {
            const isClickable = !!(item.href || item.onClick) && !isLast;
            elements.push(
              <BreadcrumbLink
                key={index}
                item={item}
                index={index}
                isClickable={isClickable}
                isLast={isLast}
                variant={variant}
                size={size}
                showIcons={showIcons}
                onClick={(e) => handleItemClick(item, index, e)}
              />
            );
          }

          if (!isLast) {
            elements.push(
              <BreadcrumbSeparator
                key={`separator-${index}`}
                separator={separator}
                size={size}
                index={index}
              />
            );
          }

          return elements;
        })
        .flat();
    }, [displayItems, handleItemClick, handleExpand, variant, size, showIcons, separator]);

    return (
      <BreadcrumbsContainer
        $size={size}
        className={className}
        role='navigation'
        aria-label='Breadcrumb'
      >
        {breadcrumbElements}
      </BreadcrumbsContainer>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
