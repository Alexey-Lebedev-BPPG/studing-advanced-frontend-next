import { useSession } from 'next-auth/react';
import { SidebarItemType } from '../types/sidebar';
import { User } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

// предназначен для того, чтоб получать items для сайдбара во взаимодействии с редаксом
// используем createSelector, чтоб мемоизировать значения, т.к. они изменяться не будут
// export const getSidebarItems = createSelector(getUserAuthData, authData => {
//   const sidebarItemsList: SidebarItemType[] = [
//     {
//       Icon: toggleFeatures({
//         name: 'isAppRedesigned',
//         off: () => MainIconDeprecated,
//         on: () => MainIcon,
//       }),
//       path: getRouteMain(),
//       text: 'Главная страница',
//     },
//     {
//       Icon: toggleFeatures({
//         name: 'isAppRedesigned',
//         off: () => AboutIconDeprecated,
//         on: () => AboutIcon,
//       }),
//       path: getRouteAbout(),
//       text: 'О сайте',
//     },
//   ];

//   if (authData)
//     sidebarItemsList.push(
//       {
//         Icon: toggleFeatures({
//           name: 'isAppRedesigned',
//           off: () => ProfileIconDeprecated,
//           on: () => ProfileIcon,
//         }),
//         authOnly: true,
//         path: getRouteProfile(authData.id),
//         text: 'Профиль',
//       },
//       {
//         Icon: toggleFeatures({
//           name: 'isAppRedesigned',
//           off: () => ArticleIconDeprecated,
//           on: () => ArticleIcon,
//         }),
//         authOnly: true,
//         path: getRouteArticles(),
//         text: 'Статьи',
//       },
//     );

//   return sidebarItemsList;
// });

// когда мы стали менять фичи флаги с принудительной перерисовкой всего приложения, появился баг, что иконки не перерисовываются. это из-за того, что мы используем реселект, а данные для него не изменились.чтоб обойти эту проблему, избавимся от реселекта и воспользуемся обычным селектором.
export const useSidebarItems = () => {
  const { data: dataSession } = useSession();
  const authData = (dataSession?.user || undefined) as User;

  const sidebarItemsList: SidebarItemType[] = [
    {
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => MainIconDeprecated,
        on: () => MainIcon,
      }),
      path: getRouteMain(),
      text: 'Главная страница',
    },
    {
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
      path: getRouteAbout(),
      text: 'О сайте',
    },
  ];

  if (authData)
    sidebarItemsList.push(
      {
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        authOnly: true,
        path: getRouteProfile(authData.id),
        text: 'Профиль',
      },
      {
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ArticleIconDeprecated,
          on: () => ArticleIcon,
        }),
        authOnly: true,
        path: getRouteArticles(),
        text: 'Статьи',
      },
    );

  return sidebarItemsList;
};
