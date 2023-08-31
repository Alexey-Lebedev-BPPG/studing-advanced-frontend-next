import { Meta, StoryFn } from '@storybook/react';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ArticleRating,
  title: 'features/ArticleRating',
} as Meta<typeof ArticleRating>;

const Template: StoryFn<typeof ArticleRating> = arg => (
  <ArticleRating {...arg} />
);

export const Normal = Template.bind({});
Normal.args = { articleId: '1' };
Normal.decorators = [StoreDecorator({ user: { authData: { id: '1' } } })];
// создаем моковый запрос для получения данных (используется как пример для RTKQuery запросов)
Normal.parameters = {
  mockData: [
    {
      method: 'GET',
      response: [{ rate: 4 }],
      status: 200,
      // url: `${process.env?.NEXT_PUBLIC_API_URL}/article-ratings?userId=1&articleId=1`,
      url: `${'https://ulbi-example-back.vercel.app'}/article-ratings?userId=1&articleId=1`,
    },
  ],
};

export const Dark = Template.bind({});
Dark.args = { articleId: '1' };
Dark.decorators = [
  StoreDecorator({ user: { authData: { id: '1' } } }),
  ThemeDecorator(Theme.DARK),
];
// создаем моковый запрос для получения данных (используется как пример для RTKQuery запросов)
Dark.parameters = {
  mockData: [
    {
      method: 'GET',
      response: [{ rate: 3 }],
      status: 200,
      // url: `${process.env?.NEXT_PUBLIC_API_URL}/article-ratings?userId=1&articleId=1`,
      url: `${'https://ulbi-example-back.vercel.app'}/article-ratings?userId=1&articleId=1`,
    },
  ],
};
