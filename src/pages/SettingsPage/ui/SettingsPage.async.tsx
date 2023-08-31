import { lazy } from 'react';

export const SettingsPageAsync = lazy(() => import('./SettingsPage'));

// чтоб для определенного компонента включить свой fallback, используем такой синтаксис:
// export const SettingsPageLazy = lazy(() => import('./SettingsPage'));

// export const SettingsPageAsync = (props: ISettingsPageProps) => (
//   <Suspense fallback='<div>Loading...</div>'>
//     <SettingsPageLazy {...props} />
//   </Suspense>
// );

// !Важно: для подгрузки импортируемый компонент должен экспортироваться ТОЛЬКО по дефолту
// так используем в реальных проектах
// export const SettingsPageAsync = lazy(() => import('./SettingsPage'));

// чтоб тестить в дев режиме при разработке:
// export const SettingsPageAsync = lazy<FC<ISettingsPageProps>>(
//  () =>
//    new Promise((resolve) => {
//      // @ts-ignore
//      setTimeout(() => resolve(import('./SettingsPage')), 1500);
//    })
// );
// или включить задержку в devTools
