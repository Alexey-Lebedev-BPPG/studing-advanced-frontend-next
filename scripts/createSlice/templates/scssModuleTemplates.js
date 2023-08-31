const getCamelCase = require('../helpers/stringToCamelCase');

// шаблон создания файла модулей стилей
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;

  return `.${nameToCamelCase} {
  display: block;
};`;
};
