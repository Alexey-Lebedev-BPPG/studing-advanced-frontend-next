// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';
// import { initReactI18next } from 'react-i18next';

// i18n
//   // подключаем плагины
//   // чтоб переводы подключались чанками
//   // .use(Backend)
//   // .use(LanguageDetector)
//   // .use(initReactI18next)
//   .init({
//     // указываем откуда тянуть переводы
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json',
//     },
//     // чтоб в консоли показывало данные библиотеки
//     debug: __IS_DEV_DEBUG__,
//     // язык по ум.
//     fallbackLng: 'ru',
//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     },
//     load: 'languageOnly',
//   });

module.exports = {
  // указываем откуда тянуть переводы
  backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  // чтоб в консоли показывало данные библиотеки
  debug: false,
  defaultLocale: 'en',
  // язык по ум.
  fallbackLng: 'ru',
  // not needed for react as it escapes by default
  interpolation: { escapeValue: false },
  load: 'languageOnly',
  locales: ['en', 'es'],
};

// export default i18n;
