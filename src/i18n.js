import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Подключаем бэкенд для загрузки переводов
  .use(LanguageDetector) // Определение языка
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: 'uz', // Язык по умолчанию
    supportedLngs: ['uz', 'ru'], // Поддерживаемые языки
    debug: false, // Включает логи в консоли
    interpolation: {
      escapeValue: false, // Отключает экранирование HTML
    },
  });

export default i18n;
