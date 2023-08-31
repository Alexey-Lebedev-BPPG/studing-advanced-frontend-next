import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { ScrollSaveSchema } from '@/features/ScrollSave';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';

// типизация всего стейта
export interface StateSchema {
  // articleDetailsComments?: ArticleDetailsCommentSchema;
  // articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
  addCommentForm?: AddCommentFormSchema;
  articleDetails?: ArticleDetailsSchema;
  scrollSave: ScrollSaveSchema;
  // указываем тип для редьюсера rtk запросов
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // объединим несколько редьюсеров в один. Лучше не использовать. Делается в учебных целях
  articleDetailsPage?: ArticleDetailsPageSchema;
  articlesPage?: ArticlesPageSchema;
  counter: CounterSchema;
  // Асинхронные(подгружаемые) редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  user: UserSchema;
}

// создаем тип всех ключей стейта
export type StateSchemaKey = keyof StateSchema;
// создаем отдельный тип для смонтированных редьюсеров
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

// типизация для редьюсер-менеджера
export interface ReducerManager {
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  // поле для проверки, смонтирован редьюсер или нет. Используем кастомный тип, т.к. не все редьюсеры у нас обязательны. Указанное поле НЕ ОБЯЗАТЕЛЬНО, т.к. данный функционал можно использовать из поля getReducerMap
  getMountedReducers: () => MountedReducers;
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  remove: (key: StateSchemaKey) => void;
}

// типизация для стейта, который получен с помощью редьюсер-менеджера (наследуется от стандартного типа, который появляется при создании стора в файле store.ts (21 строка))
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

// создает типизацию для экстра
export interface ThunkExtraArg {
  api: AxiosInstance;
  // navigate?: (to: To, option?: NavigateOptions) => void;
}

// делаем тип для конфигураций thunk-ов (причем тип ошибочной функции будем определять извне)
export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  rejectValue: T;
  // добавляем типы для стейта общего
  state: StateSchema;
}
