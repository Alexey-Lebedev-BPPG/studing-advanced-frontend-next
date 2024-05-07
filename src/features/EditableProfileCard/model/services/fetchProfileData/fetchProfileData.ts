import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunke
export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
  // если колбек ничего не принимает, то прокидываем первым аргументом _
  // >("profile/fetchProfileData", async (_, thunkApi) => {
>('profile/fetchProfileData', async (profileId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Profile>(`/profile/${profileId}`);

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    process.env.NEXT_PUBLIC_PROJECT !== 'jest' && console.log(error);
    // для обработки ошибок
    return rejectWithValue('LOGIN_ERROR');
  }
});
