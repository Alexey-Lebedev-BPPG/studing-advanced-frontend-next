import axios from 'axios';
// import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

// создаем экземпляр аксиоса
export const $api = axios.create({
  // URL, на котором бэк (берем из глобальных переменных)
  // baseURL: process.env?.NEXT_PUBLIC_API_URL,
  baseURL: 'https://ulbi-example-back.vercel.app',
  // указываем заголовок авторизации (из бэка)
  // коментим это, т.к. при размещении на хостинге при первом заходе на сайт падают ошибки из-зп того, что до того, как мы авторизовались на сайте, у нас уже в заголовок записалась пустая строка.поэтому пишем интерцептор, чтоб при каждом запросе он переписывал заголовок
  // headers: {
  //   authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  // },
});

$api.interceptors.request.use(config => {
  if (config.headers)
    config.headers.Authorization =
      // localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
      '';

  return config;
});
