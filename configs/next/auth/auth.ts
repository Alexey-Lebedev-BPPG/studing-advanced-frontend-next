import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthOptions } from 'next-auth';
import { User } from '@/entities/User';
import { nextApi } from '@/shared/api/nextApi';

// конфиг для авторизации
export const authConfig: AuthOptions = {
  callbacks: {
    async jwt({ account, profile, session, token, trigger, user }) {
      if (user) token.dataUser = user;
      return token;
    },
    async session({ newSession, session, token, trigger, user }) {
      // @ts-ignore
      session.user = token.dataUser;
      return session;
    },
  },
  // второе поле, которое позволяет переопределять страницы. сейчас мы указываем, что страница входа у нас будет своя
  pages: { signIn: '/signin' },
  providers: [
    // здесь можно подключать разные провайдеры для авторизации, которые находятся также в next-auth/providers/
    CredentialsProvider({
      // функция, которая проверят креденшиал и если ты не авторизован, то возвращает null, иначе
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const { data: user } = await nextApi<
          Record<'password' | 'username', string>,
          User
        >({
          body: {
            password: credentials.password,
            username: credentials.username,
          },
          method: 'POST',
          url: 'login',
        });
        if (user)
          // console.log('userAction', user);
          // const { dispatch, getState } = createReduxStore();
          // console.log('getState', getState());
          // dispatch(userActions.setAuthData(user));
          // dispatch({
          //   payload: 777,
          //   type: 'ADD_USER_INPUT',
          // });
          // console.log('dispatch', dispatch);
          // console.log(
          //   `dispatch({
          //   payload: 777,
          //   type: 'ADD_USER_INPUT',
          // });`,
          //   dispatch({
          //     payload: 777,
          //     type: 'ADD_USER_INPUT',
          //   }),
          // );
          // console.log('userActions', userActions);
          // console.log(
          //   'userActions.setAuthData(user).type',
          //   userActions.setAuthData(user).type,
          // );
          return user;

        // чтоб добавился объект с кастомными полями, необходимо перезаписать его в функции jwt и session
        return null;
      },

      // то, что мы будем спрашивать у пользователя
      credentials: {
        // это поле будет генерироваться автоматически с указанными параметрами
        password: { label: 'password', required: true, type: 'password' },
        username: { label: 'email', required: true, type: 'email' },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};
