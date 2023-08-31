import { Meta, StoryFn } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: CurrencySelect,
  title: 'entities/CurrencySelect',
} as Meta<typeof CurrencySelect>;

const Template: StoryFn<typeof CurrencySelect> = args => (
  <CurrencySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
