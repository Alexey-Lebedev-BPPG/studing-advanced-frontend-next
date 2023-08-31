import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui/deprecated/Loader';

// декоратор, который позволяет не оборачивать в Suspense компоненты, которые лежат в глубине дерева
export const SuspenseDecorator = (StoryComponent: StoryFn) => (
  <Suspense fallback={<Loader />}>
    <StoryComponent />
  </Suspense>
);
