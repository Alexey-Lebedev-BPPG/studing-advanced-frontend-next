// import { UserRole } from '../../../consts/consts';
// import { AboutPage } from '@/pages-fsd/AboutPage';
// import { AdminPanelPage } from '@/pages-fsd/AdminPanelPage';
// import { ArticleDetailsPage } from '@/pages-fsd/ArticleDetailsPage';
// import { ArticleEditPage } from '@/pages-fsd/ArticleEditPage';
// import { ArticlesPage } from '@/pages-fsd/ArticlesPage';
// import { ForbiddenPage } from '@/pages-fsd/ForbiddenPage';
// import { MainPage } from '@/pages-fsd/MainPage';
// import { NotFoundPage } from '@/pages-fsd/NotFoundPage';
// import { ProfilePage } from '@/pages-fsd/ProfilePage';
// import { SettingsPage } from '@/pages-fsd/SettingsPage';
// import {
//   AppRoutes,
//   getRouteAbout,
//   getRouteAdminPanel,
//   getRouteArticleCreate,
//   getRouteArticleDetails,
//   getRouteArticleEdit,
//   getRouteArticles,
//   getRouteForbidden,
//   getRouteMain,
//   getRouteProfile,
//   getRouteSettings,
// } from '@/shared/const/router';
// import { AppRoutesProps } from '@/shared/types/router';

// export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
//   [AppRoutes.MAIN]: {
//     element: <MainPage />,
//     path: getRouteMain(),
//   },
//   [AppRoutes.ABOUT]: {
//     element: <AboutPage />,
//     path: getRouteAbout(),
//   },
//   [AppRoutes.SETTINGS]: {
//     element: <SettingsPage />,
//     path: getRouteSettings(),
//   },
//   [AppRoutes.PROFILE]: {
//     authOnly: true,
//     element: <ProfilePage />,
//     // добавляем динамически id
//     path: getRouteProfile(':id'),
//   },
//   [AppRoutes.ARTICLES]: {
//     authOnly: true,
//     element: <ArticlesPage />,
//     path: getRouteArticles(),
//   },
//   [AppRoutes.ARTICLE_DETAILS]: {
//     authOnly: true,

//     element: <ArticleDetailsPage />,
//     // добавляем динамически id
//     path: getRouteArticleDetails(':id'),
//   },
//   [AppRoutes.ARTICLE_CREATE]: {
//     authOnly: true,
//     element: <ArticleEditPage />,
//     path: getRouteArticleCreate(),
//   },
//   [AppRoutes.ARTICLE_EDIT]: {
//     authOnly: true,
//     element: <ArticleEditPage />,
//     path: getRouteArticleEdit(':id'),
//   },
//   [AppRoutes.ADMIN_PANEL]: {
//     authOnly: true,
//     element: <AdminPanelPage />,
//     path: getRouteAdminPanel(),
//     // добавляем массив ролей, чтоб потом сделать проверку на них
//     roles: [UserRole.MANAGER, UserRole.ADMIN],
//   },
//   [AppRoutes.FORBIDDEN]: {
//     element: <ForbiddenPage />,
//     path: getRouteForbidden(),
//   },
//   [AppRoutes.NOT_FOUND]: {
//     element: <NotFoundPage />,
//     path: '*',
//   },
// };
export {};
