// https://github.com/typicode/json-server#custom-routes-example
// у нас будет реализована имитация авторизации. Чтоб получить доступ на данный момент, необходимо к запросу добавить заголовок Authorization с любым значение. Также, при необходимости, нужно добавить заголовок Content-Type":"application/json", чтоб избежать возврата request.body в виде {}
const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');

// для подключения https
// const https = require('https');
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync(path.resolve(--dirname, 'key.pem')),
//   cert: fs.readFileSync(path.resolve(--dirname, 'cert.pem'))
// }

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  await new Promise(res => {
    setTimeout(res, 800);
  });
  next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
  try {
    const { password, username } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
    );
    const { users = [] } = db;

    const userFromBd = users.find(
      user => user.username === username && user.password === password,
    );

    if (userFromBd) return res.json(userFromBd);

    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json({ message: 'AUTH ERROR' });

  next();
});

server.use(router);

// запускаем https сервер на дефолтном 8443 порту
// const httpsServer = https.createServer(options, server);
// httpsServer.listen(8443, () => {
//   console.log('server is running on 8443 port');
// });

// запуск сервера
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
