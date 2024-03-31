import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'ru';

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale,
    locales: ['ru', 'en'],
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
