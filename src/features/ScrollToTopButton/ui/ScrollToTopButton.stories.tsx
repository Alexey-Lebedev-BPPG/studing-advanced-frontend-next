import { StoryFn, Meta } from '@storybook/react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: ScrollToTopButton,
  title: 'features/ScrollToTopButton',
} as Meta<typeof ScrollToTopButton>;

const Template: StoryFn<typeof ScrollToTopButton> = arg => (
  <ScrollToTopButton {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
