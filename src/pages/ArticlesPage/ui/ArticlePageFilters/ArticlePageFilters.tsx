'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticlePageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

export interface IArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters: FC<IArticlePageFiltersProps> = props => {
  const { className } = props;

  const { t } = useTranslation();

  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view,
  } = useArticleFilters();

  return (
    <div className={classNames(cls.articlePageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          value={search}
          placeholder={`${t('Поиск')}`}
          onChange={onChangeSearch}
        />
      </Card>
      <ArticleTypeTabs
        selectedValue={type}
        className={cls.tabsWrapper}
        onChangeType={onChangeType}
      />
    </div>
  );
};
