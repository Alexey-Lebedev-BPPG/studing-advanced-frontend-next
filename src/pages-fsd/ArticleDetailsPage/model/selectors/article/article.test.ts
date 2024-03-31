import { getCanEditArticle } from './article';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getAddCommentForm', () => {
  const dataArticleDetails = { user: { id: '1', title: 'lorem' } };
  const dataAuthData = { id: '1', username: 'test' };

  test('should return data', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data: dataArticleDetails },
      user: { authData: dataAuthData },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getCanEditArticle(state as StateSchema)).toBe(true);
  });

  test('should return false', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data: { user: { id: '2' } } },
      user: { authData: dataAuthData },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getCanEditArticle(state as StateSchema)).toBe(false);
  });

  test('should return false', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      articleDetails: {},
      user: { authData: dataAuthData },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getCanEditArticle(state as StateSchema)).toBe(false);
  });

  test('should return false', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data: dataArticleDetails },
      user: {},
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getCanEditArticle(state as StateSchema)).toBe(false);
  });
});
