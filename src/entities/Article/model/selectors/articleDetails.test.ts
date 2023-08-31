import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
  getArticleDetailsError,
} from './articleDetails';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('articleDetails', () => {
  test('should return data', () => {
    const data = {
      id: '1',
      title: 'lorem',
    };
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { isLoading: true },
    };
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { error: 'error' },
    };
    expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
  });
});
