import { getScrollSavePath, getScrollSaveScroll } from './getScrollSave';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getAddCommentForm', () => {
  const scroll = { loginPage: 100, testPage: 10 };

  test('should return data', () => {
    // объявляем не весь стейт, а только его часть через DeepPartial (позволяет проигнорировать все поля стейта и объявить только те, которые необходимы)
    const state: DeepPartial<StateSchema> = {
      scrollSave: { scroll },
    };
    // чтоб не ругался TS используем явное приведение к типу
    expect(getScrollSaveScroll(state as StateSchema)).toEqual({
      loginPage: 100,
      testPage: 10,
    });
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getScrollSaveScroll(state as StateSchema)).toBeUndefined();
  });

  test('should return position scroll', () => {
    const state: DeepPartial<StateSchema> = {
      scrollSave: { scroll },
    };
    expect(getScrollSavePath(state as StateSchema, 'testPage')).toBe(10);
  });

  test('should return default position scroll', () => {
    const state: DeepPartial<StateSchema> = {
      scrollSave: { scroll },
    };
    expect(getScrollSavePath(state as StateSchema, '')).toBe(0);
  });
});
