// import axios from 'axios';
// import { getAllSession } from '../lib/session/getAllSession';
// import { forLocalStorage } from '../lib/store';
// import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

// const userKey = getAllSession();

// создаем экземпляр аксиоса
// export const $api = axios.create({
//   // URL, на котором бэк (берем из глобальных переменных)
//   // baseURL: process.env?.NEXT_PUBLIC_API_URL,
//   baseURL: 'https://ulbi-example-back.vercel.app',
//   // указываем заголовок авторизации (из бэка)
//   // коментим это, т.к. при размещении на хостинге при первом заходе на сайт падают ошибки из-зп того, что до того, как мы авторизовались на сайте, у нас уже в заголовок записалась пустая строка.поэтому пишем интерцептор, чтоб при каждом запросе он переписывал заголовок
//   // headers: {
//   //   authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
//   // },
//   headers: {
//     authorization: forLocalStorage({
//       key: USER_LOCALSTORAGE_KEY,
//       method: 'get',
//     }) as string,
//   },
// });

// $api.interceptors.request.use(config => {
//   if (config.headers)
//     config.headers.Authorization =
//       // localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
//       forLocalStorage({
//         key: USER_LOCALSTORAGE_KEY,
//         method: 'get',
//       }) as string;

//   return config;
// });
export {};
