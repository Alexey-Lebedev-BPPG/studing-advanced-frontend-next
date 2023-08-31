const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла readmi
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `## Feature ${nameToPascalCase} is for ...
`;
};
