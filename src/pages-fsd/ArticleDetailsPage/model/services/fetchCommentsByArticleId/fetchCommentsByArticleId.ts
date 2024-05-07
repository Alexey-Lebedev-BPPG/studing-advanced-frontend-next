import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    if (!articleId) return rejectWithValue('ARTICLE_ERROR');

    const response = await extra.api.get<Comment[]>('/comments', {
      params: {
        // чтоб получить полную сущность пользователя
        _expand: 'user',
        articleId,
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    // для обработки ошибок
    return rejectWithValue('ARTICLE_ERROR');
  }
});
