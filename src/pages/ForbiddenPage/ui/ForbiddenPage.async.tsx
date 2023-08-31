import { lazy } from 'react';

export const ForbiddenPageAsync = lazy(() => import('./ForbiddenPage'));

// import { IForbiddenPageProps } from './ForbiddenPage';
// !Важно: для подгрузки импортируемый компонент должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// export const ForbiddenPageAsync = lazy(() => import('./ForbiddenPage'));

// чтоб тестить в дев режиме при разработке:
// export const ForbiddenPageAsync = lazy<FC<IForbiddenPageProps>>(
//  () =>
//    new Promise((resolve) => {
//      // @ts-ignore
//      setTimeout(() => resolve(import('./ForbiddenPage')), 1500);
//    })
// );
// или включить задержку в devTools
