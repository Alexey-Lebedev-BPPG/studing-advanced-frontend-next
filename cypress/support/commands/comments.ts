// делаем команду на добавление комментария
export const addComment = (text = 'test') => {
  // вводим текст в инпутник
  cy.getByTestId('AddCommentForm.Input').type(text);
  // нажимаем на кнопку добавления комментария
  cy.getByTestId('AddCommentForm.Button').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      addComment(text?: string): Chainable<void>;
    }
  }
}
