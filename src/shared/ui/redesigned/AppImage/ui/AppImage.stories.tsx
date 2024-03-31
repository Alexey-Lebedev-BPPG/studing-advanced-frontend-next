import { Meta, StoryFn } from '@storybook/react';
import { AppImage } from './AppImage';
import UserIcon from '../../../../assets/icons/user-filled.svg';
import { Icon } from '../../Icon';
import { Skeleton } from '../../Skeleton';
import { StoreDecorator } from '@/shared/configs/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: AppImage,
  title: 'shared/redesigned/AppImage',
} as Meta<typeof AppImage>;

const Template: StoryFn<typeof AppImage> = arg => <AppImage {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  fallback: <Skeleton width='100%' height={250} />,
  src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
};
Normal.decorators = [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
  fallback: <Skeleton width='100%' height={250} />,
  src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];

export const ErrorAlt = Template.bind({});
ErrorAlt.args = {
  alt: 'error',
  fallback: <Skeleton width='100%' height='100%' />,
  src: 'https://cdn.pixabay.come-736885__480.jpg',
};
ErrorAlt.decorators = [StoreDecorator({})];

export const ErrorAltDark = Template.bind({});
ErrorAltDark.args = {
  alt: 'error',
  fallback: <Skeleton width='100%' height='100%' />,
  src: 'https://cdn.pixabay.come-736885__480.jpg',
};
ErrorAltDark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];

export const ErrorFallback = Template.bind({});
ErrorFallback.args = {
  errorFallback: <Icon width={300} height={300} Svg={UserIcon} />,
  fallback: <Skeleton width='100%' height='100%' />,
  src: 'https://cdn.pixabay.come-736885__480.jpg',
};
ErrorFallback.decorators = [StoreDecorator({})];

export const ErrorFallbackDark = Template.bind({});
ErrorFallbackDark.args = {
  errorFallback: <Icon width={300} height={300} Svg={UserIcon} />,
  fallback: <Skeleton width='100%' height='100%' />,
  src: 'https://cdn.pixabay.come-736885__480.jpg',
};
ErrorFallbackDark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
