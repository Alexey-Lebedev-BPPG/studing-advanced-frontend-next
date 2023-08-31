import { CounterReducer, CounterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
  test('decrement', () => {
    // используем не глобальный стейт, а определенное его значение
    const state: CounterSchema = { value: 10 };

    expect(CounterReducer(state, CounterActions.decrement())).toEqual({
      value: 9,
    });
  });

  test('increment', () => {
    // используем не глобальный стейт, а определенное его значение
    const state: CounterSchema = { value: 10 };

    expect(CounterReducer(state, CounterActions.increment())).toEqual({
      value: 11,
    });
  });

  test('should work with empty state', () => {
    // проверяем с пустым стейтом
    expect(CounterReducer(undefined, CounterActions.increment())).toEqual({
      value: 1,
    });
  });
});
