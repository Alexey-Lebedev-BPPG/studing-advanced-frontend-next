const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла тестов для слайсов редакса
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { ${nameToCamelCase}Actions, ${nameToCamelCase}Reducer } from './${nameToCamelCase}';
import { fetch${nameToPascalCase} } from '../services/fetch${nameToPascalCase}';
import { ${nameToPascalCase}Schema } from '../types/${nameToCamelCase}';

const data = {};

describe('${nameToCamelCase}Slice', () => {
  test('', () => {
    const state: DeepPartial<${nameToPascalCase}Schema> = {};
    expect(
      ${nameToCamelCase}Reducer(state as ${nameToPascalCase}Schema, ${nameToCamelCase}Actions.set(true)),
    ).toEqual({});
  });

  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test('test ${nameToCamelCase} service pending', () => {
    const state: DeepPartial<${nameToPascalCase}Schema> = {
      error: 'error',
      isLoading: false,
    };
    expect(
      ${nameToCamelCase}Reducer(state as ${nameToPascalCase}Schema, fetch${nameToPascalCase}.pending),
    ).toEqual({
      error: undefined,
      isLoading: true,
    });
  });

  // далее тестируем fulfilled состояние
  test('test ${nameToCamelCase} service fulfilled', () => {
    const state: DeepPartial<${nameToPascalCase}Schema> = {
      error: 'error',
      isLoading: true,
    };
    expect(
      ${nameToCamelCase}Reducer(
        state as ${nameToPascalCase}Schema,
        // передаем данные профиля в наш экшен
        fetch${nameToPascalCase}.fulfilled(data, '')
      ),
    ).toEqual({
      data,
      error: undefined,
      isLoading: false,
    });
  });
});
`;
};
