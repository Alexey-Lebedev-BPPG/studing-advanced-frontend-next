import { loginByUsername } from './loginByUsername';
import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

describe('loginByUsername', () => {
  // I СПОСОБ (БЕЗ ПЕРЕИСПОЛЬЗОВАНИЯ) (только с замоканным аксиосом)

  // // типизируем диспатч и получение стейта
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;
  // // мокаем диспатч и getState перед каждым тестом
  // beforeEach(() => {
  //   // присваиваем им просто джестовские функции
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });
  // test("success login", async () => {
  //   // данные, которые мы получать будем в рамках теста
  //   const userValue = { username: "123", id: "1" };
  //   // имитируем отправку post запроса, который возвращает валидные данные
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
  //   // вызов createAsyncThunk (функции loginByUsername) создает экшен и возвращает его
  //   const action = loginByUsername({ username: "123", password: "123" });
  //   // вызываем экшен, который принимает 3 аргумента: диспатч, getState и extra (которые нужно замокать)
  //   const result = await action(dispatch, getState, undefined);
  //   // убедимся, что в нашем loginByUsername вызвался диспатч, который там есть с данными, которые нам пришли с сервера
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //   // убедимся, что наш запрос вызвался
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   // проверяем, что у нас диспатч вызвался 3 раза (т.к. он вызывается: первый раз - при вызове экшена loginByUsername; второй раз - внутри, когда вызываем с экшеном setAuthData; третий раз - когда экшен  loginByUsername успешно выполняется (когда делаем return))
  //   expect(dispatch).toHaveBeenCalledTimes(3);
  //   // проверим, что асинкфанк отработал без ошибки
  //   expect(result.meta.requestStatus).toBe("fulfilled");
  //   // проверяем, что сервер возвращает нам ожидаемые данные
  //   expect(result.payload).toEqual(userValue);
  // });
  // test("error login", async () => {
  //   // имитируем отправку post запроса, который возвращает нам ошибку
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
  //   // вызов createAsyncThunk (функции loginByUsername) создает экшен и возвращает его
  //   const action = loginByUsername({ username: "123", password: "123" });
  //   // вызываем экшен, который принимает 3 аргумента: диспатч, getState и extra (которые нужно замокать)
  //   const result = await action(dispatch, getState, undefined);
  //   // убедимся, что наш запрос вызвался
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   // проверяем, что у нас диспатч вызвался 2 раза (т.к. не вызывается диспатч, который ретернет данные перед завершением loginByUsername)
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   // проверим, что асинкфанк отработал c ошибкой
  //   expect(result.meta.requestStatus).toBe("rejected");
  //   // проверяем, что наш payload равен ошибке
  //   expect(result.payload).toEqual("error");
  // });

  // II СПОСОБ (ПЕРЕИСПОЛЬЗУЕМ КЛАСС)

  test('success login', async () => {
    // данные, которые мы получать будем в рамках теста
    const userValue = { id: '1', username: '123' };
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(loginByUsername);
    // имитируем отправку post запроса, который возвращает валидные данные
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    // вызываем функцию внутри класса для создания экшена
    const result = await thunk.callThunk({ password: '123', username: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue),
    );
    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('error login', async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(loginByUsername);
    // имитируем отправку post запроса, который возвращает нам ошибку
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    // вызываем функцию внутри класса для создания экшена
    const result = await thunk.callThunk({ password: '123', username: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('LOGIN_ERROR');
  });
});
