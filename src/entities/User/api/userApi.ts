import { User } from '../model/types/UserSchema';
import { JsonSettings } from '../model/types/jsonSetting';
import { rtkApi } from '@/shared/api/rtkApi';

interface SetJsonSettingsArgs {
  jsonSettings: JsonSettings;
  userId: string;
}

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getUserDataById: build.query<User, string>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: userId => ({
        // здесь есть все поля как в стандартных запросах
        // указываем параметры
        method: 'GET',
        // указываем урл
        url: `/users/${userId}`,
      }),
    }),
    saveJsonSettings: build.mutation<User, SetJsonSettingsArgs>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: ({ jsonSettings, userId }) => ({
        // здесь есть все поля как в стандартных запросах
        // указываем параметры
        body: { jsonSettings },
        method: 'PATCH',
        // указываем урл
        url: `/users/${userId}`,
      }),
    }),
  }),
});

// также в редаксе есть возможность отправлять запросы без хуков. для этого достаем метод initiate, чтоб его потом использовать в thunk-е
export const setJsonSettingsMutation =
  userApi.endpoints.saveJsonSettings.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;

// StartQueryActionCreator<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, never, NewLocation, "rtkApi">>
