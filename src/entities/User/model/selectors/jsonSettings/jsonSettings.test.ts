import { getJsonSettings } from './jsonSettings';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getJsonSettings', () => {
  test('should return data', () => {
    const data = {
      isArticlePageWasOpened: false,
      isFirstVisit: true,
    };
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { jsonSettings: data } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getJsonSettings(state as StateSchema)).toEqual(data);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };
    expect(getJsonSettings(state as StateSchema)).toEqual({});
  });
});
