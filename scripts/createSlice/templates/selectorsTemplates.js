const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла selectors
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const get${nameToPascalCase}IsLoading = (state: StateSchema) => state;
`;
};
