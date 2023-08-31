import {
  getAddCommentFormText,
  getAddCommentFormIsLoading,
  getAddCommentFormError,
} from './getAddCommentForm';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getAddCommentForm', () => {
  test('should return data', () => {
    const text = 'lorem';
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      addCommentForm: { text },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getAddCommentFormText(state as StateSchema)).toBe(text);
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddCommentFormIsLoading(state as StateSchema)).toBeUndefined();
  });

  test('should return empty string', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {},
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getAddCommentFormText(state as StateSchema)).toBe('');
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: { isLoading: true },
    };
    expect(getAddCommentFormIsLoading(state as StateSchema)).toBe(true);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: { error: 'error' },
    };
    expect(getAddCommentFormError(state as StateSchema)).toBe('error');
  });
});
