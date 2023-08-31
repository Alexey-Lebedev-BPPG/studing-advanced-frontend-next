// позволяет быстро добавить алиасы в абсолютные пути в проекте. запускается командой npx ts-node ./scripts/refactoring/updateImports.ts

// библиотека позволяет редактировать .ts файлы
import { Project } from 'ts-morph';

const project = new Project({});

// добавляем файлы, с которыми будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы проекта
const files = project.getSourceFiles();

// функция, которая проверяет только те пути, которые начинаются со значений, которые мы указали
function isAbsolute(value: string) {
  const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'];

  // проверяем, что если путь начинается с нашего массива слоев и возвращаем значение
  return layers.some(layer => value.startsWith(layer));
}

// итерируем по файлам
files.forEach(sourceFile => {
  // получаем все переменные импортов
  const importDeclarations = sourceFile.getImportDeclarations();

  // итерируемся по всем импортам
  importDeclarations.forEach(importDeclaration => {
    // получаем сами названия импортов
    const value = importDeclaration.getModuleSpecifierValue();

    // проверяем. если в пути есть вначале значение, которое мы указали в массиве
    if (isAbsolute(value)) {
      // то тогда меняем этот путь, добавляя алиас наш
      importDeclaration.setModuleSpecifier(`@/${value}`);
      console.log(`${value} ---> Alias success created! Result: @/${value}.`);
    }
  });
});

// сохраняем результат проекта
project.save().then(() => console.log('Done!'));
