import { Meta, StoryFn } from '@storybook/react';
import { CountrySelect } from './CountrySelect';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: CountrySelect,
  title: 'entities/CountrySelect',
} as Meta<typeof CountrySelect>;

const Template: StoryFn<typeof CountrySelect> = args => (
  <CountrySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
