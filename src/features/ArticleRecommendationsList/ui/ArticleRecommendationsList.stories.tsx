import { Meta, StoryFn } from '@storybook/react';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: ArticleRecommendationsList,
  title: 'features/ArticleRecommendationsList',
} as Meta<typeof ArticleRecommendationsList>;

const Template: StoryFn<typeof ArticleRecommendationsList> = arg => (
  <ArticleRecommendationsList {...arg} />
);

// создаем моковую статью
const mockArticle: Article = {
  blocks: [],
  createdAt: '',
  id: '1',
  img: '',
  subtitle: '123123',
  title: '123',
  type: [],
  user: { id: '', username: '' },
  views: 234,
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
// создаем моковый запрос для получения данных (используется как пример для RTKQuery запросов)
Normal.parameters = {
  mockData: [
    {
      method: 'GET',
      response: [
        { ...mockArticle, id: '1' },
        { ...mockArticle, id: '2' },
        { ...mockArticle, id: '3' },
      ],
      status: 200,
      // url: `${process.env?.NEXT_PUBLIC_API_URL}/articles?_limit=3`,
      url: `${'https://ulbi-example-back.vercel.app'}/articles?_limit=3`,
    },
  ],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
