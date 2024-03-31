import { Meta, StoryFn } from '@storybook/react';
import LoginForm from './LoginForm';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: LoginForm,
  title: 'features/LoginForm',
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = args => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    loginForm: { password: 'asd', username: '123' },
  }),
];

export const WithError = Template.bind({});
WithError.args = {};
WithError.decorators = [
  StoreDecorator({
    loginForm: { error: 'Error', password: 'asd', username: '123' },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    loginForm: { isLoading: true },
    // если захотим передать какие-то редьюсеры, то вторым аргументом указываем их. Например:
    // {loginForm: loginReducer}
  }),
];
