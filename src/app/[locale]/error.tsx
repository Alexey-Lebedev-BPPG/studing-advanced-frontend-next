'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { PageError } from '@/widgets/PageError';

interface IGlobalError {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error(props: IGlobalError) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return <PageError />;
}
