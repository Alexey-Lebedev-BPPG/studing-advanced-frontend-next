import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { ArticleSortFields, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

// для подгрузки не первой порции данных, а уже последующих

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const { dispatch, getState } = thunkApi;

  const inited = getArticlesPageInited(getState());

  // проверяем переменную, чтоб сработал инит стейт только один раз при загрузке компонента
  if (!inited) {
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortFields;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleType;

    if (orderFromUrl) dispatch(articlesPageActions.setOrder(orderFromUrl));
    if (sortFromUrl) dispatch(articlesPageActions.setSort(sortFromUrl));
    if (searchFromUrl) dispatch(articlesPageActions.setSearch(searchFromUrl));
    if (typeFromUrl) dispatch(articlesPageActions.setType(typeFromUrl));

    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
