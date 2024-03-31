import { StoryFn, Meta } from '@storybook/react';
import { ListBox } from './ListBox';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: ListBox,
  // добавляем декоратор, чтоб сделать отступы в 100px
  decorators: [
    Story => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'shared/ListBox',
} as Meta<typeof ListBox>;

const Template: StoryFn<typeof ListBox> = arg => <ListBox {...arg} />;

export const TopLeftLight = Template.bind({});
TopLeftLight.args = {
  direction: 'top left',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'top left',
};

export const TopLeftDark = Template.bind({});
TopLeftDark.args = {
  direction: 'top left',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'top left',
};
TopLeftDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TopRightLight = Template.bind({});
TopRightLight.args = {
  direction: 'top right',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'top right',
};

export const TopRightDark = Template.bind({});
TopRightDark.args = {
  direction: 'top right',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'top right',
};
TopRightDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BottomLeftLight = Template.bind({});
BottomLeftLight.args = {
  direction: 'bottom left',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'bottom left',
};

export const BottomLeftDark = Template.bind({});
BottomLeftDark.args = {
  direction: 'bottom left',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'bottom left',
};
BottomLeftDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BottomRightLight = Template.bind({});
BottomRightLight.args = {
  direction: 'bottom right',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'bottom right',
};

export const BottomRightDark = Template.bind({});
BottomRightDark.args = {
  direction: 'bottom right',
  items: [
    { content: '123123123123123123123123123', valueOpt: '123' },
    { content: '234234234234234234234234234', valueOpt: '234' },
    { content: '345345345345345345345345345', valueOpt: '345' },
  ],
  value: 'bottom right',
};
BottomRightDark.decorators = [ThemeDecorator(Theme.DARK)];
