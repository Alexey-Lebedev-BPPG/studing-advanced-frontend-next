import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { Tabs } from './Tabs';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Tabs,
  title: 'shared/redesigned/Tabs',
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = arg => <Tabs {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  onTabClick: action('onTabClick'),
  selectedValue: 'tab2',
  tabs: [
    { content: 'tab1', value: 'tab1' },
    { content: 'tab2', value: 'tab2' },
    { content: 'tab3', value: 'tab3' },
  ],
};

export const Dark = Template.bind({});
Dark.args = {
  onTabClick: action('onTabClick'),
  selectedValue: 'tab2',
  tabs: [
    { content: 'tab1', value: 'tab1' },
    { content: 'tab2', value: 'tab2' },
    { content: 'tab3', value: 'tab3' },
  ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
