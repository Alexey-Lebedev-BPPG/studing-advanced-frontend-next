// const LanguageDetector = require('i18next-browser-languagedetector');
// const Backend = require('i18next-http-backend');
// const { initReactI18next } = require('react-i18next');

module.exports = {
  // backend: {
  //   loadPath: '/locales/{{lng}}/{{ns}}.json',
  //   requestOptions: {
  //     cache: 'default',
  //     credentials: 'same-origin',
  //     mode: 'no-cors',
  //   },
  // },
  // debug: process.env.NODE_ENV === 'development',
  // debug: true,
  // defaultNS: 'translation',
  // fallbackLng: 'ru',
  defaultLocale: 'en',
  localeDetection: false,
  locales: ['en', 'ru'],
  // interpolation: {
  //   escapeValue: false, // not needed for react as it escapes by default
  // },
  // load: 'languageOnly',
  // ns: ['translation'],
  // react: {
  //   useSuspense: true,
  // },
  // serializeConfig: false,
  // use: [Backend, LanguageDetector, initReactI18next],
};
