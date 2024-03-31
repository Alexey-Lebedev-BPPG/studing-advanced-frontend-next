import { Meta, StoryFn } from '@storybook/react';
import ArticleEditForm from './ArticleEditForm';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ArticleEditForm,
  title: 'features/ArticleEditForm',
} as Meta<typeof ArticleEditForm>;

const Template: StoryFn<typeof ArticleEditForm> = arg => (
  <ArticleEditForm {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
