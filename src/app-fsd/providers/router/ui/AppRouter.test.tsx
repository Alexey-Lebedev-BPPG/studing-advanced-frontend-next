import { screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { UserRole } from '@/app-fsd/consts/consts';
import {
  getRouteAbout,
  getRouteAdminPanel,
  getRouteProfile,
} from '@/shared/const/router';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('app-fsd/router/AppRouter', () => {
  test('Test render', async () => {
    // проверяем, что наш компонент отрендерится, при этом задаем инишиал роут
    componentRender(<AppRouter />, { route: getRouteAbout() });

    // находим наш компонент, при чем используем async, т.к. наш компонент подгружается лениво
    const page = await screen.findByTestId('AboutPage');

    // проверяем, что компонент находится внутри дерева
    expect(page).toBeInTheDocument();
  });

  test('page undefined', async () => {
    // проверяем, что наш компонент отрендерится, при этом задаем инишиал роут
    componentRender(<AppRouter />, { route: '/testTestTest' });

    // находим наш компонент, при чем используем async, т.к. наш компонент подгружается лениво
    const page = await screen.findByTestId('NotFoundPage');

    // проверяем, что компонент находится внутри дерева
    expect(page).toBeInTheDocument();
  });

  test('redirect to mainPage for no authorization users ', async () => {
    // проверяем, что наш компонент отрендерится, при этом задаем инишиал роут
    componentRender(<AppRouter />, { route: getRouteProfile('1') });

    // находим наш компонент, при чем используем async, т.к. наш компонент подгружается лениво
    const page = await screen.findByTestId('MainPage');

    // проверяем, что компонент находится внутри дерева
    expect(page).toBeInTheDocument();
  });

  test('success profilePage for authorization users ', async () => {
    // проверяем, что наш компонент отрендерится, при этом задаем инишиал роут
    componentRender(<AppRouter />, {
      initialState: { user: { _inited: true, authData: { id: '1' } } },
      route: getRouteProfile('1'),
    });

    // находим наш компонент, при чем используем async, т.к. наш компонент подгружается лениво
    const page = await screen.findByTestId('ProfilePage');

    // проверяем, что компонент находится внутри дерева
    expect(page).toBeInTheDocument();
  });

  test('unsuccess profilePage for authorization users with other role', async () => {
    // проверяем, что наш компонент отрендерится, при этом задаем инишиал роут
    componentRender(<AppRouter />, {
      initialState: { user: { _inited: true, authData: { id: '1' } } },
      route: getRouteAdminPanel(),
    });

    // находим наш компонент, при чем используем async, т.к. наш компонент подгружается лениво
    const page = await screen.findByTestId('ForbiddenPage');

    // проверяем, что компонент находится внутри дерева
    expect(page).toBeInTheDocument();
  });

  test('success profilePage for authorization users with admin role', async () => {
    // проверяем, что наш компонент отрендерится, при этом задаем инишиал роут
    componentRender(<AppRouter />, {
      initialState: {
        user: { _inited: true, authData: { id: '1', roles: [UserRole.ADMIN] } },
      },
      route: getRouteAdminPanel(),
    });

    // находим наш компонент, при чем используем async, т.к. наш компонент подгружается лениво
    const page = await screen.findByTestId('AdminPanelPage');

    // проверяем, что компонент находится внутри дерева
    expect(page).toBeInTheDocument();
  });
});
