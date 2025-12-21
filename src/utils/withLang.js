import i18n from '../i18n';

export const withLang = (params = {}) => ({
    ...params,
    lang: i18n.language,
});
