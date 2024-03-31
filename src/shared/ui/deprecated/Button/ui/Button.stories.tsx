import { Meta, StoryFn } from '@storybook/react';
import { Button } from './Button';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: Button,
  // меняем название сториса
  title: 'shared/Button',
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => <Button {...args} />;

// создаем виды нашей кнопки в зависимости от пропсов
export const Primary = Template.bind({});
Primary.args = { children: 'Text' };

export const Clear = Template.bind({});
Clear.args = { children: 'Text', theme: 'clear' };

export const ClearInverted = Template.bind({});
ClearInverted.args = { children: 'Text', theme: 'clearInverted' };

export const Outline = Template.bind({});
Outline.args = { children: 'Text', theme: 'outline' };

export const OutlineL = Template.bind({});
OutlineL.args = { children: 'Text', size: 'l', theme: 'outline' };

export const OutlineXL = Template.bind({});
OutlineXL.args = { children: 'Text', size: 'xl', theme: 'outline' };

export const OutlineDark = Template.bind({});
OutlineDark.args = { children: 'Text', theme: 'outline' };
// можно декораторы применять не только глобально в файле configs/storybook/preview.js, но и непосредственно в самих компонентах
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = { children: 'Text', theme: 'background' };

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = { children: 'Text', theme: 'backgroundInverted' };

export const Square = Template.bind({});
Square.args = { children: '>', square: true, theme: 'backgroundInverted' };

export const SquareL = Template.bind({});
SquareL.args = {
  children: '>',
  size: 'l',
  square: true,
  theme: 'backgroundInverted',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
  children: '>',
  size: 'xl',
  square: true,
  theme: 'backgroundInverted',
};

export const Disabled = Template.bind({});
Disabled.args = { children: '>', disabled: true, theme: 'outline' };
