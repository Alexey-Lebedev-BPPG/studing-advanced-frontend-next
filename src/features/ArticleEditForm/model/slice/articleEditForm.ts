import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleEditForm } from '../services/fetchArticleEditForm/fetchArticleEditForm';
import { ArticleEditFormSchema } from '../types/articleEditForm';

const initialState: ArticleEditFormSchema = {
  isLoading: false,
};

export const articleEditFormSlice = createSlice({
  // исgользуется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunka есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticleEditForm.pending, state => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleEditForm.fulfilled,
        (state, action: PayloadAction<any>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchArticleEditForm.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },

  initialState,

  name: 'articleEditForm',

  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const { actions: articleEditFormActions } = articleEditFormSlice;
export const { reducer: articleEditFormReducer } = articleEditFormSlice;
