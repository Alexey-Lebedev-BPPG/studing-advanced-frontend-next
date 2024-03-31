import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from '../../../../assets/tests/AvatarImg.jpeg';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Avatar,
  title: 'shared/Avatar',
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = args => <Avatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  size: 150,
  // @ts-ignore
  src: AvatarImg,
};
Normal.decorators = [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
  size: 150,
  // @ts-ignore
  src: AvatarImg,
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];

export const SmallLight = Template.bind({});
SmallLight.args = {
  size: 50,
  // @ts-ignore
  src: AvatarImg,
};
SmallLight.decorators = [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)];

export const SmallDark = Template.bind({});
SmallDark.args = {
  size: 50,
  // @ts-ignore
  src: AvatarImg,
};
SmallDark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
