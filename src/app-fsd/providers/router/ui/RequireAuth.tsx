import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '../../../consts/consts';
import { User, getUserRoles } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

// не используем memo в компонентах, где у нас есть children
export const RequireAuth = (props: RequireAuthProps) => {
  const { children, roles } = props;

  // проверяем авторизован ли пользователь
  const { data: dataSession } = useSession();
  const authData = (dataSession?.user || undefined) as User;
  const location = useLocation();
  const userRoles = useAppSelector(getUserRoles);

  const hasRequireRoles = useMemo(() => {
    if (!roles) return true;

    // проверяем, что в массиве есть хоть одно совпадение
    return roles.some(requireRole => {
      // создаем переменную, которая указывает, что требуемая роль есть у пользователя
      const hasRole = userRoles?.includes(requireRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!authData)
    return <Navigate replace to={getRouteMain()} state={{ from: location }} />;

  if (!hasRequireRoles)
    return (
      <Navigate replace to={getRouteForbidden()} state={{ from: location }} />
    );

  return children;
};
