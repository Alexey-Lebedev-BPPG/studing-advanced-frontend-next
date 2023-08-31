import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  features: Partial<FeatureFlags>;
  userId: string;
}

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: ({ features, userId }) => ({
        // здесь есть все поля как в стандартных запросах
        // указываем параметры
        body: { features },
        method: 'PATCH',
        // указываем урл
        url: `/users/${userId}`,
      }),
    }),
  }),
});

// также в редаксе есть возможность отправлять запросы без хуков. для этого достаем метод initiate, чтоб его потом использовать в thunk-е
export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlags.initiate;
