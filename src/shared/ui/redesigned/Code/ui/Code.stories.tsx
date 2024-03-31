import { Meta, StoryFn } from '@storybook/react';
import { Code } from './Code';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Code,
  title: 'shared/redesigned/Code',
} as Meta<typeof Code>;

const Template: StoryFn<typeof Code> = arg => <Code {...arg} />;

export const Dark = Template.bind({});
Dark.args = {
  text:
    'export default {\n' +
    "    title: 'shared/Code',\n" +
    '    component: Code,\n' +
    '    argTypes: {\n' +
    "        backgroundColor: { control: 'color' },\n" +
    '    },\n' +
    '} as Meta<typeof Code>;\n' +
    '\n' +
    'const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;\n' +
    '\n' +
    'export const Normal = Template.bind({});',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
