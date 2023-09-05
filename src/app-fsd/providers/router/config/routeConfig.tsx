import { UserRole } from '../../../consts/consts';
import { AboutPageApp } from '@/pages/AboutPage';
import { AdminPanelPageApp } from '@/pages/AdminPanelPage';
import { ArticleDetailsPageApp } from '@/pages/ArticleDetailsPage';
import { ArticleEditPageApp } from '@/pages/ArticleEditPage';
import { ArticlesPageApp } from '@/pages/ArticlesPage';
import { ForbiddenPageApp } from '@/pages/ForbiddenPage';
import { MainPageApp } from '@/pages/MainPage';
import { NotFoundPageApp } from '@/pages/NotFoundPage';
import { ProfilePageApp } from '@/pages/ProfilePage';
import { SettingsPageApp } from '@/pages/SettingsPage';
import {
  AppRoutes,
  getRouteAbout,
  getRouteAdminPanel,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    element: <MainPageApp />,
    path: getRouteMain(),
  },
  [AppRoutes.ABOUT]: {
    element: <AboutPageApp />,
    path: getRouteAbout(),
  },
  [AppRoutes.SETTINGS]: {
    element: <SettingsPageApp />,
    path: getRouteSettings(),
  },
  [AppRoutes.PROFILE]: {
    authOnly: true,
    element: <ProfilePageApp />,
    // добавляем динамически id
    path: getRouteProfile(':id'),
  },
  [AppRoutes.ARTICLES]: {
    authOnly: true,
    element: <ArticlesPageApp />,
    path: getRouteArticles(),
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    authOnly: true,

    element: <ArticleDetailsPageApp />,
    // добавляем динамически id
    path: getRouteArticleDetails(':id'),
  },
  [AppRoutes.ARTICLE_CREATE]: {
    authOnly: true,
    element: <ArticleEditPageApp />,
    path: getRouteArticleCreate(),
  },
  [AppRoutes.ARTICLE_EDIT]: {
    authOnly: true,
    element: <ArticleEditPageApp />,
    path: getRouteArticleEdit(':id'),
  },
  [AppRoutes.ADMIN_PANEL]: {
    authOnly: true,
    element: <AdminPanelPageApp />,
    path: getRouteAdminPanel(),
    // добавляем массив ролей, чтоб потом сделать проверку на них
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },
  [AppRoutes.FORBIDDEN]: {
    element: <ForbiddenPageApp />,
    path: getRouteForbidden(),
  },
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPageApp />,
    path: '*',
  },
};
