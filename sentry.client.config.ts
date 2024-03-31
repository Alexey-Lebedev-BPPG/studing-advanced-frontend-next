import {
  breadcrumbsIntegration,
  browserTracingIntegration,
  init,
  replayIntegration,
} from '@sentry/nextjs';
import {
  isIgnoreMessageError,
  isIgnoreTypeError,
} from './src/app-fsd/providers/SentryProvider';

init({
  autoSessionTracking: false,
  beforeSend: (event, hint) => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'local') return null;
    if (
      event.exception?.values &&
      isIgnoreTypeError(event.exception?.values[0]?.type)
    )
      return null;
    if (
      event.exception?.values &&
      event.exception?.values[0]?.value &&
      isIgnoreMessageError(event.exception?.values[0]?.value)
    )
      return null;
    return event;
  },
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  ignoreErrors: [
    'Network request failed',
    'Failed to fetch',
    'NetworkError',
    'Requested resource not available.',
  ],
  integrations: [
    replayIntegration(),
    browserTracingIntegration(),
    breadcrumbsIntegration({ console: false }),
  ],
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 1.0,
  tunnel: '',
});
