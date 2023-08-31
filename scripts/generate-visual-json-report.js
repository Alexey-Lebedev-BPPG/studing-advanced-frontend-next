// добавляем данный скрипт, чтоб удобно сравнивать скриншоты + также нужно будет разобраться с флагом "update" в команде "test:ui:ci": "loki update --requireReference --reactUri file:./storybook-static", которая запускается в package.json, т.к. она не дает показывать разницу между скриншотами и автоматически принимает все
// скрипт берется отсюда https://github.com/oblador/loki/issues/76
const { readdir, writeFile } = require('fs');
const { join: joinPath, relative } = require('path');
const { promisify } = require('util');

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const lokiDir = joinPath(__dirname, '..', '.loki');
const actualDir = joinPath(lokiDir, 'current');
const expectedDir = joinPath(lokiDir, 'reference');
const diffDir = joinPath(lokiDir, 'difference');

(async function main() {
  const diffs = await asyncReaddir(diffDir);

  await writeFileAsync(
    joinPath(lokiDir, 'report.json'),
    JSON.stringify({
      actualDir: relative(lokiDir, actualDir),
      actualItems: diffs,
      deletedItems: [],
      diffDir: relative(lokiDir, diffDir),
      diffItems: diffs,
      expectedDir: relative(lokiDir, expectedDir),
      expectedItems: diffs,
      failedItems: diffs,
      newItems: [],
      passedItems: [],
    }),
  );
})();
