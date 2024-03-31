import axios from 'axios';

export const errorHandlerForThunk = <T>(
  error: unknown,
  rejectWithValue: (value: T) => any,
  unknownError: T,
) => {
  if (axios.isAxiosError(error)) {
    const customError = error.response as IResponse<T>;
    return rejectWithValue(customError.data);
  }
  console.log('error in thunk', error);
  return rejectWithValue(unknownError);
};
