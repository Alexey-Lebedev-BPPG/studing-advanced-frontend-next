import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentSchema } from '../types/articleDetailsCommentSchema';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

// делаем через подход нормализации данных в redux toolkit (https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions)

// старая реализация
// const commentsAdapter = createEntityAdapter<Comment>({
//   // функция получения айдишника
//   selectId: comment => comment.id,
// });
// новая реализация
const commentsAdapter = createEntityAdapter<Comment>();

// создаем селектор, чтоб доставать наши комментарии из стейта или возвращает дефолтное состояние
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  state =>
    state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  // используется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunk-a есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchCommentsByArticleId.pending, state => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          // заменяем данные. полученные из запроса, в адаптере
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunka при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },

  // расширяем инишиал стейт нашими полями
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
    entities: {},
    error: undefined,
    ids: [],
    isLoading: false,
  }),

  name: 'articleDetailsCommentSlice',

  reducers: {},
});

export const { actions: articleDetailsCommentActions } =
  articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentReducer } =
  articleDetailsCommentsSlice;
