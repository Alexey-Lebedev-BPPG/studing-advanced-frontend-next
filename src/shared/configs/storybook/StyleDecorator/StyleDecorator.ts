import { StoryFn } from '@storybook/react';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import '@/app-fsd/styles/index.css';

// декоратор, который подключает глобальные стили
export const StyleDecorator = (story: () => StoryFn) => story();
