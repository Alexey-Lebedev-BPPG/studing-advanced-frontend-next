import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  // поле для удаления значений из массива
  replace?: boolean;
}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunk-e
export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, getState, rejectWithValue } = thunkApi;

  const limit = getArticlesPageLimit(getState());
  const page = getArticlesPageNum(getState());
  const order = getArticlesPageOrder(getState());
  const sort = getArticlesPageSort(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  try {
    // добавляем параметры в строку урл
    addQueryParams({ order, search, sort, type });
    const response = await extra.api.get<Article[]>('/articles', {
      // передаем параметры согласно документации jsonplaceholder
      params: {
        // чтоб получить полную сущность пользователя
        _expand: 'user',
        _limit: limit,
        _order: order,
        _page: page,
        _sort: sort,
        q: search,
        type: type === 'ALL' ? undefined : type,
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    // для обработки ошибок
    return rejectWithValue('ARTICLE_ERROR');
  }
});
