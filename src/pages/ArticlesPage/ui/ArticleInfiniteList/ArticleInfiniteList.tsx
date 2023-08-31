'use client';

import { FC } from 'react';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slice/articlesPageSlice';
import { ArticleList } from '@/entities/Article';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/deprecated/Text';

export interface IArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<IArticleInfiniteListProps> = props => {
  const { className } = props;

  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlesPageIsLoading);
  const view = useAppSelector(getArticlesPageView);
  const error = useAppSelector(getArticlesPageError);

  if (error) return <Text text='Ошибка при загрузке статей' />;

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
};
