import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '@/app-fsd/consts/consts';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// делаем реселект, чтоб один раз при получении данных сразу получить состояние роли юзера
export const isUserAdmin = createSelector(getUserRoles, roles =>
  Boolean(roles?.includes(UserRole.ADMIN)),
);

export const isUserManager = createSelector(getUserRoles, roles =>
  Boolean(roles?.includes(UserRole.MANAGER)),
);
