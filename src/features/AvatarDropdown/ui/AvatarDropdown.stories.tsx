import { Meta, StoryFn } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: AvatarDropdown,
  title: 'features/AvatarDropdown',
} as Meta<typeof AvatarDropdown>;

const Template: StoryFn<typeof AvatarDropdown> = arg => (
  <AvatarDropdown {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
