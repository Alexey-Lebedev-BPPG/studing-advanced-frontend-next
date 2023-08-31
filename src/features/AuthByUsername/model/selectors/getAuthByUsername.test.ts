import {
  getLoginError,
  getLoginIsLoading,
  getLoginPassword,
  getLoginState,
  getLoginUsername,
} from './getAuthByUsername';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getLoginError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = { loginForm: { error: 'error' } };
    expect(getLoginError(state as StateSchema)).toBe('error');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toBe('');
  });

  test('should return false', () => {
    const state: DeepPartial<StateSchema> = { loginForm: { isLoading: true } };
    expect(getLoginIsLoading(state as StateSchema)).toBe(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginIsLoading(state as StateSchema)).toBe(false);
  });

  test('should return value', () => {
    const state: DeepPartial<StateSchema> = { loginForm: { password: '123' } };
    expect(getLoginPassword(state as StateSchema)).toBe('123');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toBe('');
  });

  test('should return value', () => {
    const state: DeepPartial<StateSchema> = { loginForm: { password: '123' } };
    expect(getLoginState(state as StateSchema)).toEqual({ password: '123' });
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginState(state as StateSchema)).toBeUndefined();
  });

  test('should return value', () => {
    const state: DeepPartial<StateSchema> = { loginForm: { username: '123' } };
    expect(getLoginUsername(state as StateSchema)).toBe('123');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toBe('');
  });
});
