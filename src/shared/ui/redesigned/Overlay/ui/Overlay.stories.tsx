import { Meta, StoryFn } from '@storybook/react';
import { Overlay } from './Overlay';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Overlay,
  title: 'shared/redesigned/Overlay',
} as Meta<typeof Overlay>;

const Template: StoryFn<typeof Overlay> = arg => <Overlay {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
