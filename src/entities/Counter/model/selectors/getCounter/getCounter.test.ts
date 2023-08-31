import { getCounter } from './getCounter';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getCounter', () => {
  test('should return counter', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      counter: { value: 10 },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
  });
});
