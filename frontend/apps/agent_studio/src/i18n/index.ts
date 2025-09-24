import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const LOCAL_KEY_AGENT_STUDIO_I18_NEXT_LNG = 'AGENT_STUDIO_I18_NEXT_LNG';

i18next
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    // 默认回退语言
    fallbackLng: 'en',

    // 是否开启调试模式
    debug: false,

    // 插值语法（React 会处理 XSS，所以不需要 escape）
    interpolation: {
      escapeValue: false,
    },

    // 启用缓存插件
    detection: {
      order: ['localStorage', 'htmlTag', 'navigator', 'path', 'subdomain'],
      caches: ['localStorage'], // 将语言保存到 localStorage
      lookupLocalStorage: LOCAL_KEY_AGENT_STUDIO_I18_NEXT_LNG,
    },

    backend: {
      loadPath: '/paas/locales/{{lng}}/translation.json',
    },
  });

export default i18next;
