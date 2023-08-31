import { createAsyncThunk } from '@reduxjs/toolkit';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getEditableProfileCard';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта thunkAPI, в котором есть методы для использования в thunk-e
export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  // получаем стейт, что потом вызывать селекторы, в которые прокидываются стейт
  const { extra, getState, rejectWithValue } = thunkApi;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);
  if (errors.length) return rejectWithValue(errors);

  try {
    const response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData,
    );

    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    // чтоб не показывался консоль при тестах
    // process.env?.NEXT_PUBLIC_PROJECT !== 'jest' && console.log(error);
    console.log(error);
    // для обработки ошибок
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
