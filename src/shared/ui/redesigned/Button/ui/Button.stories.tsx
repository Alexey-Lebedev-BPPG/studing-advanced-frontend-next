import { Meta, StoryFn } from '@storybook/react';
import { Button } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: Button,
  // меняем название сториса
  title: 'shared/redesigned/Button',
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => <Button {...args} />;

// создаем виды нашей кнопки в зависимости от пропсов
export const Primary = Template.bind({});
Primary.args = { children: 'Text' };

export const Clear = Template.bind({});
Clear.args = { children: 'Text', variant: 'clear' };

export const Outline = Template.bind({});
Outline.args = { children: 'Text', variant: 'outline' };

export const OutlineL = Template.bind({});
OutlineL.args = { children: 'Text', size: 'l', variant: 'outline' };

export const OutlineXL = Template.bind({});
OutlineXL.args = { children: 'Text', size: 'xl', variant: 'outline' };

export const OutlineDark = Template.bind({});
OutlineDark.args = { children: 'Text', variant: 'outline' };
// можно декораторы применять не только глобально в файле configs/storybook/preview.js, но и непосредственно в самих компонентах
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Disabled = Template.bind({});
Disabled.args = { children: '>', disabled: true, variant: 'outline' };
