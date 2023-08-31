const fs = require('fs/promises');
const resolveRoot = require('../helpers/resolveRoot');
const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');
const selectorsTemplates = require('../templates/selectorsTemplates');
const selectorsTestsTemplates = require('../templates/selectorsTestsTemplates');
const sliceTemplate = require('../templates/sliceTemplate');
const sliceTestsTemplates = require('../templates/sliceTestsTemplates');
const thunksTemplates = require('../templates/thunksTemplates');
const thunksTestsTemplates = require('../templates/thunksTestsTemplates');
const typesTemplates = require('../templates/typesTemplates');

module.exports = async (layer, sliceName) => {
  // получаем путь до модели, указав слой и слайс
  const resolveModelPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'model', ...segments);

  const nameToCamelCase = `${getCamelCase(sliceName)}`;
  const nameToPascalCase = `${getPascalCase(sliceName)}`;

  const createModelStructure = async () => {
    try {
      // внутри папки model создаем другие папки (types, slices, selectors, services)
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
      await fs.mkdir(resolveModelPath('slices'));
      await fs.mkdir(resolveModelPath('types'));
    } catch (e) {
      console.log(
        `Не удалось создать model сегмент для слайса ${sliceName}`,
        e,
      );
    }
  };

  // функция создания файлов селектора
  const createSelectors = async () => {
    try {
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath('selectors', `get${nameToPascalCase}.ts`),
        // создаем файл селектора по шаблону
        selectorsTemplates(sliceName),
      );
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath('selectors', `get${nameToPascalCase}.test.ts`),
        // создаем файл тестов селектора по шаблону
        selectorsTestsTemplates(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать селекторы', e);
    }
  };

  // функция создания файлов сервисов
  const createServices = async () => {
    try {
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath('services', `fetch${nameToPascalCase}.ts`),
        // создаем файл селектора по шаблону
        thunksTemplates(sliceName),
      );
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath('services', `fetch${nameToPascalCase}.test.ts`),
        // создаем файл тестов селектора по шаблону
        thunksTestsTemplates(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать селекторы', e);
    }
  };

  // функция создания файла слайса
  const createSlice = async () => {
    try {
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath('slices', `${nameToCamelCase}.ts`),
        // создаем файл слайса по шаблону
        sliceTemplate(sliceName),
      );
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath('slices', `${nameToCamelCase}.test.ts`),
        // создаем файл тестов слайса по шаблону
        sliceTestsTemplates(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать редакс слайс', e);
    }
  };

  // функция создания файла схемы стейта
  const createType = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('types', `${nameToCamelCase}.ts`),
        typesTemplates(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать тип схемы стейта', e);
    }
  };

  await createModelStructure();
  await createSelectors();
  await createServices();
  await createSlice();
  await createType();
};
