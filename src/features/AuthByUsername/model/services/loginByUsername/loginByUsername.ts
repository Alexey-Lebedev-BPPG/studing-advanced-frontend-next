import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
  password: string;
  username: string;
}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunk-e
export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async ({ password, username }, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<User>('/login', {
      password,
      username,
    });
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    // с помощью апи thunk вызываем диспатч с экшеном слайса
    dispatch(userActions.setAuthData(response.data));

    // можем сделать переход после авторизации
    // extra.navigate("/about");

    return response.data;
  } catch (error) {
    // чтоб не показывался консоль при тестах
    process.env.NEXT_PUBLIC_PROJECT !== 'jest' && console.log(error);
    // для обработки ошибок
    return rejectWithValue('LOGIN_ERROR');
  }
});
