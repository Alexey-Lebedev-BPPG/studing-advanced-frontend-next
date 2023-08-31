import { Meta, StoryFn } from '@storybook/react';
import { AppLink } from './AppLink';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  // добавляем аргумент в каждую сторис
  args: { to: '/' },
  component: AppLink,
  title: 'shared/AppLink',
} as Meta<typeof AppLink>;

const Template: StoryFn<typeof AppLink> = args => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = { children: 'Text', theme: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { children: 'Text', theme: 'secondary' };

export const PrimaryDark = Template.bind({});
PrimaryDark.args = { children: 'Text', theme: 'primary' };
PrimaryDark.decorators = [ThemeDecorator(Theme.LIGHT)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = { children: 'Text', theme: 'primary' };
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
