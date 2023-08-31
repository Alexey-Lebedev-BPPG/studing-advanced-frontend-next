'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';

interface IArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<IArticlesPageProps> = props => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  // получаем конкретную запись, использовав возможность прокидывания аргументов (пример использования хука селектора с аргументами)
  // const articleItem = useArticleItemById('2');

  const onLoadNextPart = useCallback(
    () => dispatch(fetchNextArticlePage()),
    [dispatch],
  );

  useInitialEffect(() => {
    // достаем параметры из урл и прокидываем в сброс
    searchParams && dispatch(initArticlesPage(searchParams));
  });

  const content = (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <Page
          data-testid='ArticlesPage'
          className={classNames(cls.articlesPage, {}, [className])}
          onScrollEnd={onLoadNextPart}
        >
          <ArticlePageFilters />
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
      on={
        <StickyLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <Page
              data-testid='ArticlesPage'
              className={classNames(cls.articlesPageRedesigned, {}, [
                className,
              ])}
              onScrollEnd={onLoadNextPart}
            >
              <ArticleInfiniteList className={cls.list} />
              <ArticlePageGreeting />
            </Page>
          }
        />
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
