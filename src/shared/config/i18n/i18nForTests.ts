import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// конфиг переводов специально для тестов
i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  lng: 'ru',
  react: { useSuspense: false },
  resources: { ru: { translations: {} } },
  returnNull: false,
});

export default i18n;
