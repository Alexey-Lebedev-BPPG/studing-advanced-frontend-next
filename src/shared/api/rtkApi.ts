import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { forLocalStorage } from '../lib/store';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const rtkApi = createApi({
  baseQuery: fetchBaseQuery({
    // указываем базовый урл
    // baseUrl: process.env?.NEXT_PUBLIC_API_URL,
    baseUrl: 'https://ulbi-example-back.vercel.app',
    // добавляем заголовки в каждый запрос
    prepareHeaders: headers => {
      // const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
      const token = forLocalStorage({
        key: USER_LOCALSTORAGE_KEY,
        method: 'get',
      });
      if (token) headers.set('Authorization', token);

      return headers;
    },
  }),

  // указываем пустые ендпоинты, чтоб потом их при вызове rtkApi указывать динамически с помощью injectEndpoints
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: builder => ({}),

  // указываем редьюсер, в котором будут отображаться все данные rtk запрос(в редаксе)
  reducerPath: 'api',
});

const testing: DeepPartial<{ test: string }> = {};
