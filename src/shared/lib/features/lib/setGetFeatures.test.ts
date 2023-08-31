import {
  getAllFeatureFlags,
  getFeatureFlags,
  setFeatureFlags,
} from './setGetFeatures';

const allFeatures = getAllFeatureFlags();

describe('SetGetFeatures', () => {
  test('get all features', () => {
    expect(getAllFeatureFlags()).toEqual(allFeatures);
  });

  test('get one false feature', () => {
    expect(getFeatureFlags('isAppRedesigned')).toBe(false);
  });

  test('get one true feature', () => {
    expect(getFeatureFlags('isTest')).toBe(true);
  });

  test('set all features', () => {
    setFeatureFlags({ ...getAllFeatureFlags(), isArticleRatingEnabled: false });

    expect(getAllFeatureFlags()).toEqual({
      ...allFeatures,
      isArticleRatingEnabled: false,
    });
  });
});
