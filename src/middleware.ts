import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

export default async function middleware(request: NextRequest) {
  const defaultLocale =
    (request.headers.get('x-your-custom-locale') as string) || 'ru';

  // const requestForNextAuth = {
  //   headers: {
  //     cookie: request.headers.get('cookie')!,
  //   },
  // };

  // const session = await getSession({ req: requestForNextAuth });

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale,
    locales: ['ru', 'en'],
  });

  // const authMiddleware = withAuth(
  //   // Note that this callback is only invoked if
  //   // the `authorized` callback has returned `true`
  //   // and not for pages listed in `pages`.
  //   req => handleI18nRouting(req),

  //   {
  //     callbacks: {
  //       authorized: () => session !== null,
  //     },
  //     pages: {
  //       signIn: '/partners_program/login',
  //     },
  //   },
  // );

  const response = handleI18nRouting(request);

  response.headers.set('x-your-custom-locale', defaultLocale);

  // const publicPathnameRegex = RegExp(
  //   `^(/(${['en', 'ru'].join('|')}))?(${publicPages
  //     .map(p => (p === '/' ? ['', '/'] : p))
  //     .join('|')})/?$`,
  //   'i',
  // );

  // const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  return response;

  // return (authMiddleware as any)(request);
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
  // https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
  unstable_allowDynamic: [
    '/node_modules/next-auth/**',
    '/node_modules/@babel/runtime/regenerator/index.js',
  ],
};
