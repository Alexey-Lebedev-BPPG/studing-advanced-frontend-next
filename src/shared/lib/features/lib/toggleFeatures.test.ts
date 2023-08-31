import { toggleFeatures } from './toggleFeatures';

describe('ToggleFeatures', () => {
  test('Test off function', () => {
    expect(
      toggleFeatures({
        name: 'isAppRedesigned',
        off: () => 'off',
        on: () => 'on',
      }),
    ).toBe('off');
  });

  test('Test on function', () => {
    expect(
      toggleFeatures({
        name: 'isTest',
        off: () => 'off',
        on: () => 'on',
      }),
    ).toBe('on');
  });
});
