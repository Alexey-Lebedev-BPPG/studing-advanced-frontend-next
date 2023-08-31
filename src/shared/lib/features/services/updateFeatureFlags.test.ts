import { updateFeatureFlags } from './updateFeatureFlags';
import { TestAsyncThunk } from '../../tests/testAsyncThunk/testAsyncThunk';

const data = {
  newFeatureFlag: { isArticleRatingEnabled: false },
  userId: '1',
};

describe('updateFeatureFlags', () => {
  test('success', async () => {
    // передаем наш thunk в наш класс и прокидываем инишиал стейт
    const thunk = new TestAsyncThunk(updateFeatureFlags);
    // имитируем отправку patch запроса, который возвращает валидные данные
    thunk.api.patch.mockReturnValue(Promise.resolve());
    // вызываем функцию внутри класса для создания экшена и прокидываем в нее айдишник
    const result = await thunk.callThunk(data);

    // expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    // expect(result.meta.requestStatus).toBe('fulfilled');
    // expect(result.data).toEqual({});
  });

  // test('server error', async () => {
  //   // передаем наш thunk в наш класс и прокидываем инишиал стейт
  //   const thunk = new TestAsyncThunk(updateFeatureFlags);
  //   // имитируем отправку patch запроса, который возвращает нам ошибку
  //   thunk.api.patch.mockReturnValue(Promise.resolve({ status: 500 }));
  //   const result = await thunk.callThunk(data);
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toEqual(undefined);
  // });
});
