import { fetchArticleById } from './fetchArticleById';
import { Article } from '../../types/article';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

const data: Article = {
  blocks: [
    {
      id: '1',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
      title: 'Заголовок этого блока',
      type: 'TEXT',
    },
    {
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
      id: '4',
      type: 'CODE',
    },
    {
      id: '5',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
      title: 'Заголовок этого блока',
      type: 'TEXT',
    },
    {
      id: '2',
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
      type: 'IMAGE',
    },
    {
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
      id: '3',
      type: 'CODE',
    },
    {
      id: '7',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
      title: 'Заголовок этого блока',
      type: 'TEXT',
    },
    {
      id: '8',
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
      type: 'IMAGE',
    },
    {
      id: '9',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
      ],
      title: 'Заголовок этого блока',
      type: 'TEXT',
    },
  ],
  createdAt: '26.02.2022',
  id: '1',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  subtitle: 'Что нового в JS за 2022 год?',
  title: 'Javascript news',
  type: ['IT'],
  user: {
    avatar:
      'data:image/jpeg;base64,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',
    id: '1',
    username: 'admin',
  },
  views: 1022,
};

describe('fetchArticleById', () => {
  test('success', async () => {
    // передаем наш thunk в наш класс и прокидываем инитиал стейт
    const thunk = new TestAsyncThunk(fetchArticleById, {
      articleDetails: { data },
    });
    // имитируем отправку get запроса, который возвращает валидные данные
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // вызываем функцию внутри класса для создания экшена и прокидываем в нее айдишник
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('server error', async () => {
    // передаем наш thunk в наш класс и прокидуем инитиал стейт
    const thunk = new TestAsyncThunk(fetchArticleById, {
      articleDetails: { data },
    });
    // имитируем отправку get запроса, который возвращает нам ошибку
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('2');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('ARTICLE_ERROR');
  });
});
