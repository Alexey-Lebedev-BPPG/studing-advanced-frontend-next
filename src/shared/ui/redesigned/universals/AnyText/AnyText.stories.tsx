import { StoryFn, Meta } from '@storybook/react';
import { AnyText } from './AnyText';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: AnyText,
  title: 'shared/AnyText',
} as Meta<typeof AnyText>;

const Template: StoryFn<typeof AnyText> = args => <AnyText {...args} />;

export const Header = Template.bind({});
Header.args = {
  as: 'h1',
  children: 'test',
  variant: 'H1',
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: 'p',
  children: 'test',
  variant: 'H1',
};
