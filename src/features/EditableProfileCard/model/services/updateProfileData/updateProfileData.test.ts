import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../consts/consts';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

const data = {
  age: 22,
  city: 'asd',
  country: 'Ukraine' as Country,
  currency: 'USD' as Currency,
  first: 'asd',
  id: '1',
  lastname: 'test',
  username: 'admin',
};

describe('updateProfileData', () => {
  test('success', async () => {
    // передаем наш thunk в наш класс и прокидываем инишиал стейт
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });
    // имитируем отправку put запроса, который возвращает валидные данные
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    // вызываем функцию внутри класса для создания экшена (ничего не прокидываем туда, т.к. наш thunk ничего не принимает)
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('server error', async () => {
    // передаем наш thunk в наш класс и прокидываем инишиал стейт
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });
    // имитируем отправку put запроса, который возвращает нам ошибку
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test('validate error', async () => {
    // передаем наш thunk в наш класс и прокидываем инишиал стейт
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: { ...data, lastname: '' } },
    });
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
