import { Article } from '@/entities/Article';

const defaultArticle = {
  blocks: [],
  createdAt: '26.02.2022',
  img: 'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
  subtitle: 'БиологиЯ',
  title: 'Научная статья - Биология',
  type: ['SCIENCE'],
  userId: '1',
  views: 1022,
};

// делаем запрос на создание статьи
export const createArticle = (article?: Article) =>
  cy
    .request({
      body: article || defaultArticle,
      headers: { Authorization: 'test' },
      method: 'POST',
      url: 'http://localhost:8000/articles',
    })
    .then(res => res.body);

// делаем запрос на удаление статьи
export const removeArticle = (articleId: string) =>
  cy.request({
    headers: { Authorization: 'test' },
    method: 'DELETE',
    url: `http://localhost:8000/articles${`/${articleId}`}`,
  });

declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
