import { fetchNextArticlePage } from './fetchNextArticlePage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlePage', () => {
  test('success', async () => {
    // передаем наш thunk в наш класс и вторым аргументом передаем инишиал стейт
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        entities: {},
        hasMore: true,
        ids: [],
        isLoading: false,
        limit: 5,
        page: 2,
      },
    });
    // вызываем функцию внутри класса для создания экшена (наш thunk ничего не принимает, то ничего не прокидываем туда)
    await thunk.callThunk();

    // проверяем, что диспатч вызвался 4 раза
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    // проверяем, что наша функция была вызвана с определенными параметрами
    expect(fetchArticlesList).toHaveBeenCalled();
  });

  test('fetchArticlesList not called', async () => {
    // передаем наш thunk в наш класс и вторым аргументом передаем инишиал стейт
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        entities: {},
        hasMore: false,
        ids: [],
        isLoading: false,
        limit: 5,
        page: 2,
      },
    });
    // вызываем функцию внутри класса для создания экшена (наш thunk ничего не принимает, то ничего не прокидываем туда)
    await thunk.callThunk();

    // проверяем, что диспатч вызвался 4 раза
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    // проверяем, что наша функция не была вызвана
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });

  test('fetchArticlesList not called', async () => {
    // передаем наш thunk в наш класс и вторым аргументом передаем инишиал стейт
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        entities: {},
        hasMore: true,
        ids: [],
        isLoading: true,
        limit: 5,
        page: 2,
      },
    });
    // вызываем функцию внутри класса для создания экшена (наш thunk ничего не принимает, то ничего не прокидываем туда)
    await thunk.callThunk();

    // проверяем, что диспатч вызвался 4 раза
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    // проверяем, что наша функция не была вызвана
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
