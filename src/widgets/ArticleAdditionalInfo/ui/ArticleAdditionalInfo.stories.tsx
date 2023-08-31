import { expect } from '@storybook/jest';
import { StoryFn, Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: ArticleAdditionalInfo,
  title: 'widgets/ArticleAdditionalInfo',
} as Meta<typeof ArticleAdditionalInfo>;

const Template: StoryFn<typeof ArticleAdditionalInfo> = arg => (
  <ArticleAdditionalInfo {...arg} />
);

export const Normal = Template.bind({});
Normal.args = {
  author: {
    avatar: '',
    id: '',
    username: '',
  },
  onEdit: () => console.log('test'),
};
Normal.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
  },
  jest: ['articleAdditionalInfo.test.tsx'],
};
Normal.play = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('Submit form', async () => {
    await userEvent.click(canvas.getByRole('button'));
  });

  await waitFor(() => expect(args.onEdit).toHaveBeenCalled());
};

Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
