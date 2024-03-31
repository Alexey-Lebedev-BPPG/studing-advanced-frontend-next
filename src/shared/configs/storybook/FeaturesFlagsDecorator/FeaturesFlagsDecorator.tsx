import { StoryFn } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

// декоратор, который подключает фича-флаги (пример src/entities/Comment/ui/CommentCard/CommentCard.stories.tsx)
export const FeaturesFlagsDecorator =
  (features: FeatureFlags) => (StoryComponent: StoryFn) => {
    setFeatureFlags(features);

    return <StoryComponent />;
  };
