const fs = require('fs/promises');
const createApi = require('./createApi');
const createModel = require('./createModel');
const createPublicApi = require('./createPublicApi');
const createUI = require('./createUI');
const resolveRoot = require('../helpers/resolveRoot');
const getPascalCase = require('../helpers/stringToPascalCase');

module.exports = async (layer, sliceName) => {
  const nameToPascalCase = `${getPascalCase(sliceName)}`;
  try {
    // создаем папку для слоя и слайса
    await fs.mkdir(resolveRoot('src', layer, nameToPascalCase));
  } catch (e) {
    console.log(
      `не удалось создать директорию для слайса ${nameToPascalCase}`,
      e,
    );
  }

  // последовательно создаем папки с файлами (model, ui, api)
  await createApi(layer, nameToPascalCase);
  await createModel(layer, nameToPascalCase);
  await createUI(layer, nameToPascalCase);
  await createPublicApi(layer, nameToPascalCase);
};
