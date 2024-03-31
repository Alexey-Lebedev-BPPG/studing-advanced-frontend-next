// import { ReactElement } from 'react';
// import { AppRoutes } from '@/shared/const/router';
// import { useRouteChange } from '@/shared/lib/router/navigation';
// import { ScrollToolbar } from '@/widgets/ScrollToolbar';

// // хук, который будет делать сопоставление, где мы показываем тот или иной компонент (в данном случае кнопку скролла)
// export const useAppToolbar = () => {
//   // достаем из хука текущий роут
//   const currentRoute = useRouteChange();

//   const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
//     [AppRoutes.ARTICLES]: <ScrollToolbar />,
//     [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
//   };

//   // достаем из объекта путь на основе роута, где сейчас есть пользователь
//   return toolbarByAppRoute[currentRoute];
// };
export {};
