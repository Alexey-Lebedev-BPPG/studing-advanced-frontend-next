import { StoryFn } from '@storybook/react';
import '@/app-fsd/styles/index.scss';

// декоратор, который подключает глобальные стили
export const StyleDecorator = (story: () => StoryFn) => story();
