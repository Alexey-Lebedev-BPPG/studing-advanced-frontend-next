import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
} from './recommendations';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

describe('getAddCommentForm', () => {
  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(
      getArticleRecommendationsIsLoading(state as StateSchema),
    ).toBeUndefined();
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: { recommendations: { isLoading: true } },
    };
    expect(getArticleRecommendationsIsLoading(state as StateSchema)).toBe(true);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: { recommendations: { error: 'error' } },
    };
    expect(getArticleRecommendationsError(state as StateSchema)).toBe('error');
  });
});
