import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
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

export const ArticlePageFilters: FC<IArticlePageFiltersProps> = memo(props => {
  const { className } = props;

  const t = useTranslations();

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
    <div className={classNames(cls['article-page-filters'], {}, [className])}>
      <div className={cls['sort-wrapper']}>
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
        className={cls['tabs-wrapper']}
        onChangeType={onChangeType}
      />
    </div>
  );
});
