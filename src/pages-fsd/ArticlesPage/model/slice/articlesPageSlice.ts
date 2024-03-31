import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';
import {
  Article,
  ArticleSortFields,
  ArticleType,
  ArticleView,
} from '@/entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { SortOrder } from '@/shared/types/sort';

// делаем через подход нормализации данных в redux toolkit (https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions)

// старая реализация
// const articlesAdapter = createEntityAdapter<Article>({
//   // функция получения айдишника
//   selectId: (article: Article) => article.id,
// });
// новая реализация
const articlesAdapter = createEntityAdapter<Article>();

// создаем селектор, чтоб доставать наши комментарии из стейта или возвращает дефолтное состояние
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  state => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  // используется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunk-a есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetchArticlesList.pending, (state, action) => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
        // если у нас есть флаг реплейс, то зачищаем массив данных
        if (action.meta.arg.replace) articlesAdapter.removeAll(state);
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        // здесь обрабатываем ответ сервера
        state.isLoading = false;
        // если у нас есть флаг реплейса, то заменяем все новыми данными
        if (action.meta.arg.replace)
          articlesAdapter.setAll(state, action.payload);
        // если у нас нет флага реплейса, то будем использовать addMany, чтоб добавлять данные в конец
        else articlesAdapter.addMany(state, action.payload);

        // если нам с бека придет массив длина которого больше лимита, то мы знаем, что данные еще прилетят
        state.hasMore = action.payload.length >= state.limit;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunk-a при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },

  // расширяем инишиал стейт нашими полями
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    _inited: false,
    entities: {},
    error: undefined,
    hasMore: true,
    ids: [],
    isLoading: false,
    limit: 9,
    order: 'asc',
    page: 1,
    search: '',
    sort: 'createdAt',
    type: 'ALL',
    view: 'SMALL',
  }),

  name: 'articlesPageSlice',

  reducers: {
    initState: state => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView;
      state.view = view;
      state.limit = view === 'BIG' ? 4 : 9;
      state._inited = true;
    },
    setOrder: (state, { payload }: PayloadAction<SortOrder>) => {
      state.order = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setSort: (state, { payload }: PayloadAction<ArticleSortFields>) => {
      state.sort = payload;
    },
    setType: (state, { payload }: PayloadAction<ArticleType>) => {
      state.type = payload;
    },
    setView: (state, { payload }: PayloadAction<ArticleView>) => {
      state.view = payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, payload);
    },
  },
});

export const { actions: articlesPageActions, reducer: articlesPageReducer } =
  articlesPageSlice;
