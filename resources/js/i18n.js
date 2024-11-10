import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(HttpBackend) // Loads translations from external files
  .use(initReactI18next) // Connects i18next with React
  .init({
    fallbackLng: 'en', // Default language
    lng: localStorage.getItem('language') || 'en', // Set initial language from localStorage
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
  });

export default i18n;
