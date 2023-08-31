import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export const useRouteChange = () => {
  const location = useLocation();

  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    // проходим по всем роутам приложения
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      // проверяем, что путь текущей страницы совпадает с объектом роутов
      if (matchPath(pattern, location.pathname))
        // тогда записываем этот роут в состояние
        setAppRoute(route);
    });
  }, [location.pathname]);

  // из хука возвращаем текущую страницу
  return appRoute;
};
