import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { User, UserSchema } from '../types/UserSchema';
import { JsonSettings } from '../types/jsonSetting';
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  // используется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunk-a есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(
        saveJsonSettings.fulfilled,
        (state, { payload }: PayloadAction<JsonSettings>) => {
          // здесь обрабатываем ответ сервера
          if (state.authData) state.authData.jsonSettings = payload;
        },
      );
    builder.addCase(initAuthData.rejected, state => {
      state._inited = true;
    });
    // слайс для проверки авторизации пользователя при закрытии и открытии впоследствии вкладки
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        // когда инициировали юзера, то меняем фичи-флаг
        setFeatureFlags(payload?.features);
        // делаем true только после добавления данных
        state._inited = true;
      },
    );
  },
  initialState,
  name: 'user',
  reducers: {
    logout: state => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      // когда авторизовались, то меняем фичи-флаг
      setFeatureFlags(payload.features);
      // добавляем данные в локальное хранилище (аналог токена)
      localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
      // сохраняем в локал сторадж данные о выбранной фиче у пользователя
      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        payload.features?.isAppRedesigned ? 'new' : 'old',
      );
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
