import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';

interface IArticleEditPageProps {}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта
// thunkAPI, в котором есть методы для использования в thunk-e
export const fetchArticleEditPage = createAsyncThunk<
  IArticleEditPageProps,
  void,
  ThunkConfig<string>
>('articleEditPage/fetchArticleEditPage', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<any>('/***', {});
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue('ERROR');
  }
});
