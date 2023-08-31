// скрипт для создания паблик апи. позволяет быстро добавить файл README.md во всех  директориях. запускается командой npx ts-node ./scripts/refactoring/createReadmeFile.ts

// вместо export * from "./Button" формируется именованный экспорт с учетом вложенных файлов.
// Добавлен globPattern для поиска всех вложенных файлов tsx за исключением test.* или stories.*
import path from 'path';
// библиотека позволяет редактировать .ts файлы
import { Project } from 'ts-morph';

const project = new Project({});

// добавляем файлы, с которыми будем работать
project.addSourceFilesAtPaths('src/**/*.md');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const sliceMap: Record<string, string> = {
  entities: 'Entity',
  features: 'Feature',
  pages: 'Page',
  widgets: 'Widget',
};

const createReadmeForSlice = (slice: string) => {
  if (!Object.keys(sliceMap).includes(slice)) return;

  const slicePaths = path.resolve(__dirname, '..', '..', 'src', `${slice}`);
  const sliceDirectory = project.getDirectory(slicePaths);
  const componentsDirectories = sliceDirectory?.getDirectories();

  componentsDirectories?.forEach(directory => {
    const readmeFilePath = `${directory.getPath()}/README.md`;
    const readmeFile = directory.getSourceFile(
      f => f.getBaseName() === 'README.md',
    );
    if (!readmeFile) {
      const sourceCode = `## ${
        sliceMap[slice]
      } ${directory.getBaseName()} is for ...`;
      const file = directory.createSourceFile(readmeFilePath, sourceCode, {
        overwrite: true,
      });
      file.save();
    }
  });
};

createReadmeForSlice('features');
createReadmeForSlice('entities');
createReadmeForSlice('widgets');
createReadmeForSlice('pages');

project.save();
