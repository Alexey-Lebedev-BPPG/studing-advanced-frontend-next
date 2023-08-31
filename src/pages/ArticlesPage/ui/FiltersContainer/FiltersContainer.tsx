'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { ArticleFilters } from '@/widgets/ArticleFilters';

interface IFiltersContainerProps {
  className?: string;
}

export const FiltersContainer: FC<IFiltersContainerProps> = props => {
  const { className } = props;
  const { t } = useTranslation();

  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type,
  } = useArticleFilters();

  return (
    <ArticleFilters
      order={order}
      sort={sort}
      type={type}
      search={search}
      className={className}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
    />
  );
};
