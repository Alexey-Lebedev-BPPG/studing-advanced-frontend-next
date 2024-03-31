describe('Пользователь заходит на страницу списка статей', () => {
  // авторизовываемся перед каждым тестом и переходим на страницу статей
  beforeEach(() => {
    cy.login().then(data => {
      cy.visit('articles');
    });
  });
  it('Статьи успешно подгружаются', () => {
    // проверяем, что отрисовался
    cy.getByTestId('ArticleList').should('exist');
    // проверяем, что у нас хотя бы 3 статьи подгрузились
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  // пример теста как и выше, только с помощью фикстур
  it('На стабах (фикстурах)', () => {
    // мокаем запрос с помощью интерцептора и указываем, что в качестве ответа будет наша фикстура (моковые данные)
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    // пример, когда фикстуры у нас генерируются автоматически
    // cy.intercept("GET", "**/articles?*", (req) => {});
    // проверяем, что отрисовался
    cy.getByTestId('ArticleList').should('exist');
    // проверяем, что у нас хотя бы 3 статьи подгрузились
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  // пример скипованного теста, когда тест пропускается
  it.skip('Скип', () => {
    // проверяем, что отрисовался
    cy.getByTestId('ArticleList').should('exist');
    // проверяем, что у нас хотя бы 3 статьи подгрузились
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    cy.get('tests').should('exist');
  });
});
