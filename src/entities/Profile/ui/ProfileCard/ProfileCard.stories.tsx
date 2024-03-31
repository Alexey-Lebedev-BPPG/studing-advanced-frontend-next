import { Meta, StoryFn } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import AvatarImg from '@/shared/assets/tests/AvatarImg.jpeg';
import { NewDesignDecorator } from '@/shared/configs/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ProfileCard,
  title: 'entities/CountrySelect',
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = args => <ProfileCard {...args} />;

export const Primary1 = Template.bind({});
Primary1.args = {
  data: {
    age: 22,
    // @ts-ignore
    avatar: AvatarImg,
    city: 'asd',
    country: 'Ukraine',
    currency: 'USD',
    first: 'asd',
    lastname: 'test',
    username: 'admin',
  },
};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {
  data: {
    age: 22,
    // @ts-ignore
    avatar: AvatarImg,
    city: 'asd',
    country: 'Ukraine',
    currency: 'USD',
    first: 'asd',
    lastname: 'test',
    username: 'admin',
  },
};
PrimaryRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const WithError = Template.bind({});
WithError.args = { error: 'true' };

export const Loading = Template.bind({});
Loading.args = { isLoading: true };
