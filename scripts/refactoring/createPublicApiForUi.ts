// скрипт для создания паблик апи. позволяет быстро добавить паблик апи в директориях (в нашем случае в shared слой), а также заменить по всему проекту путь из publicApi. запускается командой npx ts-node ./scripts/refactoring/createPublicApiForUi.ts

// вместо export * from "./Button" формируется именованный экспорт с учетом вложенных файлов.
// Добавлен globPattern для поиска всех вложенных файлов tsx за исключением test.* или stories.*
import path from 'path';
// библиотека позволяет редактировать .ts файлы
import { Project } from 'ts-morph';

const project = new Project({});

const PROJECT_LAYERS = [
  'app',
  'pages',
  'features',
  'widgets',
  'entities',
  'shared',
];

// добавляем файлы, с которыми будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// функция, которая проверяет только те пути, которые начинаются со значений, которые мы указали
function isAbsolute(currentPath: string) {
  return PROJECT_LAYERS.some(layer => currentPath.startsWith(layer));
}

// получаем все файлы проекта
const files = project.getSourceFiles();
// указываем название файла, в который будем помещать publicApi
const indexFilename = 'index.ts';
// указываем слой, который мы можем прокинуть в env или shared по ум.
const layer = process.argv[2] || 'shared';
// указываем слайс, в который будем помещать  publicApi
const slice = 'ui';
// создаем путь до папки shared
const dest = project.getDirectory(
  path.resolve(__dirname, '..', '..', 'src', layer, slice),
);
// получаем все папки внутри папки shared/ui (т.е. все наши компоненты)
const directories = dest?.getDirectories();

// итерируемся по всем этим папкам
directories?.forEach(directory => {
  // достаем путь папки
  const indexFilePath = directory.getPath();
  // проверяем: если есть внутри файл index.ts
  const isIndexFileExist = directory.getSourceFile(
    `${indexFilePath}/${indexFilename}`,
  );

  // если он есть, то ничего не делаем, если его нет
  if (!isIndexFileExist) {
    // получаем все файлы в папках, кроме указанных расширений
    const filesInFolder = directory.getSourceFiles([
      '**/*.tsx',
      '!**/*.stories.tsx',
      '!**/*.test.tsx',
    ]);

    let content = '';

    // пробегаемся по файлам и меняем и добавляем в них экспорт
    filesInFolder?.forEach(component => {
      const folderLen = indexFilePath.length;
      const moduleName = component.getBaseNameWithoutExtension();
      const modulePath = `.${component.getFilePath().slice(folderLen, -4)}`;
      content += `export { ${moduleName} } from "${modulePath}";\n`;
    });

    // создаем наш файл и добавляем в него контент
    const file = directory.createSourceFile(
      `${indexFilePath}/${indexFilename}`,
      content,
      // указываем эту настройку, чтоб файл перезаписался
      { overwrite: true },
    );

    // сохраняем файл в директории
    file
      .save()
      .then(() => console.log(`${indexFilePath} --> index.ts created!`));
  }
});

// итерируем по файлам проекта, чтоб везде заменить пути на пути из паблик апи shared слоя
files.forEach(sourceFile => {
  // получаем все переменные импортов
  const importDeclarations = sourceFile.getImportDeclarations();

  // итерируемся по всем импортам
  importDeclarations.forEach(importDeclaration => {
    // получаем сами названия импортов
    let value = importDeclaration.getModuleSpecifierValue();
    // удаляем наш алиас
    value = value.replace('@/', '');
    // делим путь на сегменты
    const segments = value.split('/');

    // указывает, является ли слайс слайсом, а слой слоем
    const isLayer = segments?.[0] === layer;
    const isSlice = segments?.[1] === slice;

    // проверяем. если в пути есть вначале значение, которое мы указали в массиве
    if (isAbsolute(value) && isLayer && isSlice) {
      // то тогда меняем этот путь, добавляя алиас наш
      const result = value.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
      console.log(
        `${value} ---> Path was success change! Result: @/${result}.`,
      );
    }
  });
});

// сохраняем все
project.save().then(() => console.log('Done!'));
