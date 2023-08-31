import { StoryFn, Meta } from '@storybook/react';
import SettingsPage from './SettingsPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: SettingsPage,
  title: 'pages/SettingsPage',
} as Meta<typeof SettingsPage>;

const Template: StoryFn<typeof SettingsPage> = arg => <SettingsPage {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
