import { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Skeleton,
  title: 'shared/Skeleton',
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = () => <Skeleton />;

export const Normal = Template.bind({});
Normal.args = { height: 100, width: '100%' };

export const Circle = Template.bind({});
Circle.args = { border: '50%', height: 100, width: 100 };

export const NormalDark = Template.bind({});
NormalDark.args = { height: 100, width: '100%' };
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = { border: '50%', height: 100, width: 100 };
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];
