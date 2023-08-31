const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла для асинхронной подгрузки компонента
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { Suspense, lazy } from 'react';
import { I${nameToPascalCase}Props } from './${nameToPascalCase}';

export const ${nameToPascalCase}Async = lazy(() => import('./${nameToPascalCase}'));

// чтоб для определенного компонента включить свой fallback, используем такой синтаксис:
// export const ${nameToPascalCase}Lazy = lazy(() => import('./${nameToPascalCase}'));

// export const ${nameToPascalCase}Async = (props: I${nameToPascalCase}Props) => (
//   <Suspense fallback='<div>Loading...</div>'>
//     <${nameToPascalCase}Lazy {...props} />
//   </Suspense>
// );

// !Важно: для подгрузки импортируемый компонент должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// *** export const ${nameToPascalCase}Async = lazy(() => import('./${nameToPascalCase}'));

// чтоб тестить в дев режиме при разработке:
// export const ${nameToPascalCase}Async = lazy<FC<I${nameToPascalCase}Props>>(
//  () =>
//    new Promise((resolve) => {
//      // @ts-ignore
//      setTimeout(() => resolve(import('./${nameToPascalCase}')), 1500);
//    })
// );
// или включить задержку в devTools
`;
};
