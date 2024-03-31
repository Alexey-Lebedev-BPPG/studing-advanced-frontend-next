import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import cls from './articleFilters.module.scss';
import { ArticleSortFields, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

export interface IArticleFiltersProps {
  className?: string;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSearch: (type: string) => void;
  onChangeSort: (newSort: ArticleSortFields) => void;
  onChangeType: (type: ArticleType) => void;
  order: SortOrder;
  search: string;
  sort: ArticleSortFields;
  type: ArticleType;
}

export const ArticleFilters: FC<IArticleFiltersProps> = memo(props => {
  const {
    className,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type,
  } = props;

  const t = useTranslations();

  return (
    <Card
      className={classNames(cls['article-filters'], {}, [className])}
      padding='24'
    >
      <VStack gap='32'>
        <Input
          value={search}
          placeholder={`${t('Поиск')}`}
          addonLeft={<Icon Svg={SearchIcon} />}
          size='s'
          onChange={onChangeSearch}
        />
        <ArticleTypeTabs selectedValue={type} onChangeType={onChangeType} />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
