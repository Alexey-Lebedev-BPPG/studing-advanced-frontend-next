import { createAsyncThunk } from '@reduxjs/toolkit';
import { setJsonSettingsMutation } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings/jsonSettings';
import { JsonSettings } from '../types/jsonSetting';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunk-e
export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
  const { dispatch, getState, rejectWithValue } = thunkApi;
  // получаем данные пользователя из редакса
  const userData = getUserAuthData(getState());
  // достаем текущие настройки из редакса
  const currentJsonSettings = getJsonSettings(getState());

  if (!userData) return rejectWithValue('JSONSETTING');

  try {
    // отправляем запрос, минуя хуки и при этом разворачиваем ответ из промиса с помощью
    const response = await dispatch(
      setJsonSettingsMutation({
        jsonSettings: { ...currentJsonSettings, ...newJsonSettings },
        userId: userData.id,
      }),
    ).unwrap();

    if (!response.jsonSettings) return rejectWithValue('JSONSETTING');

    return response.jsonSettings;
  } catch (error) {
    // чтоб не показывался консоль при тестах
    process.env.NEXT_PUBLIC_PROJECT !== 'jest' && console.log(error);
    // для обработки ошибок
    return rejectWithValue('JSONSETTINGS_ERROR');
  }
});
