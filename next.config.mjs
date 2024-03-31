import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/shared/configs/next-intl/i18n.ts',
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      exclude: /node_modules/,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgoConfig: {
              plugins: [
                { name: 'convertColors', params: { currentColor: true } },
              ],
            },
          },
        },
      ],
    });

    config.module.rules.push({
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'static/media',
      },
      test: /\.(mp4)$/i,
    });

    return config;
  },
};

/** @type {import('@sentry/nextjs').SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  debug: Boolean(JSON.parse(process.env.NEXT_PUBLIC_DEBUG)),
  ignore: ['node_modules'],
  // release: {
  //   finalize: false,
  //   name: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  //   setCommits: { auto: true },
  // },
  include: './.next',
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  silent: !JSON.parse(process.env.NEXT_PUBLIC_DEBUG),
};

export default withNextIntl(
  process.env.NEXT_PUBLIC_APP_ENV !== 'local'
    ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
    : nextConfig,
);
