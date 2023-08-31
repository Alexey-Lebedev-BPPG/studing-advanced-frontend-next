import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/app-fsd/consts/consts';

// расширяем типизацию стандартных роутов, чтоб сделать роуты только для авторизованных пользователей
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
