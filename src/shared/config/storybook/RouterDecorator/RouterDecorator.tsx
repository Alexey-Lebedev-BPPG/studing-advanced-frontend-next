import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// декоратор, который подключает роуты
export const RouterDecorator = (StoryComponent: StoryFn) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
