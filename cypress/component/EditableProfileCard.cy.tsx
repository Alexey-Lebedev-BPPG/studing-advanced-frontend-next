import { EditableProfileCard } from '@/features/EditableProfileCard';
import { TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

const USER_ID = '4';

// тестирование отдельных компонентов в изоляции от всего приложения (используется, т.к. в jest мы не можем понажимать на кнопки. там это все в некой абстракции.здесь все на виду. Однако есть отрицательные стороны: jest более стабилен, их легче поддерживать, быстрее работают)
describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    // получаем данные из стабов
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    // проверяем монтирование компонента, используя провайдеры
    cy.mount(
      <TestProvider
        // чтоб появились кнопки редактирования, передаем такой же айди, как и в EditableProfileCard
        options={{ initialState: { user: { authData: { id: USER_ID } } } }}
      >
        <EditableProfileCard id={USER_ID} />
      </TestProvider>,
    );
    // дальше описываем тесты, которые хотим произвести (по аналогии с e2e тестами)
  });
});
// обертку TestProvider можно с помощью Cypress.Commands.overwrite добавить, чтоб она добавлялась для каждого компонента и в каждом тесте ее не указывать (предположительно в support => components.ts)
