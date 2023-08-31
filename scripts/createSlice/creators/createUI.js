const fs = require('fs/promises');
const resolveRoot = require('../helpers/resolveRoot');
const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');
const componentAsyncTemplates = require('../templates/componentAsyncTemplates');
const componentTemplate = require('../templates/componentTemplate');
const componentTestsTemplates = require('../templates/componentTestsTemplates');
const readmiTemplates = require('../templates/readmiTemplates');
const scssModuleTemplates = require('../templates/scssModuleTemplates');
const storybookTemplates = require('../templates/storybookTemplates');

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'ui', ...segments);

  // создаем папку ui
  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log('Не удалось создать UI директорию', e);
    }
  };

  // создаем файлы по шаблонам
  const createComponent = async () => {
    const nameToCamelCase = `${getCamelCase(sliceName)}`;
    const nameToPascalCase = `${getPascalCase(sliceName)}`;

    try {
      // создаем файл компонента
      await fs.writeFile(
        resolveUIPath(`${nameToPascalCase}.tsx`),
        componentTemplate(sliceName),
      );
      // создаем файл тестов компонента
      await fs.writeFile(
        resolveUIPath(`${nameToCamelCase}.test.tsx`),
        componentTestsTemplates(sliceName),
      );
      // создаем файл асинхронной подгрузки компонента
      await fs.writeFile(
        resolveUIPath(`${nameToPascalCase}.async.tsx`),
        componentAsyncTemplates(sliceName),
      );
      // создаем файл стилей
      await fs.writeFile(
        resolveUIPath(`${nameToPascalCase}.module.scss`),
        scssModuleTemplates(sliceName),
      );
      // создаем файл сторибука
      await fs.writeFile(
        resolveUIPath(`${nameToPascalCase}.stories.tsx`),
        storybookTemplates(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать компонент', e);
    }
  };

  await createUIDir();
  await createComponent();
};
