import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { Article } from '@/entities/Article';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>('articlesDetailsPage/fetchArticleRecommendations', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      // передаем параметры согласно документации jsonplaceholder
      params: {
        // чтоб получить полную сущность пользователя
        _expand: 'user',
        _limit: 4,
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    // для обработки ошибок
    return rejectWithValue('ARTICLE_ERROR');
  }
});
