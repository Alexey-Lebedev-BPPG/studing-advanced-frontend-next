import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleEditPage } from '../services/fetchArticleEditPage/fetchArticleEditPage';
import { ArticleEditPageSchema } from '../types/articleEditPage';

const initialState: ArticleEditPageSchema = {
  isLoading: false,
};

export const articleEditPageSlice = createSlice({
  // исgользуется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticleEditPage.pending, state => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleEditPage.fulfilled,
        (state, action: PayloadAction<any>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchArticleEditPage.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },

  initialState,

  name: 'articleEditPage',

  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const { actions: articleEditPageActions } = articleEditPageSlice;
export const { reducer: articleEditPageReducer } = articleEditPageSlice;
