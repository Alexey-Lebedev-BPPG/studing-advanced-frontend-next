const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла publicApi
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `export { ${nameToPascalCase}Async as ${nameToPascalCase} } from './ui/${nameToPascalCase}.async';
export type { ${nameToPascalCase}Schema } from './model/types/${nameToCamelCase}';
`;
};
