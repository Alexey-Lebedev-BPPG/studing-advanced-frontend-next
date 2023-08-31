import { StoryFn, Meta } from '@storybook/react';
import { UiDesignSwitcher } from './UiDesignSwitcher';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: UiDesignSwitcher,
  title: 'features/UiDesignSwitcher',
} as Meta<typeof UiDesignSwitcher>;

const Template: StoryFn<typeof UiDesignSwitcher> = arg => (
  <UiDesignSwitcher {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
