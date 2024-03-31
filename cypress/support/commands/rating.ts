// делаем команду на оставление оценки
export const setRate = (starsCount = 3, feedback = 'feedback') => {
  // нажимаем на количество звезд
  cy.getByTestId(`StarRating.${starsCount}`).click();
  // открывается модалка, получаем инпутник и вводим туда наш фидбек
  cy.getByTestId('RatingCard.Input').type(feedback);
  // нажимаем на кнопку отправить
  cy.getByTestId('RatingCard.Send').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      // здесь определяем все команды, чтоб срабатывал автокомплит
      setRate(starsCount?: number, feedback?: string): Chainable<void>;
    }
  }
}
