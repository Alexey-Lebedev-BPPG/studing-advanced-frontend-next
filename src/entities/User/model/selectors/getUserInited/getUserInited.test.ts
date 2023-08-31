import { getUserInited } from './getUserInited';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getUserInited', () => {
  test('should return true', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { _inited: true },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getUserInited(state as StateSchema)).toBe(true);
  });

  test('should return false', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { _inited: false },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getUserInited(state as StateSchema)).toBe(false);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };
    expect(getUserInited(state as StateSchema)).toBeUndefined();
  });
});
