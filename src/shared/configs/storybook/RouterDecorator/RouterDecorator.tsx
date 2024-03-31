import { StoryFn } from '@storybook/react';
import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const RouterDecorator = (StoryComponent: StoryFn) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <AppRouterContext.Provider value={{} as AppRouterInstance}>
    <StoryComponent />
  </AppRouterContext.Provider>
);
