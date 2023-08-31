const fs = require('fs/promises');
const resolveRoot = require('../helpers/resolveRoot');
const publicApiTemplates = require('../templates/publicApiTemplates');
const readmiTemplates = require('../templates/readmiTemplates');

module.exports = async (layer, sliceName) => {
  const resolveMainPath = (...segments) =>
    resolveRoot('src', layer, sliceName, ...segments);

  try {
    // создаем файл паблик апи
    await fs.writeFile(
      resolveMainPath('index.ts'),
      publicApiTemplates(sliceName),
    );
    // создаем файл реадми
    await fs.writeFile(
      resolveMainPath('README.md'),
      readmiTemplates(sliceName),
    );
  } catch (e) {
    console.log('Не удалось создать PUBLIC API', e);
  }
};
