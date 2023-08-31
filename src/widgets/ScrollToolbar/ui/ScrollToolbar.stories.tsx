import { StoryFn, Meta } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: ScrollToolbar,
  title: 'widgets/ScrollToolbar',
} as Meta<typeof ScrollToolbar>;

const Template: StoryFn<typeof ScrollToolbar> = arg => (
  <ScrollToolbar {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
