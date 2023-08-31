import { Meta, StoryFn } from '@storybook/react';
import { Flex } from './Flex';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Flex,
  title: 'shared/redesigned/Flex',
} as Meta<typeof Flex>;

const Template: StoryFn<typeof Flex> = arg => <Flex {...arg} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  gap: '4',
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  gap: '8',
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  gap: '16',
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  gap: '32',
};

export const Column = Template.bind({});
Column.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  direction: 'column',
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  direction: 'column',
  gap: '16',
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
  align: 'end',
  children: (
    <>
      <div>{'1'}</div>
      <div>{'2'}</div>
      <div>{'3'}</div>
      <div>{'4'}</div>
    </>
  ),
  direction: 'column',
  gap: '16',
};
