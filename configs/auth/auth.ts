import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthOptions } from 'next-auth';
import urls from '@/shared/const/urls';

const api = process.env.NEXT_PUBLIC_API_URL;

export const authConfig: AuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          // @ts-ignore
          accessToken: user.accessToken,
        };

      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      if (token) session.accessToken = token.accessToken;

      return session;
    },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 1 * 24 * 60 * 60,
    secret: 'superSecret',
  },
  pages: {
    signIn: 'partners_program/login',
  },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        const userData = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const resp = await fetch(`${api}${urls.partners.signIn}`, {
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
        });
        const responseData = await resp.json();

        console.log('responseData :>> ', responseData);

        if (!resp.ok)
          throw new Error(
            JSON.stringify({
              errors: responseData.message,
              status: responseData.statusCode,
            }),
          );

        if (!responseData?.accessToken)
          throw new Error(
            JSON.stringify({
              errors: 'Update your password',
              status: 401,
            }),
          );

        if (responseData) return responseData;
      },
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      name: 'Credentials',
    }),
  ],
  secret: 'supersecret',
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    // 86400 - One day
    maxAge: 86400,

    strategy: 'jwt',
    // Seconds - Throttle how frequently to write to database to extend a session.
    updateAge: 1 * 60 * 60,
  },
};
