import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as ratingCommands from './commands/rating';

// команды, которые можно зашить внутрь сайпреса и потом использовать
// добавляем команду запроса на авторизацию
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// позволяет перезаписать какую-либо команду (у нас пример генерации фикстуры автоматически на основе данных ответа с бэка)
// Cypress.Commands.overwrite("intercept", (req) => {
//   // передаем переменную, которая указывает, записывать фикстуры или считывать
//   const FIXTURE_MODE = process.env.FIXTURE_MODE;
//   // создаем название фикстуры
//   const fixtureName = req.METHOD + req.url + hash(req.body);
//   if (FIXTURE_MODE === "READ") {
//     readFixture();
//   }
//   // при помощи записи текстур мы можем получать данные запроса и на основании этих данных записывать фикстуру. Пример в файле articles-list.cy.ts
//   if (FIXTURE_MODE === "WRITE") {
//     createFixture(fixtureName, req.body);
//   }
// });
// этот пример показывает, что мы можем передавать переменную режима, что позволит в локальной разработке использовать моковые данные, а при пайплайнах уже данные реального бэка
