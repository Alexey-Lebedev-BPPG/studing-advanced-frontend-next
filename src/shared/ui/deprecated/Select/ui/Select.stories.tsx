import { Meta, StoryFn } from '@storybook/react';
import { Select } from './Select';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Select,
  title: 'shared/Select',
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = args => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Укажите значение',
  options: [
    { content: 'Первый пункт', valueOpt: '1' },
    { content: 'Второй пункт', valueOpt: '2' },
    { content: 'Третий пункт', valueOpt: '3' },
  ],
};
