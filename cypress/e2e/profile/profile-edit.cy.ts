// создаем отдельную переменную для айди профиля
let profileId = '';

describe('Пользователь заходит на страницу', () => {
  // делаем пустой переход и авторизовываемся перед каждым тестом
  beforeEach(() => {
    cy.visit('');
    cy.login().then(data => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  // очищаем данные профиля после каждого теста
  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('Профиль успешно загрузился', () => {
    // получаем элемент и проверяем, что внутри инпута (это первый метод)
    // cy.get(selectByTestId("ProfileCard.firstName")).should(
    //   "have.value",
    //   "user"
    // );
    // второй метод уде через собственную команду
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
  });
  it('редактирование профиля', () => {
    const newFirstName = 'test';
    const newLastname = 'lastname';
    cy.updateProfile(newFirstName, newLastname);
    // проверяем, что значение инпутников поменялось
    cy.getByTestId('ProfileCard.firstName').should('have.value', newFirstName);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
  it('passes', () => {});
});
