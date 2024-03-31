import { Meta, StoryFn } from '@storybook/react';
import { Popover } from './Popover';
import { Theme } from '../../../../../const/theme';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Popover,
  title: 'shared/redesigned/Popover',
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = arg => <Popover {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
