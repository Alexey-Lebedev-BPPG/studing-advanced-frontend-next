import { Notification } from '../model/types/notification';
import { rtkApi } from '@/shared/api/rtkApi';

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const notificationApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // указываем название эндпоинта + указываем в дженерике первым аргументом, что запрос будет возвращать,
    // и во стором, что  за аргументы
    getNotification: build.query<Notification[], null>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: () => ({
        // здесь есть все поля как в стандартных запросах
        // указываем урл
        url: '/notifications',
      }),
    }),
    // пример запроса на создание (через mutation)
    // createNotification: build.mutation({
    //   // колбэк принимает какие-то аргументы для передачи на сервер
    //   query: (params) => ({
    //     // здесь есть все поля как в стандартных запросах
    //     // указываем урл
    //     url: '/***',
    //     // указываем параметры
    //     params: {
    //       ...params,
    //     },
    //     method: 'POST',
    //   }),
    // }),
  }),
});

// создаем хук, в который помещаем данные из запроса
export const useNotification = notificationApi.useGetNotificationQuery;

// пример запроса на создание (через mutation)
// export const useCreateNotification =
//   notificationApi.useCreateNotificationMutation;
