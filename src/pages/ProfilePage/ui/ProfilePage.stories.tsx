import { Meta, StoryFn } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ProfilePage,
  title: 'pages/ProfilePage',
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = args => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    profile: {
      form: {
        age: 22,
        city: 'asd',
        country: 'Ukraine',
        currency: 'USD',
        first: 'asd',
        lastname: 'test',
        username: 'admin',
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        age: 22,
        city: 'asd',
        country: 'Ukraine',
        currency: 'USD',
        first: 'asd',
        lastname: 'test',
        username: 'admin',
      },
    },
  }),
];
