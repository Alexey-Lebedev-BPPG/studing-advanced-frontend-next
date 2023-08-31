const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла тестов thun-ков в папке services
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { fetch${nameToPascalCase} } from './fetch${nameToPascalCase}';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

const data = {};

describe('fetch${nameToPascalCase}', () => {
  test('success', async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(fetch${nameToPascalCase});
    // имитируем отправку get запроса, который возвращает валидные данные
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // вызываем функцию внутри класса для создания экшена (наш thunk ничего не принимает, то ничего не прокидываем туда)
    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    // передаем наш thunk в наш класс
    const thunk = new TestAsyncThunk(fetch${nameToPascalCase});
    // имитируем отправку get запроса, который возвращает ошибку
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    // вызываем функцию внутри класса для создания экшена (наш thunk ничего не принимает, то ничего не прокидываем туда)
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
`;
};
