import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';

interface IArticleEditFormProps {}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта
// thunkAPI, в котором есть методы для использования в thunk-e
export const fetchArticleEditForm = createAsyncThunk<
  any,
  IArticleEditFormProps,
  ThunkConfig<string>
>('***/articleEditForm', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<any>('/***', {});
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t('ERROR'));
  }
});
