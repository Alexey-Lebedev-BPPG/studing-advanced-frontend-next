import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

const apiUrl =
  process.env.NEXT_PUBLIC_APP_ENV === 'local' ||
  process.env.NEXT_PUBLIC_APP_ENV === 'dev'
    ? 'http://localhost:8000'
    : process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  // указываем базовый урл
  baseUrl: apiUrl,
  // don't need for others api, but need for auth
  // credentials: 'include',
  credentials: 'same-origin',
  // добавляем заголовки в каждый запрос
  prepareHeaders: (headers, api) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json, text/plain, */*');

    // тоб добавить язык в хедер каждого запроса
    // addLanguageHeaderExceptWhiteListForRTK(headers, api);

    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    if (token) headers.set('Authorization', token);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const { dispatch } = api;
  if (result.error?.status === 401) {
    const typeConnect = localStorage.getItem('typeConnect');
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.clear();
    await baseQuery('auth/exit', api, extraOptions);
    localStorage.setItem('typeConnect', typeConnect || '');
  }
  return result;
};

export const rtkApi = createApi({
  baseQuery: baseQueryWithReauth,
  // указываем пустые ендпоинты, чтоб потом их при вызове rtkApi указывать динамически с помощью injectEndpoints
  endpoints: builder => ({}),
  // указываем редьюсер, в котором будут отображаться все данные rtk запрос(в редаксе)
  reducerPath: 'rtkApi',
});
