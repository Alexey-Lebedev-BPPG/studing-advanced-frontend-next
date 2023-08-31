import { getUserAuthData } from './getUserAuthData';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getUserAuthData', () => {
  test('should return data', () => {
    const data = {
      id: '1',
      username: 'test',
    };
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: data },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getUserAuthData(state as StateSchema)).toEqual(data);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };
    expect(getUserAuthData(state as StateSchema)).toBeUndefined();
  });
});
