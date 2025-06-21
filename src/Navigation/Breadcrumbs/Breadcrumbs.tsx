import React from 'react';
import { DESIGN_TOKENS } from '../../styles/designTokens';
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

/**
 * Breadcrumbs component - компонент навигационных хлебных крошек
 * @param {BreadcrumbItem[]} items - массив элементов навигации
 * @param {React.ReactNode} [separator='/'] - разделитель между элементами
 * @param {number} [maxItems] - максимальное количество видимых элементов
 * @param {'small' | 'medium' | 'large'} [size='medium'] - размер компонента
 * @param {'default' | 'underlined' | 'pills'} [variant='default'] - вариант отображения
 * @param {boolean} [showIcons=true] - показывать ли иконки
 * @param {string} [className] - CSS классы
 * @param {function} [onItemClick] - обработчик клика по элементу
 *
 * @example
 * // Базовое использование
 * <Breadcrumbs items={[
 *   { label: 'Главная', href: '/' },
 *   { label: 'Категория', href: '/category' },
 *   { label: 'Текущая страница' }
 * ]} />
 *
 * // С кастомным разделителем
 * <Breadcrumbs
 *   items={items}
 *   separator="→"
 *   variant="pills"
 * />
 *
 * // С ограничением количества элементов
 * <Breadcrumbs
 *   items={longPath}
 *   maxItems={4}
 *   size="large"
 * />
 *
 * // С иконками и обработчиком
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', icon: <HomeIcon />, onClick: () => navigate('/') },
 *     { label: 'Products', onClick: () => navigate('/products') },
 *     { label: 'Details' }
 *   ]}
 *   onItemClick={(item, index) => console.log('Clicked:', item)}
 * />
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  maxItems,
  size = 'medium',
  variant = 'default',
  showIcons = true,
  className,
  onItemClick,
}) => {
  const [showAllItems, setShowAllItems] = React.useState(false);

  // Логика сворачивания элементов
  const getDisplayItems = (): InternalBreadcrumbItem[] => {
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
  };

  const displayItems = getDisplayItems();

  const handleItemClick = (
    item: InternalBreadcrumbItem,
    index: number,
    event: React.MouseEvent
  ) => {
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
  };

  const renderItem = (item: InternalBreadcrumbItem, index: number, isLast: boolean) => {
    const isClickable = !!(item.href || item.onClick) && !isLast;
    const isCollapsed = item.isCollapsed;

    if (isCollapsed) {
      return (
        <CollapsedIndicator
          key='collapsed'
          onClick={(e) => handleItemClick(item, index, e)}
          title='Показать все элементы'
        >
          ...
        </CollapsedIndicator>
      );
    }

    const content = (
      <>
        {showIcons && item.icon && <IconWrapper $size={size}>{item.icon}</IconWrapper>}
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
          onClick={(e) => handleItemClick(item, index, e)}
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
        onClick={isClickable ? (e) => handleItemClick(item, index, e) : undefined}
      >
        {content}
      </BreadcrumbItem>
    );
  };

  return (
    <BreadcrumbsContainer
      $size={size}
      className={className}
      role='navigation'
      aria-label='Breadcrumb'
    >
      {displayItems
        .map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const elements = [];

          elements.push(renderItem(item, index, isLast));

          if (!isLast) {
            elements.push(
              <Separator key={`separator-${index}`} $size={size} aria-hidden='true'>
                {separator}
              </Separator>
            );
          }

          return elements;
        })
        .flat()}
    </BreadcrumbsContainer>
  );
};
