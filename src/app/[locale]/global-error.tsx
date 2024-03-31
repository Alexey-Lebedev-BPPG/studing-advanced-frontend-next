'use client';

import { captureException } from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <body>
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  );
}
