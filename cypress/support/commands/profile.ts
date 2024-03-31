// делаем команду на редактирование профиля
export const updateProfile = (firstName = 'new', lastname = 'lastname') => {
  // получаем кнопку редактирования
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  // получаем необходимые инпутники, очищаем их и вводим новые значения
  cy.getByTestId('ProfileCard.firstName').clear().type(firstName);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  // получаем кнопку сохранения и нажимаем на нее
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

// делаем запрос на сброс данных
export const resetProfile = (profileId: string) =>
  cy.request({
    body: {
      age: 465,
      avatar:
        'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
      city: 'Moscow',
      country: 'Ukraine',
      currency: 'EUR',
      first: 'test',
      id: '4',
      lastname: 'user',
      username: 'testuser',
    },
    headers: { Authorization: 'test' },
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
  });

declare global {
  namespace Cypress {
    interface Chainable {
      resetProfile(profileId: string): Chainable<void>;
      // здесь определяем все команды, чтоб срабатывал автокомплит
      updateProfile(firstName?: string, lastname?: string): Chainable<void>;
    }
  }
}
