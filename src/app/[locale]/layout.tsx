import { headers } from 'next/headers';
import { useMessages } from 'next-intl';
import { ReactNode } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import './globals.css';
import { RootProviders } from '@/app-fsd/providers/RootProviders';
import { SnackbarsContainer } from '@/shared/ui/redesigned/Snackbars/Snackbars';

interface IRootParams {
  children: ReactNode;
  params: { locale: string };
}

export async function generateMetadata(
  { params: { locale } }: IRootParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const headersList = headers();
  const url = headersList.get('referer') || '';
  // eslint-disable-next-line no-restricted-syntax
  // check all headers
  // for (const pair of headersList.entries())
  //   console.log(`${pair[0]}: ${pair[1]}`);

  const title =
    locale === 'en'
      ? 'Studying advanced frontend next'
      : 'Studying advanced frontend next';
  const description =
    locale === 'en'
      ? 'Studying advanced frontend next'
      : 'Studying advanced frontend next';
  const ogTitle =
    locale === 'en'
      ? 'Studying advanced frontend next'
      : 'Studying advanced frontend next';
  const ogDescription =
    locale === 'en'
      ? 'Studying advanced frontend next'
      : 'Studying advanced frontend next';
  const ogImage =
    locale === 'en' ? `${url}/Meta/b2.jpg` : `${url}/Meta/b2_ru.jpg`;
  const twitterImage =
    locale === 'en' ? `${url}/Meta/b2.jpg` : `${url}/Meta/b2_ru.jpg`;
  const twitterTitle =
    locale === 'en'
      ? 'Studying advanced frontend next'
      : 'Studying advanced frontend next';
  const twitterDescription =
    locale === 'en'
      ? 'Studying advanced frontend next'
      : 'Studying advanced frontend next';

  return {
    description,
    // metadataBase: new URL(url),
    openGraph: { description: ogDescription, images: ogImage, title: ogTitle },
    title,
    twitter: {
      description: twitterDescription,
      images: twitterImage,
      title: twitterTitle,
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: IRootParams) {
  const messages = useMessages();

  const headersList = headers();
  const nextUrl = headersList.get('next-url');

  const reg = /\/(en|ru)/g;

  const currentPathname = nextUrl
    ? nextUrl.replace(reg, '').replace(reg, '')
    : '';

  // const withHeader = pathWithHeader(currentPathname);

  return (
    <html lang={locale}>
      <RootProviders locale={locale} messages={messages}>
        {/* {!!withHeader && <Header />} */}
        {children}
        <SnackbarsContainer />
      </RootProviders>
    </html>
  );
}
