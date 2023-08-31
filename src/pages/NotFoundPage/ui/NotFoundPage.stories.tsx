import { Meta, StoryFn } from '@storybook/react';
import { NotFoundPage } from './NotFoundPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: NotFoundPage,
  title: 'pages/NotFoundPage',
} as Meta<typeof NotFoundPage>;

const Template: StoryFn<typeof NotFoundPage> = args => (
  <NotFoundPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
