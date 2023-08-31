import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from './comments';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getAddCommentForm', () => {
  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleCommentsIsLoading(state as StateSchema)).toBeUndefined();
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: { comments: { isLoading: true } },
    };
    expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(true);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: { comments: { error: 'error' } },
    };
    expect(getArticleCommentsError(state as StateSchema)).toBe('error');
  });
});
