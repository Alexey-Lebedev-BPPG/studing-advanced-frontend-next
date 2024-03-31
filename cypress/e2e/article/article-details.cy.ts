let currentArticleId = '';

describe('Пользователь заходит на страницу статьи', () => {
  // авторизовываемся перед каждым тестом и создаем статью
  beforeEach(() => {
    cy.login();
    cy.createArticle().then(article => {
      currentArticleId = article.id;
      // аналог console.log()
      // cy.log(JSON.stringify(article));
      cy.visit(`articles/${article.id}`);
    });
  });
  // удаляем статью после каждого теста
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('И видит содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it('И видит список рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('И отправляет комментарий', () => {
    // подгружаем статью, чтоб не делать действия раньше подгрузки
    cy.getByTestId('ArticleDetails.Info');
    // получаем блок, где вводить комментарий и скроллим к нему
    cy.getByTestId('AddCommentForm').scrollIntoView();
    // добавляем комментарий через кастомную функцию
    cy.addComment('text');
    // проверяем, что комментарий добавился
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('И ставит оценку', () => {
    // мокаем запрос с помощью интерцептора и указываем, что в качестве ответа будет наша фикстура (моковые данные)
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    // подгружаем статью, чтоб не делать действия раньше подгрузки
    cy.getByTestId('ArticleDetails.Info');
    // получаем блок, где вводить ставить оценку и скроллим к нему
    cy.getByTestId('RatingCard').scrollIntoView();
    // добавляем оценку и оставляем фидбек через кастомную функцию
    cy.setRate(5, 'testFeedback');
    // проверяем, что оценка поставлена и указанное количество звезд закрашено
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
