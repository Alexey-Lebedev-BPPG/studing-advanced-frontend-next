import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';
import urls from '@/shared/const/urls';
import { NewLocation } from '@/shared/types/langTypes';

export const getGeolocation = createAsyncThunk<
  NewLocation,
  string,
  ThunkConfig<string>
>('user/getGeolocation', async (locationToken, thunkApi) => {
  const { dispatch, extra, getState, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<NewLocation>(
      urls.location(locationToken),
    );

    if (!response.data) throw new Error('error get location');

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('ERROR');
  }
});
