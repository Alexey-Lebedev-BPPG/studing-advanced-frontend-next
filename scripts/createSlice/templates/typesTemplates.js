const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла типов
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `export interface ${nameToPascalCase}Schema {
  data?: any;
  error?: string;
  isLoading: boolean;
}
`;
};
