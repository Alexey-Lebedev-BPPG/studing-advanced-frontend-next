import { Meta, StoryFn } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ArticleViewSelector,
  title: 'entities/Article/ArticleViewSelector',
} as Meta<typeof ArticleViewSelector>;

const Template: StoryFn<typeof ArticleViewSelector> = arg => (
  <ArticleViewSelector {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
