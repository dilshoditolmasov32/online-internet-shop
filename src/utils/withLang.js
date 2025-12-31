import i18n from '../i18n';

export const withLang = (params = {}) => ({
    ...params,
    locale: i18n.language, 
});