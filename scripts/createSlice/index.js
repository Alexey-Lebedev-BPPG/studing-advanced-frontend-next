const createTemplate = require('./creators/createTemplate');

// из аргументов достаем слой
const layer = process.argv[2];
// из аргументов достаем название слайса
const sliceName = process.argv[3];
// [0] аргументом идет путь до скрипта, [1] - аргументом идет путь до ноды

// слои, в которых допустимо создание
const layers = ['features', 'entities', 'pages', 'widgets', 'shared'];

// проверка, что название слоя должно быть обязательно из списка
if (!layer || !layers.includes(layer))
  throw new Error(`Укажите слой ${layers.join(' или ')}`);

// проверка, что слайс должен быть указан
if (!sliceName) throw new Error('Укажите название слайса');

// вызываем функцию создания
createTemplate(layer, sliceName);
