import { Meta, StoryFn } from '@storybook/react';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ArticleTypeTabs,
  title: 'entities/Article/ArticleTypeTabs',
} as Meta<typeof ArticleTypeTabs>;

const Template: StoryFn<typeof ArticleTypeTabs> = arg => (
  <ArticleTypeTabs {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
