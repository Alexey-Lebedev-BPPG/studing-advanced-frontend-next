import { useCallback } from 'react';
import {
  getArticlesPageView,
  getArticlesPageOrder,
  getArticlesPageSort,
  getArticlesPageSearch,
  getArticlesPageType,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import {
  ArticleView,
  ArticleSortFields,
  ArticleType,
} from '@/entities/Article';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';

export const useArticleFilters = () => {
  const dispatch = useAppDispatch();

  const view = useAppSelector(getArticlesPageView);
  const order = useAppSelector(getArticlesPageOrder);
  const sort = useAppSelector(getArticlesPageSort);
  const search = useAppSelector(getArticlesPageSearch);
  const type = useAppSelector(getArticlesPageType);

  const fetchData = useCallback(
    () => dispatch(fetchArticlesList({ replace: true })),
    [dispatch],
  );

  const debounceFetchData = useDebounce(fetchData);

  const onChangeView = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesPageActions.setView(newView));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );
  const onChangeSort = useCallback(
    (newSort: ArticleSortFields) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );
  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );
  const onChangeSearch = useCallback(
    (newSearch: string) => {
      dispatch(articlesPageActions.setSearch(newSearch));
      dispatch(articlesPageActions.setPage(1));
      debounceFetchData();
    },
    [dispatch, debounceFetchData],
  );
  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
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
  };
};
