const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла тестов для селекторов
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { get${nameToPascalCase}IsLoading } from './get${nameToPascalCase}';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('get${nameToPascalCase}', () => {
  test('', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(get${nameToPascalCase}IsLoading(state as StateSchema)).toEqual({});
  });
});
`;
};
