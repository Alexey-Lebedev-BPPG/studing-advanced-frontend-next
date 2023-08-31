import { Meta, StoryFn } from '@storybook/react';
import { Text } from './Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Text,
  title: 'shared/redesigned/Text',
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = args => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: 'text lorem', title: 'Title' };

export const OnlyTitle = Template.bind({});
OnlyTitle.args = { title: 'Title' };

export const OnlyText = Template.bind({});
OnlyText.args = { text: 'text lorem' };

export const PrimaryDark = Template.bind({});
PrimaryDark.args = { text: 'text lorem', title: 'Title' };

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = { title: 'Title' };
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = { text: 'text lorem' };
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = { text: 'text lorem', title: 'Title', variant: 'error' };

export const SizeL = Template.bind({});
SizeL.args = { size: 'l', text: 'text lorem', title: 'Title' };

export const SizeM = Template.bind({});
SizeM.args = { size: 'm', text: 'text lorem', title: 'Title' };

export const SizeS = Template.bind({});
SizeS.args = { size: 's', text: 'text lorem', title: 'Title' };
