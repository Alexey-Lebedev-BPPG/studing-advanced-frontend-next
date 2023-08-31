import { getCounterValue } from './getCounterValue';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getCounterValue', () => {
  test('should return counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: { value: 10 },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getCounterValue(state as StateSchema)).toEqual(10);
  });
});
