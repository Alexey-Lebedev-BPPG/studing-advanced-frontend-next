// позволяет удалить лишние фичи-флаги. запускается командой npx ts-node remove-feature.ts [название фичи] [метод] (npx ts-node remove-feature.ts isCounterEnabled off)

// библиотека позволяет редактировать .ts файлы
import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

// из аргументов достаем название фичи (например, isCounterEnabled)
const removedFeatureName = process.argv[2];
// из аргументов достаем функцию, которую нужно выполнить (например, on/off)
const featureState = process.argv[3];

// выносим отдельно названия функций
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

// указываем ошибку, если название фичи не передали
if (!removedFeatureName) throw new Error('Укажите название фичи-флага');
// указываем ошибку, если название функции не передали
if (!featureState) throw new Error('Укажите состояние фичи-флага');
// указываем ошибку, если название функции некорректно
if (featureState !== 'on' && featureState !== 'off')
  throw new Error(
    'Некорректное значение состояния фичи (только "on" или "off")',
  );

const project = new Project({});

// добавляем файлы, с которыми будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы проекта
const files = project.getSourceFiles();

const isToggleFunction = (node: Node): boolean => {
  // переменная, показывающая, что вызов функции совпадает с названием toggleFeatures
  let isToggleFeatures = false;

  // для этого пробегаемся по всем детям
  node.forEachChild(child => {
    // находим идентификатор и проверяем, что он называется, как нам нужно
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === toggleFunctionName
    )
      isToggleFeatures = true;
  });

  return isToggleFeatures;
};

const isToggleComponent = (node: Node): boolean => {
  // переменная, показывающая, что нода является JSX-элементом и название совпадает с ToggleFeatures
  // let isToggleFeatures = false;

  // для этого пробегаемся по всем детям
  // node.forEachChild(child => {
  //   // находим идентификатор и проверяем, что он называется, как нам нужно
  //   if (
  //     child.isKind(SyntaxKind.Identifier) &&
  //     child.getText() === toggleComponentName
  //   ) {
  //     isToggleFeatures = true;
  //   }
  // });

  // return isToggleFeatures;

  // либо другой вариант такого же функционала
  // находим первый дочерний элемент по типу
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
  // и проверяем, что название компонента равно названию компонента тогла
  return identifier?.getText() === toggleComponentName;
};

// функция замены для логики
const replaceToggleFunction = (node: Node) => {
  // получаем объект аргументов из нашей функции
  const objectOptions = node.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression,
  );

  // выходим из цикла, если у нас нет аргументов
  if (!objectOptions) return;

  // получаем все наши аргументы
  const onFunctionProperty = objectOptions.getProperty('on'); // получаем on: () => <CounterRedesigned />
  const offFunctionProperty = objectOptions.getProperty('off'); // получаем off: () => <Counter />
  const featureNameProperty = objectOptions.getProperty('name'); // получаем name: 'isCounterEnabled'

  // получаем конкретные значения
  const onFunction = onFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  ); // получаем () => <CounterRedesigned />
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  ); // получаем () => <Counter />
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getLiteralValue(); // получаем isCounterEnabled

  // проверяем, что если название фичи из аргументов не совпадает с названием, которое мы нашли, то прекращаем скрипт
  if (featureName !== removedFeatureName) return;

  // если у нас передана функция on
  if (featureState === 'on')
    // получаем то, что функция должна вернуть и перезаписываем в элементе
    node.replaceWithText(onFunction?.getBody().getText() || '');
  // если у нас передана функция off
  if (featureState === 'off')
    // получаем то, что функция должна вернуть и перезаписываем в элементе
    node.replaceWithText(offFunction?.getBody().getText() || '');
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
  jsxAttributes.find(node => node.getName() === name);

// функция удаления круглых скобок
const removeStaples = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  return value?.startsWith('(') ? value.slice(1, -1) : value;
};

// функция замены компонента
const replaceToggleComponent = (node: Node) => {
  // получаем все атрибуты ноды
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  // находим каждый атрибут
  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');
  const featureNameAttribute = getAttributeNodeByName(
    attributes,
    'nameFeatures',
  );

  // получаем значения аттрибутов
  const featureNameValue = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getLiteralValue(); // получаем isArticleRatingEnabled
  const onValue = removeStaples(onAttribute); // получаем <Card>{'Оценка статей скоро появится!'}</Card>
  const offValue = removeStaples(offAttribute); // получаем <ArticleRating articleId={id} />

  // проверяем, что если название фичи из аргументов не совпадает с названием, которое мы нашли, то прекращаем скрипт
  if (featureNameValue !== removedFeatureName) return;

  // если у нас передана функция on
  if (featureState === 'on' && onValue)
    // получаем то, что функция должна вернуть и перезаписываем в элементе
    node.replaceWithText(onValue);
  // если у нас передана функция off
  if (featureState === 'off' && offValue)
    // получаем то, что функция должна вернуть и перезаписываем в элементе
    node.replaceWithText(offValue);
};

// итерируем по файлам
files.forEach(sourceFile => {
  // обходим всех потомков
  sourceFile.forEachDescendant(node => {
    // находим тип функции (можно посмотреть в АСД) и проверяем, что вызов функции совпадает с названием toggleFeatures
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node))
      return replaceToggleFunction(node);
    // находим тип компонента (можно посмотреть в АСД) и проверяем, что нода является JSX-элементом и название совпадает с ToggleFeatures
    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    )
      return replaceToggleComponent(node);
  });
});

// сохраняем результат проекта
project.save().then(() => console.log('Done!'));
