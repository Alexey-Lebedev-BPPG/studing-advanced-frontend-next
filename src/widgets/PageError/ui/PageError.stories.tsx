import { Meta, StoryFn } from '@storybook/react';
import { PageError } from './PageError';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: PageError,
  title: 'widgets/PageError',
} as Meta<typeof PageError>;

const Template: StoryFn<typeof PageError> = args => <PageError {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
