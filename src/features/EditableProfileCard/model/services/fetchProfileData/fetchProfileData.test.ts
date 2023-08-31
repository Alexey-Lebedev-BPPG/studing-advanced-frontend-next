import { fetchProfileData } from './fetchProfileData';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

const data = {
  age: 22,
  city: 'asd',
  country: 'Ukraine' as Country,
  currency: 'USD' as Currency,
  first: 'asd',
  lastname: 'test',
  username: 'admin',
};

describe('fetchProfileData', () => {
  test('success', async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(fetchProfileData);
    // имитируем отправку get запроса, который возвращает валидные данные
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // вызываем функцию внутри класса для создания экшена (наш thunk ничего не принимает, то ничего не прокидываем туда)
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(fetchProfileData);
    // имитируем отправку post запроса, который возвращает нам ошибку
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
