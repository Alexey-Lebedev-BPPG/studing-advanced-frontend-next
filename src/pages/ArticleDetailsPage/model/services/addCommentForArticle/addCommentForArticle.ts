import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта
// thunkAPI, в котором есть методы для использования в thunke
export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
  const { dispatch, extra, getState, rejectWithValue } = thunkApi;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article)
    return rejectWithValue(i18next.t('ERROR'));

  try {
    const response = await extra.api.post<Comment>('/comments', {
      articleId: article.id,
      text,
      userId: userData.id,
    });
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    dispatch(fetchCommentsByArticleId(article.id));

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t('ERROR'));
  }
});
