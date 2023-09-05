// этот динамический роут сам генерирует роуты в таком синтаксисе. Например, http://localhost:3000/api/auth/signin, где signin сгенерировано автоматически.
// создаем хендлеры (аналоги запросов GET и POST)
import NextAuth from 'next-auth/next';
import { authConfig } from 'configs/next/auth/auth';

// добавляем конфиг хендлера
const handler = NextAuth(authConfig);

// после настройки у нас добавляется страница http://localhost:3000/api/auth/signin с авторизацией

export { handler as GET, handler as POST };
