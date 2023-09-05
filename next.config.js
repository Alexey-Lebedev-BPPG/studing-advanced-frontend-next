const i18n = require('./next-i18next.config.js');

// функция на получение дефолтного апи адреса
const getApiUrl = (mode, apiUrl) => {
  if (apiUrl) return apiUrl;
  if (mode === 'production') return '/api';
  return 'http://localhost:3000';
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build-next',
  env: {
    NEXT_PUBLIC_API_URL: process.env?.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DEBUG: process.env?.NEXT_PUBLIC_DEBUG,
    NEXT_PUBLIC_PORT: process.env?.NEXT_PUBLIC_PORT,
    NEXT_PUBLIC_PROJECT: process.env?.NEXT_PUBLIC_PROJECT,
  },
  // i18n,
  images: {
    // размерность расширений
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],

    // добавляем форматы, т.к. avif по ум. не используется
    formats: ['image/avif', 'image/webp'],
    // если мы хотим загружать какие-то изображения из внешнего источника (например ютуб) и оптимизировать их, то добавляем такие настройки
    remotePatterns: [
      {
        hostname: 'i.ytimg.com',
        pathname: '/vi/*',
        port: '',
        protocol: 'https',
      },
    ],
  },
  trailingSlash: true,
  webpack: (config, { buildId, defaultLoaders, dev, isServer, webpack }) =>
    // const mode = process.env?.mode || 'development';
    // const PORT = Number(process.env?.PORT) || 3000;
    // const apiURL = getApiUrl(mode, process.env?.API_URL);

    // const isDev = mode === 'development';
    // const isDevDebug =
    //   JSON.parse('false') || JSON.parse(process.env?.DEBUG || 'false') || false;

    // const __API__ = JSON.stringify(apiURL);
    // const __IS_DEV__ = JSON.stringify(isDev);
    // const __IS_DEV_DEBUG__ = JSON.stringify(isDevDebug);
    // const __PROJECT__ = JSON.stringify('frontend');
    config,
};

module.exports = nextConfig;
