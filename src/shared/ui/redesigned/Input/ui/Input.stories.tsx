import { Meta, StoryFn } from '@storybook/react';
import { Input } from './Input';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Input,
  title: 'shared/redesigned/Input',
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = args => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = { placeholder: 'Type text', value: '123123' };
