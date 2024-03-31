import { getUserRoles, isUserAdmin, isUserManager } from './roleSelectors';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';
import { UserRole } from '@/shared/const/app';

describe('getUserRoles', () => {
  test('should return data', () => {
    const rolesMock = ['ADMIN', 'MANAGER'] as UserRole[];
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { roles: rolesMock } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getUserRoles(state as StateSchema)).toEqual(rolesMock);
  });

  test('should return []', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { roles: [] } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getUserRoles(state as StateSchema)).toEqual([]);
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };
    expect(getUserRoles(state as StateSchema)).toBeUndefined();
  });
});

describe('isUserAdmin', () => {
  test('should return true', () => {
    const rolesMock = ['ADMIN', 'MANAGER'] as UserRole[];
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { roles: rolesMock } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(isUserAdmin(state as StateSchema)).toBe(true);
  });

  test('should return false', () => {
    const rolesMock = ['USER', 'MANAGER'] as UserRole[];
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { roles: rolesMock } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(isUserAdmin(state as StateSchema)).toBe(false);
  });
});

describe('isUserManager', () => {
  test('should return true', () => {
    const rolesMock = ['ADMIN', 'MANAGER'] as UserRole[];
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { roles: rolesMock } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(isUserManager(state as StateSchema)).toBe(true);
  });

  test('should return false', () => {
    const rolesMock = ['USER', 'ADMIN'] as UserRole[];
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      user: { authData: { roles: rolesMock } },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(isUserManager(state as StateSchema)).toBe(false);
  });
});
