import { Meta, StoryFn } from '@storybook/react';
import { AdminPanelPage } from './AdminPanelPage';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: AdminPanelPage,
  title: 'pages/AdminPanelPage',
} as Meta<typeof AdminPanelPage>;

const Template: StoryFn<typeof AdminPanelPage> = arg => (
  <AdminPanelPage {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
