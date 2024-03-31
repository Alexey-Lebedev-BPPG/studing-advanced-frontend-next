import { StoryFn } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

// декоратор, который подключает глобальный класс для нового дизайна (пример src/entities/Profile/ui/ProfileCard/ProfileCard.stories.tsx)
export const NewDesignDecorator = (StoryComponent: StoryFn) => {
  // заменяем флаг .получив все флаги и включив определенный
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });

  return (
    <div className='app-redesigned'>
      <StoryComponent />
    </div>
  );
};
