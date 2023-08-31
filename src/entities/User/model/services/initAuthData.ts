import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/UserSchema';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
// import {
//   LOCAL_STORAGE_LAST_DESIGN_KEY,
//   USER_LOCALSTORAGE_KEY,
// } from '@/shared/const/localStorage';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunk-e
export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    // const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    const userId = '1';

    if (!userId) return rejectWithValue('USERIDERROR');

    try {
      // отправляем запрос, минуя хуки и при этом разворачиваем ответ из промиса с помощью
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      // сохраняем в локал сторадж данные о выбранной фиче у пользователя
      // localStorage.setItem(
      //   LOCAL_STORAGE_LAST_DESIGN_KEY,
      //   response.features?.isAppRedesigned ? 'new' : 'old',
      // );

      return response;
    } catch (error) {
      // чтоб не показывался консоль при тестах
      // process.env?.NEXT_PUBLIC_PROJECT !== 'jest' && console.log(error);
      console.log(error);
      // для обработки ошибок
      return rejectWithValue(i18next.t('JSONSETTINGS_ERROR'));
    }
  },
);
