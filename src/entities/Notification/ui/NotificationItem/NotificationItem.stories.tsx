import { Meta, StoryFn } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: NotificationItem,
  title: 'entities/Notification/NotificationItem',
} as Meta<typeof NotificationItem>;

const Template: StoryFn<typeof NotificationItem> = arg => (
  <NotificationItem {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  item: {
    description: 'testing123',
    id: '1',
    title: 'test123',
  },
};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
  item: {
    description: 'testing123',
    id: '1',
    title: 'test123',
  },
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
