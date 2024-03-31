import { Meta, StoryFn } from '@storybook/react';
import { ArticleSortSelector } from './ArticleSortSelector';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ArticleSortSelector,
  title: 'entities/Article/ArticleSortSelector',
} as Meta<typeof ArticleSortSelector>;

const Template: StoryFn<typeof ArticleSortSelector> = arg => (
  <ArticleSortSelector {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
