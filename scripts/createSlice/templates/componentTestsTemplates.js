const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла тестов для компонентов
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { ${nameToPascalCase} } from './${nameToPascalCase}';

describe('${nameToPascalCase}', () => {
  test('', () => {
    expect({}).toEqual({});
  });
});
`;
};
