const path = require('path');

// файл для того, чтоб просто наш путь вышел на верхний уровень проекта до корня, чтоб потом было удобно обращаться к src и всему вложенному
module.exports = (...segments) =>
  path.resolve(__dirname, '..', '..', '..', ...segments);
