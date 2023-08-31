import { CounterSchema } from '../types/counterSchema';
import { buildSlice } from '@/shared/lib/store';

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = buildSlice({
  initialState,
  name: 'counter',
  reducers: {
    decrement: state => {
      state.value -= 1;
    },
    increment: state => {
      state.value += 1;
    },
  },
});

export const {
  // экспортируем экшены по ум. и переприсваиваем их на новое значение
  actions: CounterActions,
  // экспортируем редьюсеры по ум. и переприсваиваем их на новое значение
  reducer: CounterReducer,
  // экспортируем хук useAction по ум. и переприсваиваем ему кастомное значение
  useActions: useCounterActions,
} = counterSlice;
