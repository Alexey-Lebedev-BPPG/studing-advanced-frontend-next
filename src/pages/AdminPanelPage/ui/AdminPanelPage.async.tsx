import { lazy } from 'react';

export const AdminPanelPageAsync = lazy(() => import('./AdminPanelPage'));

// import { IAdminPanelPageProps } from './AdminPanelPage';
// !Важно: для подгрузки импортируемый компонент должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// export const AdminPanelPageAsync = lazy(() => import('./AdminPanelPage'));

// чтоб тестить в дев режиме при разработке:
// export const AdminPanelPageAsync = lazy<FC<IAdminPanelPageProps>>(
//  () =>
//    new Promise((resolve) => {
//      // @ts-ignore
//      setTimeout(() => resolve(import('./AdminPanelPage')), 1500);
//    })
// );
// или включить задержку в devTools
